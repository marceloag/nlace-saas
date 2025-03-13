import { createClient } from '@/utils/supabase/server';

export async function getAccounts() {
  const supabase = await createClient();
  const { data: accounts, error } = await supabase.from('cuentas').select('*');
  if (error) throw error;
  return accounts;
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
  const supabase = await createClient();
  const { data: permissions, error } = await supabase
    .from('usuarios')
    .select('permisos')
    .eq('email', userEmail)
    .single();
  if (error) throw error;
  return permissions.permisos;
}
