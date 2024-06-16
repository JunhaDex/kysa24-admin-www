<template>
  <div>
    <button class="btn btn-ghost btn-xs w-6 text-lg mr-3">
      <i class="bx bx-filter"></i>
    </button>
    <div class="badge badge-md badge-info badge-outline mr-1">
      <i class="bx bxs-x-circle mr-1 cursor-pointer"></i>
      info
    </div>
  </div>
  <div class="filter-input-group" :class="[extended ? 'filter-expand' : 'filter-collapse']">
    <Box> somewhat </Box>
  </div>
</template>
<script lang="ts" setup>
import type { TableConfig } from '@/types/general.type'
import { onMounted, ref } from 'vue'
import Box from '@/components/layouts/Box.vue'

const props = defineProps<{
  filterConfig: TableConfig['filters']
  extended: boolean
  inputSupport?: any
}>()

const emit = defineEmits(['filterChange'])

const filterInputs = ref()
onMounted(() => {
  filterInputs.value = Object.keys(props.filterConfig).reduce((acc: any, key: string) => {
    acc[key] = undefined
    return acc
  }, {})
})

function updateFilter() {
  const filtered = Object.keys(filterInputs.value).reduce((acc: any, key: string) => {
    if (filterInputs.value[key]) {
      acc[key] = filterInputs.value[key]
    }
    return acc
  }, {})
  emit('filterChange', filtered)
}

function clearFilterByKey(key: string) {
  filterInputs.value[key] = undefined
  updateFilter()
}

function inputFilterByKey(key: string, value: any) {
  filterInputs.value[key] = value
}
</script>
<style scoped>
@keyframes expand {
  0% {
    max-height: 0;
  }
  100% {
    max-height: 500px; /* Adjust this value to fit your needs */
  }
}

@keyframes collapse {
  0% {
    max-height: 500px; /* Adjust this value to fit your needs */
  }
  100% {
    max-height: 0;
  }
}

.filter-expand {
  animation: expand 0.3s ease-in-out forwards;
}

.filter-collapse {
  animation: collapse 0.3s ease-in-out forwards;
}

.filter-input-group {
  max-height: 0;
  overflow: hidden;
}
</style>
