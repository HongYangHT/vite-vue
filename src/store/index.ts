import {
  ACCESS_TOKEN,
  REFRESH_TOKEN,
  USER_INFO,
  USER_PERMISSIONS,
  USER_ROLES
} from '@/common/constants'
import { LoginForm, RefreshForm, RootStoreState, UserInfo } from '@/common/model'
import { localStore } from '@/common/utils/local-store'
import { http } from '@/http'
import { ResponseDataType } from '@/http/model'
import { defineStore } from 'pinia'
import { reactive, toRefs } from 'vue'

export const useRootStore = defineStore('rootStore', () => {
  const state = reactive<Partial<RootStoreState>>({})

  // 登录
  const login = async (loginForm: LoginForm) => {
    try {
      const result = await http.post<LoginForm, ResponseDataType<UserInfo>>(
        '/auth/login',
        loginForm
      )

      // NOTE: 登录成功
      if (result.data?.code === 200) {
        state.accessToken = result.data?.data.accessToken || ''
        state.refreshToken = result.data?.data.refreshToken || ''
        state.roles = result.data?.data.roles || []
        state.permissions = result.data?.data.permissions || []
        state.userInfo = result.data?.data || {}

        // 缓存下来
        localStore.set(ACCESS_TOKEN, state.accessToken)
        localStore.set(REFRESH_TOKEN, state.refreshToken)
        localStore.set(USER_ROLES, state.roles)
        localStore.set(USER_PERMISSIONS, state.permissions)
        localStore.set(USER_INFO, state.userInfo)
      }
    } catch (error) {
      console.warn(error)
    }
  }

  // NOTE: 刷新token
  const refreshLogin = (): Promise<ResponseDataType<UserInfo>> => {
    return new Promise((resolve, reject) => {
      try {
        const rToken = localStore.get(REFRESH_TOKEN)
        http
          .post<RefreshForm, ResponseDataType<UserInfo>>('/auth/refresh', {
            refreshToken: state.refreshToken ?? rToken
          })
          .then(result => {
            if (result.data?.code === 200) {
              state.accessToken = result.data?.data.accessToken || ''
              state.refreshToken = result.data?.data.refreshToken || ''
              state.roles = result.data?.data.roles || []
              state.permissions = result.data?.data.permissions || []
              state.userInfo = result.data?.data || {}

              // 缓存下来
              localStore.set(ACCESS_TOKEN, state.accessToken)
              localStore.set(REFRESH_TOKEN, state.refreshToken)
              localStore.set(USER_ROLES, state.roles)
              localStore.set(USER_PERMISSIONS, state.permissions)
              localStore.set(USER_INFO, state.userInfo)

              resolve(result.data)
            }
          })
      } catch (error) {
        console.warn(error)
        reject(error)
      }
    })
  }
  return {
    ...toRefs(state),
    login,
    refreshLogin
  }
})
