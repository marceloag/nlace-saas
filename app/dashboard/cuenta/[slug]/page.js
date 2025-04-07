import { createClient } from '@/utils/supabase/server';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import DownloadFileButton from '@/components/DownloadFileButton';
import FileUploader from '@/components/fileUpload/fileUploader';
import { Button } from '@/components/ui/button';
import Markdown from 'react-markdown';

export default async function PerfilCuenta({ params }) {
  const supabase = await createClient();
  const {
    data: { session }
  } = await supabase.auth.getSession();
  const slug = (await params).slug;
  const { data, error } = await supabase
    .from('cuentas')
    .select('*, archivos-kb(*)')
    .limit(1)
    .eq('slug', slug)
    .single();

  if (data) {
    data.archivosKB = data['archivos-kb'];
    delete data['archivos-kb'];
  }

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader className="flex flex-row space-x-2 items-center">
        <img
          src={data.avatar}
          alt={data.nombre}
          width={32}
          height={32}
          className="rounded-full"
        />
        <CardTitle className="title">{data.nombre}</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-2">
        <p>{data.website}</p>
        <p className="text-gray-700">{data.descripcion}</p>
        <div className="mt-4">
          {data.servicios.map((servicio) => (
            <span
              key={servicio}
              className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-primary/10 text-primary mr-2 mb-2"
            >
              {servicio}
            </span>
          ))}
        </div>
        <div className="flex flex-col gap-2">
          <FileUploader
            accountSlug={data.slug}
            accessToken={session?.access_token}
            accountId={data.id}
          />
          <h1 className="text-2xl font-extrabold my-4 flex flex-row items-center">
            Archivos
            <small className="text-xs ml-4 font-light">
              ({data.archivosKB.length})
            </small>
          </h1>
          <div>
            {data.archivosKB.map((file) => (
              <div
                key={file.id}
                className="flex flex-row items-center justify-between"
              >
                <span className="text-primary">
                  {file.nombre_archivo.split('/').pop()}
                </span>
                <DownloadFileButton file={file} />
              </div>
            ))}
          </div>
        </div>
        <div>
          <h1 className="text-2xl font-extrabold my-4">System Prompt</h1>
          <div id="system-prompt" className="text-gray-700">
            <Markdown>{data.prompt_agente}</Markdown>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
