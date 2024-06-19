import { ApiService } from '@/services/api.service'
import type { LinkItem, PageResponse } from '@/types/general.type'
import type { CreateGroupRequest, GroupResponse } from '@/types/group.type'
import { cleanRequestObj } from '@/utils/index.util'

export class GroupService extends ApiService {
  constructor() {
    super('group')
  }

  async listGroup(query?: { page?: number; size?: number; groupName?: string }): Promise<PageResponse<GroupResponse>> {
    const res = await this.auth().api.get('', {
      params: cleanRequestObj(query)
    })
    const groupPg = this.unpackRes(res) as PageResponse<GroupResponse>
    const linkKeys = ['coverImg'] as const
    for (const group of groupPg.list) {
      linkKeys.forEach((key) => {
        let linkItem: LinkItem
        switch (key) {
          case 'coverImg':
            linkItem = {
              label: `${group.groupName} 의 커버`,
              url: group.coverImg as unknown as string,
              isBlank: true
            }
            break
        }
        group[key] = linkItem
      })
    }
    return groupPg
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
