<template>
  <PageView>
    <template #header>
      <Header />
    </template>
    <template #main>
      <Container title="조 바로가기">
        <Box>
          <div class="flex flex-wrap align-middle">
            <SelectField
              :filter="{
                display: '',
                placeholder: '조 선택'
              }"
              :options="teams"
              @update-value="handleUserInput"
            />
            <div class="form-control">
              <span>조 </span>
              <button class="btn btn-ghost btn-xs" :disabled="!selectedTeam.length">
                <Hyperlink
                  :link-item="{
                    label: '바로가기',
                    url: `/user/team/${selectedTeam}`,
                    isBlank: false
                  }"
                />
              </button>
            </div>
          </div>
        </Box>
      </Container>
    </template>
    <template #footer>
      <Footer />
    </template>
  </PageView>
</template>
<script setup lang="ts">
import Container from '@/components/layouts/Container.vue'
import PageView from '@/components/layouts/PageView.vue'
import Header from '@/components/surfaces/Header.vue'
import Footer from '@/components/surfaces/Footer.vue'
import Box from '@/components/layouts/Box.vue'
import SelectField from '@/components/inputs/SelectField.vue'
import { onMounted, ref } from 'vue'
import { UserService } from '@/services/user.service'
import Hyperlink from '@/components/displays/Hyperlink.vue'

const userSvc = new UserService()
const teams = ref<{ [key: string]: string }>({})
const selectedTeam = ref<string>('')

onMounted(async () => {
  const opts = await userSvc.listTeam()
  teams.value = opts.list.reduce(
    (acc, cur) => {
      acc[cur.id] = cur.teamName
      return acc
    },
    {} as { [key: string]: string }
  )
})

function handleUserInput(value: string) {
  selectedTeam.value = value
}
</script>
<style scoped></style>
