import { Money } from '../src/domain/money/money';
import { CurrencyFormatter } from '../src/domain/money/currencyFormatter';

describe('Money Domain Value Object', () => {
  test('strictly enforces integer centavos', () => {
    const m = Money.fromCentavos(150025);
    expect(m.cents).toBe(150025);
    expect(m.toDouble()).toBe(1500.25);
    expect(m.inPesos).toBe(1500);

    // Rejects non-integers
    expect(() => Money.fromCentavos(150.25)).toThrow(TypeError);
  });

  test('fromPesos and fromDouble create exact integer centavos', () => {
    const fromPesos = Money.fromPesos(2500);
    expect(fromPesos.cents).toBe(250000);

    const fromDouble = Money.fromDouble(49.99);
    expect(fromDouble.cents).toBe(4999);
  });

  test('Money.zero has 0 cents', () => {
    expect(Money.zero.cents).toBe(0);
    expect(Money.zero.isZero).toBe(true);
    expect(Money.zero.isPositive).toBe(false);
    expect(Money.zero.isNegative).toBe(false);
  });

  test('arithmetic operations preserve integer centavos', () => {
    const a = Money.fromCentavos(10050); // ₱100.50
    const b = Money.fromCentavos(4950);  // ₱49.50

    const sum = a.add(b);
    expect(sum.cents).toBe(15000); // ₱150.00

    const diff = a.subtract(b);
    expect(diff.cents).toBe(5100); // ₱51.00

    const mult = a.multiply(2);
    expect(mult.cents).toBe(20100); // ₱201.00

    const neg = a.negate();
    expect(neg.cents).toBe(-10050);
    expect(neg.isNegative).toBe(true);
    expect(neg.abs().cents).toBe(10050);
  });

  test('comparisons work accurately', () => {
    const a = Money.fromCentavos(1000);
    const b = Money.fromCentavos(2000);
    const c = Money.fromCentavos(1000);

    expect(a.lessThan(b)).toBe(true);
    expect(b.greaterThan(a)).toBe(true);
    expect(a.lessThanOrEqual(c)).toBe(true);
    expect(a.greaterThanOrEqual(c)).toBe(true);
    expect(a.equals(c)).toBe(true);
    expect(a.equals(b)).toBe(false);
  });
});

describe('CurrencyFormatter', () => {
  test('formats standard PHP amounts', () => {
    const m = Money.fromCentavos(150025);
    const formatted = CurrencyFormatter.format(m);
    expect(formatted).toContain('1,500.25');
    expect(formatted).toContain('₱');
  });

  test('formats negative amounts with minus sign', () => {
    const m = Money.fromCentavos(-85000);
    const formatted = CurrencyFormatter.format(m);
    expect(formatted).toContain('-₱');
    expect(formatted).toContain('850.00');
  });

  test('formats with explicit sign option', () => {
    const pos = Money.fromCentavos(3000000);
    expect(CurrencyFormatter.format(pos, { showSign: true })).toContain('+');

    const neg = Money.fromCentavos(-28500);
    expect(CurrencyFormatter.format(neg, { showSign: true })).toContain('-');
  });

  test('formats whole pesos without decimal places', () => {
    const m = Money.fromCentavos(123456);
    const whole = CurrencyFormatter.formatWhole(m);
    expect(whole).not.toContain('.56');
    expect(whole).toContain('1,235');
  });

  test('formats compact notation for large numbers', () => {
    expect(CurrencyFormatter.formatCompact(Money.fromPesos(500))).toContain('500');
    expect(CurrencyFormatter.formatCompact(Money.fromPesos(1200))).toContain('1.2K');
    expect(CurrencyFormatter.formatCompact(Money.fromPesos(35000))).toContain('35K');
    expect(CurrencyFormatter.formatCompact(Money.fromPesos(1500000))).toContain('1.5M');
  });

  test('parses raw user inputs into Money', () => {
    expect(CurrencyFormatter.parse('1,234.50').cents).toBe(123450);
    expect(CurrencyFormatter.parse('₱500').cents).toBe(50000);
    expect(CurrencyFormatter.parse('invalid').cents).toBe(0);
  });
});
