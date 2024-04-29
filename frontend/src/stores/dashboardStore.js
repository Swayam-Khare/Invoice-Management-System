import axios from './axios'
import { defineStore } from 'pinia'
import { ref } from 'vue'
import { toast } from 'vue3-toastify'
export const usedashboardStore = defineStore('dashboardStore', () => {
  let loading = ref(false)
  let paidInvoices = ref(null)
  let grandTotal = ref(null)
  let totalInvoices = ref(null)
  let dueInvoices = ref(null)
  let overdueInvoices = ref(null)

  const TotalIncome = async () => {
    try {
      loading.value = true
      const res = await axios.get('/dashboard/totalIncome', {
        withCredentials: true
      })

      paidInvoices.value = res.data.data.paidInvoices
      grandTotal.value = res.data.data.grandTotal
    } catch (error) {
      console.log(error.message)
    } finally {
      loading.value = false
    }
  }

  const TotalInvoice = async () => {
    try {
      loading.value = true
      const res = await axios.get('/dashboard/totalInvoices', {
        withCredentials: true
      })
      console.log(res.data.data.totalInvoices)
      // console.log(res.data.data.grandTotal)
      totalInvoices.value = res.data.data.totalInvoices
      dueInvoices.value = res.data.data.dueInvoices
      overdueInvoices.value = res.data.data.overdueInvoices
    } catch (error) {
      console.log(error.message)
    } finally {
      loading.value = false
    }
  }

  return {
    TotalIncome,
    paidInvoices,
    TotalInvoice,
    totalInvoices,
    overdueInvoices,
    dueInvoices,
    grandTotal,
    loading
  }
})
