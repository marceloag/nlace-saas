'use server';

import { createClient } from '@/utils/supabase/server';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export async function getAccounts() {
  const supabase = await createClient();
  const { data, error } = await supabase.from('cuentas').select('id, nombre');
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

export async function getUser(id) {
  const supabase = await createClient();
  const { data: userData, error } = await supabase
    .from('usuarios')
    .select('*')
    .eq('id', id)
    .single();
  if (error) throw error;
  return userData;
}

export async function updateAccount(formData, userId) {
  const nombreUsuario = formData.name;
  const emailUsuario = formData.email;
  const permisosUsuario = formData.selectedAccounts;
  const supabase = await createClient();
  console.log(userId);
  console.log(formData);
  const { error } = await supabase
    .from('usuarios')
    .update({
      nombre: nombreUsuario,
      email: emailUsuario,
      permisos: permisosUsuario
    })
    .eq('id', userId);
  if (error) {
    console.error('Error al actualizar cuenta:', error);
    return { error: true, message: error.message };
  }
  return { success: true };
}
