import path from 'path'

/** 路径查找 */
const resolve = (dir: string): string => {
  return path.resolve(__dirname, '.', dir)
}
export const createServer = (env: Record<string, string | number>) => {
  return {
    host: 'localhost',
    port: Number(env.PORT) || 5173,
    strictPort: true,
    proxy: {
      [env.VITE_VUE_APP_BASE_API]: {
        target: 'http://192.168.1.102:19100',
        changeOrigin: true,
        pathRewrite: {
          ['^' + env.VITE_VUE_APP_BASE_API]: ''
        }
      },
      [env.VITE_VUE_APP_BASE_SOCKET]: {
        target: `ws://192.168.1.102:19100`,
        ws: true,
        changeOrigin: true,
        pathRewrite: {
          ['^' + env.VITE_VUE_APP_BASE_SOCKET]: ''
        }
      }
    },
    hmr: {
      overlay: false,
      path: resolve('../src')
    },
    watch: {
      ignored: ['**/__tests__/**']
    }
  }
}
