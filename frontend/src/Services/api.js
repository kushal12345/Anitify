import axios from 'axios'
import { baseURL } from './config';

const api = axios.create({
    baseURL  //your api url
    
});

export default api