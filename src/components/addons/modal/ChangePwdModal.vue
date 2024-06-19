<template>
  <Modal title="Change Pwd" :is-show="isShow" @modal-close="toggleModal">
    <form onsubmit="return false">
      <InputField
        :filter="{
          display: 'New Password',
          type: 'password',
          placeholder: '******'
        }"
        @update-value="handleUserInput"
      />
      <div class="modal-action">
        <button class="btn btn-primary btn-sm" @click="updatePwd">Change</button>
      </div>
    </form>
  </Modal>
</template>
<script setup lang="ts">
import Modal from '@/components/feedbacks/Modal.vue'
import InputField from '@/components/inputs/InputField.vue'
import { ref } from 'vue'
import { UserService } from '@/services/user.service'

const props = defineProps<{
  userRef: string
}>()
defineExpose({ toggleModal })
const userSvc = new UserService()
const newPwd = ref('')
const isShow = ref(false)

function toggleModal() {
  console.log('open!')
  isShow.value = !isShow.value
}

function handleUserInput(value: string) {
  newPwd.value = value
}

async function updatePwd() {
  try {
    await userSvc.changePwdUser(props.userRef, { newPwd: newPwd.value })
    isShow.value = false
    window.alert('Password changed successfully')
  } catch (e: any) {
    console.error(e)
    isShow.value = false
    window.alert('Failed to change password' + e.message)
  }
}
</script>
