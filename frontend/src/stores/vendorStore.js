import { ref } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios'
export const useVendorStore = defineStore('vendorStore', () => {
  let vendors = ref([])
  let rowCount = ref({ count: 0 })
  let loading = ref(false)
  let token = ref(null)
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
      const res = await axios.get(`http://localhost:3500/api/v1/vendors?${queryStr}`, {
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
      const res = await axios.post(
        'http://localhost:3500/api/v1/auth/login/vendor',
        formData,
        config
      )
      console.log(res)
      token.value = res.data.token
      console.log(token.value)
    } catch (error) {
      console.log(error)
    } finally {
      loading.value = false
    }
  }

  const deleteVendor = async (id) => {
    try {
      console.log('in 52', id)
      loading.value = true
      const res = await axios.delete(`http://localhost:3500/api/v1/vendors/${id}`, {
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
      const res = await axios.patch(
        `http://localhost:3500/api/v1/admin/vendorStatus/${id}`,
        {},
        { withCredentials: true }
      )
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
      const res = await axios.post('http://localhost:3500/api/v1/vendors', formData, config)
      //   console.log(res);
      // Handle successful signup response here
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

  //   const vendors = computed(async () => {
  //         try {
  //             const res =  await axios.get('http://localhost:3500/api/v1/vendors', { withCredentials: true });
  //             const resData = await res.data.data.vendors;
  //             return  resData;
  //         } catch (error) {
  //             console.log(error.message);
  //         } finally {
  //             loading = false;
  //         }
  //     });

  return {
    vendors,
    loading,
    getAllVendors,
    signupVendor,
    loginVendor,
    token,
    stateVariable,
    rowCount,
    deleteVendor,
    approveVendor
  }
})
