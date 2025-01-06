// import { createClient } from '@/utils/supabase/server';
// import Header from '@/components/Header';
// import SideMenu from '@/components/SideMenu';

// export async function getAccounts() {
//   const supabase = await createClient();
//   const { data: accounts, error } = await supabase.from('cuentas').select('*');
//   if (error) throw error;
//   return accounts;
// }
// export default async function PrivatePage() {
//   const supabase = await createClient();
//   const { data, error } = await supabase.auth.getUser();
//   const accounts = await getAccounts();

//   return (
//     <section className="flex flex-row bg-gray-50">
//       <SideMenu userData={data.user} />
//       <main className="w-full flex flex-1 flex-col py-2 min-h-screen ">
//         <Header cuentas={accounts} />
//         <div className="flex flex-col my-6 mx-4 w-full justify-between h-[100%] relative">
//           <div className="bg-transparent m-0 p-0 after:via-gray-50 after:via-40% w-full after:absolute after:w-full after:z-50 after:pb-10 after:bg-gradient-to-b after:flex  after:from-gray-50 after:to-transparent">
//             {/* CONTENT HERE */}
//             <h1 className="text-3xl font-thin">➕ Crear nueva cuenta</h1>
//           </div>
//           <div>
//             <span className="text-xs text-gray-300"> V0.0.3</span>
//           </div>
//         </div>
//       </main>
//     </section>
//   );
// }

'use client';

import { useState } from 'react';
import { X } from 'lucide-react';
import { createCuenta } from './actions';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useRouter } from 'next/navigation';

export default function CrearCuentaForm() {
  const [tags, setTags] = useState([]);
  const [tagInput, setTagInput] = useState('');
  const [isPending, setIsPending] = useState(false);
  const router = useRouter();

  const handleSubmit = async (formData) => {
    setIsPending(true);
    try {
      formData.set('servicios', JSON.stringify(tags));

      const result = await createCuenta(formData);
      if (result.success) {
        router.push('/dashboard');
      } else {
        alert('Error creando cuenta');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error creando cuenta');
    } finally {
      setIsPending(false);
    }
  };

  const handleAddTag = (e) => {
    if (e.key === 'Enter' && tagInput.trim()) {
      e.preventDefault();
      if (!tags.includes(tagInput.trim())) {
        setTags([...tags, tagInput.trim()]);
      }
      setTagInput('');
    }
  };

  const removeTag = (tagToRemove) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>⭐ Crear Nueva Cuenta</CardTitle>
      </CardHeader>
      <CardContent>
        <form action={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Input
              id="nombre"
              name="nombre"
              required
              placeholder="Nombre de la cuenta"
            />
          </div>

          <div className="space-y-2">
            <Textarea
              id="descripcion"
              name="descripcion"
              required
              placeholder="Descripción de la cuenta"
              className="min-h-[100px]"
            />
          </div>

          <div className="space-y-2">
            <Input
              id="servicios"
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              onKeyDown={handleAddTag}
              placeholder="Agregar productos o servicios..."
            />
            <Label
              htmlFor="servicios"
              className="text-gray-400 text-xs font-light pl-2"
            >
              (Presiona enter para agregar)
            </Label>
            <div className="flex flex-wrap gap-2 mt-2">
              {tags.map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-primary/10 text-primary"
                >
                  {tag}
                  <button
                    type="button"
                    onClick={() => removeTag(tag)}
                    className="ml-2 hover:text-primary/80"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </span>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="avatar">Avatar</Label>
            <Input
              id="avatar"
              name="avatar"
              type="file"
              accept="image/*"
              className="cursor-pointer"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="website">Sitio Web </Label>
            <Input
              id="website"
              name="website"
              type="url"
              placeholder="https://example.com"
            />
          </div>

          <Button type="submit" className="w-full" disabled={isPending}>
            {isPending ? 'Creando...' : 'Crear Cuenta'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
