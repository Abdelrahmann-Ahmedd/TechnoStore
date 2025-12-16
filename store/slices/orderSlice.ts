// store/slices/orderSlice.ts
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import {OrderServices} from "../../services/OrderServices";
import { Order } from "@/models/Order";
import { AxiosError } from "axios";

interface OrderState {
  orders: Order[];
  loading: boolean;
  error: string | null;
}

const initialState: OrderState = {
  orders: [],
  loading: false,
  error: null,
};

export const fetchUserOrders = createAsyncThunk(
  "orders/fetchUserOrders",
  async (userId: string, { rejectWithValue }) => {
    try {
      const { data, error } = await OrderServices.getUserOrders(userId);
      if (error) return rejectWithValue(error);
      return data as Order[];
    } catch (err) {
        const axiosError = err as AxiosError<{ message: string }>;
      return rejectWithValue(axiosError.response?.data?.message || "Failed to fetch orders");
    }
  }
);

export const fetchAllOrders = createAsyncThunk(
  "orders/fetchAllOrders",
  async (userId: string, { rejectWithValue }) => {
    try {
      const { data, error } = await OrderServices.getAllOrders();
      if (error) return rejectWithValue(error);
      return data as Order[];
    } catch (err) {
        const axiosError = err as AxiosError<{ message: string }>;
      return rejectWithValue(axiosError.response?.data?.message || "Failed to fetch orders");
    }
  }
);

export const createCheckoutSession = createAsyncThunk(
  "orders/createCheckoutSession",
  async ({cartId,body}: {cartId:string , body:object}, { rejectWithValue }) => {
    try {
      const { data, error } = await OrderServices.CreateCheckoutSession(cartId,body);
      if (error) return rejectWithValue(error);
      return data; // checkout session data
    } catch (err) {
      const axiosError = err as AxiosError<{ message: string }>;
      return rejectWithValue(axiosError.response?.data?.message || "Failed to create checkout session");
    }
  }
);

const orderSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserOrders.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserOrders.fulfilled, (state, action: PayloadAction<Order[]>) => {
        state.loading = false;
        state.orders = action.payload;
      })
      .addCase(fetchUserOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(fetchAllOrders.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllOrders.fulfilled, (state, action: PayloadAction<Order[]>) => {
        state.loading = false;
        state.orders = action.payload;
      })
      .addCase(fetchAllOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(createCheckoutSession.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createCheckoutSession.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(createCheckoutSession.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default orderSlice.reducer;
