import React from 'react';

const PremiumButton = ({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  className = '', 
  icon: Icon,
  ...props 
}) => {
  const baseStyles = "inline-flex items-center justify-center font-bold transition-all duration-300 rounded-2xl active:scale-95";
  
  const variants = {
    primary: "bg-primary text-white hover:bg-primary-dark shadow-lg shadow-primary/20",
    secondary: "bg-white border border-text/10 text-text hover:bg-background shadow-sm",
    ghost: "bg-transparent text-text/70 hover:text-text hover:bg-background",
    accent: "bg-accent-violet text-white shadow-lg shadow-accent-violet/20 hover:bg-accent-violet/90"
  };

  const sizes = {
    sm: "px-4 py-2 text-xs gap-2",
    md: "px-6 py-3.5 text-sm gap-3",
    lg: "px-8 py-4 text-base gap-4"
  };

  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {Icon && <Icon size={size === 'lg' ? 20 : 18} />}
      {children}
    </button>
  );
};

export default PremiumButton;
