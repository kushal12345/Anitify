import axios from 'axios'

const api = axios.create({
    baseURL: 'https://anitify-api.vercel.app'  //your api url
});

export default api