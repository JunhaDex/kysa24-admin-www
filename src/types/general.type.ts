export interface PageResponse<T> {
  meta: {
    pageNo: number
    pageSize: number
    totalPage: number
    totalCount: number
  }
  list: T[]
}

export interface TableColumn {
  display: string
  contentType?: 'image' | 'link' | 'badge' | 'short' | 'date' | 'datetime' | 'text'
  align?: 'left' | 'center' | 'right'
}

export interface FilterItem {
  display: string
  type: 'text' | 'date'
}

export interface Actionable {
  label: string
  emission: string
}

export interface TableConfig {
  title: string
  selectable: boolean
  actionable: boolean
  filters: { [key: string]: FilterItem }
  columns: { [key: string]: TableColumn }
  actions?: Actionable[]
}
