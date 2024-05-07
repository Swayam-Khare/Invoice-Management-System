import { ref } from 'vue'
import { defineStore } from 'pinia'
import axios from './axios'
import { toast } from 'vue3-toastify'

export const useVendorStore = defineStore('vendorStore', () => {
  let vendors = ref([])
  let rowCount = ref({ count: 0 })
  let loading = ref(false)
  let token = ref(null)
  let loggedRole = ref(null);
  const updatePasswordStatus = ref(null)

  let loggedVendor = ref({})
  const stateVariable = ref(10)
  const getAllVendors = async (options) => {
    let queryStr = ''
    for (const key in options) {
      if (options[key]) {
        queryStr += key + '=' + options[key] + '&'
      }
      // console.log(key,options[key])
    }

    console.log(queryStr)
    try {
      loading.value = true
      const res = await axios.get(`/vendors?${queryStr}`, {
        withCredentials: true
      })
      vendors.value = res.data.data.vendors
      rowCount.value = res.data.data.totalRows
    } catch (error) {
      console.log(error.message)
    } finally {
      loading.value = false
    }
  }

  const loginVendor = async (formData) => {
    loading.value = true
    try {
      const config = { headers: { 'Content-Type': 'application/json' }, withCredentials: true }
      const res = await axios.post('/auth/login/vendor', formData, config)
      console.log(res)
      token.value = res.data.token
      console.log(token.value)
      loggedRole.value = res.data.role;
      console.log(res.data.role);
    } catch (error) {
      console.log(error)
    } finally {
      loading.value = false
    }
  }

  const getAVendor = async () => {
    try {
      loading.value = true
      const res = await axios.get('/vendors/specific', { withCredentials: true })
      loggedVendor.value = res.data.data.vendor
      console.log(loggedVendor)
    } catch (err) {
      console.log(err.message)
    } finally {
      loading.value = false
    }
  }

  const deleteVendor = async (id) => {
    try {
      console.log('in 52', id)
      loading.value = true
      const res = await axios.delete(`/vendors/specific/${id}`, {
        withCredentials: true
      })
    } catch (error) {
      console.log(error.message)
    } finally {
      // getAllVendors();
      loading.value = false
    }
  }

  const approveVendor = async (id) => {
    try {
      loading.value = true
      const res = await axios.patch(`/admin/vendorStatus/${id}`, {}, { withCredentials: true })
    } catch (error) {
      console.log(error.message)
    } finally {
      loading.value = false
    }
  }

  const signupVendor = async (formData) => {
    loading.value = true
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json'
        }
      }
      const res = await axios.post('/vendors', formData, config)
      //   console.log(res);
      // Handle successful signup response here
      toast.success('Your request has been sent successfully. Our team will contact you soon ', {
        autoClose: 3000,
        type: 'success',
        position: 'bottom-center',
        transition: 'zoom',
        dangerouslyHTMLString: true
      })
    } catch (error) {
      console.log(error)
      // Handle error response here
      if (error.response && error.response.data && error.response.data.message) {
        // Display a user-friendly error message
        alert(`Signup failed: ${error.response.data.message}`)
      } else {
        // Display a generic error message
        alert('An error occurred during signup. Please try again later.')
      }
    } finally {
      loading.value = false
    }
  }

  async function updateVendor(id, updateData) {
    try {
      const res = await axios.patch('/vendors/specific', updateData, {
        withCredentials: true
      })
      console.log('updated data address', res.data.data.updatedVendorAddress)
    } catch (error) {
      console.error('updatevendore', error)
    }
  }

  async function logoutVendor() {
    try {
      const response = await axios.get('/auth/logout/vendor', {
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
      const res = await axios.patch('/vendors/updatepassword', password, config)
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

  async function forgotPassword(email) {
    try {
      loading.value = true
      const config = {
        headers: {
          'Content-Type': 'application/json'
        },
        withCredentials: true
      }
      const data = {
        email,
      }
      const res = await axios.post('/auth/forgotPassword', data, config);
      console.log(res.data);
      toast.success(res.data.message, {
        autoClose: 1000,
        type: 'success',
        position: 'bottom-center',
        transition: 'zoom',
        dangerouslyHTMLString: true
      })
      
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message, {
        autoClose: 1000,
        type: 'error',
        position: 'bottom-center',
        transition: 'zoom',
        dangerouslyHTMLString: true
      })

    } finally {
      loading.value = false;
    }
  }

  async function resetPassword(data,token) {
    try {
      loading.value = true;
      const config = {
        headers: {
          'Content-Type': 'application/json'
        },
        withCredentials: true
      }
      const res = await axios.patch(`auth/resetPassword/${token}`, data, config);
      toast.success(res.data.message, {
        autoClose: 1000,
        type: 'success',
        position: 'bottom-center',
        transition: 'zoom',
        dangerouslyHTMLString: true
      })
    } catch (error) {
      toast.error(error.response.data.message, {
        autoClose: 1000,
        type: 'error',
        position: 'bottom-center',
        transition: 'zoom',
        dangerouslyHTMLString: true
      })
    } finally {
      loading.value = false;
    }
  }

  return {
    vendors,
    loading,
    getAllVendors,
    signupVendor,
    loginVendor,
    updateVendor,
    // fetchVendorProfile,
    token,
    loggedVendor,
    stateVariable,
    rowCount,
    deleteVendor,
    approveVendor,
    logoutVendor,
    updatePassword,
    getAVendor,
    forgotPassword,
    resetPassword,
    loggedRole
  }
})
