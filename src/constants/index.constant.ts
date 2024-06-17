import type { PageResponse } from '@/types/general.type'

export const PAGINATOR_MAX_LENGTH = 10
export const EMPTY_PAGE: PageResponse<any> = {
  meta: {
    pageNo: 1,
    pageSize: 15,
    totalPage: 1,
    totalCount: 0
  },
  list: []
}
