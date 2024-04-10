import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios';
export const useVendorStore = defineStore('vendorStore', () => {
    let vendors = ref([]);
    let loading = ref(false);
    let token = ref(null);
    const stateVariable = ref(10);

    const getAllVendors = async () => {
        try {
            loading.value = true;
            const res = await axios.get('http://localhost:3500/api/v1/vendors', { withCredentials: true });
            vendors.value = res.data.data.vendors;

        } catch (error) {
            console.log(error.message)
        } finally {
            loading.value = false;
        }
    }

    const loginVendor = async (formData)=> {
        loading = true;
        try {
            const config = { headers: { "Content-Type": "application/json" }, withCredentials: true };
            const res = await axios.post('http://localhost:3500/api/v1/auth/login/vendor', formData, config);
            console.log(res);
            token.value =  res.data.token
            console.log(token.value)

        } catch (error) {
            console.log(error)
        } finally {
            loading = false;
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
    return { vendors, loading, getAllVendors, loginVendor,  token, stateVariable  }




})