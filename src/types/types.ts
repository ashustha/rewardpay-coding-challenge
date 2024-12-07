export type Account = {
  account_category: string;
  account_code: string;
  account_currency: string;
  account_identifier: string;
  account_status: string;
  value_type: string;
  account_type_bank: string;
  system_account: string;
  account_name: string;
  account_type: string;
  total_value: number;
};

export type AccountingMetrics = {
  revenue: number;
  expenses: number;
  grossProfitMargin: number;
  netProfitMargin: number;
  workingCapitalRatio: number;
};
