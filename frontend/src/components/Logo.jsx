import React from 'react';

const Logo = ({ size = 24, className = "", color = "currentColor" }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 100 100" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    {/* Concept 4: Infinity Box - Merging the infinity loop with a geometric box */}
    
    {/* The Outer Box Structure */}
    <path 
      d="M50 12L88 32V68L50 88L12 68V32L50 12Z" 
      stroke={color} 
      strokeWidth="8" 
      strokeLinejoin="round"
    />
    
    {/* The Infinity Flow Path inside */}
    <path 
      d="M30 42C30 35 40 30 50 30C60 30 70 35 70 42C70 55 30 45 30 58C30 65 40 70 50 70C60 70 70 65 70 58" 
      stroke={color} 
      strokeWidth="6" 
      strokeLinecap="round"
      opacity="0.8"
    />
    
    {/* Subtle Box depth lines */}
    <path 
      d="M50 12V30 M12 32L30 42 M88 32L70 42" 
      stroke={color} 
      strokeWidth="4" 
      strokeLinecap="round"
      opacity="0.4"
    />
  </svg>
);

export default Logo;
