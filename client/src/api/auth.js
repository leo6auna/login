import axios from './axios.js'


export const registerRequest = (user) => axios.post(`/register`,user)

export const loginRequest = async (user) => axios.post(`/login`,user)

export const verifyToken = async () => axios.get(`/verify`);

