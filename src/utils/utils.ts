import { Account } from '../types/types';

// Function to format numbers as currency
export const formatCurrency = (value: number): string => {
  return `$${Math.floor(value).toLocaleString()}`;
};

// Function to calculate revenue
export const calculateRevenue = (data: Account[]): number => {
  return data
    .filter((account) => account.account_category === 'revenue')
    .reduce((acc, account) => acc + account.total_value, 0);
};

// Function to calculate expenses
export const calculateExpenses = (data: Account[]): number => {
  return data
    .filter((account) => account.account_category === 'expense')
    .reduce((acc, account) => acc + account.total_value, 0);
};

// Function to calculate gross profit margin
export const calculateGrossProfitMargin = (
  data: Account[],
  revenue: number
): number => {
  if (revenue === 0) return 0; // Return 0 if revenue is 0

  const sales = data
    .filter(
      (account) =>
        account.account_type === 'sales' && account.value_type === 'debit'
    )
    .reduce((acc, account) => acc + account.total_value, 0);

  if (sales === 0) return 0; // Return 0 if sales are 0

  return (sales / revenue) * 100;
};

// Function to calculate net profit margin
export const calculateNetProfitMargin = (
  revenue: number,
  expenses: number
): number => {
  if (revenue === 0) return 0;
  return ((revenue - expenses) / revenue) * 100;
};

// Function to calculate working capital ratio
export const calculateWorkingCapitalRatio = (data: Account[]): number => {
  // Calculate assets
  const assets = data
    .filter((account) => account.account_category === 'assets')
    .filter((account) =>
      ['current', 'bank', 'current_accounts_receivable'].includes(
        account.account_type
      )
    )
    .reduce((acc, account) => {
      if (account.value_type === 'debit') {
        return acc + account.total_value;
      } else if (account.value_type === 'credit') {
        return acc - account.total_value;
      }
      return acc;
    }, 0);

  // Calculate liabilities
  const liabilities = data
    .filter((account) => account.account_category === 'liability')
    .filter((account) =>
      ['current', 'current_accounts_payable'].includes(account.account_type)
    )
    .reduce((acc, account) => {
      if (account.value_type === 'credit') {
        return acc + account.total_value;
      } else if (account.value_type === 'debit') {
        return acc - account.total_value;
      }
      return acc;
    }, 0);

  // Prevent division by zero
  if (liabilities === 0) {
    return assets === 0 ? NaN : Infinity;
  }

  // Return the working capital ratio as a percentage
  return (assets / liabilities) * 100;
};
