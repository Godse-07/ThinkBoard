import axios from "axios";

const axiosInstance = axios.create({
  // baseURL: "http://localhost:3000/api",
  baseURL: "https://thinkboard-2g8j.onrender.com/api",
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosInstance;