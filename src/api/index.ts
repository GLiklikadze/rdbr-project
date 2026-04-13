import axios, { type AxiosInstance } from "axios";
import { getDefaultStore } from "jotai";
import { tokenAtom } from "../state";

const baseUrl = "https://api.redclass.redberryinternship.ge/api";

const axiosConfig = {
  baseURL: baseUrl,
};

export const httpClient: AxiosInstance = axios.create(axiosConfig);
const store = getDefaultStore();
httpClient.interceptors.request.use(
  (config) => {
    const token = store.get(tokenAtom);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);
