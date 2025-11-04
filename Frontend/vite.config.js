import path from "path"
import tailwindcss from "@tailwindcss/vite"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})

// module.exports = {
//   theme: {
//     extend: {
//       animation: {
//         'blob': 'blob 7s infinite',
//         'blob-delay-2000': 'blob 7s infinite 2s',
//         'blob-delay-4000': 'blob 7s infinite 4s',
//         'float': 'float 6s ease-in-out infinite',
//       },
//       keyframes: {
//         blob: {
//           '0%': { transform: 'translate(0px, 0px) scale(1)' },
//           '33%': { transform: 'translate(30px, -50px) scale(1.1)' },
//           '66%': { transform: 'translate(-20px, 20px) scale(0.9)' },
//           '100%': { transform: 'translate(0px, 0px) scale(1)' },
//         },
//         float: {
//           '0%, 100%': { transform: 'translateY(0px)' },
//           '50%': { transform: 'translateY(-20px)' },
//         },
//       },
//     },
//   },
// };
