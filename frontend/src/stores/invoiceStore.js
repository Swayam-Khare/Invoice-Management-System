import axios from './axios'
import { defineStore } from 'pinia'
import { ref } from 'vue'
import { toast } from 'vue3-toastify'
export const useInvoiceStore = defineStore('invoiceStore', () => {
  let loading = ref(false)
  let invoices = ref([])
  let rowsCount = ref(null)

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
      invoices.value = res.data.data.invoices
      rowsCount.value = res.data.data.totalRows.count
    } catch (error) {
      console.log(error.message)
    } finally {
      loading.value = false
    }
  }

  const createInvoice = async (data) => {
    try {
      loading.value = true
      const config = { headers: { 'Content-Type': 'application/json' }, withCredentials: true }
      const res = await axios.post('/invoices', data, config)
      toast.success(res.data.message, {
        autoClose: 2000,
        pauseOnHover: false,
        type: 'success',
        position: 'bottom-center',
        transition: 'zoom',
        dangerouslyHTMLString: true
      })
      console.log(res.data)
    } catch (error) {
      console.log(error.message)
    } finally {
      loading.value = false
    }
  }

  const specificInvoice = (id) => {
    const currentInvoiceDetails = invoices.value.find((item) => item.id === id)
    return currentInvoiceDetails
  }

  const deleteInvoice = async (id) => {
    try {
      loading.value = true
      const res = await axios.delete(`/invoices/${id}`, {
        withCredentials: true
      })
      toast.success('Invoice deleted successfully', {
        autoClose: 2000,
        pauseOnHover: false,
        type: 'success',
        position: 'bottom-center',
        transition: 'zoom',
        dangerouslyHTMLString: true
      })
    } catch (error) {
      console.log(error.message)
    } finally {
      loading.value = false
    }
  }

  const updateInvoice = async (id, status) => {
    try {
      loading.value = true
      const res = await axios.patch(
        `/invoices/${id}`,
        { status },
        {
          withCredentials: true
        }
      )
      toast.success('Status updated successfully', {
        autoClose: 2000,
        pauseOnHover: false,
        type: 'success',
        position: 'bottom-center',
        transition: 'zoom',
        dangerouslyHTMLString: true
      })
    } catch (error) {
      console.log(error.message)
    } finally {
      loading.value = false
    }
  }

  const sendPdf = async (customerInfo, blob) => {
    try {
      loading.value = true
      const formData = new FormData()
      formData.append('file', blob, 'invoice.pdf')
      formData.append('email', customerInfo.email);
      formData.append('name', customerInfo.name);

      const config = { headers: { 'Content-Type': 'application/pdf' }, withCredentials: true }

      const response = await axios.post('/invoices/pdf', formData, config)

      toast.success(response.data.message, {
        autoClose: 2000,
        pauseOnHover: false,
        type: 'success',
        position: 'bottom-center',
        transition: 'zoom',
        dangerouslyHTMLString: true
      });

    } catch (error) {
      toast.error(error.response.data.message, {
        autoClose: 2000,
        pauseOnHover: false,
        type: 'error',
        position: 'bottom-center',
        transition: 'zoom',
        dangerouslyHTMLString: true
      })
    }
    finally {
      loading.value = false
    }
  }

  return {
    getAllInvoices,
    updateInvoice,
    deleteInvoice,
    invoices,
    rowsCount,
    loading,
    createInvoice,
    specificInvoice,
    sendPdf
  }
})
