/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-inter)']
      },
      colors: {
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',

        electricBlue: '#5869f7',
        bubblegumPink: '#f76dee',
        graphiteBlack: '#0f1011',
        pureWhite: '#ffffff',
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))'
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))'
        },
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))'
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))'
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))'
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))'
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))'
        },
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        chart: {
          1: 'hsl(var(--chart-1))',
          2: 'hsl(var(--chart-2))',
          3: 'hsl(var(--chart-3))',
          4: 'hsl(var(--chart-4))',
          5: 'hsl(var(--chart-5))'
        },
        apple: {
          50: '#eefff2',
          100: '#d7ffe3',
          200: '#b2ffc9',
          300: '#76ffa0',
          400: '#33f570',
          500: '#09de4d',
          600: '#00a936',
          700: '#049132',
          800: '#0a712c',
          900: '#0a5d27',
          950: '#003412'
        },
        azulElectrico: {
          100: '#d7dbfe',
          200: '#afb7fd',
          300: '#8893fb',
          400: '#606ff9',
          500: '#5869f7', // base
          600: '#3f51d4',
          700: '#2f3da1',
          800: '#20296e',
          900: '#10143b'
        },
        rosadoChicle: {
          100: '#fde1f7',
          200: '#fac4ef',
          300: '#f7a7e7',
          400: '#f489df',
          500: '#f76dee', // base
          600: '#d055c6',
          700: '#a3449b',
          800: '#763370',
          900: '#492245'
        },
        negroGrafito: {
          100: '#d6d6d7',
          200: '#adadaf',
          300: '#848487',
          400: '#5b5b5f',
          500: '#0f1011', // base
          600: '#0d0e0f',
          700: '#0b0b0c',
          800: '#09090a',
          900: '#070707'
        },
        rojoCoral: {
          100: '#ffe0db',
          200: '#ffc1b7',
          300: '#ffa393',
          400: '#ff846e',
          500: '#fc624b', // base
          600: '#d54f3b',
          700: '#a03c2d',
          800: '#6b281e',
          900: '#361410'
        }
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)'
      },
      keyframes: {
        'accordion-down': {
          from: {
            height: '0'
          },
          to: {
            height: 'var(--radix-accordion-content-height)'
          }
        },
        'accordion-up': {
          from: {
            height: 'var(--radix-accordion-content-height)'
          },
          to: {
            height: '0'
          }
        },
        'fade-in': {
          '0%': {
            opacity: '0'
          },
          '100%': {
            opacity: '1'
          }
        },
        'fade-out': {
          '0%': {
            opacity: '1'
          },
          '100%': {
            opacity: '0'
          }
        },
        'slide-in-right': {
          '0%': {
            transform: 'translateX(100%)'
          },
          '100%': {
            transform: 'translateX(0)'
          }
        },
        'slide-out-left': {
          '0%': {
            transform: 'translateX(0)'
          },
          '100%': {
            transform: 'translateX(-100%)'
          }
        },
        'scale-in': {
          '0%': {
            transform: 'scale(0.95)',
            opacity: '0'
          },
          '100%': {
            transform: 'scale(1)',
            opacity: '1'
          }
        },
        marquee: {
          '0%': {
            transform: 'translateX(0)'
          },
          '100%': {
            transform: 'translateX(-100%)'
          }
        },
        marquee2: {
          '0%': {
            transform: 'translateX(100%)'
          },
          '100%': {
            transform: 'translateX(0%)'
          }
        }
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        'fade-in': 'fade-in 0.3s ease-out',
        'fade-out': 'fade-out 0.3s ease-out',
        'slide-in-right': 'slide-in-right 0.3s ease-out',
        'slide-out-left': 'slide-out-left 0.3s ease-out',
        'scale-in': 'scale-in 0.2s ease-out',
        marquee: 'marquee 25s linear infinite',
        marquee2: 'marquee 25s linear infinite'
      }
    }
  },
  plugins: [require('tailwindcss-animate'), require('@tailwindcss/typography')]
};
