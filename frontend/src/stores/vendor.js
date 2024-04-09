import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios';

export const useVendorStore = defineStore('vendorStore', () => {
    const vendorArr = ref([]);
    let isloading = ref(false);
    let token = ref(null);
    const stateVariable = ref(10);


    async function loginVendor(formData) {
        isloading = true;
        try {
            const config = { headers: { "Content-Type": "application/json" }, withCredentials: true };
            const res = await axios.post('http://localhost:3000/api/v1/auth/login/vendor', formData, config);
            console.log(res);
            token.value =  res.data.token
            console.log(token.value)

        } catch (error) {
            console.log(error)
        } finally {
            isloading = false;
        }
       
    }
    return { vendorArr, loginVendor,  token, stateVariable };
})

