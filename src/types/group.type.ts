export interface GroupResponse {
  id: number
  ref: string
  creator: number
  creatorName: string
  creatorRef: string
  groupName: string
  profileImg: string | null
  coverImg: string | null
  introduce: string
  isShow: number
  createdAt: Date
  updatedAt: Date
}

export interface CreateGroupRequest {
  creatorRef: string
  groupName: string
}
