<template>
  <header class="navbar header-fixed">
    <div class="flex-none dropdown">
      <div tabindex="1" class="btn btn-ghost" role="button">
        <i class="bx bx-menu bx-sm"></i>
      </div>
      <ul tabindex="1" class="dropdown-content z-[11] menu p-2 shadow bg-base-100 rounded-box w-52">
        <li><a href="/">대시보드</a></li>
        <li><a href="/user">사용자 관리</a></li>
        <li><a href="/user/new">사용자 생성</a></li>
        <li><a href="/post">게시물 관리</a></li>
        <li><a href="/group">그룹 관리</a></li>
        <li><a href="/group/new">그룹 생성</a></li>
      </ul>
    </div>
    <div class="flex-1">
      <a class="btn btn-ghost text-xl">daisyUI</a>
    </div>
    <div class="flex-none">
      <button class="btn btn-ghost">
        <i class="bx bx-dots-horizontal-rounded bx-sm"></i>
      </button>
    </div>
  </header>
</template>
<script setup lang="ts"></script>
<style scoped>
.header-fixed {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 10;
  background: #fff;
  border-bottom: 1px solid #ddd;
}
</style>
