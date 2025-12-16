import { SingleProduct } from "@/models/Product";
import { apiCall } from "./apiClient";

const BASE_URL = "/products";
const CATEGORY_BASE = "/categories";
const BRAND_BASE = "/brands"

export const ProductServices = {
    getAllProducts: () =>
        apiCall({
            url: BASE_URL,
            method: "GET",
        }),

    getAllBrands: () =>
        apiCall({
            url: BRAND_BASE,
            method: "GET",
        }),

    getProductById: (id: string) =>
        apiCall<{ data: SingleProduct }>({
            url: `${BASE_URL}/${id}`,
            method: "GET",
        }),
    
    addProduct: (body: object) =>
    apiCall({
        url: `https://fakestoreapi.com/products`,
        method: "POST",
        data: body
    }),

    getAllCategories: () =>
        apiCall({
            url: CATEGORY_BASE,
            method: "GET",
        }),

    getCategoryById: (id: string) =>
        apiCall({
            url: `${CATEGORY_BASE}/${id}`,
            method: "GET",
        }),

    getAllSubCategoryInCategory: (id: string, subCategory: string) =>
        apiCall({
            url: `${CATEGORY_BASE}/${id}/${subCategory}`,
            method: "GET",
        }),
};

