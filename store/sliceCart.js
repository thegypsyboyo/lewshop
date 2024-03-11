import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  cartItems: [],
};
export const sliceCart = createSlice({
  name: "cart",
  initialState: initialState,
  reducers: {
    addToCart(state, action) {
      state.cartItems.push(action.payload);
    },
    updateCart(state, action) {
      state.cartItems = action.payload;
    },
    emptyCart(state, action) {
      state.cartItems = [];
    },
  },
});

export const { addToCart, updateCart, emptyCart } = sliceCart.actions;

export default sliceCart.reducer;
