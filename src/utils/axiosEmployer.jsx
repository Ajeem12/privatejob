// src/api/axiosEmployer.js
import axios from 'axios';

const baseURL = import.meta.env.VITE_API_URL;

const axiosEmployer = axios.create({
  baseURL: `${baseURL}`,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add employer token to headers
axiosEmployer.interceptors.request.use((config) => {
  const token = localStorage.getItem('token_employer');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default axiosEmployer;
