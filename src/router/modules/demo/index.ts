const demo = () => import('@/example/index.vue')
export default [
  {
    path: '/demo',
    redirect: '/demo/index',
    meta: {
      icon: 'home',
      title: 'demo.home'
    },
    children: [
      {
        path: '',
        name: 'Demo',
        component: demo
      }
    ]
  }
]
