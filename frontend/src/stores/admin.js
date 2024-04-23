import { ref } from 'vue'
import { defineStore } from 'pinia'
import axios from './axios'
import { toast } from 'vue3-toastify'

export const useAdminStore = defineStore('adminStore', () => {
  const adminArr = ref([])

  let token = ref(null)
  let typelogin = ref('admin')
  const stateVariable = ref(10)
  let loading = ref(false)
  const updatePasswordStatus = ref(null)
  async function loginAdmin(formData) {
    loading.value = true
    try {
      const config = { headers: { 'Content-Type': 'application/json' }, withCredentials: true }
      const res = await axios.post('/auth/login/admin', formData, config)
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

  async function updatePassword(password) {
    try {
      loading.value = true
      const config = {
        headers: {
          'Content-Type': 'application/json'
        },
        withCredentials: true
      }
      const res = await axios.patch('/admin/updatepassword', password, config)
      updatePasswordStatus.value = res.status
      toast.success(res.data.message, {
        autoClose: 1000,
        type: 'success',
        position: 'bottom-center',
        transition: 'zoom',
        dangerouslyHTMLString: true
      })
    } catch (error) {
      updatePasswordStatus.value = error.response.status
      toast.error(error.response.data.message, {
        autoClose: 1000,
        type: 'error',
        position: 'bottom-center',
        transition: 'zoom',
        dangerouslyHTMLString: true
      })
    } finally {
      loading.value = false
    }
  }

  return {
    adminArr,
    loginAdmin,
    logoutAdmin,
    token,
    stateVariable,
    typelogin,
    loading,
    updatePassword,
    updatePasswordStatus
  }
})
