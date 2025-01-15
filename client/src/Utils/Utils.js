import axios from "axios"
const baseURL = process.env.API_URL||"http://localhost:8086"
const API = axios.create({baseURL:baseURL})

export{axios,API,baseURL}