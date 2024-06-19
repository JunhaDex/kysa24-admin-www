import type { LinkItem } from '@/types/general.type'

export interface UserResponse {
  id: number
  ref: string
  name: string
  sex: number
  age: number
  dob: Date
  nickname: string
  authId: string
  teamId: number
  teamName: LinkItem
  profileImg: string
  coverImg: LinkItem
  introduce: string
  geo: string
  actStatus: number
  createdAt: Date
  updatedAt: Date
}

export interface TeamResponse {
  id: number
  teamName: string
  leader: number // user fk - find from user list below
  createdAt: Date
  updatedAt: Date
}

export interface TeamListResponse {
  list: { id: number; teamName: string }[]
  meta: {
    totalCount: number
  }
}

export interface UsersByTeamResponse {
  team: TeamResponse
  users: UserResponse[]
}

export interface CreateUserRequest {
  name: string
  sex: 'm' | 'f' | ''
  nickname: string
  id: string
  pwd: string
  teamName: string
  geo: string
  dob: string // 'yyyy-MM-dd'
}

/**
 * 0: block all, 1: allow all, 2: block post, 3: block group, 4: block chat
 */
export interface UserBlockRequest {
  level: 0 | 1 | 2 | 3 | 4
}

export interface ChangePwdRequest {
  oldPwd: string
  newPwd: string
}
