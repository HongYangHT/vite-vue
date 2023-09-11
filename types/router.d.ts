import { type RouteLocationNormalized } from 'vue-router'

declare global {
  // @ts-ignore
  export interface ToRouteType extends RouteLocationNormalized {
    meta: CustomizeRouteMeta
  }
  // @ts-ignore
  export interface CustomizeRouteMeta {
    // 页面title 可支持国际化
    title: string

    // 菜单图标 支持 svg icon 或者是 icon
    icon?: string | FunctionalComponent

    // 右侧的图标
    extraIcon?: string | FunctionalComponent

    // 是否在菜单中显示（默认`true`）`可选`
    show?: boolean

    // 是否显示父级菜单 `可选`
    showParent?: boolean

    // 角色权限
    roles?: Array<string>

    // 按钮级别权限
    permissions?: Array<string>

    // 是否进行缓存
    keepAlive?: boolean

    transition?: {
      /**
       * @description 当前路由动画效果
       * @see {@link https://next.router.vuejs.org/guide/advanced/transitions.html#transitions}
       * @see animate.css {@link https://animate.style}
       */
      name?: string
      /** 进场动画 */
      enterTransition?: string
      /** 离场动画 */
      leaveTransition?: string
    }
  }
}
// @ts-ignore
declare module 'vue-router' {
  interface RouteMeta extends CustomizeRouteMeta {}
}
