import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios"
import router from '@/router'

export class ApiService {
  private static instance: ApiService
  private readonly axiosInstance: AxiosInstance
  private interceptor: number | null
  public baseURL: string

  constructor() {
    this.baseURL = 'https://jsonplaceholder.typicode.com'
    this.interceptor = null
    
    this.axiosInstance = axios.create({
      baseURL: this.baseURL,
      headers: {
        'Content-Type': 'application/json',
        'X-Requested-With': 'XMLHttpRequest'
      }
    })
  }

  public static getInstance(): ApiService {
    if (!ApiService.instance) {
      ApiService.instance = new ApiService()
    }
    return ApiService.instance
  }

  public init() {
    this.mountErrorInterceptor()
  }

  public mountErrorInterceptor() {
    this.interceptor = this.axiosInstance.interceptors.response.use(
      (response: any) => response,
      (error: any) => {
        if (error.response) {
          switch (error.response.status) {
            case 404:
              router.push({ name: 'not-found' })
              break
            case 500:
              router.push({ name: 'error' })
              break
          }
        }
        return Promise.reject(error)
      }
    )
  }

  public unmountErrorInterceptor() {
    if (this.interceptor) {
      this.axiosInstance.interceptors.response.eject(this.interceptor)
      this.interceptor = null
    }
  }

  public async get<T>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    return await this.axiosInstance.get<T>(url, config)
  }
}

export const apiService = ApiService.getInstance()