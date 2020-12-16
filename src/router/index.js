import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'
import UserRegistration from '@/components/UserRegistration'
import ProductList from '@/components/ProductList'
import ProductEntry from '@/components/ProductEntry'

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
    },
    {
      path: '/product-list',
      name: 'ProductList',
      component: ProductList
    },
    {
      path: '/edit-product/:id',
      name: 'EditProduct',
      component: ProductEntry
    },
    {
      path: '/add-product',
      name: 'AddProduct',
      component: ProductEntry
    }
  ]
})
