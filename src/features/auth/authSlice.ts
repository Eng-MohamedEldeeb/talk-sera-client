import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

import api from "@/app/api";

import { AxiosError } from "axios";
import type {
  IAuthResponse,
  LoginDto,
  RegisterDto,
} from "@/@types/IAuthResponse.interface";
import type { IUser } from "@/@types/IUser.interface";

// State shape
interface AuthState {
  user: IUser | null;
  accessToken: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  accessToken: localStorage.getItem("accessToken"),
  isAuthenticated: !!localStorage.getItem("accessToken"),
  isLoading: false,
  error: null,
};

//  Thunks
export const login = createAsyncThunk<IAuthResponse, LoginDto>(
  "auth/login",
  async (credentials, { rejectWithValue }) => {
    try {
      const { data } = await api.post<IAuthResponse>(
        "/api/auth/login",
        credentials,
      );
      localStorage.setItem("accessToken", data.accessToken);
      localStorage.setItem("refreshToken", data.refreshToken);
      return data;
    } catch (err: unknown) {
      if (err instanceof AxiosError)
        return rejectWithValue(err.response?.data?.message || "Login failed");
      return rejectWithValue(err || "Login failed");
    }
  },
);

export const register = createAsyncThunk<IAuthResponse, RegisterDto>(
  "auth/register",
  async (userData, { rejectWithValue }) => {
    try {
      const { data } = await api.post<IAuthResponse>(
        "/api/auth/register",
        userData,
      );
      localStorage.setItem("accessToken", data.accessToken);
      localStorage.setItem("refreshToken", data.refreshToken);
      return data;
    } catch (err: unknown) {
      if (err instanceof AxiosError)
        return rejectWithValue(err.response?.data?.message || "Login failed");
      return rejectWithValue(err || "Login failed");
    }
  },
);

export const getMe = createAsyncThunk<IUser>(
  "auth/getMe",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await api.get<IUser>("/users/me");
      return data;
    } catch (err: unknown) {
      if (err instanceof AxiosError)
        return rejectWithValue(err.response?.data?.message || "Login failed");
      return rejectWithValue(err || "Login failed");
    }
  },
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout(state) {
      state.user = null;
      state.accessToken = null;
      state.isAuthenticated = false;
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
    },
    clearError(state) {
      state.error = null;
    },
    setTokens(state, action: PayloadAction<{ accessToken: string }>) {
      state.accessToken = action.payload.accessToken;
      state.isAuthenticated = true;
    },
  },
  extraReducers: (builder) => {
    // helper: wire pending/fulfilled/rejected for login + register
    const addAuthCases = (thunk: typeof login | typeof register) =>
      builder
        .addCase(thunk.pending, (s) => {
          s.isLoading = true;
          s.error = null;
        })
        .addCase(thunk.fulfilled, (s, a) => {
          s.isLoading = false;
          s.user = a.payload.user;
          s.accessToken = a.payload.accessToken;
          s.isAuthenticated = true;
        })
        .addCase(thunk.rejected, (s, a) => {
          s.isLoading = false;
          s.error = a.payload as string;
        });
    addAuthCases(login);
    addAuthCases(register);
    builder
      .addCase(getMe.fulfilled, (s, a) => {
        s.user = a.payload;
        s.isAuthenticated = true;
      })
      .addCase(getMe.rejected, (s) => {
        s.user = null;
        s.isAuthenticated = false;
      });
  },
});

export const { logout, clearError, setTokens } = authSlice.actions;
export default authSlice.reducer;
