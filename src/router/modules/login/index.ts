const login = () => import('@/views/login/LoginIndex.vue')
export default [
  {
    path: '/',
    redirect: '/index',
    meta: {
      icon: 'home',
      title: 'login.home'
    },
    children: [
      {
        path: '/index',
        name: 'Login',
        component: login
      }
    ]
  }
]
