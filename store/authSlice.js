import { createSlice } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';

// Initial state
const initialState = {
  authState: false,
  user: null,
};

// Actual Slice
export const authSlice = createSlice({
  name: 'auth',
  initialState,
  // Redux Toolkit allows to write "mutating" logic in reducers. It
  // doesn't actually mutate the state because it uses the immer library,
  // which detects changes to a "draft state" and produces a brand new
  // immutable state based off those changes
  reducers: {
    // Action to set the authentication status
    setAuthState(state, action) {
      state.authState = action.payload;
    },

    setUser(state, action) {
      state.user = action.payload;
    },

    // Special reducer for hydrating the state. Special case for next-redux-wrapper
    extraReducers: {
      [HYDRATE]: (state, action) => {
        return {
          ...state,
          ...action.payload.auth,
        };
      },
    },
  },
});

export const { setAuthState, setUser } = authSlice.actions;

export const selectAuthState = (state) => state.auth.authState;

export const selectUser = (state) => state.auth.user;

export default authSlice.reducer;
