import { configureStore } from "@reduxjs/toolkit";
import cartitemReducer from "../features/cartitem/cartitemSlice";

export const store = configureStore({
  reducer: {
    cartitem: cartitemReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
