<template>
  <Container>
    <h2>{{ tableConfig.title }}</h2>
    <div class="table-tools flex justify-end">
      <button class="btn btn-outline btn-sm ml-3" @click="toggleFilter">
        <i class="bx bx-filter mr-1"></i>
        Filter
      </button>
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
            <th v-if="tableConfig.selectable">
              <input type="checkbox" class="checkbox checkbox-sm" />
            </th>
            <th>색인</th>
            <th v-for="header in Object.values(tableConfig.columns)">{{ header.display }}</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(listItem, i) in data.list" class="hover" :key="`raw-${i}`">
            <td v-if="tableConfig.selectable">
              <input type="checkbox" class="checkbox checkbox-sm" />
            </td>
            <td>{{ pgn + (i + 1) }}</td>
            <td v-for="key in Object.keys(tableConfig.columns)">{{ listItem.name }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </Container>
</template>
<script lang="ts" setup>
import { computed, ref } from 'vue'
import type { PageResponse, TableConfig } from '@/types/general.type'
import Filter from '@/components/displays/table/Filter.vue'
import Container from '@/components/layouts/Container.vue'

const filterExtended = ref(false)
const props = defineProps<{
  tableConfig: TableConfig
  options?: {
    inputSupport?: any
  }
}>()

const data = ref<PageResponse<any>>({
  meta: {
    pageNo: 1,
    pageSize: 15,
    totalPage: 1,
    totalCount: 3
  },
  list: [{ name: 'foo' }, { name: 'bar' }, { name: 'baz' }]
})

const pgn = computed(() => {
  return data.value.meta.pageSize * (data.value.meta.pageNo - 1)
})
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
