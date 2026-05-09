import { configureStore } from "@reduxjs/toolkit";
import cartitemReducer from "../features/cartitem/cartitemSlice";
import homeitemReducer from "../features/homeitem/homeitemSlice";
export const store = configureStore({
  reducer: {
    cartitem: cartitemReducer,
    homeitem:homeitemReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
