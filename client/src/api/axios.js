import axios from "axios";
import { API_URL } from "../config.js";
const instance = axios.create({
    baseURL: 'https://login-production-cd51.up.railway.app',
    withCredentials: true
});

export default instance