import type { TableConfig } from '@/types/general.type'

export const UserTable: TableConfig = {
  title: '사용자 목록',
  selectable: true,
  actionable: true,
  filters: {
    name: { display: '이름', type: 'text' },
    teamName: { display: '조', type: 'text' }
  },
  columns: {
    profileImg: { display: '프로필', contentType: 'image' },
    name: { display: '이름' },
    nickname: { display: '닉네임' },
    ref: { display: '유저 키', contentType: 'short' },
    sex: { display: '성별', contentType: 'badge' },
    age: { display: '나이' },
    dob: { display: '생년월일', contentType: 'date' },
    authId: { display: '아이디' },
    teamName: { display: '조' },
    geo: { display: '지역' },
    actStatus: { display: '상태', contentType: 'badge' }
  },
  actions: [
    {
      label: '비밀번호 변경',
      emission: 'changePwd'
    },
    {
      label: '사용자 차단',
      emission: 'blockUser'
    }
  ]
} as const
