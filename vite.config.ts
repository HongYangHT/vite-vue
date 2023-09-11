import { defineConfig, loadEnv } from 'vite'
import path from 'path'
import { createPlugin } from './build/create-plugin'
import { createBuild } from './build/create-build'
import { createServer } from './build/create-server'
import tailwindcss from 'tailwindcss'
import autoprefixer from 'autoprefixer'

const root = process.cwd()

/** 路径查找 */
const resolve = (dir: string): string => {
  return path.resolve(__dirname, '.', dir)
}

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  const env = loadEnv(mode, resolve('env'), '')

  return {
    // root: process.cwd(), // 执行项目目录
    base: env.ROUTER_PREFIX || '/', // 路由前缀地址, 用于设置非 / 下部署
    // mode: '', // 构建模式 development | production
    // publicDir: '/public', // <root>/public 静态资源的路径, 不需要经过处理
    envDir: resolve('env'),
    resolve: {
      alias: {
        '@': resolve('src')
      },
      extensions: ['.mjs', '.js', '.mts', '.ts', '.jsx', '.tsx'], // 官方不建议设略.vue的扩展名
      modules: resolve('node_modules') // 查找第三方模块只在本项目的node_modules中查找
    },
    plugins: createPlugin({
      command,
      COMPRESSION: env.COMPRESSION
    }),
    build: createBuild(),
    server: createServer(env),
    css: {
      postcss: {
        plugins: [tailwindcss(), autoprefixer()]
      }
    }
  }
})
