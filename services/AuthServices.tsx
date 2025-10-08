import { apiCall } from "./apiClient";

export const AuthServices = {
    getMe: () => !!localStorage.getItem("token"),

    login: (body: object) =>
        apiCall<{ token: string }>({
        url: "/auth/signin",
        method: "POST",
        data: body,
        }),

    logout: () => localStorage.removeItem("token"),

    register: (body: object) =>
        apiCall({ url: "/auth/signup", method: "POST", data: body }),

    forgetPassword: (body: object) =>
        apiCall({ url: "/auth/forgotPasswords", method: "POST", data: body }),

    getAllUsers: () =>
        apiCall({
            url: "/users",
            method: "GET",
            withAuth: true,
        }),
};
