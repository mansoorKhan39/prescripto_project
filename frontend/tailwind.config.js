/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: { primary: "#5f6FFF" },
      fontFamily: { outfit: ['Outfit', 'sans-serif'] },
      gridTemplateColumns: { auto: 'repeat(auto-fill, minmax(200px, 1fr))' },
      keyframes: {
        fadeInUp: { from:{opacity:'0',transform:'translateY(30px)'}, to:{opacity:'1',transform:'translateY(0)'} },
        float: { '0%,100%':{transform:'translateY(0)'}, '50%':{transform:'translateY(-12px)'} },
        slideDown: { from:{opacity:'0',transform:'translateY(-8px)'}, to:{opacity:'1',transform:'translateY(0)'} },
      },
      animation: {
        fadeInUp: 'fadeInUp 0.7s ease forwards',
        float: 'float 4s ease-in-out infinite',
        slideDown: 'slideDown 0.25s ease forwards',
      }
    },
  },
  plugins: [],
}
