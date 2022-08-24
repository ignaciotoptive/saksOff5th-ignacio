import { createSlice } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';

// Initial state
const initialState = {
  products: [],
};

// Actual Slice
export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  // Redux Toolkit allows to write "mutating" logic in reducers. It
  // doesn't actually mutate the state because it uses the immer library,
  // which detects changes to a "draft state" and produces a brand new
  // immutable state based off those changes
  reducers: {
    addProduct(state, action) {
      state.products = state.products.concat(action.payload);
    },

    clearCart(state) {
      state.products = [];
    },

    // Special reducer for hydrating the state. Special case for next-redux-wrapper
    extraReducers: {
      [HYDRATE]: (state, action) => {
        return {
          ...state,
          ...action.payload.cart,
        };
      },
    },
  },
});

export const { addProduct, clearCart } = cartSlice.actions;

export const selectProducts = (state) => state.cart.products;

export default cartSlice.reducer;
