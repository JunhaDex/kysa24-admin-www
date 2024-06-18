<template>
  <div v-if="!isEmpty">
    <button class="btn btn-ghost btn-xs w-6 text-lg mr-3">
      <i class="bx bx-filter"></i>
    </button>
    <Badge
      v-for="key in Object.keys(filterInputs).filter((i) => filterInputs[i] !== undefined)"
      :index="key"
      :label="filterInputs[key]"
      removable
      :key="`fb-${key}`"
      @remove-badge="removeBadge"
    />
  </div>
  <div class="filter-input-group" :class="[extended ? 'filter-expand' : 'filter-collapse']">
    <Box class="mt-4">
      <form onsubmit="return false">
        <InputField
          v-for="(filter, key) in filterConfig"
          ref="inputRefs"
          :key="`f-${key}`"
          :filter="filter"
          prefix="search"
          @update-value="inputFilterByKey(key, $event)"
        />
        <div class="flex justify-center items-center mt-5">
          <button class="btn btn-ghost btn-sm w-[18%] min-w-[4rem] mr-4" @click="clearAll">
            초기화
          </button>
          <button class="btn btn-primary btn-sm w-[18%] min-w-[4rem]" @click="updateFilter">
            검색
          </button>
        </div>
      </form>
    </Box>
  </div>
</template>
<script lang="ts" setup>
import type { TableConfig } from '@/types/general.type'
import { computed, onMounted, ref } from 'vue'
import Box from '@/components/layouts/Box.vue'
import InputField from '@/components/inputs/InputField.vue'
import Badge from '@/components/displays/Badge.vue'

const props = defineProps<{
  filterConfig: TableConfig['filters']
  prefill?: { [key: string]: string }
}>()

const extended = ref(false)
const emit = defineEmits(['filterChange'])
defineExpose({ toggleFilter })

const filterInputs = ref()
const inputRefs = ref([])
const isEmpty = computed(() => {
  if (filterInputs.value) {
    return Object.values(filterInputs.value).every((v: any) => v === undefined)
  }
  return true
})

onMounted(() => {
  filterInputs.value = Object.keys(props.filterConfig).reduce((acc: any, key: string) => {
    if (props.prefill && props.prefill[key]) {
      acc[key] = props.prefill[key]
    } else {
      acc[key] = undefined
    }
    return acc
  }, {})
  console.log('filterInputs', filterInputs.value)
  console.log('isEmpty', isEmpty.value)
})

function toggleFilter() {
  extended.value = !extended.value
}

function updateFilter() {
  const filtered = Object.keys(filterInputs.value).reduce((acc: any, key: string) => {
    if (filterInputs.value[key]) {
      acc[key] = filterInputs.value[key]
    }
    return acc
  }, {})
  clearInputRefs()
  emit('filterChange', filtered)
}

function clearInputRefs() {
  inputRefs.value.forEach((ref: any) => {
    ref.clear()
  })
}

function clearAll() {
  filterInputs.value = Object.keys(filterInputs.value).reduce((acc: any, key: string) => {
    acc[key] = undefined
    return acc
  }, {})
  updateFilter()
}

function clearFilterByKey(key: string | number) {
  filterInputs.value[key] = undefined
  updateFilter()
}

function removeBadge(payload: { index: string | number; label: string }) {
  clearFilterByKey(payload.index)
}

function inputFilterByKey(key: string | number, value: any) {
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
