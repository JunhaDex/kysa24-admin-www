<template>
  <div class="card">
    <slot />
  </div>
</template>
<script lang="ts" setup></script>
<style scoped>
.card {
  background-color: #fff;
  border-radius: 4px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  padding: 22px;
}
</style>
