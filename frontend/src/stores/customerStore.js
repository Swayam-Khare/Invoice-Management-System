import axios from 'axios'
import { defineStore } from 'pinia'
import { ref } from 'vue'
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
      const res = await axios.get(`http://localhost:3500/api/v1/customers?${queryStr}`, {
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

  return { getAllCustomers, customers, rowsCount,loading}
})
