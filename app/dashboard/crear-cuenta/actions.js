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

    // Upload image if provided
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

    revalidatePath('/dashboard');
    return { success: true, data };
  } catch (error) {
    console.error('Error:', error);
    return { success: false, error: 'Error creando cuenta' };
  }
}
