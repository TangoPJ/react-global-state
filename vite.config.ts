import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "path";
import dts from "vite-plugin-dts";

export default defineConfig({
  plugins: [dts()],
  build: {
    lib: {
      entry: resolve(__dirname, "./src/hooks/useStore.ts"),
      name: "react-global-signals",
      formats: ["es", "umd"],
      fileName: (format) => `react-global-signals.${format}.js`,
    },
    rollupOptions: {
      external: ["@preact/signals-react"],
      output: {
        name: "react-global-signals",
      },
    },
    sourcemap: true,
  },
});
