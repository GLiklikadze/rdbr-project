import axios, { type AxiosInstance } from "axios";

const baseUrl = "https://api.redclass.redberryinternship.ge/api";
const axiosConfig = {
  baseURL: baseUrl,
  headers: {
    Authorization: "Bearer ",
  },
};

export const httpClient: AxiosInstance = axios.create(axiosConfig);
