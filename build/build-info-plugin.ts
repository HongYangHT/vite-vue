import duration from 'dayjs/plugin/duration'
import dayjs, { Dayjs } from 'dayjs'
import type { Plugin } from 'vite'
import path from 'path'
import fs from 'fs'
import chalk from 'chalk'

dayjs.extend(duration)

type FileSizeType = {
  size: number
  path: string
  name: string
}

const getPackageSize = (options: {
  folder: string
  zipType: string
}): {
  jsTotal: number
  zipJsTotal: number
  cssTotal: number
  zipCssTotal: number
} => {
  const cssDir = path.resolve(__dirname, `../${options.folder}/assets/css`)
  const jsDir = path.resolve(__dirname, `../${options.folder}/assets/js`)
  const jsFile: FileSizeType[] = []
  const cssFile: FileSizeType[] = []
  const zipCssFile: FileSizeType[] = []
  const zipJsFile: FileSizeType[] = []
  readFile(jsDir, jsFile, zipJsFile, '.js', options.zipType)
  readFile(cssDir, cssFile, zipCssFile, '.css', options.zipType)

  return {
    jsTotal: Number((jsFile.reduce((current, next) => current + next.size, 0) / 1000).toFixed(2)),
    zipJsTotal: Number(
      (zipJsFile.reduce((current, next) => current + next.size, 0) / 1000).toFixed(2)
    ),
    cssTotal: Number((cssFile.reduce((current, next) => current + next.size, 0) / 1000).toFixed(2)),
    zipCssTotal: Number(
      (zipCssFile.reduce((current, next) => current + next.size, 0) / 1000).toFixed(2)
    )
  }
}

const readFile = (
  filePath: string,
  jsFile,
  zipJsFile,
  extType: '.js' | '.css',
  zipType: string
) => {
  const files = fs.readdirSync(filePath)
  const reg = /\.[^\.]+$/
  files.forEach(walk)
  function walk(file) {
    const states = fs.statSync(filePath + '/' + file)
    if (states.isDirectory()) {
      readFile(filePath + '/' + file, jsFile, zipJsFile, extType, zipType)
    } else {
      // 去除legacy的文件
      if (!/legacy/g.test(file)) {
        const matchs = reg.exec(file)
        let ext = ''
        if (matchs) {
          ext = matchs[0]
        }

        if (ext === extType) {
          jsFile.push({
            size: states.size,
            name: file,
            path: filePath + '/' + file
          })
        } else if (ext === `.${zipType}`) {
          zipJsFile.push({
            size: states.size,
            name: file,
            path: filePath + '/' + file
          })
        }
      }
    }
  }
}

export const buildInfoPlugin = (zipType: string): Plugin => {
  const lifecycle = process.env.npm_lifecycle_event

  if (lifecycle === 'report') return
  let config: { command: string }
  let startTime: Dayjs
  let endTime: Dayjs
  let outDir: string
  return {
    name: 'vite:buildInformation',
    apply: 'build',
    enforce: 'post',
    configResolved(resolvedConfig) {
      config = resolvedConfig
      outDir = resolvedConfig.build?.outDir ?? 'dist'
    },
    buildStart() {
      console.log(chalk.green('开始打包...'))
      if (config.command === 'build') {
        startTime = dayjs(new Date())
      }
    },
    buildEnd() {
      if (config.command === 'build') {
        endTime = dayjs(new Date())
        const fileCount = getPackageSize({
          folder: outDir,
          zipType
        })

        const { jsTotal = 0, zipJsTotal = 0, cssTotal = 0, zipCssTotal = 0 } = fileCount

        console.log(
          '\n' +
            chalk.green(
              `🎉恭喜打包完成（总用时${dayjs
                .duration(endTime.diff(startTime))
                .format('mm分ss秒')}, 打包后的大小为: `
            )
        )
        console.log(`  压缩前: `)
        console.log(`    css 文件大小: ${chalk.green(cssTotal)} kB`)
        console.log(`    js 文件大小: ${chalk.green(jsTotal)} kB`)
        console.log(`  压缩后: `)
        console.log(
          `    css 文件大小: ${chalk.green(zipCssTotal)} kB ${
            !zipCssTotal ? '(没有符合需要压缩的文件)' : ''
          }`
        )
        console.log(
          `    js 文件大小: ${chalk.green(zipJsTotal)} kB${
            !zipJsTotal ? '(没有符合需要压缩的文件)' : ''
          }`
        )
      }
    }
  }
}
