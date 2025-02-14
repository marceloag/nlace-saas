import { createServerClient } from '@supabase/ssr';
import { NextResponse } from 'next/server';

export async function updateSession(request) {
  let supabaseResponse = NextResponse.next({
    request
  });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) =>
            request.cookies.set(name, value)
          );
          supabaseResponse = NextResponse.next({
            request
          });
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          );
        },
        remove(name, options) {
          request.cookies.set({
            name,
            value: '',
            ...options
          });
          response = NextResponse.next({
            request: {
              headers: request.headers
            }
          });
          response.cookies.set({
            name,
            value: '',
            ...options
          });
        }
      }
    }
  );

  // Do not run code between createServerClient and
  // supabase.auth.getUser(). A simple mistake could make it very hard to debug
  // issues with users being randomly logged out.

  // IMPORTANT: DO NOT REMOVE auth.getUser()

  const {
    data: { user }
  } = await supabase.auth.getUser();

  if (
    !user &&
    !request.nextUrl.pathname.startsWith('/login') &&
    !request.nextUrl.pathname.startsWith('/auth')
  ) {
    // no user, potentially respond by redirecting the user to the login page
    const url = request.nextUrl.clone();
    console.log('Redirecting to /login from middleware');
    url.pathname = '/login';
    return NextResponse.redirect(url);
  }

  if (user) {
    const { data: userData, error } = await supabase
      .from('usuarios') // Asegúrate de que este es el nombre correcto de tu tabla
      .select('permisos')
      .eq('id', user.id)
      .single();

    // Si hay error o no hay permisos, redirigir al login
    if (error || !userData?.permisos?.length) {
      // Cerrar sesión
      await supabase.auth.signOut();

      const url = request.nextUrl.clone();
      url.pathname = '/login';
      url.searchParams.set('error', 'No tienes permisos para acceder');

      // Crear nueva respuesta de redirección
      const redirectResponse = NextResponse.redirect(url);

      // Copiar todas las cookies de la respuesta original
      response.cookies.getAll().forEach((cookie) => {
        redirectResponse.cookies.set(cookie.name, cookie.value, cookie.options);
      });

      return redirectResponse;
    }
  }

  return supabaseResponse;
}
