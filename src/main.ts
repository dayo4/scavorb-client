/* import some global assets */
import "../../../../GreyCore/icons/css/fontello.css"
import "../../../../GreyCore/GC/dist/greycore.css"
import '@/globalStyles/general.css'
import '@/globalStyles/plugins.scss'
import '@/globalStyles/transitions.css'
import '@/globalStyles/cropper.css'
import '@/polyfills'

/* import modules */
import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import moment from 'moment'
import VueMeta from 'vue-meta'

// import VueGtag from 'vue-gtag'
const BASE_URL = process.env.NODE_ENV === 'production' ? process.env.BASE_URL : 'http://127.0.0.1:3000/'

Vue.prototype.$moment = moment
/* Add assets baseurl to global scope */
Vue.prototype.$postBaseUrl = BASE_URL + 'pst/'
Vue.prototype.$userBaseUrl = BASE_URL + 'usr/'
console.log(process.env)
Vue.config.productionTip = false
/*google analytics gtag*/
// Vue.use(VueGtag, {
//   config: { id: 'gggggg' }
// })
Vue.use(VueMeta, {
  // optional pluginOptions
  refreshOnceOnNavigation: true
})

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
