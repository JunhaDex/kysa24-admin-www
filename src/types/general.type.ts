export interface PageResponse<T> {
  meta: {
    pageNo: number
    pageSize: number
    totalPage: number
    totalCount: number
  }
  list: T[]
}
