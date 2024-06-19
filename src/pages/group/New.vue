<template>
  <PageView>
    <template #header>
      <Header />
    </template>
    <template #main>
      <Container title="그룹 생성하기">
        <Box>
          <form onsubmit="return false">
            <InputField
              :filter="{
                display: '사용자 고유키',
                type: 'text',
                placeholder: '사용자 고유키'
              }"
              @update-value="handleUserInput('creatorRef', $event)"
            ></InputField>
            <InputField
              :filter="{
                display: '그룹명',
                type: 'text',
                placeholder: '그룹명'
              }"
              @update-value="handleUserInput('groupName', $event)"
            ></InputField>
            <div class="flex justify-center items-center mt-5">
              <button
                class="btn btn-primary btn-sm w-full"
                @click="submitCreateGroup"
                :disabled="!canCreate"
              >
                생성하기
              </button>
            </div>
          </form>
        </Box>
      </Container>
    </template>
    <template #footer>
      <Footer />
    </template>
  </PageView>
</template>
<script lang="ts" setup>
import { computed, onMounted, ref } from 'vue'
import PageView from '@/components/layouts/PageView.vue'
import Header from '@/components/surfaces/Header.vue'
import Footer from '@/components/surfaces/Footer.vue'
import Container from '@/components/layouts/Container.vue'
import Box from '@/components/layouts/Box.vue'
import InputField from '@/components/inputs/InputField.vue'
import { GroupService } from '@/services/group.service'
import type { CreateGroupRequest } from '@/types/group.type'

const groupSvc = new GroupService()
type createRequestKey = 'creatorRef' | 'groupName'
const createRequest = ref<CreateGroupRequest>({
  creatorRef: '',
  groupName: ''
})
const canCreate = computed(() => {
  return Object.values(createRequest.value).every((v) => !!v)
})
onMounted(() => {
  console.log('mounted')
})

async function handleUserInput(key: createRequestKey, value: string) {
  createRequest.value[key] = value
}

async function submitCreateGroup() {
  try {
    await groupSvc.createGroup(createRequest.value)
    window.alert('그룹이 생성되었습니다.')
    window.location.href = '/group'
  } catch (e: any) {
    console.error(e)
    window.alert('그룹 생성에 실패했습니다.' + e.message)
  }
}
</script>
<style scoped></style>
