import { ApiService } from '@/services/api.service'
import type {
  ChangePwdRequest,
  CreateUserRequest,
  UserBlockRequest,
  UserResponse,
  UsersByTeamResponse
} from '@/types/user.type'
import type { PageResponse } from '@/types/general.type'
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
  }): Promise<PageResponse<UserResponse>> {
    const res = await this.auth().api.get('', { params: cleanRequestObj(query) })
    return this.unpackRes(res) as PageResponse<UserResponse>
  }

  async createUser(register: CreateUserRequest): Promise<void> {
    await this.auth().api.post('/new', register)
  }

  async blockUser(userRef: string, status: UserBlockRequest): Promise<void> {
    await this.auth().api.put(`/${userRef}/block`, status)
  }

  async changePwdUser(userRef: string, change: ChangePwdRequest): Promise<void> {
    await this.auth().api.put(`/${userRef}/pwd`, change)
  }

  async listUserByTeam(teamId: number): Promise<UsersByTeamResponse> {
    const res = await this.auth().api.get(`team/${teamId}`)
    return this.unpackRes(res) as UsersByTeamResponse
  }
}
