// sideNavSlice.ts
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    products:[]
};

const allproductsState = createSlice({
  name: 'setAllProducts',
  initialState,
  reducers: {
    allProducts: (state, actions) => {
      state.products = actions.payload;
    },
  },
});

export const { allProducts } = allproductsState.actions;
export default allproductsState.reducer;