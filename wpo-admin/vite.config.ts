import { defineConfig } from "vitest/config";
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from "path";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    watch: {
      usePolling: true,
    },
    strictPort: true,
    port: 3001,
  },
  test: {
    passWithNoTests: true,
    globals: true,
    environment: "jsdom",
    setupFiles: "./src/setup.ts",
    coverage: {
      provider: "v8", // or 'istanbul' (optional)
      reporter: ["text", "json", "html"], // text for terminal, html for detailed UI
      exclude: [
        "src/routes/**",
        "src/services/**",
        "node_modules",
        "**/node_modules/**",
        "**/dist/**",
        "**/bun-types.test.ts",
      ],
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})



