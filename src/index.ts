import * as fs from 'fs';
import { Account, AccountingMetrics } from './types/types';
import {
  calculateRevenue,
  calculateExpenses,
  calculateGrossProfitMargin,
  calculateNetProfitMargin,
  calculateWorkingCapitalRatio,
  formatCurrency,
} from './utils/utils';

// Function to load and parse the data from the JSON file
const loadData = (filePath: string): Account[] => {
  const rawData = fs.readFileSync(filePath, 'utf-8');
  const jsonData = JSON.parse(rawData);
  return jsonData.data;
};

// Main function to calculate and print accounting metrics
const calculateAccountingMetrics = (filePath: string): void => {
  const data = loadData(filePath);

  const revenue = calculateRevenue(data);
  const expenses = calculateExpenses(data);
  const grossProfitMargin = calculateGrossProfitMargin(data, revenue);
  const netProfitMargin = calculateNetProfitMargin(revenue, expenses);
  const workingCapitalRatio = calculateWorkingCapitalRatio(data);

  const metrics: AccountingMetrics = {
    revenue,
    expenses,
    grossProfitMargin,
    netProfitMargin,
    workingCapitalRatio,
  };

  console.log(`Revenue: ${formatCurrency(metrics.revenue)}`);
  console.log(`Expenses: ${formatCurrency(metrics.expenses)}`);
  console.log(`Gross Profit Margin: ${grossProfitMargin.toFixed(1)}%`);
  console.log(`Net Profit Margin: ${netProfitMargin.toFixed(1)}%`);
  console.log(`Working Capital Ratio: ${workingCapitalRatio.toFixed(1)}%`);
};

calculateAccountingMetrics('data.json');
