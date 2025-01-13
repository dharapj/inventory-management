import { createReducer } from "@reduxjs/toolkit";
import { setInventory, toggleAdminView, editProduct, deleteProduct, disableProduct } from './inventoryActions';

const initialState = {
  data: [],
  isAdmin: true, // Default to Admin view
};

const inventoryReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(setInventory, (state, action) => {
      state.data = action.payload;
    })
    .addCase(toggleAdminView, (state) => {
      state.isAdmin = !state.isAdmin;
    })
    .addCase(editProduct, (state, action) => {
      const { name, updatedProduct } = action.payload;
      const index = state.data.findIndex((item) => item.name === name);
      if (index !== -1) {
        state.data[index] = { ...state.data[index], ...updatedProduct };
      }
    })
    .addCase(deleteProduct, (state, action) => {
      state.data = state.data.filter((item) => item.name !== action.payload.name);
    })
    .addCase(disableProduct, (state, action) => {
      const { name, disable } = action.payload;
      state.data = state.data.map((item) =>
        item.name === name ? { ...item, disabled: disable } : item
      );
    });
});

export default inventoryReducer;
