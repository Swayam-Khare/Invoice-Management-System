import { createRouter, createWebHistory } from 'vue-router'
import App from '../App.vue'
import Admin from '@/views/Admin.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'app',
      component: App
    }, {
      path: '/admin',
      name: 'admin',
      component: Admin
    }
  ]
})

export default router
