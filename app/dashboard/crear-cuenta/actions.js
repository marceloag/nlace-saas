'use server';

import { revalidatePath } from 'next/cache';
import { createClient } from '@/utils/supabase/server';

export async function createCuenta(formData) {
  const supabase = await createClient();

  try {
    const nombre = formData.get('nombre');
    const slug = nombre
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, '')
      .replace(/[\s_-]+/g, '-')
      .replace(/^-+|-+$/g, '');
    const descripcion = formData.get('descripcion');
    const servicios = JSON.parse(formData.get('servicios'));
    const website = formData.get('website');
    const avatarFile = formData.get('avatar');
    let avatarUrl = '';
    // KB Files
    const files = formData.getAll('files');
    const fileUrls = [];

    const newFormData = new FormData();

    files.forEach((file) => {
      newFormData.append('files', file);
    });

    for (const file of files) {
      if (file && file.size > 0) {
        const fileName = `${slug}/${Date.now()}-${file.name}`;
        const { data, error } = await supabase.storage
          .from('kb-cuentas')
          .upload(fileName, file);

        if (error) {
          throw new Error(`Error uploading file: ${error.message}`);
        }

        fileUrls.push(fileName);
      }
    }

    if (avatarFile && avatarFile.size > 0) {
      const fileName = `${Date.now()}-${avatarFile.name}`;
      const { data, error } = await supabase.storage
        .from('avatars')
        .upload(fileName, avatarFile);

      if (error) {
        throw new Error(`Error uploading file: ${error.message}`);
      }

      // Get public URL
      const {
        data: { publicUrl }
      } = supabase.storage.from('avatars').getPublicUrl(fileName);

      avatarUrl = publicUrl;
    }

    const { data, error } = await supabase
      .from('cuentas')
      .insert([
        {
          nombre,
          descripcion,
          servicios,
          avatar: avatarUrl,
          archivos: fileUrls,
          website,
          slug
        }
      ])
      .select()
      .single();

    // Enviar archivos a n8n
    const response = await fetch(
      'https://n8n.marceloag.dev/webhook/recibir-archivos',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: newFormData
      }
    );

    console.log('Response:', response);

    if (error) throw error;
    revalidatePath('/dashboard/crear-cuenta');
    return { success: true, data };
  } catch (error) {
    console.error('Error:', error);
    return { success: false, error: 'Error creando cuenta' };
  }
}
