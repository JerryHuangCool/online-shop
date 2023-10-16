import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '@/views/login'
import Layout from '@/views/layout'
import Search from '@/views/search'
import Pay from '@/views/pay'
import Goodsdetail from '@/views/goodsdetail'
import Order from '@/views/order'
import List from '@/views/search/list'
import Home from '@/views/layout/home'
import User from '@/views/layout/user'
import Cart from '@/views/layout/cart'
import Category from '@/views/layout/category'
Vue.use(VueRouter)

const routes = [
  { path: '/login', component: Login },
  {
    path: '/',
    component: Layout,
    children:
      [
        { path: '/home', component: Home },
        { path: '/user', component: User },
        { path: '/cart', component: Cart },
        { path: '/category', component: Category }
      ]
  },
  { path: '/search', component: Search },
  { path: '/searchlist', component: List },
  { path: '/pay', component: Pay },
  { path: '/detail/:id', component: Goodsdetail },
  { path: '/order', component: Order }
]

const router = new VueRouter({
  routes
})

export default router
