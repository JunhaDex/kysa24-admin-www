import { ApiService } from '@/services/api.service'
import type {
  ChangePwdRequest,
  CreateUserRequest,
  TeamListResponse,
  UserBlockRequest,
  UserResponse,
  UsersByTeamResponse
} from '@/types/user.type'
import type { LinkItem, PageResponse } from '@/types/general.type'
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
    const userPg = this.unpackRes(res) as PageResponse<UserResponse>
    const linkKeys = ['teamName', 'coverImg'] as const
    for (const user of userPg.list) {
      linkKeys.forEach((key) => {
        let linkItem: LinkItem
        switch (key) {
          case 'teamName':
            linkItem = {
              label: user.teamName as unknown as string,
              url: `user/team/${user.teamId}`,
              isBlank: false
            }
            break
          case 'coverImg':
            linkItem = {
              label: `${user.name} 의 커버`,
              url: user.coverImg as unknown as string,
              isBlank: true
            }
            break
        }
        user[key] = linkItem
      })
    }
    return userPg
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

  async listTeam(): Promise<TeamListResponse> {
    const res = await this.auth().api.get('team')
    return this.unpackRes(res) as TeamListResponse
  }
}
