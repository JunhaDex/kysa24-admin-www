export interface PostResponse {
  id: number
  author: number
  authorName: string
  authorRef: string
  image: string | null
  message: string
  groupId: number
  groupName: string
  groupRef: string
  createdAt: string
  updatedAt: string
}
