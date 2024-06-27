import axios from "axios";

const baseURL = 'http://127.0.0.1:8000'; // Replace with your actual backend URL
 
const axiosInstance = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${localStorage.getItem('authToken')}`, // Retrieve token from localStorage
  },
});

export default axiosInstance;