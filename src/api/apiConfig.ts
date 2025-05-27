import axios from "axios";
const baseURL = import.meta.env.VITE_POKESHOP_BASE_URL
const timeout = Number(import.meta.env.VITE_API_TIMEOUT) || 5000

const apiConfig = axios.create({
  baseURL,
  headers: { 'Content-Type': 'application/json' },
  timeout,
})

export default apiConfig;