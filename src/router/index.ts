import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    component: () => import('@/layouts/AppLayout.vue'),
    children: [
      {
        path: '',
        redirect: '/users',
        name: 'Home'
      },
      {
        path: '/users',
        component: () => import('@/views/Users.vue'),
        name: 'Users'
      },
      {
        path: '/users/:id',
        component: () => import('@/components/user/UserDetails.vue'),
        name: 'UserDetails',
      }
    ]
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/users'
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
