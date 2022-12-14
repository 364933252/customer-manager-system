import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)
// 获取原型对象的push函数
const RouterPush = VueRouter.prototype.push
// 修改 原型对象中的push方法
VueRouter.prototype.push = function push(to) {
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
        path: '/clueList',
        name: 'clueList',
        component: () => import('../views/CustomerManage/clue/clueList')
      },
      // {
      //   path: '/customerList',
      //   name: 'customerList',
      //   component: () => import('../views/CustomerManage/customer/customerList')
      // },
      // {
      //   path: '/customerDetail',
      //   name: 'customerDetail',
      //   component: () => import('../views/CustomerManage/customer/customerDetail')
      // },
      {
        path: '/memberList',
        name: 'memberList',
        component: () => import('../views/memberManage/memberList')
      },
      {
        path: '/memberDetail',
        name: 'memberDetail',
        component: () => import('../views/memberManage/memberList/memberDetail')
      },
      {
        path: '/memberTypeList',
        name: 'memberTypeList',
        component: () => import('../views/memberManage/memberTypeList')
      },
      {
        path: '/memberLevelList',
        name: 'memberLevelList',
        component: () => import('../views/memberManage/memberLevelList'),
        redirect: '/memberLevel',
        children: [
          {
            path: '/memberLevel',
            name: 'memberLevel',
            component: () => import('../views/memberManage/memberLevelList/memberLevel')
          },
          {
            path: '/levelGroup',
            name: 'levelGroup',
            component: () => import('../views/memberManage/memberLevelList/levelGroup')
          }
        ]
      },
      {
        path: '/memberDayManage',
        name: 'memberDayManage',
        component: () => import('../views/memberManage/memberDayManage')
      },
      {
        path: '/memberCube',
        name: 'memberCube',
        component: () => import('../views/memberManage/memberCube')
      },
      {
        path: '/addMemberCube',
        name: 'addMemberCube',
        component: () => import('../views/memberManage/memberCube/addMemberCube')
      },
      {
        path: '/roomList',
        name: 'roomList',
        component: () => import('../views/LiveManage/RoomManage/RoomList')
      },
      {
        path: '/addRoom',
        name: 'addRoom',
        component: () => import('../views/LiveManage/RoomManage/RoomList/AddRoom')
      },
      {
        path: '/editRoom/:id',
        name: 'editRoom',
        component: () => import('../views/LiveManage/RoomManage/RoomList/EditRoom')
      },
      {
        path: '/roomControlPanel/:id',
        name: 'roomControlPanel',
        component: () => import('../views/LiveManage/RoomManage/RoomList/RoomControlPanel')
      },
      {
        path: '/customerList',
        name: 'customerList',
        component: () => import('../views/LiveManage/RoomManage/CustomerList')
      },
      {
        path: '/distributorList',
        name: 'distributorList',
        component: () => import('../views/LiveManage/RoomManage/DistributorList')
      },
      {
        path: '/noInStorage',
        name: 'noInStorage',
        component: () => import('../views/LiveManage/RoomManage/GoodsLibrary/NoInStorage')
      },
      {
        path: '/inStorage',
        name: 'inStorage',
        component: () => import('../views/LiveManage/RoomManage/GoodsLibrary/InStorage')
      },
      {
        path: '/orderList',
        name: 'orderList',
        component: () => import('../views/LiveManage/RoomManage/OrderList')
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

router.beforeEach((to, from, next) => {
  if (to.path === '/login') return next()
  const tokenStr = window.sessionStorage.getItem('AccessToken')
  if(!tokenStr) return next('/login')
  next()
})

export default router
