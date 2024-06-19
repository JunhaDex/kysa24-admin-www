<template>
  <PageView>
    <template #header>
      <Header />
    </template>
    <template #main>
      <Container v-if="!onLoad">
        <EmptyState />
      </Container>
      <template v-else>
        <Container title="조 등록정보">
          <Box>foo bar</Box>
          <ListColumn
            :table-config="TeamLeaderTable"
            :data="team!.leader"
            :options="{
              isNoFilter: true,
              isNoPaginate: true
            }"
          />
        </Container>
        <Container title="소속 사용자 관리하기">
          <ListColumn
            :table-config="TeamMemberTable"
            :data="users!"
            :options="{
              isNoFilter: true,
              isNoPaginate: true
            }"
          />
        </Container>
      </template>
    </template>
    <template #footer>
      <Footer />
    </template>
  </PageView>
</template>
<script lang="ts" setup>
import { onMounted, ref } from 'vue'
import PageView from '@/components/layouts/PageView.vue'
import Header from '@/components/surfaces/Header.vue'
import Footer from '@/components/surfaces/Footer.vue'
import Container from '@/components/layouts/Container.vue'
import Box from '@/components/layouts/Box.vue'
import EmptyState from '@/components/layouts/EmptyState.vue'
import ListColumn from '@/components/displays/table/ListColumn.vue'
import { UserService } from '@/services/user.service'
import { useRoute } from 'vue-router'
import type { TeamResponse, UserResponse } from '@/types/user.type'
import type { PageResponse } from '@/types/general.type'
import { EMPTY_PAGE } from '@/constants/index.constant'
import { TeamLeaderTable, TeamMemberTable } from '@/constants/tables/team_table.constant'

const userSvc = new UserService()
const route = useRoute()
const onLoad = ref<boolean>(false)
const team = ref<{ team: TeamResponse; leader: PageResponse<UserResponse> }>()
const users = ref<PageResponse<UserResponse>>()
onMounted(async () => {
  const tid = Number(route.params.tid)
  if (!isNaN(tid)) {
    const res = await userSvc.listUserByTeam(tid)
    const leaderPg = JSON.parse(JSON.stringify(EMPTY_PAGE))
    leaderPg.meta.totalCount = 1
    leaderPg.list = res.users.filter((usr) => usr.id === res.team.leader)
    team.value = {
      team: res.team,
      leader: leaderPg
    }
    const teamUserPg = JSON.parse(JSON.stringify(EMPTY_PAGE))
    teamUserPg.meta.totalCount = res.users.length
    teamUserPg.list = res.users
    users.value = teamUserPg
    onLoad.value = true
    return
  }
  window.location.href = '/404'
})
</script>
<style scoped></style>
