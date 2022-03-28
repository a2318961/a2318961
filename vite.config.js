import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import PluginImportToCDN from "vite-plugin-cdn-import";

// 全局对象
const globals = PluginImportToCDN({
  modules: [
    {
      name: "vue",
      var: "Vue",
      path: "https://unpkg.com/vue@3"
    },
    {
      name: "vue-router",
      var: "VueRouter",
      path: "https://unpkg.com/vue-router@4"
    },
    {
      name: "vant",
      var: "vant",
      path: "https://unpkg.com/vant@3/lib/vant.min.js",
      css: "https://unpkg.com/vant@3/lib/index.css"
    },
    {
      name: "axios",
      var: "axios",
      path: "https://unpkg.com/axios/dist/axios.min.js"
    }
  ]
});
export default defineConfig({
  plugins: [vue(), globals],
  server: {
    port: 8008
  },
  base: "./",
  build: {
    sourcemap: false,
    outDir: "docs"
  }
});
