import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import './style.css'

const app = createApp(App)
app.use(createPinia()) // Pinia: estado global
app.use(router)        // Vue Router: navegación SPA
app.mount('#app')
