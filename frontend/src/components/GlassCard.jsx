import React from 'react';

const GlassCard = ({ children, className = '', hover = true }) => {
  return (
    <div className={`
      bg-white/80 backdrop-blur-sm border border-white/20 shadow-glass rounded-4xl p-6 
      ${hover ? 'hover:shadow-premium hover:-translate-y-1 transition-all duration-300' : ''} 
      ${className}
    `}>
      {children}
    </div>
  );
};

export default GlassCard;
