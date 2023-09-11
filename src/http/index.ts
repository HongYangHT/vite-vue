import axios, {
  AxiosRequestConfig,
  AxiosResponse,
  CustomParamsSerializer,
  InternalAxiosRequestConfig
} from 'axios'
import BaseService from './base'
import qs, { stringify } from 'qs'
import { BaseServiceOptions, DataType, ResponseDataType } from './model'
import { localStore } from '@/common/utils/local-store'
import { ACCESS_TOKEN } from '@/common/constants'
import { API_WHITE_LIST } from './config'
import { isNil } from 'lodash-es'
import { useRootStore } from '@/store'

const VITE_BASE_API_URI = import.meta.env.VITE_BASE_API_URI
const VITE_TIME_OUT = import.meta.env.VITE_TIME_OUT

const defaultConfig: AxiosRequestConfig = {
  // 请求超时时间
  baseURL: VITE_BASE_API_URI,
  timeout: VITE_TIME_OUT,
  headers: {
    Accept: 'application/json, text/plain, */*',
    'Content-Type': 'application/json',
    'X-Requested-With': 'XMLHttpRequest'
  },
  // 数组格式参数序列化（https://github.com/axios/axios/issues/5142）
  paramsSerializer: {
    serialize: stringify as unknown as CustomParamsSerializer
  }
}

const instance = axios.create(defaultConfig)

// 请求拦截器
const requestInterceptor = (config: InternalAxiosRequestConfig) => {
  if (API_WHITE_LIST.find(url => url === config.url)) {
    return config
  }
  const accessToken = localStore.get(ACCESS_TOKEN)

  // 逗号运算符
  if (!isNil(accessToken)) {
    config.headers.Authorization = `Basic ${accessToken}`
  }

  if (config.method?.toLocaleLowerCase() !== 'get') {
    config.headers['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8'
    config.data = qs.stringify(config.data)
  }
  return config
}

// 接口返回拦截器
// 是否正在刷新的标记

let isRefreshing = false
// 重试队列，每一项将是一个待执行的函数形式
let requests: Array<(token: string) => void> = []

const rootStore = useRootStore()

const { refreshLogin } = rootStore
const responseInterceptor = (
  response: AxiosResponse<ResponseDataType<DataType>, any>
): AxiosResponse<ResponseDataType<DataType>, any> => {
  const code = response.data?.code

  // NOTE: 身份令牌验证失败
  if (code === 401 || response.status === 404) {
    const currentConfig = response.config

    if (!isRefreshing) {
      isRefreshing = true
      // 刷新token
      refreshLogin()
        .then(res => {
          const accessToken = res.data?.accessToken || ''
          currentConfig.headers.token = `Bearer ${accessToken}`
          // 已经刷新了token，将所有队列中的请求进行重试
          requests.forEach(cb => {
            cb(accessToken)
          })
          requests = []
          return instance.request(currentConfig)
        })
        .catch(() => {})
    } else {
      // 正在刷新token，将返回一个未执行resolve的promise
      requests.push((token: string) => {
        currentConfig.headers.token = `Bearer ${token}`
        instance.request(currentConfig)
      })
    }
  }
  return response
}

const baseConfig: BaseServiceOptions = {
  ...defaultConfig,
  requestInterceptor,
  responseInterceptor
}

export const http = new BaseService(baseConfig)
