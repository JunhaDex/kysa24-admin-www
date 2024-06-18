import 'boxicons/css/boxicons.min.css'
import './assets/main.css'

import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import tz from 'dayjs/plugin/timezone'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import piniaPluginPersist from 'pinia-plugin-persistedstate'

dayjs.extend(utc)
dayjs.extend(tz)
const app = createApp(App)
const pinia = createPinia()
pinia.use(piniaPluginPersist)
app.use(pinia)
app.use(router)

app.mount('#app')
