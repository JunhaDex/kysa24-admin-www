import { ApiService } from '@/services/api.service'
import type { LinkItem, PageResponse } from '@/types/general.type'
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
    const postPg = this.unpackRes(res) as PageResponse<PostResponse>
    const linkKeys = ['image'] as const
    for (const post of postPg.list) {
      linkKeys.forEach((key) => {
        let linkItem: LinkItem
        switch (key) {
          case 'image':
            linkItem = {
              label: `이미지 미리보기`,
              url: post.image as unknown as string,
              isBlank: true
            }
            break
        }
        post[key] = linkItem
      })
    }
    return postPg
  }

  async deletePost(pid: number): Promise<void> {
    await this.auth().api.delete(`/${pid}`)
  }
}
