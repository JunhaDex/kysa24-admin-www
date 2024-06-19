<template>
  <PageView>
    <template #header>
      <Header />
    </template>
    <template #main>
      <Container title="그룹 관리하기">
        <EmptyState v-if="!onLoad" />
        <ListColumn
          v-else
          :table-config="GroupTable"
          :data="groups as PageResponse<GroupResponse>"
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
</template>
<script lang="ts" setup>
import { onMounted, ref } from 'vue'
import { GroupService } from '@/services/group.service'
import type { PageResponse } from '@/types/general.type'
import type { GroupResponse } from '@/types/group.type'
import { GroupTable } from '@/constants/tables/group_table.constant'
import PageView from '@/components/layouts/PageView.vue'
import Header from '@/components/surfaces/Header.vue'
import Footer from '@/components/surfaces/Footer.vue'
import Container from '@/components/layouts/Container.vue'
import EmptyState from '@/components/layouts/EmptyState.vue'
import ListColumn from '@/components/displays/table/ListColumn.vue'
import { SIZE_PER_PAGE } from '@/constants/index.constant'

const groupSvc = new GroupService()
const groups = ref<PageResponse<GroupResponse>>()
const onLoad = ref<boolean>(false)
const filter = ref()

onMounted(async () => {
  await fetchPage()
  if (groups.value && groups.value.list.length) {
    onLoad.value = true
  }
})

async function fetchPage() {
  groups.value = await groupSvc.listGroup({
    page: groups.value ? groups.value.meta.pageNo : 1,
    size: groups.value ? groups.value.meta.pageSize : SIZE_PER_PAGE,
    groupName: filter.value?.groupName
  })
}

async function updatePage(payload: any) {
  groups.value!.meta.pageNo = payload
  await fetchPage()
}

async function updateFilter(payload: any) {
  filter.value = payload
  await fetchPage()
}

function tableActionHandler(payload: { action: string; items: any[] }) {
  switch (payload.action) {
    case 'deleteGroup':
      if (payload.items.length !== 1) {
        window.alert('Please select one group')
        return
      }
      if (window.confirm('Are you sure to delete this group?')) {
        try {
          groupSvc.deleteGroup(payload.items[0].ref)
          window.location.reload()
        } catch (e: any) {
          console.error(e)
          window.alert('Failed to delete group' + e.message)
        }
      }
      break
    default:
      break
  }
}
</script>
<style scoped></style>
