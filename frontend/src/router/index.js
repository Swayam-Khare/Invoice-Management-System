import { createRouter, createWebHistory } from 'vue-router'

import Admin from '@/views/Admin.vue'
import Home from '@/views/Home.vue'
import Vendor from '@/views/Vendor.vue'
import PdfTemplate from '@/components/PdfTemplate.vue'
import ResetPassword from '@/components/ResetPassword.vue'

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
      component: Admin,
      beforeEnter: (to, from) => {
        const cookieRole = document.cookie.match('(^|;)\\s*' + 'loggedRole' + '\\s*=\\s*([^;]+)')
        const cookieAuth = document.cookie.match('(^|;)\\s*' + 'jwtAuth' + '\\s*=\\s*([^;]+)')
        let loggedRole = null
        let auth = null
        if (cookieAuth && cookieRole) {
          loggedRole = cookieRole[2]
          auth = cookieAuth[2]
        }

        if (!auth || loggedRole != 'admin') {
          return { name: 'home' }
        }
      }
    },
    {
      path: '/vendor',
      name: 'vendor',
      component: Vendor,
      beforeEnter: (to, from) => {
        const cookieRole = document.cookie.match('(^|;)\\s*' + 'loggedRole' + '\\s*=\\s*([^;]+)')
        const cookieAuth = document.cookie.match('(^|;)\\s*' + 'jwtAuth' + '\\s*=\\s*([^;]+)')
        let loggedRole = null
        let auth = null
        if (cookieAuth && cookieRole) {
          loggedRole = cookieRole[2]
          auth = cookieAuth[2]
        }

        if (!auth || loggedRole != 'vendor') {
          return { name: 'home' }
        }
      }
    },
    {
      path: '/invoice/:id',
      name: 'pdfTemplate',
      component: PdfTemplate,
      props: {
        default: true,
        PdfTemplate: true
      }
    },
    {
      path: '/resetPassword/:token',
      name: 'resetPassword',
      component: ResetPassword,
      props: {
        default: true,
        PdfTemplate: true
      }
    }
  ]
})

export default router
