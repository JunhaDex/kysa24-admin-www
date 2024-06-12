import { ApiService } from '@/services/api.service'
import { cleanRequestObj } from '@/utils/index.util'

export class UserService extends ApiService {
  constructor() {
    super('user')
  }

  async listUser(query?: {
    page?: number
    size?: number
    name?: string
    teamName?: string
  }): Promise<void> {
    const res = await this.api.get('/', { params: query })
    return this.unpackRes(res)
  }

  async createUser(): Promise<void> {}

  async blockUser(): Promise<void> {}

  async changePwdUser(): Promise<void> {}
}
