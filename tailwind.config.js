/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Vercel Design System Colors
        vercel: {
          black: '#171717',
          white: '#ffffff',
          blue: '#0070f3',
          'blue-light': '#ebf5ff',
          'blue-dark': '#0068d6',
          'link-blue': '#0072f5',
          'gray-900': '#171717',
          'gray-600': '#4d4d4d',
          'gray-500': '#666666',
          'gray-400': '#808080',
          'gray-100': '#ebebeb',
          'gray-50': '#fafafa',
        },
        // Workflow Accent Colors
        ship: '#ff5b4f',
        preview: '#de1d8d',
        develop: '#0a72ef',
        // Legacy compatibility
        primary: { 500: '#0070f3', 600: '#0060df' },
        accent: { 400: '#666666', 500: '#4d4d4d' },
        dark: {
          bg: '#0a0a0a',
          card: '#171717',
          border: '#262626',
          text: '#ededed',
          muted: '#888888',
        },
      },
      fontFamily: {
        sans: [
          'Geist',
          'Inter',
          'Arial',
          'Apple Color Emoji',
          'Segoe UI Emoji',
          'Segoe UI Symbol',
          'sans-serif',
        ],
        mono: [
          'Geist Mono',
          'ui-monospace',
          'SFMono-Regular',
          'Roboto Mono',
          'Menlo',
          'Monaco',
          'Liberation Mono',
          'DejaVu Sans Mono',
          'Courier New',
          'monospace',
        ],
      },
      borderRadius: {
        '4': '4px',
        '6': '6px',
        '8': '8px',
        '12': '12px',
      },
      boxShadow: {
        'vercel-border': '0px 0px 0px 1px rgba(0, 0, 0, 0.08)',
        'vercel-ring': 'rgb(235, 235, 235) 0px 0px 0px 1px',
        'vercel-card': 'rgba(0, 0, 0, 0.08) 0px 0px 0px 1px, rgba(0, 0, 0, 0.04) 0px 2px 2px, #fafafa 0px 0px 0px 1px',
        'vercel-card-hover': 'rgba(0, 0, 0, 0.08) 0px 0px 0px 1px, rgba(0, 0, 0, 0.06) 0px 4px 6px, #fafafa 0px 0px 0px 1px',
        'vercel-subtle': 'rgba(0, 0, 0, 0.04) 0px 2px 2px',
      },
      letterSpacing: {
        'vercel-tight': '-0.024em',
        'vercel-tighter': '-0.036em',
      },
      maxWidth: {
        'content': '1200px',
      },
    },
  },
  plugins: [],
}
