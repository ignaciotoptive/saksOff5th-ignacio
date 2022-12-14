import { configureStore } from '@reduxjs/toolkit';
import { createWrapper } from 'next-redux-wrapper';

import { authSlice } from './authSlice';
import { cartSlice } from './cartSlice';

// source: https://blog.logrocket.com/use-redux-next-js/
const makeStore = () =>
  configureStore({
    reducer: {
      [authSlice.name]: authSlice.reducer,
      [cartSlice.name]: cartSlice.reducer,
    },
    devTools: true,
  });

export const wrapper = createWrapper(makeStore);
