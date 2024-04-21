import axios from "axios";
const baseURL = import.meta.env.VITE_BASEURL_DEV
export default axios.create({
 baseURL:baseURL
})