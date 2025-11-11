import type { Config } from 'tailwindcss'

const config: Config = {
    darkMode: ['class'],
    content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/lib/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
  	extend: {
  		colors: {
  			primary: {
  				navy: '#1A2746',
  				'navy-dark': '#141B30',
  				'navy-light': '#2A3A5A',
  				teal: '#0A3D35',
  				mint: '#28D27A',
  				DEFAULT: 'hsl(var(--primary))',
  				foreground: 'hsl(var(--primary-foreground))'
  			},
  			trust: {
  				gold: '#F2B705',
  				'gold-dark': '#D4A004',
  				'gold-light': '#FFF4D6',
  				green: '#28D27A',
  				'green-dark': '#1FB864',
  				'green-light': '#E8FAF1'
  			},
  			success: {
  				green: '#28D27A',
  				'green-dark': '#1FB864',
  				'green-light': '#E8FAF1'
  			},
  			tech: {
  				blue: '#3B82F6',
  				'blue-dark': '#2563EB',
  				'blue-light': '#DBEAFE'
  			},
  			professional: {
  				'50': '#F8FAFC',
  				'100': '#F1F5F9',
  				'200': '#E2E8F0',
  				'600': '#475569',
  				'900': '#0F172A'
  			},
  			text: {
  				primary: '#032B23',
  				secondary: '#475569',
  				muted: '#64748B'
  			},
  			bg: {
  				primary: '#FFFFFF',
  				secondary: '#F8FAFC',
  				mint: '#F0FDF7'
  			},
  			warning: '#F59E0B',
  			danger: '#EF4444',
  			background: 'hsl(var(--background))',
  			foreground: 'hsl(var(--foreground))',
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))'
  			},
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))'
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
  				'1': 'hsl(var(--chart-1))',
  				'2': 'hsl(var(--chart-2))',
  				'3': 'hsl(var(--chart-3))',
  				'4': 'hsl(var(--chart-4))',
  				'5': 'hsl(var(--chart-5))'
  			}
  		},
  		fontSize: {
  			xs: [
  				'12px',
  				'20px'
  			],
  			sm: [
  				'14px',
  				'22px'
  			],
  			base: [
  				'16px',
  				'26px'
  			],
  			lg: [
  				'18px',
  				'28px'
  			],
  			xl: [
  				'20px',
  				'30px'
  			],
  			'2xl': [
  				'24px',
  				'32px'
  			],
  			'3xl': [
  				'30px',
  				'38px'
  			],
  			'4xl': [
  				'36px',
  				'44px'
  			],
  			'5xl': [
  				'48px',
  				'56px'
  			],
  			'6xl': [
  				'60px',
  				'72px'
  			],
  			'5xl-mobile': [
  				'36px',
  				'44px'
  			],
  			'4xl-mobile': [
  				'28px',
  				'36px'
  			],
  			'3xl-mobile': [
  				'24px',
  				'32px'
  			]
  		},
  		fontFamily: {
  			sans: [
  				'Inter',
  				'SF Pro Display',
  				'-apple-system',
  				'sans-serif'
  			],
  			display: [
  				'Inter',
  				'SF Pro Display',
  				'-apple-system',
  				'sans-serif'
  			],
  			body: [
  				'Inter',
  				'SF Pro Text',
  				'-apple-system',
  				'sans-serif'
  			],
  			mono: [
  				'JetBrains Mono',
  				'SF Mono',
  				'Monaco',
  				'monospace'
  			]
  		},
  		fontWeight: {
  			light: '300',
  			normal: '400',
  			medium: '500',
  			semibold: '600',
  			bold: '700',
  			extrabold: '800'
  		},
  		spacing: {
  			'1': '4px',
  			'2': '8px',
  			'3': '12px',
  			'4': '16px',
  			'5': '20px',
  			'6': '24px',
  			'7': '28px',
  			'8': '32px',
  			'9': '36px',
  			'10': '40px',
  			'11': '44px',
  			'12': '48px',
  			'14': '56px',
  			'16': '64px',
  			'20': '80px',
  			'24': '96px',
  			'28': '112px',
  			'32': '128px',
  			'36': '144px',
  			'40': '160px',
  			'44': '176px',
  			'48': '192px',
  			'52': '208px',
  			'56': '224px',
  			'60': '240px',
  			'64': '256px',
  			'72': '288px',
  			'80': '320px',
  			'96': '384px',
  			'0.5': '2px',
  			'1.5': '6px',
  			'2.5': '10px',
  			'3.5': '14px'
  		},
  		maxWidth: {
  			'container-sm': '640px',
  			'container-md': '768px',
  			'container-lg': '1024px',
  			'container-xl': '1280px',
  			'container-2xl': '1536px'
  		},
  		boxShadow: {
  			sm: '0 1px 2px 0 rgba(15, 23, 42, 0.05)',
  			DEFAULT: '0 1px 3px 0 rgba(15, 23, 42, 0.1), 0 1px 2px 0 rgba(15, 23, 42, 0.06)',
  			md: '0 4px 6px -1px rgba(15, 23, 42, 0.1), 0 2px 4px -1px rgba(15, 23, 42, 0.06)',
  			lg: '0 10px 15px -3px rgba(15, 23, 42, 0.1), 0 4px 6px -2px rgba(15, 23, 42, 0.05)',
  			xl: '0 20px 25px -5px rgba(15, 23, 42, 0.1), 0 10px 10px -5px rgba(15, 23, 42, 0.04)',
  			'2xl': '0 25px 50px -12px rgba(15, 23, 42, 0.25)',
  			inner: 'inset 0 2px 4px 0 rgba(15, 23, 42, 0.06)',
  			'trust-glow': '0 4px 12px rgba(242, 183, 5, 0.3)',
  			'trust-glow-hover': '0 6px 16px rgba(242, 183, 5, 0.4)',
  			'card-hover': '0 12px 32px rgba(15, 23, 42, 0.12)'
  		},
  		borderRadius: {
  			none: '0',
  			sm: 'calc(var(--radius) - 4px)',
  			DEFAULT: '4px',
  			md: 'calc(var(--radius) - 2px)',
  			lg: 'var(--radius)',
  			xl: '12px',
  			'2xl': '16px',
  			'3xl': '24px',
  			full: '9999px'
  		},
  		animation: {
  			'fade-in': 'fadeIn 0.5s ease-in-out',
  			'slide-up': 'slideUp 0.5s ease-out',
  			'slide-down': 'slideDown 0.5s ease-out',
  			'scale-in': 'scaleIn 0.3s ease-out',
  			'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
  			'bounce-gentle': 'bounceGentle 2s infinite'
  		},
  		keyframes: {
  			fadeIn: {
  				'0%': {
  					opacity: '0'
  				},
  				'100%': {
  					opacity: '1'
  				}
  			},
  			slideUp: {
  				'0%': {
  					transform: 'translateY(20px)',
  					opacity: '0'
  				},
  				'100%': {
  					transform: 'translateY(0)',
  					opacity: '1'
  				}
  			},
  			slideDown: {
  				'0%': {
  					transform: 'translateY(-20px)',
  					opacity: '0'
  				},
  				'100%': {
  					transform: 'translateY(0)',
  					opacity: '1'
  				}
  			},
  			scaleIn: {
  				'0%': {
  					transform: 'scale(0.95)',
  					opacity: '0'
  				},
  				'100%': {
  					transform: 'scale(1)',
  					opacity: '1'
  				}
  			},
  			bounceGentle: {
  				'0%, 100%': {
  					transform: 'translateY(0)'
  				},
  				'50%': {
  					transform: 'translateY(-10px)'
  				}
  			}
  		},
  		backdropBlur: {
  			xs: '2px',
  			sm: '4px',
  			DEFAULT: '8px',
  			md: '12px',
  			lg: '16px',
  			xl: '24px',
  			'2xl': '40px',
  			'3xl': '64px'
  		}
  	}
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
      require("tailwindcss-animate")
],
}

export default config