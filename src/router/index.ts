import NProgress from '@/common/utils/nprogress'
import { createRouter, createWebHistory, createWebHashHistory, RouterHistory } from 'vue-router'
import dashboard from './modules/dashboard'
import login from './modules/login'
import demo from './modules/demo'

const setRouterHistory = (): RouterHistory => {
  const mode = import.meta.env.VITE_ROUTER_MODE
  const prefix = import.meta.env.VITE_ROUTER_PREFIX

  if (mode === 'history') {
    return createWebHistory(prefix || '')
  } else {
    return createWebHashHistory(prefix || '')
  }
}

export const router = createRouter({
  routes: [...dashboard, ...login, ...demo],
  history: setRouterHistory(),
  strict: true,
  async scrollBehavior(_to, from, savedPosition) {
    return new Promise(resolve => {
      if (savedPosition) {
        return savedPosition
      } else {
        if (from.meta.saveSrollTop) {
          const top: number = document.documentElement.scrollTop || document.body.scrollTop
          resolve({ left: 0, top })
        }
      }
    })
  }
})

router.beforeEach((to, _from, _next) => {
  if (to.meta?.keepAlive) {
    // handleAliveRoute(to, 'add')
    // 页面整体刷新和点击标签页刷新
    if (_from.name === undefined || _from.name === 'Redirect') {
      // handleAliveRoute(to)
    }
  }

  _next()
})

router.afterEach(() => {
  NProgress.done()
})
