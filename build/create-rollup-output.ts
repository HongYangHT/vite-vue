import path from 'path'
import { createHash } from 'crypto'

/** 路径查找 */
const resolve = (dir: string): string => {
  return path.resolve(__dirname, '.', dir)
}

export const createRollUpOutput = () => {
  const commonVueLib = ['vue', 'axios', 'pinia', 'vue-router', 'vue-i18n']
  const commonVueLibHash = createHash('md5').update(commonVueLib.join('')).digest('hex').slice(0, 8)

  const commonLib = ['dayjs']

  const commonLibHash = createHash('md5').update(commonLib.join('')).digest('hex').slice(0, 8)
  return {
    input: {
      index: resolve('../index.html')
    },
    // 静态资源分类打包
    output: {
      chunkFileNames: (chunkInfo: { isDynamicEntry: boolean; moduleIds: string[] }) => {
        if (chunkInfo.isDynamicEntry) {
          const hash = createHash('md5')
            .update(chunkInfo.moduleIds.join(''))
            .digest('hex')
            .slice(0, 8)

          return `assets/js/[name]-${hash}.js`
        } else {
          return 'assets/js/[name]-[hash].js'
        }
      },
      entryFileNames: 'assets/js/[name]-[hash].js',
      assetFileNames: 'assets/[ext]/[name]-[hash].[ext]',
      manualChunks: {
        [`vue-${commonVueLibHash}`]: commonVueLib,
        [`common-lib-${commonLibHash}`]: commonLib
      }
    }
  }
}
