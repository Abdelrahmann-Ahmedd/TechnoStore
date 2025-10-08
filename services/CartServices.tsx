import { apiCall } from "./apiClient";

const BASE_URL = "/cart";

export const CartServices = {
    getUserCart: () =>
        apiCall({ url: BASE_URL, method: "GET", withAuth: true }),

    AddProductToCart: (body: object) =>
        apiCall({ url: BASE_URL, method: "POST", data: body, withAuth: true }),

    UpdateUserCart: (id: string, body: object) =>
        apiCall({ url: `${BASE_URL}/${id}`, method: "PUT", data: body, withAuth: true }),

    DeleteItemFromCart: (id: string) =>
        apiCall({ url: `${BASE_URL}/${id}`, method: "DELETE", withAuth: true }),

    clearUserCart: () =>
        apiCall({ url: BASE_URL, method: "DELETE", withAuth: true }),
};
