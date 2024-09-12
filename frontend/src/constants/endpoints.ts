export const BACKEND_API_BASE_URL =
    process.env.BACKEND_API_BASE_URL || "http://localhost:8787/api";

export const ENDPOINTS = {
    LOGIN: "/v1/auth/sign-in",
    REGISTER: "/v1/auth/sign-up",
    LOGOUT: "/v1/auth/logout",
};
