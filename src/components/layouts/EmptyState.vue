<template>
  <Box class="min-h-[375px]">
    <div class="my-auto">
      <div class="flex justify-center">
        <img class="state-img" src="@/assets/images/state_none.png" alt="empty-state" />
      </div>
      <div class="flex justify-center">
        <p class="text-lg text-gray-500 text-center font-bold">요청하신 목록을 찾을 수 없습니다</p>
      </div>
      <div class="flex justify-center">
        <p class="text-sm text-gray-400 text-center">
          요청하신 항목에 대한 검색결과가 없습니다. 검색어를 수정하거나 다시 시도해 보세요.
        </p>
      </div>
    </div>
  </Box>
</template>
<script setup lang="ts">
import Box from '@/components/layouts/Box.vue'
</script>
<style scoped>
.state-img {
  width: 64px;
  height: 64px;
  margin-bottom: 1.5rem;
}
</style>
