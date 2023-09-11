import { createApp } from 'vue'
import './index.css'
import App from './App.vue'
import { createPinia } from 'pinia'
import { router } from './router'
import i18n from './i18n'
import 'virtual:svg-icons-register'

const app = createApp(App)

const pinia = createPinia()

app.use(pinia)
app.use(router)
app.use(i18n)

app.mount('#app')
