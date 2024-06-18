<template>
  <div class="flex align-middle">
    <div class="code-wrap text-xs font-mono p-1 flex-1 mr-1">
      {{ display }}
    </div>
    <i class="bx bx-copy mt-1" role="button" @click="copyHandler"></i>
  </div>
</template>
<script lang="ts" setup>
const props = defineProps<{
  display: string
  original: string
}>()

function copyHandler() {
  navigator.clipboard.writeText(props.original)
}
</script>
<style scoped>
.code-wrap {
  display: inline-block;
  background-color: #f5f5f5;
  border-radius: 8px;
}
</style>
