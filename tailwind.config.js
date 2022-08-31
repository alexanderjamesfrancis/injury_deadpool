/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./*.{html,css,js}',
            './views/*.ejs'],
  theme: {
    extend: {
      colors: {
        darkishYellow: '#e8b30c'
      }
      
    },
  },
  plugins: [
    {tailwindcss: {},
    autoprefixer: {},
}],
}
