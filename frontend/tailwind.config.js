/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}", "./node_modules/flowbite/**/*.js"],
  theme: {
    extend: {
      colors: {
        blue: "#024DDF",
        "gray-bg": "#d4d4d4",
        white1: "#EFF0F2",
        gray1: "#d0d0d0",
        stroke: "#5B5B5B",
        red1: "#FF1074",
      },
    },
  },
  plugins: ["flowbite/plugin"],
};
