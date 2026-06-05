import axios from 'axios';

const axiosInstance = axios.create({
  // 🌐 SEKARANG SUDAH MENGARAH KE BACKEND RENDER LU YANG LIVE
  baseURL: 'https://frostmart-backend-1.onrender.com/api/v1', 
  
  // 👇 INI TETEP DIPERTAHANKAN: Mengizinkan Axios membawa Cookie secara otomatis! 👇
  withCredentials: true, 
});

export default axiosInstance;