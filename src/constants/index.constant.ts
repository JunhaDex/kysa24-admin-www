import type { PageResponse } from '@/types/general.type'

export const PAGINATOR_MAX_LENGTH = 5
export const SIZE_PER_PAGE = 15
export const EMPTY_PAGE: PageResponse<any> = {
  meta: {
    pageNo: 1,
    pageSize: SIZE_PER_PAGE,
    totalPage: 1,
    totalCount: 0
  },
  list: []
}
