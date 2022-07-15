import axios from 'axios'


const TOKEN = localStorage.getItem('secretToken')

const BASE_URL = process.env.REACT_APP_BACKEND_URL
export const makeRequest = axios.create({
    baseURL: BASE_URL,
    // withCredentials: true,
    headers: {
        "Content-Type": "application/json",
        Authorization: TOKEN
    }
})



export const logOUT = ()=>{
    localStorage.removeItem('secretToken')
}

