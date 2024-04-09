import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios';
export const useVendorStore = defineStore('vendorStore', () => {
    let vendors = ref([]);
    let loading = ref(false);

    const getAllVendors = async () => {
        try {
            const res = await axios.get('http://localhost:3500/api/v1/vendors', { withCredentials: true });
            vendors.value = res.data.data.vendors;

        } catch (error) {
            console.log(error.message)
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

    return { vendors, getAllVendors }


})