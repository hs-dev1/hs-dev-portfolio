import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-inter)', 'sans-serif'],
        display: ['var(--font-space-grotesk)', 'sans-serif'],
        mono: ['var(--font-jetbrains-mono)', 'monospace'],
      },
      colors: {
        primary: {
          black: '#0A0A0A',
          cyan: '#2E5CFF', // Remapped to Electric Blue
          white: '#FFFFFF',
          electricBlue: '#2E5CFF',
          vividPurple: '#9B4DFF',
        },
        gray: {
          900: '#18181B',
          800: '#27272A',
          700: '#3F3F46',
          600: '#52525B',
          500: '#71717A',
          400: '#A1A1AA',
        },
      },
      fontSize: {
        // Extreme typography scale
        'mega': 'clamp(4rem, 12vw, 14rem)',
        'h1': 'clamp(4rem, 12vw, 14rem)',
        'h2': 'clamp(2.5rem, 8vw, 6rem)',
        'h3': 'clamp(1.5rem, 4vw, 3rem)',
        'body': 'clamp(1rem, 2vw, 1.125rem)',
        'small': '0.875rem',
        'micro': '0.75rem',
      },
      fontWeight: {
        'black': '900',
        'extrabold': '800',
        'bold': '700',
        'semibold': '600',
        'medium': '500',
        'normal': '400',
        'light': '300',
      },
      letterSpacing: {
        'tightest': '-0.075em',
        'tighter': '-0.05em',
        'tight': '-0.025em',
        'normal': '0',
        'wide': '0.025em',
        'wider': '0.05em',
        'widest': '0.1em',
        'mega': '0.15em',
      },
      lineHeight: {
        'none': '1',
        'tight': '1.1',
        'snug': '1.2',
        'normal': '1.5',
        'relaxed': '1.75',
        'loose': '2',
      },
      spacing: {
        '128': '32rem',
        '160': '40rem',
      },
      animation: {
        'fadeIn': 'fadeIn 0.8s ease-out forwards',
        'slideUp': 'slideUp 0.8s ease-out forwards',
        'scaleIn': 'scaleIn 0.6s ease-out forwards',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(100px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        scaleIn: {
          '0%': { transform: 'scale(0.8)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'gradient-brand': 'linear-gradient(to right, #2E5CFF, #9B4DFF)',
      },
    },
  },
  plugins: [],
};

export default config;
