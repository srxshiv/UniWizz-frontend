/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      dropShadow: {
        glow: "0px 0px 15px rgba(130, 130, 130, 0.9)", // Adjust glow color
      },
      animation: {
        slide: "slide 15s linear infinite",
        "continuous-slide": "continuousSlide 80s linear infinite",
        'float-in': 'floatIn 1.5s ease-out forwards',
        'float-box': 'floatAnimation 4s infinite ease-in-out alternate',
        'float-text': 'floatText 1.5s ease-out forwards',
      },
      keyframes: {
        continuousSlide: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-100%)" },
        },
        slide: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-100%)" },  
        },
        floatIn: {
          '0%': { opacity: '0', transform: 'translateY(-30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        floatAnimation: {
          '0%': { transform: 'translateY(0px) translateX(0px)' },
          '50%': { transform: 'translateY(-10px) translateX(5px)' },
          '100%': { transform: 'translateY(0px) translateX(0px)' },
        },
        floatText: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0px)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}
