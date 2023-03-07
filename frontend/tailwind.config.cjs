/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      keyframes: {
        blurIn: {
          "0%, 100%": { backdropFilter: "blur(1px)" },
          "100%": { backdropFilter: "blur(5px)" },
        },
        fadeIn: {
          "0%, 100%": {
            transform: "translateY(50px)",
            opacity: 0,
          },
          "100%": {
            transform: "translateY(0px)",
            opacity: 1,
          },
        },
        downSlide: {
          "0%, 100%": {
            transform: "translateY(-20px)",
            opacity: 0,
          },
          "100%": {
            transform: "translateY(0px)",
            opacity: 1,
          },
        },
        upSlide: {
          "0%, 100%": {
            transform: "translateY(20px)",
            opacity: 0,
          },
          "100%": {
            transform: "translateY(0px)",
            opacity: 1,
          },
        },
        leftSlide: {
          "0%, 100%": {
            transform: "translateX(20px)",
            opacity: 0,
          },
          "100%": {
            transform: "translateX(0px)",
            opacity: 1,
          },
        },
        rightSlide: {
          "0%": {
            transform: "translateX(0px)",
            opacity: 1,
          },
          "100%": {
            transform: "translateX(20px)",
            opacity: 0,
          },
        },
        hide: {
          "0%, 100%": {
            opacity: 1,
          },
          "100%": {
            opacity: 0,
          },
        },
      },
      animation: {
        blurIn: "blurIn 0.45s ease-in-out forwards",
        fadeIn: "fadeIn 0.4s  ease forwards",
        downSlide: "downSlide 0.25s  ease forwards",
        leftSlide: "leftSlide 0.25s  ease forwards",
        rightSlide: "rightSlide 0.25s  ease forwards",
        upSlide: "upSlide 0.25s ease forwards",
        hide: "hide 0.25s  ease forwards",
      },
    },
  },
  plugins: [],
};
