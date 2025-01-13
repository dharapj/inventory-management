export const sanitizePrice = (price) => parseFloat(price.toString().replace(/[^0-9.]/g, "")) || 0;
export const formatValue = (value) => {
    if (value % 1 === 0) {
      return new Intl.NumberFormat("en-US").format(value); // Add commas for integers
    }
    return new Intl.NumberFormat("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(value); // Add commas and keep 2 decimal places
  };