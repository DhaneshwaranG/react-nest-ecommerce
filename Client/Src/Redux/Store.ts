import { configureStore } from "@reduxjs/toolkit";

import authReducer from "./Slices/authSlice";
import productReducer from "./Slices/productSlice";
import themeReducer from "./Slices/themeSlice";
import cartReducer from "./Slices/cartSlice";

import { baseApi } from "../Services/Api/baseApi";

const store = configureStore({
  reducer: {
    auth: authReducer,
    products: productReducer,
    theme: themeReducer,
    cart: cartReducer,

    [baseApi.reducerPath]: baseApi.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(baseApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export default store;
