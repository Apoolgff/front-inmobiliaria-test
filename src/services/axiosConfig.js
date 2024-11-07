// /src/services/axiosConfig.js
import axios from 'axios';

const instance = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_URL,  // Usa la variable de entorno de Vite
    timeout: 5000,  // Tiempo de espera para las solicitudes
});

export default instance;
