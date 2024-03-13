import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import * as path from "path";
import VueDevTools from 'vite-plugin-vue-devtools'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: 9090,
    host: true
  },
  plugins: [
    vue(),
    VueDevTools()
  ],
  resolve: {
    alias: {
      '@/': `${path.resolve(__dirname, 'src')}/`
    },
    dedupe: [],
    // 情景导出package.json 配置中的 exports 字段
    conditions: [],
    // 解析package.json 中的字段
    mainFields: ['module', 'jsnext:main', 'jsnext'],
    // 导入时想要省略的扩展名列表
    extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json', '.vue']
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: '@import "@/styles/mixins.scss";'
      }
    }
  }
})
