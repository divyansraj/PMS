import { createSlice } from "@reduxjs/toolkit";

const FoodMenuSlice = createSlice({
  name: "menu",
  initialState: {
    items: [],
    total: 0,
    totalAmount: 0,
  },
  reducers: {
    addItem: (state, action) => {
      const item = state.items.find((item) => item._id === action.payload._id);
      if (item) {
        item.quantity += 1;
      } else {
        state.items.push({ ...action.payload, quantity: 1 });
      }
      state.total += 1;
      state.totalAmount += action.payload.price;
    },
    removeItem: (state, action) => {
      const itemIndex = state.items.findIndex(
        (item) => item._id === action.payload
      );
      if (itemIndex !== -1) {
        const item = state.items[itemIndex];
        if (item.quantity > 1) {
          item.quantity -= 1;
        } else {
          state.items.splice(itemIndex, 1);
        }
        state.total -= 1;
        state.totalAmount -= item.price;
      }
    },
    clearCart: (state) => {
      state.items = [];
      state.total = 0;
      state.totalAmount = 0;
    },
    setCart: (state, action) => {
      state.items = action.payload.items;
      state.total = action.payload.total;
      state.totalAmount = action.payload.totalAmount;
    },
  },
});

export const { addItem, removeItem, clearCart, setCart } =
  FoodMenuSlice.actions;

export default FoodMenuSlice.reducer;
