<template>
  <PageView>
    <template #header>
      <Header />
    </template>
    <template #main>
      <Container title="포스트 관리하기">
        <EmptyState v-if="!onLoad" />
        <ListColumn v-else :table-config="PostTable" :data="posts as PageResponse<PostResponse>" />
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

onMounted(async () => {
  posts.value = await postSvc.listPost()
  if (posts.value && posts.value.list.length) {
    onLoad.value = true
  }
})
</script>
<style scoped></style>
