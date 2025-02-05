const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  content: [
    '*',
  ],
  theme: {
    
    extend: {
      fontFamily: {
        sans: ['Inter', ...defaultTheme.fontFamily.sans],
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