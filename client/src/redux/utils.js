import axios from "axios"

const baseURL = import.meta.env.API_URL

export const api = axios.create({
    baseURL: baseURL
})