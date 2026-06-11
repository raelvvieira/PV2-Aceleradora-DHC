import React from 'react';

interface DhcLogoProps extends React.SVGProps<SVGSVGElement> {
  variant?: 'icon' | 'full';
  isLight?: boolean;
  className?: string;
}

export function DhcLogo({ variant = 'full', isLight = true, className = '', ...props }: DhcLogoProps) {
  const textColor = isLight ? '#2E1E5B' : '#FFFFFF';
  
  if (variant === 'icon') {
    return (
      <svg
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={`w-full h-full transition-all duration-300 ${className}`}
        {...props}
      >
        <defs>
          <linearGradient id="logo-grad-icon" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#8100FF" />
            <stop offset="50%" stopColor="#FF1E40" />
            <stop offset="100%" stopColor="#f09433" />
          </linearGradient>
        </defs>
        
        {/* Glow / outer circle */}
        <circle cx="50" cy="50" r="45" fill="url(#logo-grad-icon)" />
        
        {/* Sparkle 1 */}
        <path d="M50 22 C50 35, 50 35, 63 35 C50 35, 50 35, 50 48 C50 35, 50 35, 37 35 C50 35, 50 35, 50 22 Z" fill="#FFFFFF" />
        
        {/* Sparkle 2 (small secondary) */}
        <path d="M68 54 C68 60, 68 60, 74 60 C68 60, 68 60, 68 66 C68 60, 68 60, 62 60 C68 60, 68 60, 68 54 Z" fill="#FFEAA7" opacity="0.85" />
      </svg>
    );
  }

  // Full brand logo (Icon + Text)
  return (
    <svg
      viewBox="0 0 350 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`w-full h-full transition-all duration-300 ${className}`}
      {...props}
    >
      <defs>
        <linearGradient id="logo-grad-full" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#8100FF" />
          <stop offset="50%" stopColor="#FF1E40" />
          <stop offset="100%" stopColor="#FF8F00" />
        </linearGradient>
        <linearGradient id="text-grad-ia" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#8100FF" />
          <stop offset="100%" stopColor="#FF1E40" />
        </linearGradient>
      </defs>

      {/* 1. Icon portion (Left, scaled down slightly) */}
      <g transform="translate(10, 15)">
        <circle cx="35" cy="35" r="30" fill="url(#logo-grad-full)" />
        {/* Sparkle in white */}
        <path d="M35 15 C35 25, 35 25, 45 25 C35 25, 35 25, 35 35 C35 25, 35 25, 25 25 C35 25, 35 25, 35 15 Z" fill="#FFFFFF" />
        {/* Tiny secondary sparkle */}
        <path d="M48 38 C48 42, 48 42, 52 42 C48 42, 48 42, 48 46 C48 42, 48 42, 44 42 C48 42, 48 42, 48 38 Z" fill="#FFEAA7" />
      </g>

      {/* 2. Text portion (Right) */}
      <g>
        {/* Word "artes" in lowercase, modern geometric style */}
        <text
          x="90"
          y="58"
          fontFamily="system-ui, -apple-system, 'Inter', 'Space Grotesk', sans-serif"
          fontWeight="800"
          fontSize="36"
          letterSpacing="-0.03em"
          fill={isLight ? '#251E4E' : '#FFFFFF'}
        >
          artes
        </text>

        {/* Small "com" stylish connector container or badge */}
        <rect
          x="184"
          y="34"
          width="36"
          height="22"
          rx="6"
          fill="#ECEBF5"
        />
        <text
          x="202"
          y="49"
          fontFamily="system-ui, -apple-system, 'Inter', sans-serif"
          fontWeight="800"
          fontSize="11"
          letterSpacing="0.02em"
          fill="#5C479B"
          textAnchor="middle"
        >
          com
        </text>

        {/* Word "IA" styled beautifully in bold styled gradient */}
        <text
          x="226"
          y="58"
          fontFamily="system-ui, -apple-system, 'Inter', 'Space Grotesk', sans-serif"
          fontWeight="900"
          fontSize="38"
          letterSpacing="-0.02em"
          fill="url(#text-grad-ia)"
        >
          IA
        </text>

        {/* Tiny sparkle above IA representing AI generation */}
        <path 
          d="M272 20 C272 25, 272 25, 277 25 C272 25, 272 25, 272 30 C272 25, 272 25, 267 25 C272 25, 272 25, 272 20 Z" 
          fill="#8100FF" 
        />
      </g>
    </svg>
  );
}
