import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const registerUser = createAsyncThunk(
    "auth/registerUser",
    async (formData, { rejectWithValue }) => {
        try {
            const response = await axios.post("http://localhost:8000/api/register/", formData,
                {
                    headers: { "Content-Type": "application/json" },
                }
            );
            return response.data;
        } catch (error) {
            console.log(error)
            return rejectWithValue(error.response.data.error || error.message);
        }
    }
);

export const loginUser = createAsyncThunk(
    "auth/loginUser",
    async (formData, { rejectWithValue }) => {
        try {
            const response = await axios.post("http://localhost:8000/api/login/", formData);
            console.log(response)
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || error.message);
        }
    }
);

const authSlice = createSlice({
    name: "auth",
    initialState: {
        user: null,
        access: null,
        refresh: null,
        loading: false,
        error: null,
    },
    reducers: {
        logout: (state) => {
            state.user = null;
            state.access = null;
            state.refresh = null;
            localStorage.removeItem("access");
            localStorage.removeItem("refresh");
        },
        setAuthData: (state, action) => {
            state.user = action.payload.user;
            state.access = action.payload.access;
            state.refresh = action.payload.refresh;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(registerUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(registerUser.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload.user;
                state.access = action.payload.access;
                state.refresh = action.payload.refresh;
                localStorage.setItem("access", action.payload.access);
                localStorage.setItem("refresh", action.payload.refresh);
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(loginUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload.user;
                state.access = action.payload.access;
                state.refresh = action.payload.refresh;
                localStorage.setItem("access", action.payload.access);
                localStorage.setItem("refresh", action.payload.refresh);
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export const { logout, setAuthData } = authSlice.actions;
export default authSlice.reducer;
