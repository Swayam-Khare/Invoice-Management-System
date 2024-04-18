import { createRouter, createWebHistory } from 'vue-router'
import App from '../App.vue'
import Admin from '@/views/Admin.vue'
import Home from '@/views/Home.vue'
import Vendor from '@/views/Vendor.vue'
import Profile from '@/components/Profile.vue'
import CustomerDetails from '@/components/customerDetails.vue'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: CustomerDetails
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
