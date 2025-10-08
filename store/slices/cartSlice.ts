import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { CartServices } from "../../services/CartServices";
import { AxiosError } from "axios";
import { CartResponse } from "@/models/Product";

interface CartState {
  cart: CartResponse | null;
  loading: boolean;
  error: string | null;
}

const initialState: CartState = {
  cart: null,
  loading: false,
  error: null,
};


export const fetchUserCart = createAsyncThunk(
  "cart/fetchUserCart",
  async (_, { rejectWithValue }) => {
    try {
      const { data, error } = await CartServices.getUserCart();
      if (error) return rejectWithValue(error);
      return data as CartResponse;
    } catch (err) {
      const axiosError = err as AxiosError<{ message: string }>;
      return rejectWithValue(axiosError.response?.data?.message || "Failed to fetch cart");
    }
  }
);

export const addProductToCart = createAsyncThunk(
  "cart/addProductToCart",
  async (body: object, { rejectWithValue }) => {
    try {
      const { data, error } = await CartServices.AddProductToCart(body);
      if (error) return rejectWithValue(error);
      return data as CartResponse;
    } catch (err) {
      const axiosError = err as AxiosError<{ message: string }>;
      return rejectWithValue(axiosError.response?.data?.message || "Failed to add product");
    }
  }
);

export const updateUserCart = createAsyncThunk(
  "cart/updateUserCart",
  async ({ id, body }: { id: string; body: object }, { rejectWithValue }) => {
    try {
      const { data, error } = await CartServices.UpdateUserCart(id, body);
      if (error) return rejectWithValue(error);
      return data as CartResponse;
    } catch (err) {
      const axiosError = err as AxiosError<{ message: string }>;
      return rejectWithValue(axiosError.response?.data?.message || "Failed to update cart");
    }
  }
);

export const deleteItemFromCart = createAsyncThunk(
  "cart/deleteItemFromCart",
  async (id: string, { rejectWithValue }) => {
    try {
      const { data, error } = await CartServices.DeleteItemFromCart(id);
      if (error) return rejectWithValue(error);
      return data as CartResponse;
    } catch (err) {
      const axiosError = err as AxiosError<{ message: string }>;
      return rejectWithValue(axiosError.response?.data?.message || "Failed to delete item");
    }
  }
);

export const clearUserCart = createAsyncThunk(
  "cart/clearUserCart",
  async (_, { rejectWithValue }) => {
    try {
      const { data, error } = await CartServices.clearUserCart();
      if (error) return rejectWithValue(error);
      return data;
    } catch (err) {
      const axiosError = err as AxiosError<{ message: string }>;
      return rejectWithValue(axiosError.response?.data?.message || "Failed to clear cart");
    }
  }
);

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // fetch cart
      .addCase(fetchUserCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserCart.fulfilled, (state, action: PayloadAction<CartResponse>) => {
        state.loading = false;
        state.cart = action.payload;
      })
      .addCase(fetchUserCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // add product
      .addCase(addProductToCart.fulfilled, (state, action: PayloadAction<CartResponse>) => {
        state.cart = action.payload;
      })
      // update cart
      .addCase(updateUserCart.fulfilled, (state, action: PayloadAction<CartResponse>) => {
        state.cart = action.payload;
      })
      // delete item
      .addCase(deleteItemFromCart.fulfilled, (state, action: PayloadAction<CartResponse>) => {
        state.cart = action.payload;
      })
      // clear cart
      .addCase(clearUserCart.fulfilled, (state) => {
        state.cart = null;
      });
  },
});

export default cartSlice.reducer;
