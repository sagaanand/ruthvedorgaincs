import { describe, it, expect } from 'vitest';
import { calculateOrderTotals, round } from '../src/utils/calculation.js';
import { env } from '../src/config/env.js';

describe('Financial Calculation & Pricing Engine', () => {
  it('should accurately calculate subtotal for items without coupon', () => {
    const result = calculateOrderTotals({
      items: [
        { price: 950, quantity: 2 }, // 1900
        { price: 340, quantity: 1 }, // 340
      ],
    });

    expect(result.subtotal).toBe(2240);
    expect(result.discountAmount).toBe(0);
    // Above free shipping threshold (999) -> shippingFee 0
    expect(result.shippingFee).toBe(0);
    // 5% tax on 2240 = 112
    expect(result.taxAmount).toBe(112);
    expect(result.totalAmount).toBe(2352);
  });

  it('should apply standard shipping fee when subtotal is below free shipping threshold', () => {
    const result = calculateOrderTotals({
      items: [{ price: 340, quantity: 1 }],
    });

    expect(result.subtotal).toBe(340);
    expect(result.shippingFee).toBe(env.STANDARD_SHIPPING_FEE);
    expect(result.totalAmount).toBe(round(340 + env.STANDARD_SHIPPING_FEE + 340 * env.DEFAULT_TAX_RATE));
  });

  it('should apply percentage discount coupon with maximum cap', () => {
    const result = calculateOrderTotals({
      items: [{ price: 950, quantity: 2 }], // 1900
      coupon: {
        discountType: 'PERCENTAGE',
        discountValue: 15, // 15% of 1900 = 285
        maxDiscountAmount: 200, // Capped at 200
        minOrderAmount: 500,
      },
    });

    expect(result.subtotal).toBe(1900);
    expect(result.discountAmount).toBe(200); // capped at 200
    const discounted = 1700;
    const tax = round(discounted * 0.05); // 85
    expect(result.taxAmount).toBe(tax);
    expect(result.totalAmount).toBe(discounted + tax);
  });

  it('should not apply coupon if order does not meet minimum order amount', () => {
    const result = calculateOrderTotals({
      items: [{ price: 340, quantity: 1 }], // 340
      coupon: {
        discountType: 'PERCENTAGE',
        discountValue: 10,
        minOrderAmount: 500,
      },
    });

    expect(result.subtotal).toBe(340);
    expect(result.discountAmount).toBe(0);
  });

  it('should apply fixed discount coupon correctly', () => {
    const result = calculateOrderTotals({
      items: [{ price: 950, quantity: 1 }], // 950
      coupon: {
        discountType: 'FIXED',
        discountValue: 100,
        minOrderAmount: 500,
      },
    });

    expect(result.subtotal).toBe(950);
    expect(result.discountAmount).toBe(100);
  });
});
