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

export const { toggleCategory } = navbarSlice.actions;

export default navbarSlice.reducer;
