import { createClient } from '@/utils/supabase/server';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import DownloadFileButton from '@/components/DownloadFileButton';

export default async function PerfilCuenta({ params }) {
  const supabase = await createClient();
  const slug = (await params).slug;
  const { data, error } = await supabase
    .from('cuentas')
    .select()
    .limit(1)
    .eq('slug', slug)
    .single();

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
        <CardTitle>{data.nombre}</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-2">
        <p>{data.website}</p>
        <p className="text-gray-700">{data.descripcion}</p>
        <div className="mt-4">
          {data.servicios.map((servicio) => (
            <span
              key={servicio}
              className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-primary/10 text-primary mr-2"
            >
              {servicio}
            </span>
          ))}
        </div>
        <div className="flex flex-col gap-2">
          <h1 className="text-2xl font-extrabold my-4">Archivos</h1>
          <div>
            {data.archivos.map((file) => (
              <div
                key={file}
                className="flex flex-row items-center justify-between"
              >
                <span className="text-primary">{file.split('/').pop()}</span>
                <DownloadFileButton file={file} />
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
