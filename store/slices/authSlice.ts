import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { AuthServices } from "../../services/AuthServices";
import { AxiosError } from "axios";
import { AuthResponse, User } from "@/models/User";

interface AuthState {
  token: string | null;
  user: User | null;
  loading: boolean;
  error: string | null;
}

const getInitialToken = () => {
  if (typeof window !== "undefined") {
    return localStorage.getItem("token");
  }
  return null;
};

const initialState: AuthState = {
  token: getInitialToken(),
  user: null,
  loading: false,
  error: null,
};

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (body: object, { rejectWithValue }) => {
    try {
      const { data, error } = await AuthServices.login(body);
      if (error) return rejectWithValue(error);
      return data as AuthResponse;
    } catch (err) {
      const axiosError = err as AxiosError<{ message: string }>;
      return rejectWithValue(
        axiosError.response?.data?.message || "Login failed"
      );
    }
  }
);

export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (body: object, { rejectWithValue }) => {
    try {
      const { data, error } = await AuthServices.register(body);
      if (error) return rejectWithValue(error);
      return data as AuthResponse;
    } catch (err) {
      const axiosError = err as AxiosError<{ message: string }>;
      return rejectWithValue(
        axiosError.response?.data?.message || "Registration failed"
      );
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.token = null;
      state.user = null;
      if (typeof window !== "undefined") {
        localStorage.removeItem("token");
      }
    },
    setToken: (state, action: PayloadAction<string | null>) => {
      state.token = action.payload;
      if (typeof window !== "undefined") {
        if (action.payload) {
          localStorage.setItem("token", action.payload);
        } else {
          localStorage.removeItem("token");
        }
      }
    },
  },
  extraReducers: (builder) => {
    builder
      // Login
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        loginUser.fulfilled,
        (state, action: PayloadAction<AuthResponse>) => {
          state.loading = false;
          state.token = action.payload.token;
          state.user = action.payload.user;
          if (typeof window !== "undefined") {
            localStorage.setItem("token", action.payload.token);
          }
        }
      )
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Register
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        registerUser.fulfilled,
        (state, action: PayloadAction<AuthResponse>) => {
          state.loading = false;
          state.token = action.payload.token;
          state.user = action.payload.user;
          if (typeof window !== "undefined") {
            localStorage.setItem("token", action.payload.token);
          }
        }
      )
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { logout, setToken } = authSlice.actions;
export default authSlice.reducer;
