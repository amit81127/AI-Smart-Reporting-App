import axios from 'axios';

// Replace with your local machine's IP Address (e.g. 192.168.x.x)
// DON'T use localhost if testing on an actual physical mobile device
const BASE_URL = 'http://localhost:5000/api';

const api = axios.create({
    baseURL: BASE_URL,
    timeout: 15000,
});

export const authApi = {
    login: (data: any) => api.post('/auth/login', data),
    register: (data: any) => api.post('/auth/register', data),
};

export const reportApi = {
    create: (data: any) => api.post('/report/create', data),
    getReports: () => api.get('/report/all'),
};

export const chatbotApi = {
    sendMessage: (message: string) => api.post('/chatbot', { message }),
};

export default api;
