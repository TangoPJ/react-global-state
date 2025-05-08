import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  build: {
    lib: {
      entry: "./src/hooks/useStore.ts",
      name: "react-global-signals",
      fileName: "react-global-signals[hash]",
    },
    rollupOptions: {
      external: ["react"],
      output: {
        name: "react-global-signals",
      },
    },
  },
});
