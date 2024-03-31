// store.ts
import { configureStore } from '@reduxjs/toolkit';
import allProducts from './allproducts_slice';
import { cartItems } from './cartproducts_slice';

const store = configureStore({
  reducer: {
    // all reducers here
    setAllProducts: allProducts,
    cart_items:cartItems
  },
});

export default store;
