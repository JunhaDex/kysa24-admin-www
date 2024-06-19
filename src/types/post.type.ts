import type { LinkItem } from '@/types/general.type'

export interface PostResponse {
  id: number
  author: number
  authorName: string
  authorRef: string
  image: LinkItem | null
  message: string
  groupId: number
  groupName: string
  groupRef: string
  createdAt: string
  updatedAt: string
}
