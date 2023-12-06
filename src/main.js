import '@quasar/extras/material-icons-round/material-icons-round.css'
import '@quasar/extras/material-icons/material-icons.css'
import { createPinia } from 'pinia'
import { Notify, Quasar } from 'quasar'
import 'quasar/src/css/index.sass'
import { createApp } from 'vue'
import App from './App.vue'
import './assets/css/index.css'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(Quasar, {
  plugins: { Notify }
})

app.mount('#app')
