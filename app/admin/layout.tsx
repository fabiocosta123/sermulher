import { ReactNode } from "react";


export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-gray-50 font-sans antialiased text-slate-900">
      {children}
    </div>
  );
}



