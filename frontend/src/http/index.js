import axios from 'axios';

const api = axios.create({
    baseURL : process.env.REACT_APP_API_URL,
    headers : {
        'Content-type' : 'application/json',
        Accept : 'application/json',
    },  
}); 
 

// Endpoints
export const sendOtp = (data) => api.post('http://localhost:5500/api/send-otp', data);
export const verifyOtp = (data) => api.post('http://localhost:5500/api/verify-otp', data);
export default api;