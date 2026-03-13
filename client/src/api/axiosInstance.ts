// client/src/api/axiosInstance.ts
import axios from "axios";

// In development, always use the Vite proxy (/api → localhost:5000).
// In production builds, use the VITE_API_URL env variable.
const baseURL = import.meta.env.DEV
  ? '/api'
  : (import.meta.env.VITE_API_URL || '/api');

const axiosInstance = axios.create({
  baseURL,
  withCredentials: true,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default axiosInstance;
