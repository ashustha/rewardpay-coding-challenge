import { Account } from '../types/types';
import { formatCurrency, calculateRevenue } from './utils';

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
