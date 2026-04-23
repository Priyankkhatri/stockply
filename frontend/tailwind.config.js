/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#FFF8F0',
        primary: {
          50: '#FDF7F2',
          100: '#FBEFE5',
          200: '#F7DFCD',
          300: '#EFC4A3',
          400: '#E4A272',
          500: '#C08552',
          600: '#A1693F',
          700: '#8C5A3C',
          800: '#6D442F',
          900: '#563628',
          DEFAULT: '#C08552',
          dark: '#8C5A3C',
        },
        secondary: '#8C5A3C',
        text: {
          DEFAULT: '#4B2E2B',
          muted: '#8B7270',
          light: '#BAADAC',
        },
        accent: {
          cyan: '#06B6D4',
          violet: '#8B5CF6',
          emerald: '#10B981',
          rose: '#F43F5E',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Outfit', 'Inter', 'sans-serif'],
      },
      boxShadow: {
        'premium': '0 10px 40px -10px rgba(75, 46, 43, 0.08)',
        'glass': '0 8px 32px 0 rgba(75, 46, 43, 0.05)',
        'inner-soft': 'inset 0 2px 4px 0 rgba(75, 46, 43, 0.02)',
      },
      borderRadius: {
        '4xl': '32px',
        '5xl': '40px',
      },
      animation: {
        'spin-slow': 'spin 3s linear infinite',
        'fade-in': 'fadeIn 0.5s ease-out forwards',
        'slide-up': 'slideUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        }
      }
    },
  },
  plugins: [],
}
