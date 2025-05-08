import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import {resolve} from 'path'

export default defineConfig({
  plugins: [react()],
  build: {
    lib: {
      entry: resolve(__dirname, "./src/hooks/useStore.ts"),
      name: "react-global-signals",
      formats: ["es", "umd"],
      fileName: (format) => `react-global-signals.${format}.js`,
    },
    rollupOptions: {
      external: ["react"],
      output: {
        name: "react-global-signals",
      },
    },
  },
});
