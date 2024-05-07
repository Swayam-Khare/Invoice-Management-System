import axios from './axios'
import { defineStore } from 'pinia'
import { ref } from 'vue'
import { toast } from 'vue3-toastify'

export const useProductStore = defineStore('productStore', () => {
  let loading = ref(false)
  let products = ref([])
  let rowsCount = ref(null)
  let selectedProducts = ref([])

  const getAllProducts = async (options) => {
    let queryStr = ''
    for (const key in options) {
      if (options[key]) {
        queryStr += key + '=' + options[key] + '&'
      }
      // console.log(key,options[key])
    }
    // console.log(queryStr);
    try {
      loading.value = true
      const res = await axios.get(`/products?${queryStr}`, {
        withCredentials: true
      })
      console.log(res.data.data)
      products.value = res.data.data.myProducts
      rowsCount.value = res.data.data.totalRows.count
    } catch (error) {
      console.log(error.message)
    } finally {
      loading.value = false
    }

    // let queryStr = ''

    // for (const key in options) {
    //   if (options[key]) {
    //     if (queryStr) {
    //       queryStr += '&' // Add '&' only if queryStr is not empty
    //     }
    //     queryStr += `${key}=${options[key]}`
    //   }
    // }

    // try {
    //   loading.value = true
    //   const res = await axios.get(`/products?${queryStr}`, {
    //     withCredentials: true
    //   })
    //   console.log(res.data.data)
    //   products.value = res.data.data.myProducts
    //   rowsCount.value = res.data.data.totalRows.count
    // } catch (error) {
    //   console.log(error.message)
    // } finally {
    //   loading.value = false
    // }
  }

  const getSelectedProducts = async (ids) => {
    try {
      loading.value = true
      const data = {
        ids
      }
      const res = await axios.post('/products/findByIds', data, {
        withCredentials: true
      })
      selectedProducts.value = res.data.data.myProducts
    } catch (err) {
      console.log(err)
    } finally {
      loading.value = false
    }
  }

  const createProduct = async (data) => {
    try {
      loading.value = true
      const res = await axios.post('/products', data, {
        withCredentials: true
      })
      toast.success(res.data.status, {
        autoClose: 2000,
        pauseOnHover: false,
        type: 'success',
        position: 'bottom-center',
        transition: 'zoom',
        dangerouslyHTMLString: true
      })
    } catch (error) {
      console.log(error)
    } finally {
      loading.value = false
    }
  }

  const updateProduct = async (data) => {
    try {
      loading.value = true
      const res = await axios.patch(`/products/${data.id}`, data, {
        withCredentials: true
      })
      toast.success(res.data.message, {
        autoClose: 2000,
        pauseOnHover: false,
        type: 'success',
        position: 'bottom-center',
        transition: 'zoom',
        dangerouslyHTMLString: true
      })
    } catch (err) {
      console.log(err.message)
      toast.error(err.message, {
        autoClose: 2000,
        pauseOnHover: false,
        type: 'error',
        position: 'bottom-center',
        transition: 'zoom',
        dangerouslyHTMLString: true
      })
    } finally {
      loading.value = false
    }
  }

  const deleteProduct = async (id) => {
    try {
      loading.value = true
      await axios.delete(`/products/${id}`, { withCredentials: true })
    } catch (err) {
      toast.error(err.message, {
        autoClose: 2000,
        pauseOnHover: false,
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
    getAllProducts,
    products,
    rowsCount,
    loading,
    createProduct,
    updateProduct,
    deleteProduct,
    getSelectedProducts,
    selectedProducts
  }
})
