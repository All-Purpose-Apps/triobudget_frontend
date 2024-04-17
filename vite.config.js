import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

export default defineConfig({
  plugins: [react()],
  base: "/",
  server: {
    historyApiFallback: true,
  },
  resolve: {
    alias: {
      "@components": "/src/components",
      "@utils": "/src/utils",
      "@assets": "/src/assets",
      "@store": "/src/store",
      "@pages": "/src/pages",
    },
  },
});
