# vite-vue

> 基于`vite` 的 `vue3` 的模版工程, 使用了最新的 `Vue3`、`Vite`、`Ant-design-vue`、`TypeScript`、`Pinia`、`Tailwindcss` 等主流技术开发

## 模块管理 `pnpm`

> 使用 `pnpm` 做模块管理, 能够扁平化依赖, 能够支持 `monorepo`

- 安装
  
  ```bash
  npm install -g pnpm
  ```

- 安装依赖
  
  ```bash
  pnpm i
  ```

- 开发
  
  ```bash
  pnpm run dev
  ```

- 打包
  
  ```bash
  pnpm run build
  ```

### 组件库 `ant-design`

> 使用 [ant-design 组件库](https://antdv.com/) 抛弃[arco-design 组件库](https://arco.design/), 表格组件过度使用灰色

### tailwindcss (Css 框架)

> [tailwindcss](https://v2.tailwindcss.com/)

### @vitejs/plugin-legacy

> [@vitejs/plugin-legacy](https://blog.csdn.net/Mr_JavaScript/article/details/125388234), 用于兼容老版本浏览器

### commitlint 提交规范

> 使用 `git cz` 替代 `git commit`, 用于命令式提交

- feat：新功能
- fix：修补 BUG
- docs：修改文档，比如 README, CHANGELOG, CONTRIBUTE 等等
- style：不改变代码逻辑 (仅仅修改了空格、格式缩进、逗号等等)
- refactor：重构（既不修复错误也不添加功能）
- perf：优化相关，比如提升性能、体验
- test：增加测试，包括单元测试、集成测试等
- build：构建系统或外部依赖项的更改
- ci：自动化流程配置或脚本修改
- chore：非 src 和 test 的修改，发布版本等
- revert：恢复先前的提交


#### [flv player](https://github.com/bilibili/flv.js)
#### [xg player](https://v3.h5player.bytedance.com/)
