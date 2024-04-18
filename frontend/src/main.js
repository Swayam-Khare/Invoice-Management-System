import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
// This is the css file for toast
import 'vue3-toastify/dist/index.css'
import App from './App.vue'
import router from './router'
import { VSparkline } from 'vuetify/labs/VSparkline'
import 'material-design-icons-iconfont/dist/material-design-icons.css'
import { createVuetify } from 'vuetify'
import 'vuetify/styles'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import { aliases, md } from 'vuetify/iconsets/md'


const vuetify = createVuetify({
  components,
  component:
  {VSparkline},
  directives,

  icons: {
    defaultSet: 'md',
    aliases,
    sets: {
      md
    }
  }
})

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(vuetify)

app.mount('#app')
