
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  cartIsVisible: false,
  cartItems: [],
  totalQuantity: 0,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    toggleCart(state) {
      state.cartIsVisible = !state.cartIsVisible;
    },
    addToCart(state, action) {
      const newItem = action.payload;
      const existingItem = state.cartItems.find((item) => item.id === newItem.id);

      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.cartItems.push({ ...newItem, quantity: 1 });
      }

      state.totalQuantity += 1;
    },
    removeFromCart(state, action) {
      const itemId = action.payload;
      const cartItem = state.cartItems.find((item) => item.id === itemId);

      if (cartItem) {
        state.totalQuantity -= cartItem.quantity;
        state.cartItems = state.cartItems.filter((item) => item.id !== itemId);
      }
    },
    increaseQuantity(state, action) {
      const itemId = action.payload;
      const cartItem = state.cartItems.find((item) => item.id === itemId);

      if (cartItem) {
        cartItem.quantity += 1;
        state.totalQuantity += 1;
      }
    },
    decreaseQuantity(state, action) {
      const itemId = action.payload;
      const cartItem = state.cartItems.find((item) => item.id === itemId);

      if (cartItem) {
        cartItem.quantity -= 1;
        state.totalQuantity -= 1;

        if (cartItem.quantity === 0) {
          state.cartItems = state.cartItems.filter((item) => item.id !== itemId);
        }
      }
    },
  },
});

export const { toggleCart, addToCart, removeFromCart, increaseQuantity, decreaseQuantity } = cartSlice.actions;
export default cartSlice.reducer;
