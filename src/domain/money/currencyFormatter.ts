import { Money } from './money';

export class CurrencyFormatter {
  private static standardFormatter = new Intl.NumberFormat('en-PH', {
    style: 'currency',
    currency: 'PHP',
    currencyDisplay: 'narrowSymbol', // outputs ₱
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  private static wholeFormatter = new Intl.NumberFormat('en-PH', {
    style: 'currency',
    currency: 'PHP',
    currencyDisplay: 'narrowSymbol',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });

  /**
   * Standard currency display: ₱1,234.56
   */
  static format(money: Money, options?: { showSign?: boolean }): string {
    const absVal = Math.abs(money.toDouble());
    let formatted = this.standardFormatter.format(absVal);
    // Ensure standard ₱ symbol if Intl emits PHP or other symbol
    if (!formatted.startsWith('₱')) {
      formatted = formatted.replace(/^PHP\s?/, '₱');
    }

    if (options?.showSign) {
      if (money.isNegative) return `-${formatted}`;
      if (money.isPositive) return `+${formatted}`;
    } else if (money.isNegative) {
      return `-${formatted}`;
    }
    return formatted;
  }

  /**
   * Whole peso display: ₱1,235
   */
  static formatWhole(money: Money): string {
    let formatted = this.wholeFormatter.format(money.toDouble());
    if (!formatted.startsWith('₱')) {
      formatted = formatted.replace(/^PHP\s?/, '₱');
    }
    return formatted;
  }

  /**
   * Short display without decimals
   */
  static formatShort(money: Money): string {
    let formatted = this.wholeFormatter.format(Math.round(money.toDouble()));
    if (!formatted.startsWith('₱')) {
      formatted = formatted.replace(/^PHP\s?/, '₱');
    }
    return formatted;
  }

  /**
   * Compact display for dashboard headers: ₱1.2K, ₱35K, ₱1.5M
   */
  static formatCompact(money: Money): string {
    const absPesos = Math.abs(money.inPesos);
    if (absPesos < 1000) {
      return this.formatWhole(money);
    }

    const prefix = money.isNegative ? '-₱' : '₱';
    if (absPesos >= 1_000_000) {
      const millions = absPesos / 1_000_000;
      const formatted = millions % 1 === 0 ? millions.toFixed(0) : millions.toFixed(1);
      return `${prefix}${formatted}M`;
    }

    if (absPesos >= 1_000) {
      const thousands = absPesos / 1_000;
      const formatted = thousands % 1 === 0 ? thousands.toFixed(0) : thousands.toFixed(1);
      return `${prefix}${formatted}K`;
    }

    return `${prefix}${absPesos}`;
  }

  /**
   * Parses user-typed currency input such as "1,234.50" or "₱500" into Money.
   */
  static parse(text: string): Money {
    const cleaned = text.replace(/[₱,\s]/g, '');
    const val = parseFloat(cleaned);
    if (Number.isNaN(val) || !Number.isFinite(val)) {
      return Money.zero;
    }
    return Money.fromDouble(val);
  }
}
