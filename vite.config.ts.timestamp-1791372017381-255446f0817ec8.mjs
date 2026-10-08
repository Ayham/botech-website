// vite.config.ts
import { defineConfig } from "file:///E:/My%20Documents/Files/My%20Work/BOTech%20Website/node_modules/vite/dist/node/index.js";
import react from "file:///E:/My%20Documents/Files/My%20Work/BOTech%20Website/node_modules/@vitejs/plugin-react/dist/index.js";
import path from "path";
import { copyFileSync, mkdirSync } from "node:fs";
var __vite_injected_original_dirname = "E:\\My Documents\\Files\\My Work\\BOTech Website";
var SPA_ROUTES = [
  "about",
  "services",
  "products",
  "work",
  "contact",
  "privacy",
  "terms",
  "raseed",
  "clover",
  "delete-account"
];
var vite_config_default = defineConfig({
  plugins: [
    react(),
    {
      name: "copy-index-to-404",
      closeBundle() {
        const dist = (p) => path.resolve(__vite_injected_original_dirname, "dist", p);
        copyFileSync(dist("index.html"), dist("404.html"));
        for (const route of SPA_ROUTES) {
          const dir = dist(route);
          mkdirSync(dir, { recursive: true });
          copyFileSync(dist("index.html"), path.join(dir, "index.html"));
        }
      }
    }
  ],
  resolve: {
    alias: {
      "@": path.resolve(__vite_injected_original_dirname, "./src")
    }
  },
  build: {
    outDir: "dist",
    assetsDir: "assets",
    sourcemap: false,
    minify: "esbuild",
    cssCodeSplit: true,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ["react", "react-dom", "react-router-dom", "react-helmet-async"],
          ui: ["@/components/ui"]
        },
        chunkFileNames: "assets/js/[name]-[hash].js",
        entryFileNames: "assets/js/[name]-[hash].js",
        assetFileNames: (assetInfo) => {
          const info = assetInfo.name.split(".");
          const ext = info[info.length - 1];
          if (/\.(png|jpe?g|gif|svg|webp|avif|ico)$/.test(assetInfo.name)) {
            return `assets/images/[name]-[hash].${ext}`;
          }
          if (/\.(woff2?|ttf|eot)$/.test(assetInfo.name)) {
            return `assets/fonts/[name]-[hash].${ext}`;
          }
          return `assets/[ext]/[name]-[hash].${ext}`;
        }
      }
    }
  },
  server: {
    port: 3e3,
    open: true,
    host: true
  },
  preview: {
    port: 4173,
    host: true
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJFOlxcXFxNeSBEb2N1bWVudHNcXFxcRmlsZXNcXFxcTXkgV29ya1xcXFxCT1RlY2ggV2Vic2l0ZVwiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiRTpcXFxcTXkgRG9jdW1lbnRzXFxcXEZpbGVzXFxcXE15IFdvcmtcXFxcQk9UZWNoIFdlYnNpdGVcXFxcdml0ZS5jb25maWcudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0U6L015JTIwRG9jdW1lbnRzL0ZpbGVzL015JTIwV29yay9CT1RlY2glMjBXZWJzaXRlL3ZpdGUuY29uZmlnLnRzXCI7aW1wb3J0IHsgZGVmaW5lQ29uZmlnIH0gZnJvbSAndml0ZSdcbmltcG9ydCByZWFjdCBmcm9tICdAdml0ZWpzL3BsdWdpbi1yZWFjdCdcbmltcG9ydCBwYXRoIGZyb20gJ3BhdGgnXG5pbXBvcnQgeyBjb3B5RmlsZVN5bmMsIG1rZGlyU3luYyB9IGZyb20gJ25vZGU6ZnMnXG5cbi8vIFB1YmxpYyBTUEEgcm91dGVzLiBFYWNoIGdldHMgYSByZWFsIGBpbmRleC5odG1sYCBzaGVsbCBhdCBgLzxyb3V0ZT4vaW5kZXguaHRtbGBcbi8vIHNvIEdpdEh1YiBQYWdlcyBzZXJ2ZXMgdGhlbSB3aXRoIGFuIEhUVFAgMjAwIChpbnN0ZWFkIG9mIGEgc29mdC00MDQgdmlhXG4vLyA0MDQuaHRtbCkgXHUyMDE0IHJlcXVpcmVkIGZvciBkZWVwLXBhZ2UgaW5kZXhpbmcuXG5jb25zdCBTUEFfUk9VVEVTID0gW1xuICAnYWJvdXQnLFxuICAnc2VydmljZXMnLFxuICAncHJvZHVjdHMnLFxuICAnd29yaycsXG4gICdjb250YWN0JyxcbiAgJ3ByaXZhY3knLFxuICAndGVybXMnLFxuICAncmFzZWVkJyxcbiAgJ2Nsb3ZlcicsXG4gICdkZWxldGUtYWNjb3VudCcsXG5dXG5cbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZyh7XG4gIHBsdWdpbnM6IFtcbiAgICByZWFjdCgpLFxuICAgIHtcbiAgICAgIG5hbWU6ICdjb3B5LWluZGV4LXRvLTQwNCcsXG4gICAgICBjbG9zZUJ1bmRsZSgpIHtcbiAgICAgICAgY29uc3QgZGlzdCA9IChwOiBzdHJpbmcpID0+IHBhdGgucmVzb2x2ZShfX2Rpcm5hbWUsICdkaXN0JywgcClcbiAgICAgICAgY29weUZpbGVTeW5jKGRpc3QoJ2luZGV4Lmh0bWwnKSwgZGlzdCgnNDA0Lmh0bWwnKSlcbiAgICAgICAgZm9yIChjb25zdCByb3V0ZSBvZiBTUEFfUk9VVEVTKSB7XG4gICAgICAgICAgY29uc3QgZGlyID0gZGlzdChyb3V0ZSlcbiAgICAgICAgICBta2RpclN5bmMoZGlyLCB7IHJlY3Vyc2l2ZTogdHJ1ZSB9KVxuICAgICAgICAgIGNvcHlGaWxlU3luYyhkaXN0KCdpbmRleC5odG1sJyksIHBhdGguam9pbihkaXIsICdpbmRleC5odG1sJykpXG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgfSxcbiAgXSxcbiAgcmVzb2x2ZToge1xuICAgIGFsaWFzOiB7XG4gICAgICAnQCc6IHBhdGgucmVzb2x2ZShfX2Rpcm5hbWUsICcuL3NyYycpLFxuICAgIH0sXG4gIH0sXG4gIGJ1aWxkOiB7XG4gICAgb3V0RGlyOiAnZGlzdCcsXG4gICAgYXNzZXRzRGlyOiAnYXNzZXRzJyxcbiAgICBzb3VyY2VtYXA6IGZhbHNlLFxuICAgIG1pbmlmeTogJ2VzYnVpbGQnLFxuICAgIGNzc0NvZGVTcGxpdDogdHJ1ZSxcbiAgICByb2xsdXBPcHRpb25zOiB7XG4gICAgICBvdXRwdXQ6IHtcbiAgICAgICAgbWFudWFsQ2h1bmtzOiB7XG4gICAgICAgICAgdmVuZG9yOiBbJ3JlYWN0JywgJ3JlYWN0LWRvbScsICdyZWFjdC1yb3V0ZXItZG9tJywgJ3JlYWN0LWhlbG1ldC1hc3luYyddLFxuICAgICAgICAgIHVpOiBbJ0AvY29tcG9uZW50cy91aSddLFxuICAgICAgICB9LFxuICAgICAgICBjaHVua0ZpbGVOYW1lczogJ2Fzc2V0cy9qcy9bbmFtZV0tW2hhc2hdLmpzJyxcbiAgICAgICAgZW50cnlGaWxlTmFtZXM6ICdhc3NldHMvanMvW25hbWVdLVtoYXNoXS5qcycsXG4gICAgICAgIGFzc2V0RmlsZU5hbWVzOiAoYXNzZXRJbmZvKSA9PiB7XG4gICAgICAgICAgY29uc3QgaW5mbyA9IGFzc2V0SW5mby5uYW1lLnNwbGl0KCcuJyk7XG4gICAgICAgICAgY29uc3QgZXh0ID0gaW5mb1tpbmZvLmxlbmd0aCAtIDFdO1xuICAgICAgICAgIGlmICgvXFwuKHBuZ3xqcGU/Z3xnaWZ8c3ZnfHdlYnB8YXZpZnxpY28pJC8udGVzdChhc3NldEluZm8ubmFtZSkpIHtcbiAgICAgICAgICAgIHJldHVybiBgYXNzZXRzL2ltYWdlcy9bbmFtZV0tW2hhc2hdLiR7ZXh0fWA7XG4gICAgICAgICAgfVxuICAgICAgICAgIGlmICgvXFwuKHdvZmYyP3x0dGZ8ZW90KSQvLnRlc3QoYXNzZXRJbmZvLm5hbWUpKSB7XG4gICAgICAgICAgICByZXR1cm4gYGFzc2V0cy9mb250cy9bbmFtZV0tW2hhc2hdLiR7ZXh0fWA7XG4gICAgICAgICAgfVxuICAgICAgICAgIHJldHVybiBgYXNzZXRzL1tleHRdL1tuYW1lXS1baGFzaF0uJHtleHR9YDtcbiAgICAgICAgfSxcbiAgICAgIH0sXG4gICAgfSxcbiAgfSxcbiAgc2VydmVyOiB7XG4gICAgcG9ydDogMzAwMCxcbiAgICBvcGVuOiB0cnVlLFxuICAgIGhvc3Q6IHRydWUsXG4gIH0sXG4gIHByZXZpZXc6IHtcbiAgICBwb3J0OiA0MTczLFxuICAgIGhvc3Q6IHRydWUsXG4gIH0sXG59KSJdLAogICJtYXBwaW5ncyI6ICI7QUFBc1UsU0FBUyxvQkFBb0I7QUFDblcsT0FBTyxXQUFXO0FBQ2xCLE9BQU8sVUFBVTtBQUNqQixTQUFTLGNBQWMsaUJBQWlCO0FBSHhDLElBQU0sbUNBQW1DO0FBUXpDLElBQU0sYUFBYTtBQUFBLEVBQ2pCO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQ0Y7QUFFQSxJQUFPLHNCQUFRLGFBQWE7QUFBQSxFQUMxQixTQUFTO0FBQUEsSUFDUCxNQUFNO0FBQUEsSUFDTjtBQUFBLE1BQ0UsTUFBTTtBQUFBLE1BQ04sY0FBYztBQUNaLGNBQU0sT0FBTyxDQUFDLE1BQWMsS0FBSyxRQUFRLGtDQUFXLFFBQVEsQ0FBQztBQUM3RCxxQkFBYSxLQUFLLFlBQVksR0FBRyxLQUFLLFVBQVUsQ0FBQztBQUNqRCxtQkFBVyxTQUFTLFlBQVk7QUFDOUIsZ0JBQU0sTUFBTSxLQUFLLEtBQUs7QUFDdEIsb0JBQVUsS0FBSyxFQUFFLFdBQVcsS0FBSyxDQUFDO0FBQ2xDLHVCQUFhLEtBQUssWUFBWSxHQUFHLEtBQUssS0FBSyxLQUFLLFlBQVksQ0FBQztBQUFBLFFBQy9EO0FBQUEsTUFDRjtBQUFBLElBQ0Y7QUFBQSxFQUNGO0FBQUEsRUFDQSxTQUFTO0FBQUEsSUFDUCxPQUFPO0FBQUEsTUFDTCxLQUFLLEtBQUssUUFBUSxrQ0FBVyxPQUFPO0FBQUEsSUFDdEM7QUFBQSxFQUNGO0FBQUEsRUFDQSxPQUFPO0FBQUEsSUFDTCxRQUFRO0FBQUEsSUFDUixXQUFXO0FBQUEsSUFDWCxXQUFXO0FBQUEsSUFDWCxRQUFRO0FBQUEsSUFDUixjQUFjO0FBQUEsSUFDZCxlQUFlO0FBQUEsTUFDYixRQUFRO0FBQUEsUUFDTixjQUFjO0FBQUEsVUFDWixRQUFRLENBQUMsU0FBUyxhQUFhLG9CQUFvQixvQkFBb0I7QUFBQSxVQUN2RSxJQUFJLENBQUMsaUJBQWlCO0FBQUEsUUFDeEI7QUFBQSxRQUNBLGdCQUFnQjtBQUFBLFFBQ2hCLGdCQUFnQjtBQUFBLFFBQ2hCLGdCQUFnQixDQUFDLGNBQWM7QUFDN0IsZ0JBQU0sT0FBTyxVQUFVLEtBQUssTUFBTSxHQUFHO0FBQ3JDLGdCQUFNLE1BQU0sS0FBSyxLQUFLLFNBQVMsQ0FBQztBQUNoQyxjQUFJLHVDQUF1QyxLQUFLLFVBQVUsSUFBSSxHQUFHO0FBQy9ELG1CQUFPLCtCQUErQixHQUFHO0FBQUEsVUFDM0M7QUFDQSxjQUFJLHNCQUFzQixLQUFLLFVBQVUsSUFBSSxHQUFHO0FBQzlDLG1CQUFPLDhCQUE4QixHQUFHO0FBQUEsVUFDMUM7QUFDQSxpQkFBTyw4QkFBOEIsR0FBRztBQUFBLFFBQzFDO0FBQUEsTUFDRjtBQUFBLElBQ0Y7QUFBQSxFQUNGO0FBQUEsRUFDQSxRQUFRO0FBQUEsSUFDTixNQUFNO0FBQUEsSUFDTixNQUFNO0FBQUEsSUFDTixNQUFNO0FBQUEsRUFDUjtBQUFBLEVBQ0EsU0FBUztBQUFBLElBQ1AsTUFBTTtBQUFBLElBQ04sTUFBTTtBQUFBLEVBQ1I7QUFDRixDQUFDOyIsCiAgIm5hbWVzIjogW10KfQo=
