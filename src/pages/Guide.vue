<template>
  <h1>Guide</h1>
  <ListColumn :table-config="UserTable" />
  <Container>
    <EmptyState />
  </Container>
  <section>
    <h2>Auth</h2>
    <div>
      <button class="btn btn-ghost btn-sm" @click="login">Login</button>
    </div>
  </section>
  <section>
    <h2>User</h2>
    <div>
      <button class="btn btn-ghost btn-sm" @click="listUser">List User</button>
    </div>
    <div>
      <button class="btn btn-ghost btn-sm">Create User</button>
    </div>
    <div>
      <button class="btn btn-ghost btn-sm">Block User</button>
    </div>
    <div>
      <button class="btn btn-ghost btn-sm">Change Pwd</button>
    </div>
    <div>
      <button class="btn btn-ghost btn-sm">List Team</button>
    </div>
  </section>
  <section>
    <h2>Post</h2>
  </section>
  <section>
    <h2>Group</h2>
  </section>
</template>
<script lang="ts" setup>
import { AuthService } from '@/services/auth.service'
import { useAuthStore } from '@/stores/auth.store'
import { UserService } from '@/services/user.service'
import { onMounted } from 'vue'
import axios from 'axios'
import ListColumn from '@/components/displays/table/ListColumn.vue'
import { UserTable } from '@/constants/tables/user_table.constant'
import Container from '@/components/layouts/Container.vue'
import EmptyState from '@/components/layouts/EmptyState.vue'

const authStore = useAuthStore()
const { jwt } = authStore

onMounted(() => {
  const client = axios.create({
    baseURL: 'http://localhost:3000',
    headers: {}
  })
  client.get('/api/v1/healthz').then((res) => {
    console.log('res', res.data)
  })
})

async function login() {
  const authSvc = new AuthService()
  await authSvc.login('admin', 'admin')
  console.log('jwt', jwt)
}

async function listUser() {
  const userSvc = new UserService()
  const users = await userSvc.listUser()
  console.log('users', users)
}
</script>
<style scoped></style>
