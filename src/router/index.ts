import { createRouter, createWebHistory } from 'vue-router'
import Users from '@/views/Users.vue'
import UserDetails from '@/components/UserDetails.vue'

const routes = [
  {
    path: '/',
    component: () => import('@/layouts/AppLayout.vue'),
    name: 'AppLayout', 
    children: [
      {
        path: '/users',
        component: Users,
      },
      {
        path: '/users/:id',
        component: UserDetails,
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
