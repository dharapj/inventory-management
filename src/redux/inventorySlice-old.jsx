import { createSlice } from "@reduxjs/toolkit";
import { sanitizePrice } from "../utils";

const initialState = {
  data: [],
  isAdmin: true, // Default to Admin view
};

const inventorySlice = createSlice({
  name: "inventory",
  initialState,
  reducers: {
    setInventory: (state, action) => {
      state.data = action.payload;
    },
    toggleAdminView: (state) => {
      state.isAdmin = !state.isAdmin;
    },
     editProduct: (state, action) => {
      const { name, updatedProduct } = action.payload;
      const index = state.data.findIndex((item) => item.name === name);
      if (index !== -1) {
        state.data[index] = { ...state.data[index], ...updatedProduct };
      }
    },
    deleteProduct: (state, action) => {
      console.log("deleteProduct", action, state)
      state.data = state.data.filter((item) => item.name !== action.payload.name);
    },
    disableProduct: (state, action) => {
      const { name, disable } = action.payload;
      state.data = state.data.map((item) =>
        item.name === name ? { ...item, disabled: disable } : item
      );
    },
    

  },
});

export const { setInventory, toggleAdminView, editProduct, deleteProduct, disableProduct } =
  inventorySlice.actions;

  export const selectInventory = (state) => state.inventory.data;

  export const selectSummary = (state) => {
    const inventory = state.inventory.data;
  
    const totalProducts = inventory.filter((product) => !product.disabled).length;

    const totalStoreValue = inventory.reduce((total, item) => {
      const price = parseFloat(sanitizePrice(item.price)) || 0; // Ensure price is a valid number
      const quantity = parseInt(item.quantity, 10) || 0; // Ensure quantity is a valid number
      return item.disabled ? total : total + price * quantity;
    }, 0);
    const outOfStock = inventory.filter(
      (product) => !product.disabled && product.quantity === 0
    ).length;
    const categories = new Set(
      inventory.filter((product) => !product.disabled).map((product) => product.category)
    ).size;
  
    return { totalProducts, totalStoreValue, outOfStock, categories };
  };
  
export default inventorySlice.reducer;
