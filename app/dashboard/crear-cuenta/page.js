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
import { Toaster, toast } from 'sonner';

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
      const nombreCuenta = formData.get('nombre');

      if (result.success) {
        // router.push('/dashboard');
        toast.success(`Se ha creado exitosamente la cuenta ${nombreCuenta} `);
        document.getElementById('crearcuentaform').reset();
        formData.delete('servicios');
        setTags([]);
      } else {
        toast.error(`Ha ocurrido un error creando la cuenta ${nombreCuenta} `);
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
      <Toaster position="bottom-center" richColors />
      <CardHeader>
        <CardTitle>⭐ Crear Nueva Cuenta</CardTitle>
      </CardHeader>
      <CardContent>
        <form action={handleSubmit} className="space-y-6" id="crearcuentaform">
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
