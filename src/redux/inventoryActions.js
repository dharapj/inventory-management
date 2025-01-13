import { createAction } from "@reduxjs/toolkit";

export const setInventory = createAction("inventory/setInventory");
export const toggleAdminView = createAction("inventory/toggleAdminView");
export const editProduct = createAction("inventory/editProduct");
export const deleteProduct = createAction("inventory/deleteProduct");
export const disableProduct = createAction("inventory/disableProduct");
