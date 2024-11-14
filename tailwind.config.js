/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#1DA1F2',       // Bright Blue
        secondary: '#F5F8FA',     // Light Gray
        accent: '#FF5A5F',        // Vibrant Red
        text: '#14171A',          // Dark Gray
        background: '#FFFFFF',    // White
      },
    },
  },
  plugins: [],
}