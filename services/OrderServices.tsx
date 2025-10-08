import {apiCall} from "./apiClient"

// services/OrderServices.ts
const BASE_URL = "https://ecommerce.routemisr.com/api/v1/orders"; // ✅ plural "orders"

const checkout_url = (cartId: string) =>
  `${BASE_URL}/checkout-session/${cartId}?url=http://localhost:3000`;

export const OrderServices = {
  getAllOrders: () => apiCall({ url: BASE_URL, method: "GET" }),

  getUserOrders: (id: string) =>
    apiCall({ url: `${BASE_URL}/user/${id}`, method: "GET", withAuth: true }),

  CreateCashSession: (cartId: string, body: object) =>
    apiCall({
      url: `${BASE_URL}/${cartId}`,
      method: "POST",
      data: body,
      withAuth: true,
    }),

  CreateCheckoutSession: (cartId: string, body: object) =>
    apiCall({
      url: checkout_url(cartId),
      method: "POST",
      data: body,
      withAuth: true,
    }),
};
