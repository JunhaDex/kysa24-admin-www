<template>
  <PageView>
    <template #header>
      <Header />
    </template>
    <template #main>
      <Container title="사용자 관리하기">
        <EmptyState v-if="!onLoad" />
        <ListColumn
          v-else
          :table-config="UserTable"
          :data="users as PageResponse<UserResponse>"
          @table-action="tableActionHandler"
          @filter-change="updateFilter"
          @load-page="updatePage"
        />
      </Container>
    </template>
    <template #footer>
      <Footer />
    </template>
  </PageView>
  <ChangePwdModal :user-ref="userSelected" ref="changePwdModal" />
  <BlockUserModal :user-ref="userSelected" ref="blockUserModal" />
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
import ChangePwdModal from '@/components/addons/modal/ChangePwdModal.vue'
import BlockUserModal from '@/components/addons/modal/BlockUserModal.vue'
import { SIZE_PER_PAGE } from '@/constants/index.constant'

const userSvc = new UserService()
const users = ref<PageResponse<UserResponse>>()
const onLoad = ref<boolean>(false)
const changePwdModal = ref()
const blockUserModal = ref()
const userSelected = ref<string>('')
const filter = ref()

onMounted(async () => {
  await fetchPage()
  if (users.value && users.value.list.length) {
    onLoad.value = true
  }
})

async function fetchPage() {
  users.value = await userSvc.listUser({
    page: users.value?.meta.pageNo ?? 1,
    size: users.value?.meta.pageSize ?? SIZE_PER_PAGE,
    name: filter.value?.name,
    teamName: filter.value?.teamName
  })
}

async function updatePage(payload: any) {
  users.value!.meta.pageNo = payload
  await fetchPage()
}

async function updateFilter(payload: any) {
  filter.value = payload
  await fetchPage()
}

async function tableActionHandler(payload: { action: string; items: any[] }) {
  // guard
  if (payload.items.length !== 1) {
    window.alert('Please select one user')
    return
  }
  // runner
  switch (payload.action) {
    case 'changePwd':
      userSelected.value = payload.items[0].ref
      changePwdModal.value.toggleModal()
      break
    case 'blockUser':
      userSelected.value = payload.items[0].ref
      blockUserModal.value.toggleModal()
      break
    default:
      break
  }
  await fetchPage()
}
</script>
<style scoped></style>
