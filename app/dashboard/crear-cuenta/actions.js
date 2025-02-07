'use server';

import { revalidatePath } from 'next/cache';
import { createClient } from '@/utils/supabase/server';

export async function createCuenta(formData) {
  const supabase = await createClient();

  try {
    let avatarUrl = '';
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
    const promptAgente = formData.get('promptAgente');

    // KB Files
    const files = formData.getAll('files');
    const fileUrls = [];

    for (const file of files) {
      if (file && file.size > 0) {
        const cleanFileName = file.name
          .normalize('NFD')
          .replace(/[\u0300-\u036f]/g, '')
          .replace(/[^a-zA-Z0-9\-_.]/g, ' ');
        const fileName = `${slug}/${Date.now()}-${cleanFileName}`;

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
      const cleanFileNameAvatar = avatarFile.name
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/[^a-zA-Z0-9\-_.]/g, ' ');
      const fileName = `${Date.now()}-${cleanFileNameAvatar}`;
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

    const { data: dataCuenta, error } = await supabase
      .from('cuentas')
      .insert([
        {
          nombre,
          descripcion,
          servicios,
          avatar: avatarUrl,
          archivos: fileUrls,
          website,
          slug,
          prompt_agente: promptAgente
        }
      ])
      .select()
      .single();

    if (error) throw error;

    // Insertar archivos en tabla archivos-kb

    for (const file of fileUrls) {
      const { data: dataSignedUrl, error: errorSigned } = await supabase.storage
        .from('kb-cuentas')
        .createSignedUrl(file, 3600);

      if (errorSigned) throw errorSigned;

      const { error: archivosError } = await supabase
        .from('archivos-kb')
        .insert([
          {
            nombre_archivo: file,
            signed_url: dataSignedUrl.signedUrl,
            cuenta: dataCuenta.id,
            bucket: 'kb-cuentas',
            status: 'pending'
          }
        ]);
      if (archivosError) throw archivosError;
    }

    //revalidatePath('/dashboard/crear-cuenta');
    return { success: true, dataCuenta };
  } catch (error) {
    console.error('Error:', error);
    return { success: false, error: 'Error creando cuenta' };
  }
}
