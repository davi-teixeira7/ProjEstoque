import axios from "axios";

export default apiClient = axios.create({
  baseURL: "http://127.0.0.1:8000/produtos/",
  headers: {
    "Content-Type": "application/json",
  },
});
