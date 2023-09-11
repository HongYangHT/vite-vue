import { AxiosError, AxiosResponse, InternalAxiosRequestConfig } from 'axios'

export interface BaseServiceOptions {
  baseURL?: string
  basePath?: string
  timeout?: number
  requestInterceptor?: (config: InternalAxiosRequestConfig) => InternalAxiosRequestConfig
  responseInterceptor?: (
    response: AxiosResponse<ResponseDataType<DataType>, any>
  ) => AxiosResponse<ResponseDataType<DataType>, any>
  requestError?: (error: AxiosError) => void
  responseError?: (error: AxiosError) => void
}

export interface ResponseDataType<T> {
  code: number
  data: T
  messages?: string | string[]
}

export type DataType = Record<string, any>
