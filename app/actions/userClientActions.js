'use client';

import { createClient } from '@/utils/supabase/client';

export async function getUserDataAndPermissionsClient() {
  const supabaseClient = await createClient();
  try {
    // Verificar si hay una sesión activa
    const {
      data: { session }
    } = await supabaseClient.auth.getSession();

    if (!session) {
      throw new Error('No user is logged in');
    }

    // Obtener el usuario
    const { data: authUser, error: authError } =
      await supabaseClient.auth.getUser();

    if (authError || !authUser) {
      throw new Error('No user is logged in');
    }

    // Obtener los permisos
    const { data: permissionsData, error: permissionsError } =
      await supabaseClient
        .from('usuarios')
        .select('permisos')
        .eq('email', authUser.user.email)
        .single();

    if (permissionsError) throw permissionsError;

    // Obtener las cuentas
    const { data: accountsData, error: accountsError } =
      permissionsData.permisos.includes('0')
        ? await supabaseClient.from('cuentas').select()
        : await supabaseClient.rpc('get_accounts_by_permissions', {
            permission_ids: permissionsData.permisos
          });

    if (accountsError) throw accountsError;

    return {
      user: authUser,
      permisos: permissionsData.permisos,
      accounts: accountsData
    };
  } catch (error) {
    console.error('Error en getUserDataAndPermissionsClient:', error);
    throw error;
  }
}
