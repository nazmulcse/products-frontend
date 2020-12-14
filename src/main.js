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
Vue.config.productionTip = false

Vue.use(VueProgress, {
  defaultShape: 'line',
  progress: 0,
  hideBackground: true,
  indeterminate: true
})

Vue.use(BootstrapVue)
Vue.use(VueForm)

// const APIURL = 'https://api.chucknorris.io/jokes'
/* eslint-disable no-new */
/* eslint-disable */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
