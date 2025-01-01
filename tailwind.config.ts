import type { Config } from 'tailwindcss';

export default {
  darkMode: 'class', // Enable dark mode with class strategy
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: 'var(--text-primary-100)',
          '200': 'var(--text-primary-200)',
          '300': 'var(--text-primary-300)',
        },
        secondary: 'var(--text-secondary)',
        accent: 'var(--text-accent)',
      },
      backgroundColor: {
        primary: 'var(--bg-primary)',
        screen: 'var(--bg-screen)',
      },
    },
  },
  plugins: [require('daisyui')],
  daisyui: {
    themes: false, // غیرفعال کردن تم‌های پیش‌فرض DaisyUI
  },
} satisfies Config;
