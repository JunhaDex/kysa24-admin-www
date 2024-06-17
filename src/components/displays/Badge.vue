<template>
  <div class="badge badge-md badge-info badge-outline mr-1" @click.self="clickHandler">
    <i v-if="removable" class="bx bxs-x-circle mr-1 cursor-pointer" @click="removeHandler"></i>
    {{ label }}
  </div>
</template>
<script lang="ts" setup>
const props = withDefaults(
  defineProps<{
    index: string | number
    label: string
    removable?: boolean
  }>(),
  {
    removable: false
  }
)

const emit = defineEmits(['clickBadge', 'removeBadge'])

function clickHandler() {
  console.log('click badge')
  emit('clickBadge', { index: props.index, label: props.label })
}

function removeHandler() {
  console.log('remove badge')
  emit('removeBadge', { index: props.index, label: props.label })
}
</script>
<style scoped></style>
