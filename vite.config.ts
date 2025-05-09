import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "path";
import dts from "vite-plugin-dts";

export default defineConfig({
  plugins: [react(), dts({ insertTypesEntry: true, outDir: "dist" })],
  build: {
    lib: {
      entry: resolve(__dirname, "src/index.ts"),
      name: "ReactGlobalSignals",
      formats: ["es", "umd"],
      fileName: (format) =>
        `react-global-signals.${format === "es" ? "es.mjs" : "umd.js"}`,
    },
    rollupOptions: {
      external: ["react", "react-dom", "@preact/signals-react"],
      output: {
        globals: {
          react: "React",
          "react-dom": "ReactDOM",
          "@preact/signals-react": "PreactSignals",
        },
      },
    },
    sourcemap: true,
    minify: "esbuild",
  },
});
