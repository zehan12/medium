import { ENDPOINTS } from "@/constants/endpoints";
import { apiClient } from "@/api/instance";
import axios from "axios";

export const login = async (body: {
    username?: string;
    email?: string;
    password: string;
}) => {
    const response = await apiClient.post(ENDPOINTS.LOGIN, body);
    return response;
};

export const authCheck = async () => {
    const response = await axios.get("http://localhost:8787/env");
    return response;
};
