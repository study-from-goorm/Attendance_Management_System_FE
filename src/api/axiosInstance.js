import axios from "axios";
import store from "../store";
import { waitForRehydration } from "../utils";


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

axiosPrivate.interceptors.request.use(
  async (config) => {
    // Rehydration 완료까지 기다림
    await waitForRehydration();

    const token = store.getState().auth.accessToken;
    if (token) {
      config.headers["accessToken"] = `${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);
