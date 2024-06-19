<template>
  <div class="form-control">
    <div class="label">
      <label class="label-text text-xs font-bold">{{ filter.display }}</label>
    </div>
    <select v-model="model" class="select select-bordered select-sm" @change="changeHandler">
      <option disabled selected>{{ filter.placeholder ?? '' }}</option>
      <option v-for="(value, key) in options" :value="key">{{ value }}</option>
    </select>
  </div>
</template>
<script lang="ts" setup>
import { ref } from 'vue'

const props = defineProps<{
  filter: {
    display: string
    placeholder?: string
  }
  options: { [key: string]: string }
  initialValue?: string
}>()
const emit = defineEmits(['updateValue'])
const model = ref()

function changeHandler() {
  if (model.value !== undefined) {
    emit('updateValue', model.value)
  }
}
</script>
