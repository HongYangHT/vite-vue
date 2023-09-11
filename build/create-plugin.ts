import type { Plugin } from 'vite'
import path from 'path'
import vue from '@vitejs/plugin-vue'
// 用于兼容低版本浏览器 https://my.oschina.net/u/4090830/blog/8604281
import legacy from '@vitejs/plugin-legacy'
import AutoImport from 'unplugin-auto-import/vite'
// 组件按需引入
import Components from 'unplugin-vue-components/vite'
import { AntDesignVueResolver } from 'unplugin-vue-components/resolvers'
import compression from 'vite-plugin-compression'
import { buildInfoPlugin } from './build-info-plugin'

import vueJsx from '@vitejs/plugin-vue-jsx'
import eslintPlugin from 'vite-plugin-eslint'

import { viteMockServe } from '@lincy/vite-plugin-mock' // 先替代 vite-plugin-mock

import { visualizer } from 'rollup-plugin-visualizer'

import vueI18nPlugin from '@intlify/unplugin-vue-i18n/vite'

import { VitePWA } from 'vite-plugin-pwa'

import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'

import { createStyleImportPlugin, AndDesignVueResolve } from 'vite-plugin-style-import'

type Algorithm = 'gzip' | 'brotliCompress' | 'deflate' | 'deflateRaw'

/** 路径查找 */
const resolve = (dir: string): string => {
  return path.resolve(__dirname, '.', dir)
}

export const createPlugin = (options: {
  command: 'build' | 'serve'
  COMPRESSION: string // 'gz' | 'brotli' | 'none'
}): Plugin[] => {
  const { command, COMPRESSION } = options

  const gz = {
    ext: '.gz',
    algorithm: 'gzip' as Algorithm, // 使用gzip算法进行压缩
    threshold: 30 * 1024,
    // 默认压缩.js|mjs|json|css|html后缀文件，设置成true，压缩全部文件
    filter: filename => /\.(js|mjs|json|css)$/i.test(filename),
    // 压缩后是否删除原始文件
    deleteOriginFile: false
  }

  const br = {
    ext: '.br',
    algorithm: 'brotliCompress' as Algorithm,
    threshold: 30 * 1024,
    filter: filename => /\.(js|mjs|json|css)$/i.test(filename),
    deleteOriginFile: false
  }

  const lifecycle = process.env.npm_lifecycle_event

  return [
    // NOTE: Vue 3 单文件组件支持
    vue(),

    // NOTE: 支持vue的jsx
    vueJsx(),

    vueI18nPlugin({
      // if you want to use Vue I18n Legacy API, you need to set `compositionOnly: false`
      // compositionOnly: false,

      // you need to set i18n resource including paths !
      include: resolve('../src/assets/locals/**')
    }),

    createSvgIconsPlugin({
      iconDirs: [resolve('../src/assets/icons')],
      // 指定symbolId格式
      symbolId: 'icon-[dir]-[name]'
    }),

    eslintPlugin({
      include: ['src/**/*.ts', 'src/**/*.vue']
    }),

    // NOTE: 兼容低版本
    lifecycle !== 'report' && command !== 'serve'
      ? legacy({
          targets: ['chrome < 60', 'edge < 15'], // 传统浏览器不支持默认ESM, 如chrome<60，Edge<15，Firefox<59 等等
          renderLegacyChunks: true,
          additionalLegacyPolyfills: [] // 插件只包含corejs, 内部还是使用babel-preset
        })
      : null,

    // 自动按需引入, 在项目文件中
    AutoImport({
      include: [/\.[tj]sx?$/, /\.vue$/],
      imports: ['vue', 'vue-router', 'pinia', '@vueuse/core', 'vue-i18n'],
      dts: resolve('../types/auto-imports.d.ts'),
      resolvers: [AntDesignVueResolver()]
    }),

    // NOTE: ant-design 按需引入
    Components({
      dirs: ['src/components', 'src/views'],
      resolvers: [
        AntDesignVueResolver({
          importStyle: false, // css in js
          resolveIcons: true
        })
      ],
      dts: resolve('../types/components.d.ts')
    }),

    createStyleImportPlugin({
      resolves: [AndDesignVueResolve()],
      libs: [
        {
          libraryName: 'ant-design-vue',
          esModule: true,
          resolveStyle: name => {
            return `ant-design-vue/es/${name}/style/index`
          }
        }
      ]
    }),

    // gzip
    COMPRESSION === 'none'
      ? null
      : command !== 'serve'
      ? COMPRESSION === 'gz'
        ? compression(gz)
        : compression(br)
      : null,
    command !== 'serve' ? buildInfoPlugin(COMPRESSION) : null,
    // 打包分析
    lifecycle === 'report'
      ? visualizer({
          open: true,
          brotliSize: true,
          gzipSize: true,
          filename: 'report.html',
          emitFile: false
        })
      : null,
    command === 'serve'
      ? viteMockServe({
          mockPath: resolve('../mock'),
          enable: true
        })
      : null,
    VitePWA({
      injectRegister: 'auto',
      registerType: 'prompt',
      workbox: {
        cleanupOutdatedCaches: true,
        sourcemap: true
      },
      devOptions: {
        enabled: process.env.SW_DEV === 'true',
        /* when using generateSW the PWA plugin will switch to classic */
        type: 'module',
        navigateFallback: 'index.html',
        suppressWarnings: true
      }
    })
  ].filter(n => n !== null)
}
