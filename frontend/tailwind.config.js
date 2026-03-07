/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["system-ui", "ui-sans-serif", "Inter", "sans-serif"]
      },
      colors: {
        brand: {
          50: "#EBF5FF",
          100: "#D1E4FF",
          500: "#3B82F6",
          600: "#2563EB",
          700: "#1D4ED8",
          900: "#0B1120"
        }
      },
      backgroundImage: {
        "hero-gradient":
          "radial-gradient(circle at top left, rgba(56,189,248,0.35), transparent 55%), radial-gradient(circle at bottom right, rgba(129,140,248,0.35), transparent 55%)"
      }
    }
  },
  plugins: []
};

