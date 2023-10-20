import Vue from 'vue'
import VueRouter from 'vue-router'
import Layout from '@/views/layout'
import Home from '@/views/layout/home'
import User from '@/views/layout/user'
import Cart from '@/views/layout/cart'
import Category from '@/views/layout/category'
import store from '@/store'

const Login = () => import('@/views/login')
const Search = () => import('@/views/search')
const Pay = () => import('@/views/pay')
const Goodsdetail = () => import('@/views/goodsdetail')
const Order = () => import('@/views/order')
const List = () => import('@/views/search/list')

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
      ],
    redirect: '/home'
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
// 全局前置导航守卫
// to:   到哪里去，到哪去的完整路由信息对象 (路径，参数)
// from: 从哪里来，从哪来的完整路由信息对象 (路径，参数)
// next(): 是否放行
// (1) next()     直接放行，放行到to要去的路径
// (2) next(路径)  进行拦截，拦截到next里面配置的路径
const authUrls = ['/pay', '/order']
router.beforeEach((to, from, next) => {
  if (authUrls.includes(to.path)) {
    const token = store.getters.token
    if (token) {
      next()
    } else {
      next('/login')
    }
  } else {
    next()
  }
})
export default router
