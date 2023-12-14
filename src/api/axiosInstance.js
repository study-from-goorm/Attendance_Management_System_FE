import axios from "axios";
import store from "../store";


// const BASE_URL = 'http://211.215.180.216:9999';

const BASE_URL = 'http://localhost:8080';
export const axiosPublic = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const axiosPrivate = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// axios 인터셉터 설정
axiosPrivate.interceptors.request.use(
  (config) => {
    const token = store.getState().auth.accessToken;

    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 211.215.180.216:9999/admin/courses
