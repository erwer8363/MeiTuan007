/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** true：请求读 public/data/*.json；false：请求 VITE_API_BASE_URL 指向的真实后端 */
  readonly VITE_USE_MOCK: string
  /** 真实后端地址，USE_MOCK=false 时生效；留空则走同源（dev 下由 vite 代理 /api） */
  readonly VITE_API_BASE_URL: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
