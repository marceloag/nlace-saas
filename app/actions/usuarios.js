'use server';

import { createClient } from '@/utils/supabase/server';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

const supabase = await createClient();

export async function getAccounts() {
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

export async function downloadFile(fileName) {
  const supabase = await createClient();

  try {
    const { data, error } = await supabase.storage
      .from('kb-cuentas')
      .download(fileName);

    if (error) {
      console.error('Error específico:', error.message);
      return;
    }
  } catch (err) {
    console.error('Error en la descarga:', err);
  }

  return data;
}

export async function getUserPermissions(userEmail) {
  const { data: permissions, error } = await supabase
    .from('usuarios')
    .select('permisos')
    .eq('email', userEmail)
    .single();
  if (error) throw error;
  return permissions.permisos;
}

export async function getCurrentUser() {
  const { data: userData, error } = await supabase.auth.getUser();

  if (error) {
    console.log('Error al obtener usuario actual:', error);
  } else {
    // console.log('Usuario actual:', userData);
  }

  return userData;
}

export async function fetchUserData() {
  try {
    const [userData, permisos, accounts] = await Promise.all([
      getCurrentUser(),
      getUserPermissions(userData?.user?.email), // Se ejecutará cuando userData esté listo
      getAccounts()
    ]);

    return { user: userData.user, permisos, accounts };
  } catch (error) {
    console.error('Error al obtener datos del usuario:', error);
    return null;
  }
}
