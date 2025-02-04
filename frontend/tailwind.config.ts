import { type Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";

export default {
  darkMode: ["class"],
  content: ["./src/**/*.tsx"],
  theme: {
  	extend: {
  		fontFamily: {
  			sans: [
  				'Gilroy',
                    ...fontFamily.sans
                ]
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		},
  		colors: {
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
  			primary: {
  				DEFAULT: 'var(--primary)',
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
  				'1': 'hsl(var(--chart-1))',
  				'2': 'hsl(var(--chart-2))',
  				'3': 'hsl(var(--chart-3))',
  				'4': 'hsl(var(--chart-4))',
  				'5': 'hsl(var(--chart-5))'
  			},
  			black: 'var(--black)',
  			white: 'var(--white)',
  			neutral05: 'var(--neutral05)',
  			neutral10: 'var(--neutral10)',
  			neutral20: 'var(--neutral20)',
  			neutral30: 'var(--neutral30)',
  			neutral40: 'var(--neutral40)',
  			neutral50: 'var(--neutral50)',
  			neutral60: 'var(--neutral60)',
  			neutral70: 'var(--neutral70)',
  			neutral80: 'var(--neutral80)',
  			neutral90: 'var(--neutral90)',
  			neutral100: 'var(--neutral100)',
  			neutral110: 'var(--neutral110)',
  			neutral120: 'var(--neutral120)',
  			teal05: 'var(--teal05)',
  			teal10: 'var(--teal10)',
  			teal20: 'var(--teal20)',
  			teal30: 'var(--teal30)',
  			teal40: 'var(--teal40)',
  			teal50: 'var(--teal50)',
  			teal60: 'var(--teal60)',
  			teal70: 'var(--teal70)',
  			teal80: 'var(--teal80)',
  			teal90: 'var(--teal90)',
  			teal100: 'var(--teal100)',
  			pink05: 'var(--pink05)',
  			pink10: 'var(--pink10)',
  			pink20: 'var(--pink20)',
  			pink30: 'var(--pink30)',
  			pink40: 'var(--pink40)',
  			pink50: 'var(--pink50)',
  			pink60: 'var(--pink60)',
  			pink70: 'var(--pink70)',
  			pink80: 'var(--pink80)',
  			pink90: 'var(--pink90)',
  			pink100: 'var(--pink100)',
  			yellow05: 'var(--yellow05)',
  			yellow10: 'var(--yellow10)',
  			yellow20: 'var(--yellow20)',
  			yellow30: 'var(--yellow30)',
  			yellow40: 'var(--yellow40)',
  			yellow50: 'var(--yellow50)',
  			yellow60: 'var(--yellow60)',
  			yellow70: 'var(--yellow70)',
  			yellow80: 'var(--yellow80)',
  			yellow90: 'var(--yellow90)',
  			yellow100: 'var(--yellow100)',
  			green05: 'var(--green05)',
  			green10: 'var(--green10)',
  			green20: 'var(--green20)',
  			green30: 'var(--green30)',
  			green40: 'var(--green40)',
  			green50: 'var(--green50)',
  			green60: 'var(--green60)',
  			green70: 'var(--green70)',
  			green80: 'var(--green80)',
  			green90: 'var(--green90)',
  			green100: 'var(--green100)',
  			blue05: 'var(--blue05)',
  			blue10: 'var(--blue10)',
  			blue20: 'var(--blue20)',
  			blue30: 'var(--blue30)',
  			blue40: 'var(--blue40)',
  			blue50: 'var(--blue50)',
  			blue60: 'var(--blue60)',
  			blue70: 'var(--blue70)',
  			blue80: 'var(--blue80)',
  			blue90: 'var(--blue90)',
  			blue100: 'var(--blue100)',
  			red05: 'var(--red05)',
  			red10: 'var(--red10)',
  			red20: 'var(--red20)',
  			red30: 'var(--red30)',
  			red40: 'var(--red40)',
  			red50: 'var(--red50)',
  			red60: 'var(--red60)',
  			red70: 'var(--red70)',
  			red80: 'var(--red80)',
  			red90: 'var(--red90)',
  			red100: 'var(--red100)',
  			orange05: 'var(--orange05)',
  			orange10: 'var(--orange10)',
  			orange20: 'var(--orange20)',
  			orange30: 'var(--orange30)',
  			orange40: 'var(--orange40)',
  			orange50: 'var(--orange50)',
  			orange60: 'var(--orange60)',
  			orange70: 'var(--orange70)',
  			orange80: 'var(--orange80)',
  			orange90: 'var(--orange90)',
  			orange100: 'var(--orange100)',
  			sidebar: {
  				DEFAULT: 'hsl(var(--sidebar-background))',
  				foreground: 'hsl(var(--sidebar-foreground))',
  				primary: 'hsl(var(--sidebar-primary))',
  				'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
  				accent: 'hsl(var(--sidebar-accent))',
  				'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
  				border: 'hsl(var(--sidebar-border))',
  				ring: 'hsl(var(--sidebar-ring))'
  			}
  		}
  	}
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
