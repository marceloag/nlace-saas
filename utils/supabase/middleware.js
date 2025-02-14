import { createServerClient } from '@supabase/ssr';
import { NextResponse } from 'next/server';

export async function updateSession(request) {
  // Crear respuesta inicial de Supabase
  let supabaseResponse = NextResponse.next({
    request
  });

  // Inicializar cliente de Supabase
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    {
      cookies: {
        get(name) {
          return request.cookies.get(name)?.value;
        },
        set(name, value, options) {
          request.cookies.set({ name, value, ...options });
          supabaseResponse.cookies.set({ name, value, ...options });
        },
        remove(name, options) {
          request.cookies.set({ name, value: '', ...options });
          supabaseResponse.cookies.set({ name, value: '', ...options });
        }
      }
    }
  );

  // Obtener usuario actual
  const {
    data: { user }
  } = await supabase.auth.getUser();

  // Si no hay usuario y no está en páginas públicas, redirigir al login
  if (
    !user &&
    !request.nextUrl.pathname.startsWith('/login') &&
    !request.nextUrl.pathname.startsWith('/auth')
  ) {
    const url = request.nextUrl.clone();
    url.pathname = '/login';
    url.searchParams.set('error', 'Debes iniciar sesión');

    // Crear respuesta de redirección manteniendo las cookies de Supabase
    const redirectResponse = NextResponse.redirect(url);
    supabaseResponse.cookies.getAll().forEach((cookie) => {
      redirectResponse.cookies.set(cookie.name, cookie.value, cookie.options);
    });

    return redirectResponse;
  }

  // Si hay usuario, verificar sus permisos
  if (user) {
    const { data: userData, error } = await supabase
      .from('usuarios')
      .select('permisos')
      .eq('email', user.email)
      .single();

    // Si hay error o no hay permisos, redirigir al login
    if (error || !userData?.permisos?.length) {
      // Cerrar sesión
      await supabase.auth.signOut();

      const url = request.nextUrl.clone();
      url.pathname = '/login';
      url.searchParams.set('error', '❌ No tienes permisos para acceder');

      // Crear respuesta de redirección manteniendo las cookies de Supabase
      const redirectResponse = NextResponse.redirect(url);
      supabaseResponse.cookies.getAll().forEach((cookie) => {
        redirectResponse.cookies.set(cookie.name, cookie.value, cookie.options);
      });

      return redirectResponse;
    }
  }

  return supabaseResponse;
}
