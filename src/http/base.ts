import axios, {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  InternalAxiosRequestConfig,
  Method
} from 'axios'
import { addPending, removePending } from './cancel'
import NProgress from '@/common/utils/nprogress'
import { BaseServiceOptions } from './model'

class BaseService {
  protected baseAxios: AxiosInstance
  protected opts: BaseServiceOptions

  constructor(options: BaseServiceOptions) {
    //  将默认设置的实例传入的 `option` 合并
    const VITE_BASE_API_URI = import.meta.env.VITE_BASE_API_URI
    const VITE_TIME_OUT = import.meta.env.VITE_TIME_OUT
    const {
      baseURL = VITE_BASE_API_URI,
      basePath = '', // 相对路径
      timeout = VITE_TIME_OUT,
      requestInterceptor = (config: InternalAxiosRequestConfig) => config,
      responseInterceptor = (response: AxiosResponse) => response,
      requestError = () => {},
      responseError = () => {}
    } = options
    // NOTE: 先默认新建一个 `axios` 实例
    const baseAxios = axios.create({
      baseURL: basePath ? `${baseURL}/${basePath}` : baseURL,
      timeout
    })
    baseAxios.interceptors.request.use(
      config => {
        removePending(config)
        addPending(config)
        NProgress.start()
        // NOTE: 这里添加请求前操作
        return requestInterceptor(config)
      },
      error => {
        requestError(error)
        return Promise.reject(error)
      }
    )
    baseAxios.interceptors.response.use(
      response => {
        removePending(response)
        NProgress.done()
        // NOTE: 这里添加请求后操作
        return responseInterceptor(response)
      },
      error => {
        responseError(error)
        NProgress.done()
        return Promise.reject(error)
      }
    )
    this.opts = options
    this.baseAxios = baseAxios
  }

  public request<T>(
    method: Method | string,
    url: string,
    axiosConfig?: AxiosRequestConfig
  ): Promise<AxiosResponse<T>> {
    const config: AxiosRequestConfig = {
      method,
      url,
      ...axiosConfig
    }

    return this.baseAxios.request(config)
  }

  public post<T, P>(url: string, data?: T, config?: AxiosRequestConfig): Promise<AxiosResponse<P>> {
    return this.request<P>('post', url, {
      data,
      ...config
    })
  }

  public get<T, P>(
    url: string,
    params?: T,
    config?: AxiosRequestConfig
  ): Promise<AxiosResponse<P>> {
    return this.request<P>('get', url, {
      params,
      ...config
    })
  }

  public put<T, P>(url: string, data?: T, config?: AxiosRequestConfig): Promise<AxiosResponse<P>> {
    return this.request<P>('put', url, {
      data,
      ...config
    })
  }

  public delete<T, P>(
    url: string,
    data?: T,
    config?: AxiosRequestConfig
  ): Promise<AxiosResponse<P>> {
    return this.request<P>('delete', url, {
      data,
      ...config
    })
  }
}

export default BaseService
