import axios from 'axios'

// Check if the token exists in localStorage or sessionStorage
const token = localStorage.getItem('vendorToken') || sessionStorage.getItem('vendorToken')

// Create an instance of Axios with the token in the request headers
const axiosInstance = axios.create({
  baseURL: 'http://localhost:7000/api/v1/vendors/1', // Replace with your API base URL
  headers: {
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json'
  }
})

export default axiosInstance
