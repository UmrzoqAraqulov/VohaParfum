import { configureStore } from "@reduxjs/toolkit";
import authReducer, { name as authName } from "@/redux/slice/authSlice";

export const store = configureStore({
  reducer: {
    [authName]: authReducer,
  },
});
