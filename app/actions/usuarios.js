'use server';

import { createClient } from '@/utils/supabase/server';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export async function getAccounts() {
  const supabase = await createClient();
  const { data, error } = await supabase.from('cuentas').select('*');
  if (error) {
    console.error('Error al obtener cuentas:', error);
    return { error: true, message: error.message };
  }
  return data;
}

export async function createAccount(formData) {
  const supabase = await createClient();
  const { data, error } = await supabase.from('usuarios').insert({
    nombre: formData.name,
    email: formData.email,
    permisos: formData.selectedAccounts
  });
  if (error) {
    console.error('Error al crear cuenta:', error);
    return { error: true, message: error.message };
  }
  return data;
}
