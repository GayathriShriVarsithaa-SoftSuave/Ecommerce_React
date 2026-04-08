import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
type CartItem={
    title:string,
    price:number,
    imgval:string
}
type CartItemMap={
    [key:string]:CartItem
}
interface CartItemState{
    cartitems:CartItemMap
}
const existingCartItems: CartItemMap = {};
Object.keys(localStorage).forEach((key) => {
  existingCartItems[key] = JSON.parse(localStorage.getItem(key) || '{}');
});
const initialState: CartItemState = {
  cartitems: existingCartItems,
};
const cartitemSlice = createSlice({name:"cartitem",initialState,reducers: {
    addCartItem: (state, action: PayloadAction<{ id: string; item: CartItem }>) => {
        localStorage.setItem(action.payload.id, JSON.stringify(action.payload.item));
        state.cartitems[action.payload.id] = action.payload.item;
    },
    deleteCartItem: (state, action: PayloadAction<string>) => {
        localStorage.removeItem(action.payload);
        delete state.cartitems[action.payload];
    }
}});
export const { addCartItem, deleteCartItem } = cartitemSlice.actions;
export default cartitemSlice.reducer;