<template>
  <Modal title="Block User" :is-show="isShow" @modal-close="toggleModal">
    <form onsubmit="return false">
      <SelectField
        :filter="{
          display: '회원 상태',
          placeholder: '변경할 상태를 선택하세요.'
        }"
        :options="{
          0: '전체 차단',
          1: '전체 허용',
          2: '게시물 차단',
          3: '그룹 차단',
          4: '채팅 차단'
        }"
        @update-value="handleUserInput"
      />
      <div class="modal-action">
        <button class="btn btn-primary btn-sm" @click="blockUser">Change</button>
      </div>
    </form>
  </Modal>
</template>
<script setup lang="ts">
import Modal from '@/components/feedbacks/Modal.vue'
import { UserService } from '@/services/user.service'
import { ref } from 'vue'
import SelectField from '@/components/inputs/SelectField.vue'

const props = defineProps<{
  userRef: string
}>()

defineExpose({ toggleModal })
const userSvc = new UserService()
const status = ref<number>()
const isShow = ref(false)

function toggleModal() {
  isShow.value = !isShow.value
}

function handleUserInput(value: number) {
  status.value = value
}

async function blockUser() {
  try {
    await userSvc.blockUser(props.userRef, { level: status.value as any })
    isShow.value = false
    window.alert('User blocked successfully')
  } catch (e: any) {
    console.error(e)
    isShow.value = false
    window.alert('Failed to block user' + e.message)
  }
}
</script>
