// app/actions.js
'use server'

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export async function signOut() {
  const cookieStore = await cookies();
  
  // 1. Delete the cookie
  cookieStore.delete('auth-agent');

  // 2. Navigate to another page
  redirect('https://signin.propertychannel.africa');
}