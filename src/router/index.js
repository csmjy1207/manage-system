
// 第一步引入插件(本质是一个构造函数)
import VueRouter from 'vue-router'
import Router from 'vue-router';

 
// 第二步创建router实例对象并暴露
const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,  // 如果使用history模式，必须设置base参数
  routes: [
    {
      path: '/',
      redirect: '/home',
      component: () => import('@/views/components/NavMenu.vue'),
      children: [
        {
          path: '/home',
          component: () => import('@/views/home/index.vue'),
          meta: {title: '首页'}
        },
        {
          path: '/watchTest',
          component: () => import('@/views/watchTest/index.vue'),
          meta: {title: '计算属性'}
        },
        {
          path: '/template',
          component: () => import('@/views/templatePage/index.vue'),
          meta: {title: '模板语法'}
        },
        {
          path: '/declaration',
          component: () => import('@/views/declarationPage/index.vue'),
          meta: {title: '生命周期'}
        },
        {
          path: '/instruct',
          component: () => import('@/views/instructPage/index.vue'),
          meta: {title: '指令'}
        },
        {
          path: '/slot',
          component: () => import('@/views/slotPage/index.vue'),
          meta: {title: '插槽'}
        },
      ]
      
    }, {
      path: '/largeScreen',
      component: () => import('@/views/largeScreenPage/index.vue'),
      // beforeEnter(to, from, next) {
      //     if(window.localStorage.getItem('id')) {
      //       next();
      //     }else {
      //       next('/login')
      //     }
      // }
    },
    {
      path: '/nav',
      component: () => import('@/views/components/NavMenu.vue'),
    },
    {
      path: '/login',
      component: () => import('@/views/login/index.vue'),
    }
  ]
})

// 在前置路由守卫中实现登录拦截功能
router.beforeEach((to, from, next)=> {
  if(to.path === '/login') {
    return next();
  }
  else {
    if(sessionStorage.getItem('username')) {
      next()
    }else {
      next('/login')
    }
  }
})
 
// 解决: 重复点击导航菜单报错
const originalPush = Router.prototype.push;
Router.prototype.push = function push(location) {

  return originalPush.call(this, location).catch(err => err)

}

export default router