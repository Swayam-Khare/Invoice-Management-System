import axios from './axios'
import { defineStore } from 'pinia'
import { ref } from 'vue'
import { toast } from 'vue3-toastify'

export const useCustomerStore = defineStore('customerStore', () => {
  let loading = ref(false)
  let customers = ref([]);
  let rowsCount = ref(null);

  const getAllCustomers = async (options) => {
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
      const res = await axios.get(`/customers?${queryStr}`, {
        withCredentials: true
      })
      console.log(res.data.data.vendorCustomers)
      customers.value = res.data.data.vendorCustomers;
      rowsCount.value = res.data.data.totalRows.count;
    } catch (error) {
      console.log(error.message)
    } finally {
      loading.value = false
    }
  }

  const updateCustomer = async (data) => {
    try {
      loading.value = true
      console.log('line 38',data)
      const res = await axios.patch(`/customers/${data.id}`,
        data,
        {
        withCredentials: true
        }
      );
      toast.success(res.data.message, {
        autoClose: 2000,
        pauseOnHover: false,
        type: 'success',
        position: 'bottom-center',
        transition: 'zoom',
        dangerouslyHTMLString: true
      })
    }
    catch (err) {
      console.log(err.message);
      toast.error(err.message, {
        autoClose: 2000,
        pauseOnHover: false,
        type: 'error',
        position: 'bottom-center',
        transition: 'zoom',
        dangerouslyHTMLString: true
      })
    }
    finally {
      loading.value = false;
    }
    
  }

  const deleteCustomer = async (id)=>{
    try {
      loading.value = true;
      await axios.delete(`/customers/${id}`,{withCredentials:true})    
    } catch (err) {
      toast.error(err.message, {
        autoClose: 2000,
        pauseOnHover: false,
        type: 'error',
        position: 'bottom-center',
        transition: 'zoom',
        dangerouslyHTMLString: true
      })
    }finally {
      loading.value = false;
    }
  }

  return { getAllCustomers, customers, rowsCount, loading, updateCustomer, deleteCustomer }
})
