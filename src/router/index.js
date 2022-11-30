import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/Home/HomeView.vue'
import LoginCom from '@/views/Login/LoginCom.vue'
import RegisterCom from '@/views/Register/RegisterCom.vue'
import store from '@/store'

Vue.use(VueRouter)
// 重写push方法
const originPush = VueRouter.prototype.push
VueRouter.prototype.push = function (location, resolve, reject) {
  if (resolve && reject) {
    originPush.call(this, location, resolve, reject)
  } else {
    originPush.call(this, location).catch(err => err)
  }
}
const routes = [
  {
    path: '/home/center',
    redirect: '/home/center/myorder'
  },
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    component: HomeView,
    meta: { isShow: true },
    children: [
      {
        path: 'login',
        component: LoginCom,
        meta: { isShow: false }
      },
      {
        path: 'register',
        component: RegisterCom,
        meta: { isShow: false }
      },
      {
        // 以下是路由传参方式
        path: 'search',
        name: 'search',
        meta: { isShow: true },
        props: (route) => ({ keyword: route.params.keyword }),
        // 路由懒加载
        component: () =>
          import('@/views/search')
      },
      {
        path: 'detail/:id',
        name: 'detail',
        component: () =>
          import('@/views/Detail')
      },
      {
        path: 'addcartsuccess',
        name: 'addcartsuccess',
        meta: { isShow: true },
        component: () =>
          import('@/views/AddCartSuccess')
      },
      {
        path: 'shopcart',
        name: 'shopcart',
        meta: { isShow: true },
        component: () =>
          import('@/views/ShopCart')
      },
      {
        path: 'trade',
        name: 'trade',
        meta: { isShow: true },
        component: () =>
          import('@/views/Trade')
      },
      {
        path: 'pay',
        name: 'pay',
        meta: { isShow: true },
        component: () => import('@/views/Pay')
      },
      {
        path: 'paysuccess',
        name: 'paysuccess',
        meta: { isShow: true },
        component: () =>
          import('@/views/PaySuccess')
      },
      {
        path: 'center',
        name: 'center',
        meta: { isShow: true },
        component: () =>
          import('@/views/Center'),
        children: [
          {
            path: 'myorder',
            name: 'myorder',
            component: () =>
              import('@/views/Center/myOrder')
          },
          {
            path: 'teamorder',
            name: 'teamorder',
            component: () =>
              import('@/views/Center/teamOrder')
          }
        ]
      }
    ]
  }
]

const router = new VueRouter({
  routes,
  scrollBehavior (to, from, savePosition) {
    return { y: 0 }
  }
})
router.beforeEach(async (to, from, next) => {
  // 一种新方法，判断路径中是否含有某个路径关键词来跳转指定页面，没有的话在执行一定操作后自动重定向到指定页面
  let token = sessionStorage.getItem('TOKEN') === null ? '' : sessionStorage.getItem('TOKEN')
  if (to.path.indexOf('trade') !== -1 || to.path.indexOf('pay') !== -1 || to.path.indexOf('center') !== -1) {
    if (token === '') {
      next('/home/login?redirect=' + to.path)
    } else {
      try {
        await store.dispatch('user/getUserInfo')
      } catch (error) {
        await store.dispatch('user/quit')
        alert('token已过期,请重新登录')
        next('/home/login')
      }
    }
  }
  next()
})
export default router
