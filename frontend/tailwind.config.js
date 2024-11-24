/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: 'jit',
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        'gray-900': '#341e72',
        'brand-red': '#ff4136',
      },
      fontFamily: {
        poppins: ["'Poppins'", 'sans-serif'],
      },
      borderRadius: {
        '4xl': '2rem',
        '5xl': '4rem',
        '6xl': '8rem',
        '7xl': '10rem',
      },
      spacing: {
        112: '28rem',
        128: '32rem',
        144: '36rem',
        160: '40rem',
        176: '44rem',
        182: '48rem',
        200: '60rem',
        210: '95rem',
      },
      screens: {
        '2xl': '1540px',
      },
      fontSize: {
        xxs: ['0.49rem', '0.49rem'],
      },
    },
  },
}
