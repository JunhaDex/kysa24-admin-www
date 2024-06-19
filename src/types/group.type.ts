import type { LinkItem } from '@/types/general.type'

export interface GroupResponse {
  id: number
  ref: string
  creator: number
  creatorName: string
  creatorRef: string
  groupName: string
  profileImg: string | null
  coverImg: LinkItem | null
  introduce: string
  isShow: number
  createdAt: Date
  updatedAt: Date
}

export interface CreateGroupRequest {
  creatorRef: string
  groupName: string
}
