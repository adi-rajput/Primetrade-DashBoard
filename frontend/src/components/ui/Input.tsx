import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

const Input: React.FC<InputProps> = ({ label, error, className = '', ...props }) => {
  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium text-slate-300 mb-1.5 ml-1">
          {label}
        </label>
      )}
      <input
        className={`
          w-full px-4 py-3 rounded-xl bg-slate-900/50 border border-slate-700 
          text-slate-100 placeholder-slate-500
          focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/50
          transition-all duration-300
          ${error ? 'border-red-500 focus:ring-red-500/50' : ''}
          ${className}
        `}
        {...props}
      />
      {error && (
        <p className="mt-1 text-sm text-red-500 ml-1">{error}</p>
      )}
    </div>
  );
};

export default Input;
