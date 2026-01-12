import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",
      includeAssets: ["favicon.svg"],
      manifest: {
        name: "Workout Tracker",
        short_name: "Workout",
        description: "Offline workout tracking app",
        theme_color: "#0f1115",
        background_color: "#0f1115",
        display: "standalone",
        start_url: "/",
        icons: [
          {
    src: "/icon-192x192.png",
    sizes: "192x192",
    type: "image/png",
  },
  {
    src: "/icon-512-512.png",
    sizes: "512x512",
    type: "image/png",
  },
        ],
      },
    }),
  ],
});
