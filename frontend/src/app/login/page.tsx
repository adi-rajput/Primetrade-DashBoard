'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import { motion } from 'framer-motion';

export default function LoginPage() {
  const { login, isLoading } = useAuth();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');

  const { email, password } = formData;

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    try {
      await login(formData);
    } catch (err: any) {
      setError(err);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-140px)]">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-md p-8 rounded-2xl glass-panel"
      >
        <h2 className="text-3xl font-bold mb-6 text-center text-white">Welcome Back</h2>
        
        <form onSubmit={onSubmit} className="space-y-6">
          <Input
            label="Email Address"
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={onChange}
            placeholder="Enter your email"
            required
          />
          
          <Input
            label="Password"
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={onChange}
            placeholder="Enter your password"
            required
          />

          {error && (
            <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm text-center">
              {error}
            </div>
          )}

          <Button 
            type="submit" 
            isLoading={isLoading} 
            className="w-full !py-3 !text-lg shadow-indigo-500/20"
          >
            Sign In
          </Button>
        </form>

        <p className="mt-6 text-center text-slate-400">
          Don't have an account?{' '}
          <Link href="/register" className="text-indigo-400 hover:text-indigo-300 font-medium transition-colors">
            Sign Up
          </Link>
        </p>
      </motion.div>
    </div>
  );
}
