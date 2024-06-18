import type { TableConfig } from '@/types/general.type'

export const PostTable: TableConfig = {
  title: '게시글 목록',
  selectable: true,
  actionable: true,
  filters: {
    groupRef: { display: '그룹', type: 'text' }
  },
  columns: {
    createdAt: { display: '작성일', contentType: 'datetime' },
    groupName: { display: '그룹' },
    groupRef: { display: '그룹 키', contentType: 'short' },
    authorName: { display: '작성자' },
    authorRef: { display: '작성자 키', contentType: 'short' },
    image: { display: '이미지', contentType: 'link' },
    message: { display: '내용', contentType: 'text' }
  },
  actions: [
    {
      label: '게시글 삭제',
      emission: 'deletePost'
    }
  ]
}
