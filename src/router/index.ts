import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    component: () => import('@/layouts/AppLayout.vue'),
    name: 'AppLayout', 
    children: [
      {
        path: '/users',
        component: () => import('@/views/Users.vue'),
      },
      {
        path: '/users/:id',
        component: () => import('@/components/user/UserDetails.vue'),
        name: 'UserDetails',
      }
    ]
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
