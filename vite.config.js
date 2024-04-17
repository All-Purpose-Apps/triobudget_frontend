import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

export default defineConfig({
  plugins: [react()],
  base: "/",
  resolve: {
    alias: {
      "@components": "/src/components",
      "@utils": "/src/utils",
      "@assets": "/src/assets",
      "@store": "/src/store",
      "@pages": "/src/pages",
      "@mkcomponents": "/src/components/mkcomponents",
    },
  },
});
