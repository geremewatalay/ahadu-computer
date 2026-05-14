import React from 'react';
import { motion } from 'motion/react';

const Button = ({ 
  children, 
  onClick, 
  type = 'button', 
  variant = 'primary', 
  size = 'md',
  className = '', 
  disabled = false,
  loading = false,
  ...props 
}) => {
  const baseStyles = 'rounded-2xl font-black uppercase tracking-widest transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed transform active:scale-95';
  
  const sizes = {
    sm: 'px-6 py-2 text-[10px]',
    md: 'px-10 py-4 text-xs',
    lg: 'px-12 py-5 text-sm',
  };

  const variants = {
    primary: 'bg-primary text-white hover:bg-primary/90 shadow-ethio',
    accent: 'bg-accent text-primary hover:scale-105 shadow-lg',
    secondary: 'bg-secondary text-white hover:bg-secondary/90 shadow-lg',
    outline: 'border-2 border-primary/10 text-primary hover:border-primary bg-transparent',
    ghost: 'text-primary hover:bg-primary/5',
    danger: 'bg-red-600 text-white hover:bg-red-700 shadow-lg',
  };

  return (
    <motion.button
      whileTap={{ scale: 0.98 }}
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={`${baseStyles} ${sizes[size]} ${variants[variant]} ${className}`}
      {...props}
    >
      {loading ? (
        <div className="w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin" />
      ) : null}
      {children}
    </motion.button>
  );
};

export default Button;
