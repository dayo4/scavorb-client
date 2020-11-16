/* import some global assets */
import './globalStyles/deploy'

/* import modules */
import { createApp } from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import VueMeta from 'vue-3-meta'
import globalPlugins from './vue-plugins'

/* create App */
const app = createApp(App)

/* use plugins */
app.use(globalPlugins)
app.use(router)
// app.use(VueMeta as any, {
//     // optional pluginOptions
//     refreshOnceOnNavigation: true
// })

/* mount the App */
app.mount('#app')