import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useAuthStore = defineStore('auth', () => {
  const jwt = ref('')

  function setJwt(token: string) {
    jwt.value = token
  }

  return {
    jwt,
    setJwt
  }
}, {
  persist: true
})
