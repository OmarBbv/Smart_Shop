import { createSlice } from '@reduxjs/toolkit';

export interface NavbarState {
  isOpenCategory: boolean;
}

const initialState: NavbarState = {
  isOpenCategory: true,
};

export const navbarSlice = createSlice({
  name: 'navbar',
  initialState,
  reducers: {
    toggleCategory: (state) => {
      state.isOpenCategory = !state.isOpenCategory;
    },
  },
});

// Action creator:
export const { toggleCategory } = navbarSlice.actions;

// Reducer:
export default navbarSlice.reducer;
