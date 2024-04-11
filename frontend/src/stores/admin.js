import { ref } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios'

export const useAdminStore = defineStore('adminStore', () => {
  const adminArr = ref([])
  let isloading = ref(false)
  let token = ref(null)
  let typelogin = ref('admin')
  const stateVariable = ref(10)
  const adminArr = ref([])
  let loading = ref(false)
  let token = ref(null)
  let typelogin = ref('admin')
  const stateVariable = ref(10)

  async function loginAdmin(formData) {
    loading.value = true
    try {
      const config = { headers: { 'Content-Type': 'application/json' }, withCredentials: true }
      const res = await axios.post(
        'http://localhost:3500/api/v1/auth/login/admin',
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
  return { adminArr, loginAdmin, token, stateVariable, typelogin, loading }
})
