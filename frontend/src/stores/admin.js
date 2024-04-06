import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios';

export const useAdminStore = defineStore('adminStore', () => {
    const adminArr = ref([]);
    let isloading = ref(false);
    let token = ref(null);
    const stateVariable = ref(10);


    async function loginAdmin(formData) {
        isloading = true;
        try {
            const config = { headers: { "Content-Type": "application/json" }, withCredentials: true };
            const res = await axios.post('http://localhost:3500/api/v1/auth/login/admin', formData, config);
            console.log(res);
            token = await res.data.token
            console.log(token)

        } catch (error) {
            console.log(error)
        } finally {
            isloading = false;
        }
    }
    const isAuthenticated = computed(() => token);
    return { adminArr, loginAdmin, isAuthenticated, token, stateVariable };
})

