import axios from 'axios';

const API_URL = "http://127.0.0.1:8000/api";

const apiCall = axios.create({
    withCredentials: true,
    baseURL: '/api/'
});

export const AxiosAPI = axios.create({
    baseURL: API_URL,
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    }
})


export default apiCall;