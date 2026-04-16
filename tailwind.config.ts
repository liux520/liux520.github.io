import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      // ============================================
      // ACADEMIC EDITORIAL PALETTE
      // Neutral surfaces with a restrained cobalt
      // primary and amber reserved for awards
      // ============================================
      colors: {
        primary: {
          50: '#eff6ff',
          100: '#dbeafe',
          200: '#bfdbfe',
          300: '#93c5fd',
          400: '#60a5fa',
          500: '#3b82f6', // Main primary
          600: '#2563eb',
          700: '#1d4ed8',
          800: '#1e40af',
          900: '#1e3a8a',
          950: '#172554',
        },
        accent: {
          50: '#f0fdfa',
          100: '#ccfbf1',
          200: '#99f6e4',
          300: '#5eead4',
          400: '#2dd4bf',
          500: '#14b8a6', // Secondary accent
          600: '#0d9488',
          700: '#0f766e',
          800: '#115e59',
          900: '#134e4a',
          950: '#042f2e',
        },
        // Semantic colors for academic context
        award: {
          50: '#fffbeb',
          100: '#fef3c7',
          200: '#fde68a',
          300: '#fcd34d',
          400: '#fbbf24',
          500: '#f59e0b', // Amber for awards
          600: '#d97706',
          700: '#b45309',
        },
        success: {
          50: '#f0fdf4',
          100: '#dcfce7',
          200: '#bbf7d0',
          300: '#86efac',
          400: '#4ade80',
          500: '#22c55e',
          600: '#16a34a',
          700: '#15803d',
        },
      },

      // ============================================
      // TYPOGRAPHY SYSTEM
      // Local fonts defined in globals.css:
      // - sans: Inter (body text)
      // - display: Crimson Pro (headings)
      // - mono: Space Mono (technical/code)
      // ============================================
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Crimson Pro', 'serif'],
        mono: ['Space Mono', 'monospace'],
      },

      // Type scale (Major Third: 1.250)
      fontSize: {
        'xs': ['0.75rem', { lineHeight: '1rem', letterSpacing: '0.01em' }],
        'sm': ['0.875rem', { lineHeight: '1.25rem', letterSpacing: '0.005em' }],
        'base': ['1rem', { lineHeight: '1.625rem', letterSpacing: '0' }],
        'lg': ['1.125rem', { lineHeight: '1.75rem', letterSpacing: '-0.005em' }],
        'xl': ['1.25rem', { lineHeight: '1.875rem', letterSpacing: '-0.01em' }],
        '2xl': ['1.5rem', { lineHeight: '2rem', letterSpacing: '-0.015em' }],
        '3xl': ['1.875rem', { lineHeight: '2.25rem', letterSpacing: '-0.02em' }],
        '4xl': ['2.25rem', { lineHeight: '2.75rem', letterSpacing: '-0.025em' }],
        '5xl': ['3rem', { lineHeight: '3.5rem', letterSpacing: '-0.03em' }],
        '6xl': ['3.75rem', { lineHeight: '4.25rem', letterSpacing: '-0.035em' }],
        'display-xs': ['2.5rem', { lineHeight: '1.2', letterSpacing: '-0.02em' }],
        'display-sm': ['3rem', { lineHeight: '1.15', letterSpacing: '-0.025em' }],
        'display-md': ['3.75rem', { lineHeight: '1.1', letterSpacing: '-0.03em' }],
        'display-lg': ['4.5rem', { lineHeight: '1.05', letterSpacing: '-0.035em' }],
      },

      // Font weights for semantic hierarchy
      fontWeight: {
        'body': '400',      // Regular body text
        'medium': '500',    // Emphasized body
        'semibold': '600',  // Subheadings
        'heading': '700',   // Main headings
      },

      // ============================================
      // SPACING SYSTEM (8px base unit)
      // ============================================
      spacing: {
        '18': '4.5rem',   // 72px
        '22': '5.5rem',   // 88px
        '26': '6.5rem',   // 104px
        '30': '7.5rem',   // 120px
      },

      // ============================================
      // BORDER RADIUS SYSTEM
      // Unified rounding for consistency
      // ============================================
      borderRadius: {
        'sm': '0.375rem',   // 6px  - Small elements (tags, badges)
        'md': '0.5rem',     // 8px  - Cards, buttons
        'lg': '0.75rem',    // 12px - Large cards
        'xl': '1rem',       // 16px - Hero elements
        '2xl': '1.25rem',   // 20px - Featured cards
        '3xl': '1.5rem',    // 24px - Special containers
      },

      // ============================================
      // ANIMATION SYSTEM
      // Refined easing and durations for premium feel
      // ============================================
      transitionTimingFunction: {
        'premium': 'cubic-bezier(0.16, 1, 0.3, 1)',      // Smooth, sophisticated
        'bounce-smooth': 'cubic-bezier(0.34, 1.56, 0.64, 1)', // Subtle bounce
      },

      transitionDuration: {
        '400': '400ms',
        '600': '600ms',
        '800': '800ms',
      },

      animation: {
        'fade-in': 'fadeIn 0.8s ease-out',
        'slide-up': 'slideUp 0.8s cubic-bezier(0.16, 1, 0.3, 1)',
        'slide-in-left': 'slideInLeft 0.8s cubic-bezier(0.16, 1, 0.3, 1)',
        'slide-in-right': 'slideInRight 0.8s cubic-bezier(0.16, 1, 0.3, 1)',
        'float': 'float 6s ease-in-out infinite',
        'float-slow': 'float 8s ease-in-out infinite',
        'glow': 'glow 3s ease-in-out infinite alternate',
        'shimmer': 'shimmer 3s linear infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'spin-slow': 'spin 12s linear infinite',
      },

      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(32px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideInLeft: {
          '0%': { transform: 'translateX(-48px)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
        slideInRight: {
          '0%': { transform: 'translateX(48px)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        glow: {
          '0%': {
            boxShadow: '0 0 20px rgba(37, 99, 235, 0.15), 0 0 40px rgba(37, 99, 235, 0.08)',
          },
          '100%': {
            boxShadow: '0 0 30px rgba(37, 99, 235, 0.24), 0 0 60px rgba(37, 99, 235, 0.12)',
          },
        },
        shimmer: {
          '0%': { backgroundPosition: '-1200px 0' },
          '100%': { backgroundPosition: '1200px 0' },
        },
      },

      // ============================================
      // BOX SHADOW SYSTEM
      // Layered shadows for depth
      // ============================================
      boxShadow: {
        'card': '0 2px 8px -2px rgba(0, 0, 0, 0.08), 0 4px 16px -4px rgba(0, 0, 0, 0.04)',
        'card-lg': '0 4px 16px -4px rgba(0, 0, 0, 0.1), 0 8px 32px -8px rgba(0, 0, 0, 0.06)',
        'card-hover': '0 8px 24px -6px rgba(0, 0, 0, 0.12), 0 16px 48px -12px rgba(0, 0, 0, 0.08)',
        'glow-sm': '0 0 20px rgba(37, 99, 235, 0.12)',
        'glow-md': '0 0 30px rgba(37, 99, 235, 0.18)',
        'glow-lg': '0 0 40px rgba(37, 99, 235, 0.24)',
        'inner-soft': 'inset 0 2px 8px rgba(0, 0, 0, 0.04)',
      },

      // ============================================
      // GRADIENT SYSTEM
      // Predefined gradients for consistency
      // ============================================
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
}

export default config
