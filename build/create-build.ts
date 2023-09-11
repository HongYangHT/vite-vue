import { BuildOptions } from 'vite'
import { createRollUpOutput } from './create-rollup-output'

export const createBuild = (): BuildOptions => {
  return {
    // target: 'modules',
    manifest: true, // 生成 manifest.json 文件，包含了没有被 hash 过的资源文件名和 hash 后版本的映射
    chunkSizeWarningLimit: 300,
    outDir: 'dist', // 打包后的路径
    assetsDir: 'assets', // 静态资源路径 相对于 build.outDir
    assetsInlineLimit: 4096, // 静态资源阈值
    cssCodeSplit: true, // 是否启用 CSS 代码拆分
    // cssMinify: 'esbuild', // boolean | 'esbuild' | 'lightningcss'
    sourcemap: true,
    // minify: 'esbuild', //boolean | 'terser' | 'esbuild'
    rollupOptions: createRollUpOutput(),
    reportCompressedSize: false // 不需要, 因为build的时候, 会压缩, 启用/禁用 gzip 压缩大小报告。压缩大型输出文件可能会很慢，因此禁用该功能可能会提高大型项目的构建性能。
  }
}
