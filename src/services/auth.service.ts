import { ApiService } from '@/services/api.service'
import { useAuthStore } from '@/stores/auth.store'
import type { LoginResponse } from '@/types/auth.type'

export class AuthService extends ApiService {
  readonly auth: any

  constructor() {
    super('auth')
    this.auth = useAuthStore()
  }

  async login(userId: string, password: string): Promise<void> {
    const res = await this.api.post('/login', { userId, password })
    const auth = useAuthStore()
    const token = this.unpackRes(res) as LoginResponse
    console.log('???', token)
    auth.setJwt(token.accessToken)
  }

  async logout(): Promise<void> {
    this.auth.setJwt('')
  }

  async createAdmin(params: { loginId: string; pwd: string; name: string }): Promise<void> {
    await this.auth().api.post('/new', params)
  }
}
