import axios from 'axios';

// 1. Create the Axios Instance
const api = axios.create({
  baseURL: 'http://127.0.0.1:8000/api', // Your Laravel URL
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
});

// 2. Add Interceptor (Automatically attach Token)
// This code runs before every request. It checks if we have a token and adds it.
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;