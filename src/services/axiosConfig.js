// /src/services/axiosConfig.js
import axios from 'axios';

const instance = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_URL, 
    timeout: 5000,  
});

export default instance;
