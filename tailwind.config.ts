// tailwind.config.ts
import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        // se mapean a variables CSS definidas en globals.css
        bg: 'var(--bg)',
        panel: 'var(--panel)',
        accent: 'var(--accent)',
        muted: 'var(--muted)',
        whitevar: 'var(--white)', // "white" puede chocar con keyword
        darkvar: 'var(--dark)',
      },
      fontFamily: {
        inter: ['Inter', 'Segoe UI', 'Roboto', 'sans-serif'],
        quicksand: ['Quicksand', 'League Spartan', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'michi-1': '0 6px 18px rgba(0,0,0,0.25)',
        'michi-2': '0 8px 28px rgba(14,43,23,0.06)',
      },
    },
  },
  plugins: [],
}

export default config
