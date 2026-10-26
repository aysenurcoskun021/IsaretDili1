/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        bridge: {
          950: "#050e20",
          900: "#071329",
          850: "#0b1933",
          800: "#102143",
          700: "#1c3564",
          500: "#477dff",
          400: "#7296ff",
          300: "#a6b8ff",
          200: "#cbd5ff"
        }
      },
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "sans-serif"]
      },
      boxShadow: {
        glow: "0 0 45px rgba(75, 112, 255, .2)"
      }
    }
  },
  plugins: []
};