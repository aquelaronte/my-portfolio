import type { Config } from 'tailwindcss/types'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  theme: {
    extend: {
      colors: {
        primary: '#D1A3A4',
        secondary: '#A25D67',
        background: '#2E2B2B',
        font: '#E3E1E1',
        surface: '#3F3C3C',
        placeholder: '#E3E1E1BF'
      },
      fontSize: {
        caption: '12px',
        body: '16px',
        subtitle: '22px',
        title: '30px',
        largeTitle: '35px'
      },
      fontWeight: {
        light: '300',
        regular: '400',
        bold: '700'
      }
    }
  },
  plugins: []
}
export default config
