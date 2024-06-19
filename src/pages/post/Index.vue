<template>
  <PageView>
    <template #header>
      <Header />
    </template>
    <template #main>
      <Container title="포스트 관리하기">
        <EmptyState v-if="!onLoad" />
        <ListColumn
          v-else
          :table-config="PostTable"
          :data="posts as PageResponse<PostResponse>"
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
import { PostService } from '@/services/post.service'
import type { PageResponse } from '@/types/general.type'
import type { PostResponse } from '@/types/post.type'
import { PostTable } from '@/constants/tables/post_table.constant'
import PageView from '@/components/layouts/PageView.vue'
import Container from '@/components/layouts/Container.vue'
import EmptyState from '@/components/layouts/EmptyState.vue'
import ListColumn from '@/components/displays/table/ListColumn.vue'
import Header from '@/components/surfaces/Header.vue'
import Footer from '@/components/surfaces/Footer.vue'

const postSvc = new PostService()
const posts = ref<PageResponse<PostResponse>>()
const onLoad = ref<boolean>(false)
const filter = ref()

onMounted(async () => {
  await fetchPage()
  if (posts.value && posts.value.list.length) {
    onLoad.value = true
  }
})

async function fetchPage() {
  posts.value = await postSvc.listPost({
    page: posts.value?.meta.pageNo ?? 1,
    size: posts.value?.meta.pageSize ?? 10,
    groupRef: filter.value?.groupRef
  })
}

async function updatePage(payload: any) {
  posts.value!.meta.pageNo = payload
  await fetchPage()
}

async function updateFilter(payload: any) {
  filter.value = payload
  await fetchPage()
}

function tableActionHandler(payload: { action: string; items: any[] }) {
  switch (payload.action) {
    case 'deletePost':
      if (payload.items.length !== 1) {
        window.alert('Please select one post')
        return
      }
      if (!window.confirm('Are you sure you want to delete this post?')) {
        try {
          postSvc.deletePost(payload.items[0].id)
          window.location.reload()
        } catch (e: any) {
          console.error(e)
          window.alert('Failed to delete post' + e.message)
        }
      }
      break
    default:
      break
  }
}
</script>
<style scoped></style>
