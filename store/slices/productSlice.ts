import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import {ProductServices} from "../../services/ProductServices";
import { Brand, Category, PaginatedData, Product } from "@/models/Product";
import { AxiosError } from "axios";

interface ProductState {
  products: Product[];
  categories: Category[];
  brands: Brand[],
  loading: boolean;
  error: string | null;
}

const initialState: ProductState = {
  products: [],
  categories: [],
  brands:[],
  loading: false,
  error: null,
};

export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async (_, { rejectWithValue }) => {
    try {
      const { data, error } = await ProductServices.getAllProducts();
      if (error) return rejectWithValue(error);
      return data as PaginatedData<Product>;
    } catch (err) {
      const axiosError = err as AxiosError<{ message: string }>;
      return rejectWithValue(axiosError.response?.data?.message || "Failed to fetch products");
    }
  }
);

export const fetchBrands = createAsyncThunk(
  "products/fetchBrands",
  async (_, { rejectWithValue }) => {
    try {
      const { data, error } = await ProductServices.getAllBrands();
      if (error) return rejectWithValue(error);
      return data as PaginatedData<Brand>;
    } catch (err) {
      const axiosError = err as AxiosError<{ message: string }>;
      return rejectWithValue(axiosError.response?.data?.message || "Failed to fetch products");
    }
  }
);

export const fetchCategories = createAsyncThunk(
  "products/fetchCategories",
  async (_, { rejectWithValue }) => {
    try {
      const { data, error } = await ProductServices.getAllCategories();
      if (error) return rejectWithValue(error);
      return data as { data: Category[] };
    } catch (err) {
      const axiosError = err as AxiosError<{ message: string }>;
      return rejectWithValue(axiosError.response?.data?.message || "Failed to fetch categories");
    }
  }
);

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action: PayloadAction<PaginatedData<Product>>) => {
        state.loading = false;
        state.products = action.payload.data;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(fetchCategories.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCategories.fulfilled, (state, action: PayloadAction<{ data: Category[] }>) => {
        state.loading = false;
        state.categories = action.payload.data;
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(fetchBrands.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBrands.fulfilled, (state, action: PayloadAction<PaginatedData<Brand>>) => {
        state.loading = false;
        state.brands = action.payload.data;
      })
      .addCase(fetchBrands.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default productSlice.reducer;
