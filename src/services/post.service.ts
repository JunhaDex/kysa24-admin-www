import { ApiService } from '@/services/api.service'
import type { PageResponse } from '@/types/general.type'
import type { PostResponse } from '@/types/post.type'
import { cleanRequestObj } from '@/utils/index.util'

export class PostService extends ApiService {
  constructor() {
    super('post')
  }

  async listPost(query?: {
    page?: number
    size?: number
    groupRef?: string
  }): Promise<PageResponse<PostResponse>> {
    const res = await this.auth().api.get('', {
      params: cleanRequestObj(query)
    })
    return this.unpackRes(res) as PageResponse<PostResponse>
  }

  async deletePost(pid: number): Promise<void> {
    await this.auth().api.delete(`/${pid}`)
  }
}
