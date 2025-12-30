'use client';

import { AuthProvider } from '../context/AuthContext';
import Navbar from '../components/Navbar';

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <div className="min-h-screen bg-[#0f172a] text-slate-100">
        <div className="fixed inset-0 z-[-1] bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-900/20 via-slate-900 to-slate-900 pointer-events-none" />
        <Navbar />
        <main className="pt-20 px-4 max-w-7xl mx-auto">
          {children}
        </main>
      </div>
    </AuthProvider>
  );
}
