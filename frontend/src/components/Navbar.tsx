'use client';

import Link from 'next/link';
import { useAuth } from '../context/AuthContext';
import { LayoutDashboard, LogOut, User } from 'lucide-react';
import Button from './ui/Button';

const Navbar = () => {
  const { user, logout } = useAuth();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-white/10 bg-slate-900/80 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-violet-500 flex items-center justify-center text-white font-bold text-lg group-hover:scale-105 transition-transform">
              P
            </div>
            <span className="font-bold text-xl tracking-tight text-white group-hover:text-indigo-400 transition-colors">
              Prime<span className="text-indigo-400">Trade</span>
            </span>
          </Link>

          {/* Navigation Items */}
          <div className="flex items-center gap-4">
            {user ? (
              <>
                <div className="hidden md:flex items-center gap-4 px-4 py-1.5 rounded-full bg-slate-800/50 border border-white/5">
                  <span className="text-sm text-slate-300 flex items-center gap-2">
                    <User size={16} className="text-indigo-400" />
                    {user.name}
                  </span>
                  <div className="w-px h-4 bg-white/10" />
                  <Link 
                    href="/dashboard" 
                    className="text-sm font-medium text-slate-300 hover:text-white flex items-center gap-2 transition-colors"
                  >
                    <LayoutDashboard size={16} />
                    Dashboard
                  </Link>
                </div>
                <Button 
                  variant="secondary" 
                  onClick={logout}
                  className="!px-4 !py-2 !text-sm flex items-center gap-2"
                >
                  <LogOut size={16} />
                  Logout
                </Button>
              </>
            ) : (
              <div className="flex items-center gap-3">
                <Link href="/login">
                  <Button variant="outline" className="!px-5 !py-2 !text-sm">
                    Log In
                  </Button>
                </Link>
                <Link href="/register">
                  <Button className="!px-5 !py-2 !text-sm shadow-indigo-500/20">
                    Get Started
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
