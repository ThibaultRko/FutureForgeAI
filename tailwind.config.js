/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
  "./src/**/*.{js,ts,jsx,tsx}",
],
  theme: {
    extend: {
      colors: {
        background1: "#FBFDFF",
        background2: "#F4FAFF",
        interactiveComponent1: "#E6F4FE",
        interactiveComponent2: "##D5EFFF",
        interactiveComponent3: "#C2E5FF",
        borderAndSeparator1: "#ACD8FC",
        borderAndSeparator2: "#8EC8F6",
        borderAndSeparator3: "#5EB1EF",
        solidColor1: "#0090FF",
        solidColor2: "#0588F0",
        solidColor2: "#057ee1",
        textColor1: "#0D74CE",
        textColor2: "#113264",
        startCargus: "#F76B15",
        startCargusHover: "#EF5F00",

        footer1: "#202020",    
      },
      animation: {
        bounce: "bounce 0.2s",
      }
    },
  },
  plugins: [require("daisyui")],
}

