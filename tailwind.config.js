/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./*.{html,css,js}',
            './views/*.ejs'],
  theme: {
    extend: {
      colors: {
        darkishYellow: '#e8b30c'
      },
      backgroundImage: (theme) => ({
        'logo-portrait': "url('/images/logos/default.png')",
        'logo-landscape': "url('/images/logos/cover.png')",
        'logo-textonly': "url('/images/logos/profile.png')"
      })
      
    },
  },
  plugins: [
    {tailwindcss: {},
    autoprefixer: {},
}],
}
