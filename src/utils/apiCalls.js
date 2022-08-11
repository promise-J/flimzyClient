import axios from 'axios'


const TOKEN = localStorage.getItem('secretToken')
// REACT_APP_BACKEND_URL=https://flimzy-api-app.herokuapp.com


const BASE_URL = process.env.REACT_APP_BACKEND_URL
export const makeRequest = axios.create({
    baseURL: BASE_URL,
    // withCredentials: true,
    headers: {
        "Content-Type": "application/json",
        Authorization: TOKEN
    }
})

export const imgRequest = axios.create({
    baseUrl: BASE_URL,
    headers: {
        "Content-Type": "multipart/form-data"
    }
})



export const logOUT = ()=>{
    localStorage.removeItem('secretToken')
}

