import { defineConfig } from "vite";
import dts from "vite-plugin-dts";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    dts({
      skipDiagnostics: false,
      outputDir: "dist/types",
    }),
  ],
  build: {
    lib: {
      name: "Alma",
      entry: "src/index.ts",
      formats: ["es", "umd"],
      fileName: (format) => `index.${format}.js`,
    },
    outDir: "dist",
    rollupOptions: {
      watch: {
        exclude: ["node_modules/**"],
      },
    },
    sourcemap: true,
    minify: true,
  },
});
