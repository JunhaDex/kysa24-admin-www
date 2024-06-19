import type { TableColumn } from '@/types/general.type'

const TeamTableColumns: { [key: string]: TableColumn } = {
  profileImg: { display: '프로필', contentType: 'image' },
  name: { display: '이름' },
  nickname: { display: '닉네임' },
  ref: { display: '유저 키', contentType: 'short' },
  sex: { display: '성별', contentType: 'badge' },
  age: { display: '나이' },
  dob: { display: '생년월일', contentType: 'date' },
  authId: { display: '아이디' },
  geo: { display: '지역' },
  actStatus: { display: '상태', contentType: 'badge' }
}

export const TeamLeaderTable = {
  title: '조장 목록',
  selectable: false,
  actionable: false,
  filters: {},
  columns: TeamTableColumns,
  actions: []
}
export const TeamMemberTable = {
  title: '조원 목록',
  selectable: true,
  actionable: true,
  filters: {},
  columns: TeamTableColumns,
  actions: [
    {
      label: '조장 변경하기',
      emission: 'changeLeader'
    },
    {
      label: '비밀번호 변경',
      emission: 'changePwd'
    },
    {
      label: '사용자 차단',
      emission: 'blockUser'
    }
  ]
}
