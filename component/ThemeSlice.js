// themeSlice.js
import { createSlice } from '@reduxjs/toolkit';

const themeSlice = createSlice({
  name: 'theme',
  initialState: {
    mode: 'light',
    color: '#ffffff', // Set the initial color for the light theme
  },
  reducers: {
    toggleTheme: (state) => {
      state.mode = state.mode === 'light' ? 'dark' : 'light';

      // You can set different colors based on the theme mode
      state.color = state.mode === 'light' ? '#ffffff' : '#000000';
    },
    setThemeColor: (state, action) => {
      state.color = action.payload;
    },
  },
});

export const { toggleTheme, setThemeColor } = themeSlice.actions;
export default themeSlice.reducer;
