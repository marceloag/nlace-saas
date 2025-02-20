'use server';

import { revalidatePath } from 'next/cache';
import { createClient } from '@/utils/supabase/server';

export async function updateAccount(formData) {
  const supabase = await createClient();

  try {
    const descripcion = formData.get('descripcion');
    const servicios = JSON.parse(formData.get('servicios'));
    const website = formData.get('website');
    const promptAgente = formData.get('promptAgente');
    const slug = formData.get('slug');

    const { error } = await supabase
      .from('cuentas')
      .update({
        descripcion: descripcion,
        servicios: servicios,
        website: website,
        prompt_agente: promptAgente
      })
      .eq('slug', slug);

    if (error) throw error;

    // revalidatePath('/dashboard/cuenta/' + slug);
    return { success: true };
  } catch (error) {
    console.error('Error:', error);
    return { success: false, error: 'Error actualizando cuenta' };
  }
}
export async function getAccountData(slug) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('cuentas')
    .select('*')
    .eq('slug', slug)
    .single();
  if (error) throw error;
  return data;
}
