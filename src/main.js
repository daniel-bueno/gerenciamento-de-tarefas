import { createApp } from 'vue'
import App from './App.vue'
import './style.css'
import pinia from './store'

const app = createApp(App)
app.use(pinia)
app.mount('#app')