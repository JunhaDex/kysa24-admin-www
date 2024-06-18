<template>
  <PageView>
    <template #header>
      <Header />
    </template>
    <template #main>
      <Container title="사용자 생성하기">
        <Box>
          <form onsubmit="return false">
            <InputField
              :filter="{
                display: '아이디',
                type: 'text',
                placeholder: '사용자 아이디'
              }"
              @update-value="handleUserInput('id', $event)"
            />
            <InputField
              :filter="{
                display: '비밀번호',
                type: 'password',
                placeholder: '******'
              }"
              @update-value="handleUserInput('pwd', $event)"
            />
            <hr class="mt-3" />
            <InputField
              :filter="{
                display: '이름',
                type: 'text',
                placeholder: '사용자명'
              }"
              @update-value="handleUserInput('name', $event)"
            />
            <InputField
              :filter="{
                display: '생년월일',
                type: 'text',
                placeholder: 'YYYY-MM-DD'
              }"
              @update-value="handleUserInput('dob', $event)"
            />
            <SelectField
              :filter="{
                display: '성별',
                placeholder: '성별'
              }"
              :options="{
                m: '형제',
                f: '자매'
              }"
              @update-value="handleUserInput('sex', $event)"
            />
            <SelectField
              :filter="{
                display: '조 선택',
                placeholder: '조 배정'
              }"
              :options="teams"
              @update-value="handleUserInput('teamName', $event)"
            />
            <InputField
              :filter="{
                display: '출신지역',
                type: 'text',
                placeholder: '소속 단위조직'
              }"
              @update-value="handleUserInput('geo', $event)"
            />
            <div class="flex justify-center items-center mt-5">
              <button class="btn btn-primary btn-sm w-full" @click="submitCreateUser">
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
import { onMounted, ref } from 'vue'
import PageView from '@/components/layouts/PageView.vue'
import Header from '@/components/surfaces/Header.vue'
import Footer from '@/components/surfaces/Footer.vue'
import Container from '@/components/layouts/Container.vue'
import Box from '@/components/layouts/Box.vue'
import type { CreateUserRequest } from '@/types/user.type'
import InputField from '@/components/inputs/InputField.vue'
import SelectField from '@/components/inputs/SelectField.vue'
import { UserService } from '@/services/user.service'
import { convertUTC } from '@/utils/index.util'

const userSvc = new UserService()
const teams = ref<{ [key: string]: string }>({})
type createRequestKey = 'name' | 'sex' | 'nickname' | 'id' | 'pwd' | 'teamName' | 'geo' | 'dob'
const createRequest = ref<CreateUserRequest>({
  name: '',
  sex: '',
  nickname: '',
  id: '',
  pwd: '',
  teamName: '',
  geo: '',
  dob: ''
})

onMounted(async () => {
  const opts = await userSvc.listTeam()
  teams.value = opts.list.reduce(
    (acc, cur) => {
      acc[cur.id] = cur.teamName
      return acc
    },
    {} as { [key: string]: string }
  )
  console.log(teams.value)
})

function handleUserInput(key: createRequestKey, value: any) {
  let req
  if (key === 'name') {
    createRequest.value.nickname = value
    req = value
  } else if (key === 'dob') {
    req = convertUTC(value)
  } else if (key === 'teamName') {
    req = teams.value[value]
  } else {
    req = value
  }
  createRequest.value[key] = req
}

async function submitCreateUser() {
  try {
    await userSvc.createUser(createRequest.value)
    window.alert('사용자가 생성되었습니다.')
    window.location.reload()
  } catch (e: any) {
    console.error(e)
    window.alert('사용자 생성에 실패했습니다: ' + e.mesaage)
  }
}
</script>
<style scoped></style>
