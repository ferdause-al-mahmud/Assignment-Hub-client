/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],

  theme: {
    extend: {
      backgroundImage: {
        'login-bg': "url('https://i.ibb.co/ykQqcgm/re13.jpg')",
        'banner-bg': "url('https://i.ibb.co/jkWBxY7/2148524753-1.jpg')"
      }
    },
  },
  plugins: [
    require('daisyui'),
  ],
  daisyui: {
    themes: ["light", "dracula", "dim"],
  },
}

