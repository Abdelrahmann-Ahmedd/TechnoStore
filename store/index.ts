import { configureStore } from "@reduxjs/toolkit";
import productReducer from "./slices/productSlice";
import orderReducer from "./slices/orderSlice";
import cartReducer from "./slices/cartSlice";
import authReducer from "./slices/authSlice";
export const myStore = configureStore({
    reducer: {
        products: productReducer,
        orders: orderReducer,
        cart: cartReducer,
        auth: authReducer,
    },
});


export type RootState = ReturnType<typeof myStore.getState>;
export type AppDispatch = typeof myStore.dispatch;