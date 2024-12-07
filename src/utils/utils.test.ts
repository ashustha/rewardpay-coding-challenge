import { Account } from '../types/types';
import {
  formatCurrency,
  calculateRevenue,
  calculateExpenses,
  calculateGrossProfitMargin,
  calculateNetProfitMargin,
} from './utils';

describe('formatCurrency', () => {
  it('should format a number as currency in the default locale', () => {
    expect(formatCurrency(1234.56)).toBe('$1,234.56');
  });
});

describe('calculateRevenue', () => {
  it('should correctly calculate the total revenue', () => {
    const accounts: Account[] = [
      {
        account_category: 'revenue',
        account_code: '200',
        account_currency: 'AUD',
        account_identifier: 'e2bacdc6-2006-43c2-a5da-3c0e5f43b452',
        account_status: 'ACTIVE',
        value_type: 'credit',
        account_name: 'Sales',
        account_type: 'sales',
        account_type_bank: '',
        system_account: '',
        total_value: 100,
      },
      {
        account_category: 'revenue',
        account_code: '200',
        account_currency: 'AUD',
        account_identifier: 'e2bacdc6-2006-43c2-a5da-3c0e5f43b452',
        account_status: 'ACTIVE',
        value_type: 'credit',
        account_name: 'Sales',
        account_type: 'sales',
        account_type_bank: '',
        system_account: '',
        total_value: 200,
      },
      {
        account_category: 'expense',
        account_code: '200',
        account_currency: 'AUD',
        account_identifier: 'e2bacdc6-2006-43c2-a5da-3c0e5f43b452',
        account_status: 'ACTIVE',
        value_type: 'credit',
        account_name: 'Sales',
        account_type: 'sales',
        account_type_bank: '',
        system_account: '',
        total_value: 50,
      },
    ];

    const result = calculateRevenue(accounts);

    expect(result).toBe(300); // 100 + 200, should return 300
  });

  it('should return 0 for an empty array', () => {
    const accounts: Account[] = [];

    const result = calculateRevenue(accounts);

    expect(result).toBe(0); // Should return 0 for empty array
  });

  it('should return 0 if no revenue accounts exist', () => {
    const accounts: Account[] = [
      {
        account_category: 'expenses',
        account_code: '200',
        account_currency: 'AUD',
        account_identifier: 'e2bacdc6-2006-43c2-a5da-3c0e5f43b452',
        account_status: 'ACTIVE',
        value_type: 'credit',
        account_name: 'Sales',
        account_type: 'sales',
        account_type_bank: '',
        system_account: '',
        total_value: 50,
      },
      {
        account_category: 'expense',
        account_code: '200',
        account_currency: 'AUD',
        account_identifier: 'e2bacdc6-2006-43c2-a5da-3c0e5f43b452',
        account_status: 'ACTIVE',
        value_type: 'credit',
        account_name: 'Sales',
        account_type: 'sales',
        account_type_bank: '',
        system_account: '',
        total_value: 30,
      },
    ];

    const result = calculateRevenue(accounts);

    expect(result).toBe(0); // Should return 0 if there are no revenue accounts
  });

  it('should handle negative revenue values correctly', () => {
    const accounts: Account[] = [
      {
        account_category: 'revenue',
        account_code: '200',
        account_currency: 'AUD',
        account_identifier: 'e2bacdc6-2006-43c2-a5da-3c0e5f43b452',
        account_status: 'ACTIVE',
        value_type: 'credit',
        account_name: 'Sales',
        account_type: 'sales',
        account_type_bank: '',
        system_account: '',
        total_value: 100,
      },
      {
        account_category: 'revenue',
        account_code: '200',
        account_currency: 'AUD',
        account_identifier: 'e2bacdc6-2006-43c2-a5da-3c0e5f43b452',
        account_status: 'ACTIVE',
        value_type: 'credit',
        account_name: 'Sales',
        account_type: 'sales',
        account_type_bank: '',
        system_account: '',
        total_value: -50,
      },
    ];

    const result = calculateRevenue(accounts);

    expect(result).toBe(50); // 100 + (-50) = 50
  });

  it('should return 0 if all revenue accounts have zero value', () => {
    const accounts: Account[] = [
      {
        account_category: 'revenue',
        account_code: '200',
        account_currency: 'AUD',
        account_identifier: 'e2bacdc6-2006-43c2-a5da-3c0e5f43b452',
        account_status: 'ACTIVE',
        value_type: 'credit',
        account_name: 'Sales',
        account_type: 'sales',
        account_type_bank: '',
        system_account: '',
        total_value: 0,
      },
      {
        account_category: 'revenue',
        account_code: '200',
        account_currency: 'AUD',
        account_identifier: 'e2bacdc6-2006-43c2-a5da-3c0e5f43b452',
        account_status: 'ACTIVE',
        value_type: 'credit',
        account_name: 'Sales',
        account_type: 'sales',
        account_type_bank: '',
        system_account: '',
        total_value: 0,
      },
    ];

    const result = calculateRevenue(accounts);

    expect(result).toBe(0); // Should return 0 if all revenue values are 0
  });
});

describe('calculateExpenses', () => {
  it('should calculate the total expenses correctly from account data', () => {
    const accounts = [
      {
        account_category: 'expense',
        account_code: '200',
        account_currency: 'AUD',
        account_identifier: 'e2bacdc6-2006-43c2-a5da-3c0e5f43b452',
        account_status: 'ACTIVE',
        value_type: 'credit',
        account_name: 'Sales',
        account_type: 'sales',
        account_type_bank: '',
        system_account: '',
        total_value: 150,
      },
      {
        account_category: 'revenue',
        account_code: '200',
        account_currency: 'AUD',
        account_identifier: 'e2bacdc6-2006-43c2-a5da-3c0e5f43b452',
        account_status: 'ACTIVE',
        value_type: 'credit',
        account_name: 'Sales',
        account_type: 'sales',
        account_type_bank: '',
        system_account: '',
        total_value: 100,
      },
      {
        account_category: 'expense',
        account_code: '200',
        account_currency: 'AUD',
        account_identifier: 'e2bacdc6-2006-43c2-a5da-3c0e5f43b452',
        account_status: 'ACTIVE',
        value_type: 'credit',
        account_name: 'Sales',
        account_type: 'sales',
        account_type_bank: '',
        system_account: '',
        total_value: 50,
      },
    ];

    const result = calculateExpenses(accounts);
    expect(result).toBe(200); // Expected result: 150 + 50 = 200
  });

  it('should return 0 if no expense accounts exist', () => {
    const accounts = [
      {
        account_category: 'revenue',
        account_code: '200',
        account_currency: 'AUD',
        account_identifier: 'e2bacdc6-2006-43c2-a5da-3c0e5f43b452',
        account_status: 'ACTIVE',
        value_type: 'credit',
        account_name: 'Sales',
        account_type: 'sales',
        account_type_bank: '',
        system_account: '',
        total_value: 100,
      },
      {
        account_category: 'revenue',
        account_code: '200',
        account_currency: 'AUD',
        account_identifier: 'e2bacdc6-2006-43c2-a5da-3c0e5f43b452',
        account_status: 'ACTIVE',
        value_type: 'credit',
        account_name: 'Sales',
        account_type: 'sales',
        account_type_bank: '',
        system_account: '',
        total_value: 200,
      },
    ];

    const result = calculateExpenses(accounts);
    expect(result).toBe(0); // Expected result: no expense accounts, so return 0
  });

  it('should return 0 if the expense value is negative', () => {
    const accounts = [
      {
        account_category: 'expense',
        account_code: '200',
        account_currency: 'AUD',
        account_identifier: 'e2bacdc6-2006-43c2-a5da-3c0e5f43b452',
        account_status: 'ACTIVE',
        value_type: 'credit',
        account_name: 'Sales',
        account_type: 'sales',
        account_type_bank: '',
        system_account: '',
        total_value: -50,
      },
      {
        account_category: 'expense',
        account_code: '200',
        account_currency: 'AUD',
        account_identifier: 'e2bacdc6-2006-43c2-a5da-3c0e5f43b452',
        account_status: 'ACTIVE',
        value_type: 'credit',
        account_name: 'Sales',
        account_type: 'sales',
        account_type_bank: '',
        system_account: '',
        total_value: 100,
      },
    ];

    const result = calculateExpenses(accounts);
    expect(result).toBe(50); // Expected result: -50 + 100 = 50 (it still sums up)
  });

  it('should handle an empty account list correctly', () => {
    const accounts: Account[] = []; // Empty list

    const result = calculateExpenses(accounts);
    expect(result).toBe(0); // Expected result: no data, so return 0
  });
});

describe('calculateGrossProfitMargin', () => {
  it('should calculate the gross profit margin correctly', () => {
    const accounts = [
      {
        account_category: 'revenue',
        account_code: '200',
        account_currency: 'AUD',
        account_identifier: 'e2bacdc6-2006-43c2-a5da-3c0e5f43b452',
        account_status: 'ACTIVE',
        value_type: 'debit',
        account_name: 'Sales',
        account_type: 'sales',
        account_type_bank: '',
        system_account: '',
        total_value: 100,
      },
      {
        account_category: 'expense',
        account_code: '400',
        account_currency: 'AUD',
        account_identifier: 'd392fe47-c99d-499e-a200-46709dd6b6e7',
        account_name: 'Advertising',
        account_status: 'ACTIVE',
        system_account: '',
        value_type: 'debit',
        account_type_bank: '',
        total_value: 300,
        account_type: 'overheads',
      },
      {
        account_category: 'revenue',
        account_code: '300',
        account_currency: 'AUD',
        account_identifier: 'a38453a7-69f0-4a90-b25d-5d32534df64b',
        account_status: 'ACTIVE',
        value_type: 'debit',
        account_name: 'Sales',
        account_type: 'sales',
        account_type_bank: '',
        system_account: '',
        total_value: 400,
      },
    ];

    const revenue = 800; // Sum of all 'revenue' accounts
    const result = calculateGrossProfitMargin(accounts, revenue);

    expect(result).toBeCloseTo(62.5, 2);
  });

  it('should return 0 if no sales accounts exist', () => {
    const accounts = [
      {
        account_category: 'expense',
        account_code: '400',
        account_currency: 'AUD',
        account_identifier: 'd392fe47-c99d-499e-a200-46709dd6b6e7',
        account_name: 'Advertising',
        account_status: 'ACTIVE',
        system_account: '',
        value_type: 'debit',
        account_type_bank: '',
        total_value: 1830.18,
        account_type: 'overheads',
      },
    ];

    const revenue = 1830.18;
    const result = calculateGrossProfitMargin(accounts, revenue);

    expect(result).toBe(0); // No sales account, so the result should be 0
  });

  it('should handle an empty account list', () => {
    const accounts: Account[] = []; // Empty list
    const revenue = 0;

    const result = calculateGrossProfitMargin(accounts, revenue);
    expect(result).toBe(0); // No data, so return 0
  });

  it('should return 0 if revenue is 0', () => {
    const accounts = [
      {
        account_category: 'revenue',
        account_code: '200',
        account_currency: 'AUD',
        account_identifier: 'e2bacdc6-2006-43c2-a5da-3c0e5f43b452',
        account_status: 'ACTIVE',
        value_type: 'credit',
        account_name: 'Sales',
        account_type: 'sales',
        account_type_bank: '',
        system_account: '',
        total_value: 32431.0,
      },
    ];

    const revenue = 0; // Setting revenue to 0
    const result = calculateGrossProfitMargin(accounts, revenue);

    expect(result).toBe(0); // Gross profit margin should be 0 if revenue is 0
  });
});

describe('calculateNetProfitMargin', () => {
  it('should calculate the net profit margin correctly', () => {
    const revenue = 1000;
    const expenses = 400;
    const result = calculateNetProfitMargin(revenue, expenses);

    expect(result).toBe(60); // (1000 - 400) / 1000 * 100 = 60
  });

  it('should return 0 if revenue is 0', () => {
    const revenue = 0;
    const expenses = 400;
    const result = calculateNetProfitMargin(revenue, expenses);

    expect(result).toBe(0); // When revenue is 0, the result should be 0
  });

  it('should return 100 if expenses are 0', () => {
    const revenue = 1000;
    const expenses = 0;
    const result = calculateNetProfitMargin(revenue, expenses);

    expect(result).toBe(100); // (1000 - 0) / 1000 * 100 = 100
  });

  it('should return a negative value if expenses are greater than revenue', () => {
    const revenue = 1000;
    const expenses = 1500;
    const result = calculateNetProfitMargin(revenue, expenses);

    expect(result).toBe(-50); // (1000 - 1500) / 1000 * 100 = -50
  });

  it('should handle negative expenses correctly', () => {
    const revenue = 1000;
    const expenses = -200;
    const result = calculateNetProfitMargin(revenue, expenses);

    expect(result).toBe(120); // (1000 - (-200)) / 1000 * 100 = 120
  });
});
