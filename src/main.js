// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import BootstrapVue from 'bootstrap-vue/dist/bootstrap-vue.esm'
import App from './App'
import router from './router'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import VueForm from 'vue-form'
import 'vue-progress-path/dist/vue-progress-path.css'
import VueProgress from 'vue-progress-path'
import axios from 'axios'
import VueAxios from 'vue-axios'
import VueRouter from 'vue-router'
import Toast from 'vue-toastification'
// Import the CSS or use your own!
import 'vue-toastification/dist/index.css'
import Constant from './components/Constant'
import { install as storageInstall } from 'vue-storage-plus'
import vueTopprogress from 'vue-top-progress'
import Button from '@/components/Button'
import Header from '@/components/Header'
// axios.defaults.headers.common['Authorization'] = `Bearer ${storage.get('token')}`

Vue.config.productionTip = false

Vue.use(VueProgress, {
  defaultShape: 'line',
  progress: 0,
  hideBackground: true,
  indeterminate: true
})
Vue.use(storageInstall)
Vue.use(Toast)
Vue.use(BootstrapVue)
Vue.use(VueForm)
Vue.use(VueAxios, axios)
Vue.use(VueRouter)
Vue.use(Constant)
Vue.use(vueTopprogress)
Vue.component('Button', Button)
Vue.component('Header', Header)

// URL and endpoint constants
// const API_URL = 'http://localhost:8080/api/'
// const LOGIN_URL = API_URL + 'auth/login'
// const SIGNUP_URL = API_URL + 'auth/register/'
/* eslint-disable no-new */
/* eslint-disable */
new Vue({
  el: '#app',
  created() {
    this.axios.defaults.headers.common['Authorization'] = `Bearer ${this.$storage.get('token')}`
    this.axios.defaults.baseURL = this.$getConst('API_URL')
  },
  router,
  components: { App },
  template: '<App/>'
})
