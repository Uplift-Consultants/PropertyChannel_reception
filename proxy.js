import { NextResponse } from 'next/server';

export async function proxy(request) {
  const token = request.cookies.get('auth-agent');

  if (!token) {
    return NextResponse.redirect(new URL('https://signin.propertychannel.africa', request.url));
  }

  return NextResponse.next();
}

export const config = {
  // This matches every single route except static files and images
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};
   