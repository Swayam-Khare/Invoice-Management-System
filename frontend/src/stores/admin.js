import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios';

export const useAdminStore = defineStore('adminStore', () => {
    const adminArr = ref([]);
    let token = ref(null);

    async function loginAdmin(formData) {
        console.log('in store', formData)
        // const {email,password} = formData;
        const config = { headers: { "Content-Type": "application/json" }, withCredentials: true };
        const res = await axios.post('http://localhost:3500/api/v1/auth/login/admin', formData, config);
        // console.log(res);
        token = res.data.token
        console.log(token)
    }
    const isAuthenticated = computed(() => token);
    return { adminArr, loginAdmin, isAuthenticated };
})

