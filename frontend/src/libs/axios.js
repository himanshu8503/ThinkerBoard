import axios from "axios";

const BASE_URL = import.meta.env.MODE === "Development" ? "http://localhost:8000/api":"/api"
const api = axios.create({
    baseURL: BASE_URL,
})

export default api;