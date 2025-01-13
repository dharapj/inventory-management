import { sanitizePrice } from "../utils";

// Selector to get all inventory data
export const selectInventory = (state) => state.inventory.data;

// Selector to get inventory summary
export const selectSummary = (state) => {
  const inventory = state.inventory.data;

  const totalProducts = inventory.filter((product) => !product.disabled).length;

  const totalStoreValue = inventory.reduce((total, item) => {
    const price = parseFloat(sanitizePrice(item.price)) || 0;
    const quantity = parseInt(item.quantity, 10) || 0;
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
