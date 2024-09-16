import { BACKEND_API_BASE_URL } from "@/constants/endpoints";
import axios, { AxiosInstance } from "axios";

export const apiClient: AxiosInstance = axios.create({
    baseURL: BACKEND_API_BASE_URL,
});
