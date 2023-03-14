const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  content: [
    './src/**/*.{js,ts,jsx,tsx}',
    //'./src/pages/Marketing/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    
    extend: {
      fontFamily: {
        sans: ['Inter var', ...defaultTheme.fontFamily.sans],
        baloo2: ["\"Baloo 2\"", "sans-serif"]
      },
      colors: {
        primary: "#3556fa"
      },
    },
  },
  plugins: [
    require("@tailwindcss/aspect-ratio"),
    require("@tailwindcss/typography"),
    require("@tailwindcss/forms")
  ],
}