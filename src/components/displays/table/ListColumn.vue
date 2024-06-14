<template>
  <Container>
    <h2>{{ tableConfig.title }}</h2>
    <div class="table-tools flex justify-end">
      <button class="btn btn-outline btn-sm ml-3" @click="toggleFilter">Filter</button>
      <button
        v-for="action in tableConfig.actions ?? []"
        class="btn btn-outline btn-sm ml-3"
        @click="() => actTableItem(action.emission, null)"
        :key="action.emission"
      >
        {{ action.label }}
      </button>
    </div>
    <Filter
      :filter-config="tableConfig.filters"
      :extended="filterExtended"
      :input-support="options?.inputSupport"
      @filter-change="filterChange"
    />
    <div class="overflow-x-auto">
      <table class="table table-zebra">
        <thead>
          <tr>
            <th>foo</th>
          </tr>
        </thead>
        <tbody>
          <tr class="hover">
            <td>bar</td>
          </tr>
          <tr class="hover">
            <td>baz</td>
          </tr>
        </tbody>
      </table>
    </div>
  </Container>
</template>
<script lang="ts" setup>
import type { TableConfig } from '@/types/general.type'
import Filter from '@/components/displays/table/Filter.vue'
import { ref } from 'vue'
import Container from '@/components/layouts/Container.vue'

const filterExtended = ref(false)
const props = defineProps<{
  tableConfig: TableConfig
  options?: {
    inputSupport?: any
  }
}>()

const emit = defineEmits(['filterChange', 'tableAction'])

function actTableItem(action: string, item: any) {
  emit('tableAction', { action, item })
}

function filterChange(payload: any) {
  emit('filterChange', payload)
}

function toggleFilter() {
  filterExtended.value = !filterExtended.value
}
</script>
<style scoped></style>
