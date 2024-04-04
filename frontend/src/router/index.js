import { createRouter, createWebHistory } from 'vue-router'
import App from '../App.vue'
import Profile from '../components/Profile.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: App
    },
    {
      path: '/profile',
      name: 'profile',
      component: Profile
    }
  ]
})

export default router
