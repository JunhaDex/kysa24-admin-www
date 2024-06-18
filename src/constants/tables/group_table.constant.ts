import type { TableConfig } from '@/types/general.type'

export const GroupTable: TableConfig = {
  title: '그룹 목록',
  selectable: true,
  actionable: true,
  filters: {
    groupName: { display: '이름', type: 'text' }
  },
  columns: {
    profileImg: { display: '프로필', contentType: 'image' },
    groupName: { display: '이름' },
    ref: { display: '그룹 키', contentType: 'short' },
    creatorName: { display: '생성자' },
    creatorRef: { display: '생성자 키', contentType: 'short' },
    introduce: { display: '소개', contentType: 'text' },
    coverImg: { display: '커버 이미지', contentType: 'link' },
    isShow: { display: '노출 여부', contentType: 'badge' },
    createdAt: { display: '생성일', contentType: 'datetime' },
    updatedAt: { display: '수정일', contentType: 'datetime' }
  },
  actions: [
    {
      label: '그룹 삭제',
      emission: 'deleteGroup'
    }
  ]
}
