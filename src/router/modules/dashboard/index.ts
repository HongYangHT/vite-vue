const dashboard = () => import('@/views/dashboard/DashboardIndex.vue')
export default [
  {
    path: '/dashboard',
    redirect: '/dashboard/index',
    meta: {
      icon: 'home',
      title: 'dashboard.home'
    },
    children: [
      {
        path: '',
        name: 'Dashboard',
        component: dashboard
      }
    ]
  }
]
