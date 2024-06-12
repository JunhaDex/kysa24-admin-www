import axios, { type AxiosInstance, type AxiosResponse } from 'axios'
import { useAuthStore } from '@/stores/auth.store'

export abstract class ApiService {
  protected readonly api: AxiosInstance

  protected constructor(resource: string) {
    this.api = axios.create({
      baseURL: `${import.meta.env.VITE_API_BASE_URL}/${resource}`,
      headers: {
        'Content-Type': 'application/json'
      }
    })
  }

  async auth(): Promise<this> {
    const auth = useAuthStore()
    const token = auth.jwt
    if (token) {
      this.api.defaults.headers.common['Authorization'] = `Bearer ${auth.jwt}`
      return this
    }
    throw new Error('token not found')
  }

  unpackRes(res: AxiosResponse): unknown {
    return res.data.result
  }

}
