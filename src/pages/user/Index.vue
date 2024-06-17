<template>
  <PageView>
    <template #header>
      <Header />
    </template>
    <template #main>
      <Container title="사용자 관리하기">
        <EmptyState v-if="!onLoad" />
        <ListColumn v-else :table-config="UserTable" :data="users as PageResponse<UserResponse>" />
      </Container>
    </template>
    <template #footer>
      <Footer />
    </template>
  </PageView>
</template>
<script lang="ts" setup>
import { onMounted, ref } from 'vue'
import PageView from '@/components/layouts/PageView.vue'
import Container from '@/components/layouts/Container.vue'
import { UserService } from '@/services/user.service'
import type { PageResponse } from '@/types/general.type'
import type { UserResponse } from '@/types/user.type'
import EmptyState from '@/components/layouts/EmptyState.vue'
import ListColumn from '@/components/displays/table/ListColumn.vue'
import Header from '@/components/surfaces/Header.vue'
import Footer from '@/components/surfaces/Footer.vue'
import { UserTable } from '@/constants/tables/user_table.constant'

const userSvc = new UserService()
const users = ref<PageResponse<UserResponse>>()
const onLoad = ref<boolean>(false)

onMounted(async () => {
  console.log('mounted')
  users.value = await userSvc.listUser()
  if (users.value && users.value.list.length) {
    onLoad.value = true
  }
})
</script>
<style scoped></style>
