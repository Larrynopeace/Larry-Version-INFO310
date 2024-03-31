//import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'

// Import the Element Plus library and its CSS file.
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css'

// This is the router file for the Vue 3 application.
import router from './router/router';

// Import the Element Plus icon library.
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

// Import the Pinia library and its persisted state plugin.
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)

const app = createApp(App)
app.use(pinia)
app.use(ElementPlus)
app.use(router)

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
  }

app.mount('#app')
