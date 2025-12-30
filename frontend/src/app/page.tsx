'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, BarChart2, Shield, Zap } from 'lucide-react';
import Button from '@/components/ui/Button';

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-80px)] py-12 text-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-4xl mx-auto space-y-8"
      >
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-sm font-medium mb-4">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
          </span>
          Next Generation Trading Intelligence
        </div>

        <h1 className="text-5xl md:text-7xl font-bold tracking-tight">
          Master the Markets with <br />
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 animate-gradient-x">
            PrimeTrade
          </span>
        </h1>

        <p className="text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed">
          Experience real-time analytics, secure portfolio management, and advanced trading tools in one powerful dashboard.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          <Link href="/register">
            <Button className="!px-8 !py-4 !text-lg shadow-indigo-500/25 group">
              Start Trading Now
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
          <Link href="/login">
            <Button variant="secondary" className="!px-8 !py-4 !text-lg">
              View Demo
            </Button>
          </Link>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-20 text-left">
          {[
            {
              icon: <BarChart2 className="w-6 h-6 text-indigo-400" />,
              title: "Real-time Analytics",
              desc: "Get instant insights with our advanced charting tools."
            },
            {
              icon: <Shield className="w-6 h-6 text-cyan-400" />,
              title: "Bank-Grade Security",
              desc: "Your data is protected with state-of-the-art encryption."
            },
            {
              icon: <Zap className="w-6 h-6 text-purple-400" />,
              title: "Lightning Fast",
              desc: "Execute trades with zero latency infrastructure."
            }
          ].map((feature, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + idx * 0.1 }}
              className="p-6 rounded-2xl bg-slate-800/20 border border-white/5 hover:bg-slate-800/40 transition-colors"
            >
              <div className="w-12 h-12 rounded-lg bg-slate-900 border border-white/10 flex items-center justify-center mb-4">
                {feature.icon}
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">{feature.title}</h3>
              <p className="text-slate-400">{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
