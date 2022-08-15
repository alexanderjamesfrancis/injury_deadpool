/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./*.{html,css,js}',
            './views/*.ejs'],
  theme: {
    extend: {
      
    },
  },
  plugins: [
    {tailwindcss: {},
    autoprefixer: {},
}],
}
