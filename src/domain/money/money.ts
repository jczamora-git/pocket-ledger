/**
 * Authoritative financial Money value object.
 * All monetary amounts are stored strictly as integer centavos to avoid
 * floating-point representation and precision/rounding discrepancies.
 *
 * Example: ₱1,500.25 = 150025 centavos.
 */
export class Money {
  readonly cents: number;

  private constructor(cents: number) {
    if (!Number.isInteger(cents)) {
      throw new TypeError(`Money cents must be an integer, got: ${cents}`);
    }
    this.cents = cents;
  }

  static fromCentavos(cents: number): Money {
    if (!Number.isInteger(cents)) {
      throw new TypeError(`Money cents must be an integer, got: ${cents}`);
    }
    return new Money(cents);
  }

  static fromPesos(pesos: number): Money {
    return new Money(Math.round(pesos * 100));
  }

  static fromDouble(amount: number): Money {
    return new Money(Math.round(amount * 100));
  }

  static readonly zero: Money = new Money(0);

  toDouble(): number {
    return this.cents / 100.0;
  }

  get inPesos(): number {
    return Math.trunc(this.cents / 100);
  }

  get isZero(): boolean {
    return this.cents === 0;
  }

  get isPositive(): boolean {
    return this.cents > 0;
  }

  get isNegative(): boolean {
    return this.cents < 0;
  }

  add(other: Money): Money {
    return Money.fromCentavos(this.cents + other.cents);
  }

  subtract(other: Money): Money {
    return Money.fromCentavos(this.cents - other.cents);
  }

  multiply(factor: number): Money {
    return Money.fromCentavos(Math.round(this.cents * factor));
  }

  negate(): Money {
    return Money.fromCentavos(-this.cents);
  }

  abs(): Money {
    return Money.fromCentavos(Math.abs(this.cents));
  }

  compareTo(other: Money): number {
    if (this.cents < other.cents) return -1;
    if (this.cents > other.cents) return 1;
    return 0;
  }

  equals(other: Money): boolean {
    return other instanceof Money && this.cents === other.cents;
  }

  lessThan(other: Money): boolean {
    return this.cents < other.cents;
  }

  lessThanOrEqual(other: Money): boolean {
    return this.cents <= other.cents;
  }

  greaterThan(other: Money): boolean {
    return this.cents > other.cents;
  }

  greaterThanOrEqual(other: Money): boolean {
    return this.cents >= other.cents;
  }

  toString(): string {
    return `Money(${this.cents} centavos)`;
  }
}
