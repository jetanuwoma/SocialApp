import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://socialappback.herokuapp.com/api/'  
})

export default axiosInstance;
