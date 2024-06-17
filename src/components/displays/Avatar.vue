<template>
  <div class="avatar">
    <div class="img-wrap rounded-2xl">
      <img src="@/assets/images/user_default.png" alt="avatar" class="rounded-2xl" />
    </div>
  </div>
</template>
<script lang="ts" setup>
const props = withDefaults(
  defineProps<{
    src: string
  }>(),
  {
    src: ''
  }
)
</script>
<style scoped>
.img-wrap {
  width: 24px;
  height: 24px;
}
</style>
