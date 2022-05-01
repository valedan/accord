const forms = require("@tailwindcss/forms");
const colors = require("tailwindcss/colors");

module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    colors: {
      transparent: "transparent",
      current: "currentColor",
      black: colors.black,
      white: colors.white,

      gray: colors.gray,
      blue: colors.sky,
      red: colors.red,
      yellow: colors.amber,
      green: colors.emerald,
    },
    extend: {},
  },
  plugins: [forms],
};
