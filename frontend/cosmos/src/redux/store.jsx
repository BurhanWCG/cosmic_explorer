import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../redux/slices/authSlice";
import blogsReducer from "../redux/slices/createblogSlice"
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";

// 🔷 1) Persist configuration for auth only
const persistConfig = {
  key: "auth",
  storage,
};

// 🔷 2) Create a persisted reducer for your auth slice
const persistedAuthReducer = persistReducer(persistConfig, authReducer);

// 🔷 3) Configure your store with both reducers
const store = configureStore({
  reducer: {
    auth: persistedAuthReducer,       // persisted
    blogs: blogsReducer,    // not persisted
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

// 🔷 4) Create the persistor to use in your app
export const persistor = persistStore(store);

export default store;
