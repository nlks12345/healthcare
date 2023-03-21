import { createApp } from 'vue'
import App from './App.vue'
import router from './routers'
import './assets/main.css'
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

// createApp(App).mount('#app')

const vuetify = createVuetify({
    components,
    directives,
  })

createApp(App)
.use(router)
.use(vuetify)
.mount('#app');