<template>
  <a
    class="text-blue-500 underline"
    :href="linkItem.url"
    :target="linkItem.isBlank ? '_blank' : '_self'"
  >
    {{ linkItem.label }}
  </a>
</template>
<script lang="ts" setup>
import type { LinkItem } from '@/types/general.type'

const props = defineProps<{
  linkItem: LinkItem
}>()
</script>
