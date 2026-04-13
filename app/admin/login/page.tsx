"use client";

import { useState } from "react";
import { login } from "./actions";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  
const handleLogin = async (e: React.FormEvent) => {
  e.preventDefault();
  
  
  const result = await login(username, password);

  if (result?.error) {
    alert(result.error); // Ou use o seu toast.error(result.error)
  }
};

  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <div className="w-full max-w-md space-y-8 rounded-2xl bg-white p-10 shadow-xl border border-pink-50">
        <div className="text-center">
          <h1 className="text-3xl font-bold tracking-tight text-pink-600">
            Ser Mulher
          </h1>
          <p className="mt-2 text-sm text-slate-500">
            Acesso Restrito ao Painel Administrativo
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleLogin}>
          <div className="space-y-4 rounded-md shadow-sm">
            <div>
              <label className="block text-sm font-medium text-slate-700">
                Usuário
              </label>
              <input
                type="text"
                required
                className="mt-1 block w-full rounded-lg border border-slate-300 px-3 py-2 shadow-sm focus:border-pink-500 focus:outline-none focus:ring-1 focus:ring-pink-500 sm:text-sm"
                placeholder="Seu usuário"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700">
                Senha
              </label>
              <input
                type="password"
                required
                className="mt-1 block w-full rounded-lg border border-slate-300 px-3 py-2 shadow-sm focus:border-pink-500 focus:outline-none focus:ring-1 focus:ring-pink-500 sm:text-sm"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="group relative flex w-full justify-center rounded-lg bg-pink-600 px-4 py-3 text-sm font-semibold text-white transition-all hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2 disabled:bg-pink-300"
            >
              Entrar no Painel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}