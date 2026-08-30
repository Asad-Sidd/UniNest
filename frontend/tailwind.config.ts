import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        'coral': '#E7717D',
        'coral-soft': '#f29da5',
        'mist': '#C2CAD0',
        'stone': '#C2B9B0',
        'mocha': '#7E685A',
        'sage': '#AFD275',
        'sage-soft': '#c5e094',
        'warm-white': '#FAF9F7',
        'charcoal': '#3D352E',
        'cream': '#F5F0EB',
        
        // Dark mode semantic colors
        'dark-void': '#0F0E0D',
        'dark-surface': '#1A1918',
        'dark-elevated': '#242322',
        'dark-border': '#3D3B39',
        'dark-text': '#F0EEEB',
        'dark-muted': '#A8A5A0',
        border: "var(--border)",
        input: "var(--input)",
        ring: "var(--ring)",
        background: "var(--background)",
        foreground: "var(--foreground)",
        primary: {
          DEFAULT: "var(--primary)",
          foreground: "var(--primary-foreground)",
        },
        secondary: {
          DEFAULT: "var(--secondary)",
          foreground: "var(--secondary-foreground)",
        },
        destructive: {
          DEFAULT: "var(--destructive)",
          foreground: "var(--destructive-foreground)",
        },
        muted: {
          DEFAULT: "var(--muted)",
          foreground: "var(--muted-foreground)",
        },
        accent: {
          DEFAULT: "var(--accent)",
          foreground: "var(--accent-foreground)",
        },
        popover: {
          DEFAULT: "var(--popover)",
          foreground: "var(--popover-foreground)",
        },
        card: {
          DEFAULT: "var(--card)",
          foreground: "var(--card-foreground)",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px) translateX(0px)' },
          '33%': { transform: 'translateY(-20px) translateX(10px)' },
          '66%': { transform: 'translateY(15px) translateX(-15px)' },
        },
      },
      animation: {
        float: 'float 8s ease-in-out infinite',
        'float-slow': 'float 12s ease-in-out infinite',
        'float-fast': 'float 6s ease-in-out infinite',
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
export default config;
