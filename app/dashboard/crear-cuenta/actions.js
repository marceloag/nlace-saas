'use server';

import { revalidatePath } from 'next/cache';
import { createClient } from '@/utils/supabase/server';

export async function createCuenta(formData) {
  const supabase = await createClient();

  try {
    const nombre = formData.get('nombre');
    const descripcion = formData.get('descripcion');
    const servicios = JSON.parse(formData.get('servicios'));
    const website = formData.get('website');
    const avatarFile = formData.get('avatar');
    let avatarUrl = '';
    // KB Files
    const files = formData.getAll('files');
    const fileUrls = [];

    for (const file of files) {
      if (file && file.size > 0) {
        const fileName = `${Date.now()}-${file.name}`;
        const { data, error } = await supabase.storage
          .from('kb-cuentas')
          .upload(fileName, file);

        if (error) {
          throw new Error(`Error uploading file: ${error.message}`);
        }

        // Get public URL for each file
        const {
          data: { publicUrl }
        } = supabase.storage.from('kb-cuentas').getPublicUrl(fileName);

        fileUrls.push(publicUrl);
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
          website
        }
      ])
      .select()
      .single();

    if (error) throw error;
    return { success: true, data };
  } catch (error) {
    console.error('Error:', error);
    return { success: false, error: 'Error creando cuenta' };
  }
}
