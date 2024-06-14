<template>
  <div></div>
  <div v-show="extended" class="filter-input-group"></div>
</template>
<script lang="ts" setup>
import type { TableConfig } from '@/types/general.type'
import { onMounted, ref } from 'vue'

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
<style scoped></style>
