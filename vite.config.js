import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    // Enable global testing APIs like describe, test, and expect automatically
    globals: true,
    // Use jsdom to simulate a browser environment
    environment: 'jsdom',
    // Path to a setup file that runs before your tests start
    setupFiles: './src/setupTests.js',
  },
})
