import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import {ProductServices} from "../../services/ProductServices";
import { Brand, Category, PaginatedData, Product, Wishlist, WishlistResponse } from "@/models/Product";
import { AxiosError } from "axios";

interface ProductState {
  products: Product[];
  wishlistproducts: Product[];
  categories: Category[];
  brands: Brand[],
  loading: boolean;
  error: string | null;
  wishlistLoading: boolean;
  initialLoaded: boolean;
}

const initialState: ProductState = {
  products: [],
  wishlistproducts: [],
  categories: [],
  brands:[],
  loading: false,
  error: null,
  wishlistLoading: false,
  initialLoaded: false
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

export const fetchWishlistProducts = createAsyncThunk(
  "products/fetchWishlistProducts",
  async (_, { rejectWithValue }) => {
    try {
      const { data, error } = await ProductServices.getAllProductInWishlist();
      if (error) return rejectWithValue(error);
      return data as PaginatedData<Product>;
    } catch (err) {
      const axiosError = err as AxiosError<{ message: string }>;
      return rejectWithValue(axiosError.response?.data?.message || "Failed to fetch WishList.");
    }
  }
);

export const addProductToWishlist = createAsyncThunk(
  "products/addProductToWishlist",
  async (body: object, { rejectWithValue }) => {
    try {
      const { data, error } = await ProductServices.addProductToWishlist(body);
      if (error) return rejectWithValue(error);
      return data as WishlistResponse;
    } catch (err) {
      const axiosError = err as AxiosError<{ message: string }>;
      return rejectWithValue(axiosError.response?.data?.message || "Failed to add product to wishlist");
    }
  }
);

export const deleteProductFromWishlist = createAsyncThunk(
  "products/deleteProductFromWishlist",
  async (id: string, { rejectWithValue }) => {
    try {
      const { data, error } = await ProductServices.deleteProductFromWishlist(id);
      if (error) return rejectWithValue(error);
      return data as WishlistResponse;
    } catch (err) {
      const axiosError = err as AxiosError<{ message: string }>;
      return rejectWithValue(axiosError.response?.data?.message || "Failed to delete product From wishlist");
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
        if (
          state.brands.length > 0 &&
          state.categories.length > 0
        ) {
          state.initialLoaded = true;
        }
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(fetchWishlistProducts.pending, (state) => {
        state.wishlistLoading = true;
        state.error = null;
      })
      .addCase(fetchWishlistProducts.fulfilled, (state, action: PayloadAction<PaginatedData<Product>>) => {
        state.wishlistLoading = false;
        state.wishlistproducts = action.payload.data;
        if (
          state.brands.length > 0 &&
          state.categories.length > 0
        ) {
          state.initialLoaded = true;
        }
      })
      .addCase(fetchWishlistProducts.rejected, (state, action) => {
        state.wishlistLoading = false;
        state.error = action.payload as string;
      })
      .addCase(fetchCategories.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCategories.fulfilled, (state, action: PayloadAction<{ data: Category[] }>) => {
        state.loading = false;
        state.categories = action.payload.data;
        if (
          state.brands.length > 0 &&
          state.categories.length > 0
        ) {
          state.initialLoaded = true;
        }
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
        if (
          state.brands.length > 0 &&
          state.categories.length > 0
        ) {
          state.initialLoaded = true;
        }
      })
      .addCase(fetchBrands.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default productSlice.reducer;
