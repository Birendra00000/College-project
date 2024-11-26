import axios from "axios";

const BaseUrl = axios.create({
  baseURL: "http://127.0.0.1:8000",
  headers: {
    "Content-Type": "application/json",
    withCredentials: true, // Enables credentials for this instance only
  },
});

export default BaseUrl;
