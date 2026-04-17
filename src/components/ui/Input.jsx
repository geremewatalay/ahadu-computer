import React from 'react';

const Input = ({ 
  label, 
  type = 'text', 
  placeholder, 
  value, 
  onChange, 
  name, 
  error, 
  className = '',
  icon: Icon,
  ...props 
}) => {
  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      {label && (
        <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-2">
          {label}
        </label>
      )}
      <div className="relative group">
        {Icon && (
          <div className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary transition-colors">
            <Icon size={18} />
          </div>
        )}
        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className={`w-full bg-white border-2 rounded-[1.25rem] transition-all duration-300 outline-none text-sm font-bold
            ${Icon ? 'pl-14 pr-6' : 'px-6'} py-4
            ${error 
              ? 'border-red-500/20 focus:border-red-500 bg-red-50/10' 
              : 'border-border focus:border-primary focus:bg-white'
            }
            placeholder:text-slate-300 text-primary`}
          {...props}
        />
      </div>
      {error && (
        <span className="text-xs text-red-500 font-medium ml-1">
          {error}
        </span>
      )}
    </div>
  );
};

export default Input;
