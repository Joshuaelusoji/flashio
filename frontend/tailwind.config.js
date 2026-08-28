/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],

  safelist: [
    "bg-rose-100",
    "text-rose-800",
    "bg-cyan-100",
    "text-cyan-800",
    "bg-amber-100",
    "text-amber-800",
    "bg-orange-100",
    "text-orange-800"
  ],

  theme: {
    extend: {
      fontFamily : {
        Manrope : ["Manrope", "sans serif" ]

      }
    },
  },

  plugins: [
    require("tailwind-scrollbar-hide")
  ],
}