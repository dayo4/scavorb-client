/* import some global assets */
import './globalStyles/deploy'

/* import modules */
import Vue from 'vue'
import VueMeta from 'vue-meta'
import moment from 'moment'

/* import resources */
import App from './App.vue'
import './registerServiceWorker'
import router from './router'

Vue.config.productionTip = false

/* Add assets baseurl to global scope */
const BASE_URL = process.env.NODE_ENV === 'production' ? process.env.BASE_URL : 'http://127.0.0.1:3000/'
Vue.prototype.$baseUrl = BASE_URL
Vue.prototype.$postBaseUrl = BASE_URL + 'pst/'
Vue.prototype.$userBaseUrl = BASE_URL + 'usr/'


/* use plugins */
Vue.prototype.$moment = moment
Vue.use(VueMeta, {
  // optional pluginOptions
  refreshOnceOnNavigation: true
})

// export default () => {

 /*  return */ new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
// }
