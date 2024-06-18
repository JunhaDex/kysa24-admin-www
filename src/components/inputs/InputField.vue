<template>
  <div class="form-control w-full">
    <div class="label">
      <label class="label-text text-xs font-bold">{{ filter.display }}</label>
    </div>
    <span class="input input-bordered input-sm flex items-center gap-2">
      <i v-if="prefix" :class="prefixClass"></i>
      <input
        v-model="model"
        class="grow"
        :type="filter.type"
        :placeholder="filter.placeholder ?? ''"
        @focusout="focusoutHandler"
      />
    </span>
  </div>
</template>
<script lang="ts" setup>
import { computed, onMounted, ref } from 'vue'

const prefixClass = computed(() => {
  switch (props.prefix) {
    case 'search':
      return 'bx bx-search'
    default:
      return ''
  }
})
const props = defineProps<{
  filter: {
    display: string
    type: string
    placeholder?: string
  }
  prefix?: 'search'
  initialValue?: string
}>()
const emit = defineEmits(['updateValue'])
defineExpose({ clear: clearHandler })
const model = ref('')

onMounted(() => {
  model.value = props.initialValue ?? ''
})

function focusoutHandler() {
  const clean = model.value.trim()
  if (clean) {
    emit('updateValue', clean.length > 0 ? clean : undefined)
  }
}

function clearHandler() {
  model.value = ''
}
</script>
