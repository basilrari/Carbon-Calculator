// myInstance.js
import axios from 'axios';

const backendUrl = 'http://localhost:4000/api/v1'; // Replace 'your-backend-url-here' with your actual backend URL

const myServer = axios.create({
    baseURL: backendUrl
});

export default myServer;