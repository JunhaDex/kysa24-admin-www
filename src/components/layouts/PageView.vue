<template>
  <slot name="header" />
  <main>
    <slot name="main" />
  </main>
  <slot name="footer" />
</template>
<script setup lang="ts"></script>
<style scoped>
/* height: calc(100vh - var(--footer-height)); */
main {
  min-height: calc(100vh - var(--header-height) - var(--footer-height));
  padding-top: 20px;
  display: flex;
  flex-direction: column;
}
</style>
