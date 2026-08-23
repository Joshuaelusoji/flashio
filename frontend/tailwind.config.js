/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],

  safelist: [
    "bg-red-300",
    "text-violet-500",
  ],

  theme: {
    extend: {},
  },

  plugins: [
    require("tailwind-scrollbar-hide")
  ],
}