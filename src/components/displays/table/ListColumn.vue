<template>
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
    @filter-change="filterChange"
  />
  <Box class="mt-5">
    <div class="overflow-x-auto">
      <table class="table table-zebra">
        <thead>
          <tr>
            <th v-if="tableConfig.selectable">
              <input
                type="checkbox"
                class="checkbox checkbox-sm"
                :checked="selected.length === data.list.length"
                @change="selectAll"
              />
            </th>
            <th>색인</th>
            <th v-for="(header, idx) in Object.values(tableConfig.columns)" :key="idx">
              {{ header.display }}
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(listItem, i) in data.list" class="hover" :key="`raw-${i}`">
            <td v-if="tableConfig.selectable">
              <input
                type="checkbox"
                class="checkbox checkbox-sm"
                :checked="selected.includes(pgn + (i + 1))"
                @change="toggleSelected(pgn + (i + 1))"
              />
            </td>
            <td>{{ pgn + (i + 1) }}</td>
            <td v-for="key in Object.keys(tableConfig.columns)" :key="key">
              <Avatar v-if="tableConfig.columns[key].contentType === 'image'" />
              <Badge
                v-else-if="tableConfig.columns[key].contentType === 'badge'"
                :index="key"
                :label="listItem.name"
              />
              <p v-else>{{ listItem.name }}</p>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <Paginate :meta="data.meta" />
  </Box>
</template>
<script lang="ts" setup>
import { computed, ref } from 'vue'
import type { PageResponse, TableConfig } from '@/types/general.type'
import Filter from '@/components/displays/table/Filter.vue'
import Box from '@/components/layouts/Box.vue'
import Badge from '@/components/displays/Badge.vue'
import Avatar from '@/components/displays/Avatar.vue'
import Paginate from '@/components/displays/table/Paginate.vue'

const filterExtended = ref(false)
const props = defineProps<{
  data: PageResponse<unknown>
  tableConfig: TableConfig
  options?: {
    inputSupport?: any
  }
}>()

const pgn = computed(() => {
  return props.data.meta.pageSize * (props.data.meta.pageNo - 1)
})
const emit = defineEmits(['filterChange', 'tableAction'])
const selected = ref<number[]>([])

function actTableItem(action: string, item: any) {
  emit('tableAction', { action, item })
}

function filterChange(payload: any) {
  emit('filterChange', payload)
}

function toggleFilter() {
  filterExtended.value = !filterExtended.value
}

function selectAll() {
  if (selected.value.length === data.value.list.length) {
    selected.value = []
  } else {
    selected.value = data.value.list.map((_, i) => pgn.value + (i + 1))
  }
}

function toggleSelected(item: number) {
  selected.value = selected.value.filter(
    (i) => pgn.value < i && i <= pgn.value + props.data.list.length
  )
  if (selected.value.includes(item)) {
    selected.value = selected.value.filter((i) => i !== item)
  } else {
    selected.value.push(item)
  }
}
</script>
<style scoped></style>
