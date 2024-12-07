// Function to format numbers as currency
export const formatCurrency = (value: number): string => {
  return `$${value.toLocaleString()}`;
};
