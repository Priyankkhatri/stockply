import React from 'react';
import './PremiumButton.css';

const PremiumButton = ({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  className = '', 
  icon: Icon,
  ...props 
}) => {
  return (
    <button 
      className={`premium-btn btn-${variant} btn-${size} ${className}`}
      {...props}
    >
      {Icon && <Icon size={size === 'lg' ? 20 : 18} />}
      {children}
    </button>
  );
};

export default PremiumButton;
