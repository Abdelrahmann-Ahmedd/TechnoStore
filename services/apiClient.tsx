import axios, { AxiosError, AxiosRequestConfig } from "axios";

const API = axios.create({
    baseURL: "https://ecommerce.routemisr.com/api/v1",
    timeout: 5000,
    headers: { "Content-Type": "application/json" },
});

export async function apiCall<T>(config: AxiosRequestConfig & { withAuth?: boolean }) {
    try {
        if (config.withAuth) {
            const token = localStorage.getItem("token");
            if (token) {
                config.headers = {
                ...config.headers,
                token: `${token}`,
                };
            }
        }
        const response = await API.request<T>(config);
        return { data: response.data, error: null };
    } catch (error) {
        const axiosError = error as AxiosError<{ message: string }>;
        console.error("API Error:", axiosError);
        return {
            data: null,
            error: axiosError.response?.data?.message || "Unexpected error",
        };
    }
}
