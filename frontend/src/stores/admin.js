import { ref } from 'vue'
import { defineStore } from 'pinia'
import axios from './axios';

export const useAdminStore = defineStore('adminStore', () => {
  const adminArr = ref([])

  let token = ref(null)
  let typelogin = ref('admin')
  const stateVariable = ref(10)
  let loading = ref(false)
  async function loginAdmin(formData) {
    loading.value = true
    try {
      const config = { headers: { 'Content-Type': 'application/json' }, withCredentials: true }
      const res = await axios.post(
        '/auth/login/admin',
        formData,
        config
      )
      token.value = res.data.token
    } catch (error) {
      console.log(error)
    } finally {
      loading.value = false
    }
  }

  async function logoutAdmin() {
    try {
      const response = await axios.get('/auth/logout/admin', {
        withCredentials: true
      })

      if (response.status === 200) {
        // Clear the token and any other admin-related state
        token.value = null // Logout successful

        return true
      } else {
        console.error('Logout failed:', response)
        return false // Logout failed
      }
    } catch (error) {
      console.error('Logout failed:', error)
      return false // Logout failed
    }
  }

  return { adminArr, loginAdmin, logoutAdmin, token, stateVariable, typelogin, loading }
})
