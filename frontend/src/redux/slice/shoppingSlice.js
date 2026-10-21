import { createSlice } from "@reduxjs/toolkit";

const readItems = (key) => {
  try {
    const items = JSON.parse(localStorage.getItem(key) || "[]");
    return Array.isArray(items) ? items : [];
  } catch (error) {
    console.error(`Unable to read ${key} from local storage`, error);
    return [];
  }
};

const initialState = {
  cartItems: readItems("cartItems"),
  favoriteServices: readItems("favoriteServices"),
};

const shoppingSlice = createSlice({
  name: "shopping",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const service = action.payload;
      if (
        !service?._id ||
        state.cartItems.some((item) => item._id === service._id)
      ) {
        return;
      }

      state.cartItems.push(service);
    },
    removeFromCart: (state, action) => {
      state.cartItems = state.cartItems.filter(
        (item) => item._id !== action.payload,
      );
    },
    clearCart: (state) => {
      state.cartItems = [];
    },
    toggleFavorite: (state, action) => {
      const service = action.payload;
      if (!service?._id) return;

      const isFavorite = state.favoriteServices.some(
        (item) => item._id === service._id,
      );
      state.favoriteServices = isFavorite
        ? state.favoriteServices.filter((item) => item._id !== service._id)
        : [...state.favoriteServices, service];
    },
  },
});

export const { addToCart, removeFromCart, clearCart, toggleFavorite } =
  shoppingSlice.actions;

export default shoppingSlice.reducer;
