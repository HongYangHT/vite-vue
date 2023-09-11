/// <reference types="vite/client" />
interface ImportMetaEnv {
  readonly PUBLIC_PATH: string
  readonly VITE_ROUTER_MODE: string
  readonly VITE_ROUTER_PREFIX: string
  readonly VITE_INITIAL_LOCAL_LANGUAGE: string
  readonly COMPRESSION: string
  readonly BROWSER: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}

declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}
