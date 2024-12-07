import { formatCurrency } from './utils';

describe('formatCurrency', () => {
  it('should format a number as currency in the default locale', () => {
    expect(formatCurrency(1234.56)).toBe('$1,234.56');
  });
});
