import { createRouter, createWebHistory } from 'vue-router'
import App from '../App.vue'
import Admin from '@/views/Admin.vue'
import Home from '@/views/Home.vue'
import Vendor from '@/views/Vendor.vue'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },

    {
      path: '/admin',
      name: 'admin',
      component: Admin
    }, {
      path: '/vendor',
      name: 'vendor',
      component: Vendor
    }
  ]
})

export default router
