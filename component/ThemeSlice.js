
import { createSlice } from '@reduxjs/toolkit';

const themeSlice = createSlice({
  name: 'theme',
  initialState: {
    mode: 'light',
    color: '#ffffff', 
  },
  reducers: {
    toggleTheme: (state) => {
      state.mode = state.mode === 'light' ? 'dark' : 'light';

      state.color = state.mode === 'light' ? '#ffffff' : '#000000';
    },
    setThemeColor: (state, action) => {
      state.color = action.payload;
    },
  },
});

export const { toggleTheme, setThemeColor } = themeSlice.actions;
export default themeSlice.reducer;
