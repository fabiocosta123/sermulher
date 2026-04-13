'use server'

import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'


export async function login(username: string, password: string) {
  // Verificação da senha que você escolheu
  if (username === 'admin' && password === 'adminsermulher') {
    const cookieStore = await cookies();
    
    // Criamos o "crachá" de acesso (cookie)
    cookieStore.set('sermulher_session', 'true', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 24, // 1 dia de validade
      path: '/',
    });

    // Login feito? Manda para a lista de produtos
    redirect('/admin/products/list');
  } else {
    return { error: "Usuário ou senha incorretos!" };
  }
}