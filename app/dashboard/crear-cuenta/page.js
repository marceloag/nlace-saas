'use client';

import { useState, useCallback } from 'react';
import { X } from 'lucide-react';
import { createCuenta } from './actions';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Toaster, toast } from 'sonner';

export default function CrearCuenta() {
  const [tags, setTags] = useState([]);
  const [tagInput, setTagInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const resetForm = (formData) => {
    document.getElementById('crearcuentaform').reset();
    formData.delete('servicios');
    setTags([]);
  };

  // Tags
  const handleAddTag = (e) => {
    if (e.key === 'Enter' && tagInput.trim()) {
      e.preventDefault();
      if (!tags.includes(tagInput.trim())) {
        setTags([...tags, tagInput.trim()]);
      }
      setTagInput('');
    }
  };
  // Form Submit
  const handleSubmit = async (formData) => {
    setIsLoading(true);
    const submit = async () => {
      try {
        formData.set('servicios', JSON.stringify(tags));
        const result = await createCuenta(formData);
        const nombreCuenta = formData.get('nombre');

        if (result.success) {
          toast.success(`Se ha creado exitosamente la cuenta ${nombreCuenta} `);
          document.getElementById('crearcuentaform').reset();
          formData.delete('servicios');
          setTags([]);
        } else {
          toast.error(
            `Ha ocurrido un error creando la cuenta ${nombreCuenta} `
          );
        }
      } catch (error) {
        console.error('Error:', error);
      } finally {
        setIsLoading(false);
        resetForm(formData);
      }
    };
    submit();
  };

  const removeTag = (tagToRemove) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  return (
    <>
      {isLoading && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-4 rounded-md shadow-lg">
            <p>Creando cuenta...</p>
          </div>
        </div>
      )}
      <Card className="w-full max-w-2xl mx-auto">
        <Toaster position="bottom-center" richColors />
        <CardHeader>
          <CardTitle>⭐ Crear Nueva Cuenta {isLoading}</CardTitle>
        </CardHeader>
        <CardContent>
          <form
            onSubmit={async (e) => {
              e.preventDefault();
              const formData = new FormData(e.target);
              await handleSubmit(formData);
            }}
            className="space-y-6"
            id="crearcuentaform"
          >
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
                className="min-h-[60px]"
              />
            </div>

            <div className="space-y-2">
              <Textarea
                id="promptAgente"
                name="promptAgente"
                required
                placeholder="Prompt Agente"
                className="min-h-[200px]"
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

            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? 'Creando...' : 'Crear Cuenta'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </>
  );
}
