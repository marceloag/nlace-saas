'use client';
import { createClient } from '@/utils/supabase/client';

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
