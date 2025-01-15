import axios from "axios"

const baseURL = "http://localhost:8086"
const API = axios.create({baseURL:baseURL})

export{axios,API,baseURL}