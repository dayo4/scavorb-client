import moment from 'moment'
// import VueMeta from 'vue-3-meta'

const BASE_URL = process.env.NODE_ENV === 'production' ? process.env.BASE_URL : 'http://127.0.0.1:3000/'

export default {
  install: (app: any) => {
    app.config.globalProperties.$moment = moment
    /* Add assets baseurl to global scope */
    app.config.globalProperties.$baseUrl = BASE_URL
    app.config.globalProperties.$postBaseUrl = BASE_URL + 'pst/'
    app.config.globalProperties.$userBaseUrl = BASE_URL + 'usr/'
  }
}
