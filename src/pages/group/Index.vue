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

const groupSvc = new GroupService()
const groups = ref<PageResponse<GroupResponse>>()
const onLoad = ref<boolean>(false)

onMounted(async () => {
  groups.value = await groupSvc.listGroup()
  if (groups.value && groups.value.list.length) {
    onLoad.value = true
  }
})
</script>
<style scoped></style>
