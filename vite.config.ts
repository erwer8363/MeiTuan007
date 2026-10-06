import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'node:path'

// https://vitejs.dev/config/
export default defineConfig({
  // GitHub Pages 部署路径，见 package.json 的 homepage
  base: process.env.NODE_ENV === 'production' ? '/MeiTuan007/' : '/',
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(import.meta.dirname, 'src'),
    },
  },
  css: {
    // 配置 css-module
    modules: {
      // 开启 camelCase 格式变量名转换
      localsConvention: 'camelCase',
      generateScopedName: '[local]_[hash:base64:5]',
    },
  },
  server: {
    host: '0.0.0.0', // 局域网可访问
    port: 3000,
    open: true, // 自动打开浏览器
    proxy: {
      // /api 开头的请求代理到本地后端 MeiTuan-api
      '/api': {
        target: 'http://localhost:8080',
        changeOrigin: true,
        secure: false,
      },
    },
  },
})
