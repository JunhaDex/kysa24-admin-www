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
  contentType?: 'image' | 'link' | 'badge'
  align?: 'left' | 'center' | 'right'
}

export interface FilterItem {
  display: string
  type: 'text' | 'select' | 'date'
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
