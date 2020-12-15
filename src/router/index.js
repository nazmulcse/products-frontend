import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'
import UserRegistration from '@/components/UserRegistration'

Vue.use(Router)

export default new Router({
  mode: 'history',
  hash: false,
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login
    },
    {
      path: '/registration',
      name: 'UserRegistration',
      component: UserRegistration
    }
  ]
})
