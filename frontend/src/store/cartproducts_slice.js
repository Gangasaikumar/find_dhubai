// sideNavSlice.ts
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    cartItems:[]
};

const cartProducts = createSlice({
  name: 'cartItems',
  initialState,
  reducers: {
    cartItems: (state, actions) => {
      state.cartItems = actions.payload;
    },
  },
});

export const { cartItems } = cartProducts.actions;
export default cartProducts.reducer;