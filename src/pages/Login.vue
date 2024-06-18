<template>
  <PageView>
    <template #main>
      <Box class="login">
        <h1 class="font-bold">로그인</h1>
        <form onsubmit="return false">
          <InputField
            :filter="{
              display: '아이디',
              type: 'text',
              placeholder: '아이디를 입력해주세요'
            }"
            @update-value="userInputId"
          />
          <InputField
            :filter="{
              display: '비밀번호',
              type: 'password',
              placeholder: '******'
            }"
            @update-value="userInputPwd"
          />
          <div class="flex justify-center items-center mt-5">
            <button class="btn btn-primary btn-sm w-full" @click="login">로그인</button>
          </div>
        </form>
      </Box>
    </template>
    <template #footer>
      <Footer />
    </template>
  </PageView>
</template>
<script setup lang="ts">
import PageView from '@/components/layouts/PageView.vue'
import Container from '@/components/layouts/Container.vue'
import Footer from '@/components/surfaces/Footer.vue'
import Box from '@/components/layouts/Box.vue'
import InputField from '@/components/inputs/InputField.vue'
import { ref } from 'vue'
import type { LoginRequest } from '@/types/auth.type'
import { AuthService } from '@/services/auth.service'

const authSvc = new AuthService()
const userCred = ref<LoginRequest>({
  userId: '',
  password: ''
})

function userInputId(value: string) {
  userCred.value.userId = value
}

function userInputPwd(value: string) {
  userCred.value.password = value
}

async function login() {
  try {
    await authSvc.login(userCred.value.userId, userCred.value.password)
    window.location.href = '/'
  } catch (e) {
    console.error(e)
    errorHandling()
  }
}

function errorHandling() {
  userInputPwd('')
}
</script>
<style scoped>
.login {
  width: 327px;
  margin: auto;
}
</style>
