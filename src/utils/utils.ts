import { Account } from '../types/types';

// Function to format numbers as currency
export const formatCurrency = (value: number): string => {
  return `$${value.toLocaleString()}`;
};

// Function to calculate revenue
export const calculateRevenue = (data: Account[]): number => {
  return data
    .filter((account) => account.account_category === 'revenue')
    .reduce((acc, account) => acc + account.total_value, 0);
};
