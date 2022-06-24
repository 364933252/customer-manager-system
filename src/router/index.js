import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)
// 获取原型对象的push函数
const RouterPush = VueRouter.prototype.push
// 修改 原型对象中的push方法
VueRouter.prototype.push = function push (to) {
  return RouterPush.call(this, to).catch(err => err)
}

const routes = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/Login.vue')
  },
  {
    path: '/404',
    name: '404',
    component: () => import('../views/CommonPage/404')
  },
  {
    path: '/home',
    name: 'Home',
    redirect: '/welcome',
    component: () => import('../views/Home.vue'),
    children: [
      {
        path: '/welcome',
        name: 'welcome',
        component: () => import('../views/Welcome.vue')
      },
      {
        path: '/homePage',
        name: 'homePage',
        component: () => import('../views/HomePage')
      },
      {
        path: '/personalClue',
        name: 'personalClue',
        component: () => import('../views/ClueManage/PersonalClue')
      },
      {
        path: '/clueSea',
        name: 'clueSea',
        component: () => import('../views/ClueManage/ClueSea')
      },
      {
        path: '/personalCustomer',
        name: 'personalCustomer',
        component: () => import('../views/CustomerManage/PersonalCustomer')
      },
      {
        path: '/customerSea',
        name: 'customerSea',
        component: () => import('../views/CustomerManage/CustomerSea')
      }
    ]
  },
  {
    path: '*',
    redirect: '/404'
  }
]

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router
