'use client';

import { createContext, useState, useEffect, useContext, ReactNode } from 'react';
import api from '../utils/api';
import { useRouter } from 'next/navigation';

interface User {
  _id: string;
  name: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (userData: any) => void;
  register: (userData: any) => void;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
        setToken(storedToken);
        // Verify token and get user data
        api.get('/auth/me')
            .then((res) => {
                setUser(res.data);
            })
            .catch(() => {
                logout();
            })
            .finally(() => setIsLoading(false));
    } else {
        setIsLoading(false);
    }
  }, []);

  const login = async (userData: any) => {
    try {
      const res = await api.post('/auth/login', userData);
      localStorage.setItem('token', res.data.token);
      setToken(res.data.token);
      setUser(res.data);
      router.push('/dashboard');
    } catch (error: any) {
      console.error(error);
      throw error.response?.data?.message || 'Login failed';
    }
  };

  const register = async (userData: any) => {
     try {
      const res = await api.post('/auth/register', userData);
      localStorage.setItem('token', res.data.token);
      setToken(res.data.token);
      setUser(res.data);
      router.push('/dashboard');
    } catch (error: any) {
      console.error(error);
      throw error.response?.data?.message || 'Registration failed';
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setToken(null);
    setUser(null);
    router.push('/login');
  };

  return (
    <AuthContext.Provider value={{ user, token, login, register, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
