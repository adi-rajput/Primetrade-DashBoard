'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import { motion } from 'framer-motion';

export default function RegisterPage() {
  const { register, isLoading } = useAuth();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [error, setError] = useState('');

  const { name, email, password, confirmPassword } = formData;

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      await register({ name, email, password });
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
        <h2 className="text-3xl font-bold mb-6 text-center text-white">Create Account</h2>
        
        <form onSubmit={onSubmit} className="space-y-4">
          <Input
            label="Full Name"
            type="text"
            id="name"
            name="name"
            value={name}
            onChange={onChange}
            placeholder="John Doe"
            required
          />

          <Input
            label="Email Address"
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={onChange}
            placeholder="john@example.com"
            required
          />
          
          <Input
            label="Password"
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={onChange}
            placeholder="********"
            required
          />

          <Input
            label="Confirm Password"
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            value={confirmPassword}
            onChange={onChange}
            placeholder="********"
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
            className="w-full !py-3 !text-lg shadow-indigo-500/20 mt-2"
          >
            Sign Up
          </Button>
        </form>

        <p className="mt-6 text-center text-slate-400">
          Already have an account?{' '}
          <Link href="/login" className="text-indigo-400 hover:text-indigo-300 font-medium transition-colors">
            Log In
          </Link>
        </p>
      </motion.div>
    </div>
  );
}
