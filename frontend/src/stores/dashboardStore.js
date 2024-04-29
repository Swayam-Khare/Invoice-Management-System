import axios from './axios'
import { defineStore } from 'pinia'
import { ref } from 'vue'
import { toast } from 'vue3-toastify'
export const usedashboardStore = defineStore('dashboardStore', () => {
  let loading = ref(false)
  let paidInvoices = ref(null);
  let grandTotal = ref(null);

  const TotalIncome = async (options) => {
    
    try {
      loading.value = true
      const res = await axios.get(`/dashboard/totalIncome`, {
        withCredentials: true
      })
      console.log(res.data.data.paidInvoices);
      console.log(res.data.data.grandTotal)
      paidInvoices.value = res.data.data.paidInvoices;
      grandTotal.value = res.data.data.grandTotal;
    } catch (error) {
      console.log(error.message)
    } finally {
      loading.value = false
    }
  }

  const createInvoice = async (data) => {
    try {
      loading.value = true;
      const config = { headers: { 'Content-Type': 'application/json' }, withCredentials: true }
      const res = await axios.post('/invoices', data, config);
      toast.success(res.data.message, {
        autoClose: 2000,
        pauseOnHover: false,
        type: 'success',
        position: 'bottom-center',
        transition: 'zoom',
        dangerouslyHTMLString: true
      })
      console.log(res.data);

    } catch (error) {
      console.log(error.message);
    } finally {
      loading.value = false;
    }
  }

  return { TotalIncome, paidInvoices, grandTotal, loading, createInvoice}
})
