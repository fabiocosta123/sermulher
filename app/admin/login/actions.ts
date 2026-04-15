'use server'

import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'


export async function login(username: string, password: string) {
  // Verificação da senha 
  if (username === 'admin' && password === 'adminsermulher') {
    const cookieStore = await cookies();
    
    
    cookieStore.set('sermulher_session', 'true', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 24, // 1 dia de validade
      path: '/',
    });

    
    redirect('/admin/editor');
  } else {
    return { error: "Usuário ou senha incorretos!" };
  }
}