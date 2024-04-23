import axios from './axios'
import { defineStore } from 'pinia'
import { ref } from 'vue'
export const useInvoiceStore = defineStore('invoiceStore', () => {
  let loading = ref(false)
  let invoices = ref([]);
  let rowsCount = ref(null);

  const getAllInvoices = async (options) => {
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
      const res = await axios.get(`/invoices?${queryStr}`, {
        withCredentials: true
      })
      console.log(res.data.data.invoices)
      invoices.value = res.data.data.invoices;
      rowsCount.value = res.data.data.totalRows.count;
    } catch (error) {
      console.log(error.message)
    } finally {
      loading.value = false
    }
  }

  return { getAllInvoices, invoices, rowsCount, loading}
})
