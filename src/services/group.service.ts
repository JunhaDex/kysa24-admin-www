import { ApiService } from '@/services/api.service'
import type { PageResponse } from '@/types/general.type'
import type { CreateGroupRequest, GroupResponse } from '@/types/group.type'
import { cleanRequestObj } from '@/utils/index.util'

export class GroupService extends ApiService {
  constructor() {
    super('group')
  }

  async listGroup(query?: { page?: number; size?: number }): Promise<PageResponse<GroupResponse>> {
    const res = await this.auth().api.get('', {
      params: cleanRequestObj(query)
    })
    return this.unpackRes(res) as PageResponse<GroupResponse>
  }

  async createGroup(
    register: CreateGroupRequest,
    query?: {
      must?: boolean
      role?: 'writer' | 'reader'
    }
  ): Promise<void> {
    await this.auth().api.post('/new', register, {
      params: cleanRequestObj(query)
    })
  }

  async deleteGroup(groupRef: string): Promise<void> {
    await this.auth().api.delete(`/${groupRef}`)
  }
}
