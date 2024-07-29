/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",

    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontSize: {
        custom: "20px",
      },
      maxWidth: {
        full: "100%",
      },
      height: {
        default: "300px",
      },
      borderRadius: {
        lg: "10px",
      },
      colors: {
        gray: {
          border: "#cccccc",
        },
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
