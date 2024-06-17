<template>
  <div class="flex justify-center align-middle mt-3">
    <div class="join">
      <button class="btn btn-xs" :disabled="!hasBefore" @click="switchPage(meta.pageNo - 1)">
        «
      </button>
      <button
        v-for="i in count"
        class="btn btn-xs"
        :class="[begin + i === meta.pageNo ? 'btn-primary btn-outline' : 'btn-ghost']"
        :key="`pgn-${i}`"
        @click="switchPage(begin + i)"
      >
        {{ begin + i }}
      </button>
      <button class="btn btn-xs" :disabled="!hasNext" @click="switchPage(meta.pageNo + 1)">
        »
      </button>
    </div>
  </div>
</template>
<script setup lang="ts">
import type { PageResponse } from '@/types/general.type'
import { computed, onMounted } from 'vue'
import { PAGINATOR_MAX_LENGTH } from '@/constants/index.constant'

const props = defineProps<{
  meta: PageResponse<any>['meta']
}>()

const emit = defineEmits(['selectNextPage'])

const begin = computed(() => {
  return Math.floor(props.meta.pageNo / PAGINATOR_MAX_LENGTH) * PAGINATOR_MAX_LENGTH
})
const count = computed(() => {
  return begin.value + PAGINATOR_MAX_LENGTH < props.meta.totalPage
    ? PAGINATOR_MAX_LENGTH
    : props.meta.totalPage - begin.value
})
const hasBefore = computed(() => {
  return props.meta.pageNo > 1
})
const hasNext = computed(() => {
  return props.meta.pageNo < props.meta.totalPage
})

function switchPage(page: number) {
  if (page === props.meta.pageNo) return
  emit('selectNextPage', page)
}
</script>
