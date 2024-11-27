/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", // Includes all JavaScript and TypeScript files
    "./node_modules/react-bootstrap/**/*.js", // Optional: Scans React Bootstrap components for Tailwind classes
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}

