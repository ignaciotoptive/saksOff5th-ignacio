import { createSlice } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';

// Initial state
const initialState = {
  products: null,
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
    setProducts(state, action) {
      const newProducts = action.payload;
      state.products = newProducts;
      localStorage.setItem('products', JSON.stringify(newProducts));
    },

    addProduct(state, action) {
      const newProducts = (state.products || []).concat(action.payload);
      state.products = newProducts;
      localStorage.setItem('products', JSON.stringify(newProducts));
    },

    removeProduct(state, action) {
      const productIdx = state.products.findIndex((p) => {
        return p.id === action.payload.id;
      });
      if (productIdx < 0) return;
      const newProducts = [
        ...state.products.slice(0, productIdx),
        ...state.products.slice(productIdx + 1),
      ];
      state.products = newProducts;
      localStorage.setItem('products', JSON.stringify(newProducts));
    },

    clearCart(state) {
      state.products = [];
      localStorage.removeItem('products');
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

export const { setProducts, addProduct, removeProduct, clearCart } =
  cartSlice.actions;

export const selectProducts = (state) => state.cart.products;

export default cartSlice.reducer;
