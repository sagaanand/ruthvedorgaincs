import { env } from '../config/env.js';

export interface OrderCalculationInput {
  items: Array<{
    price: number;
    quantity: number;
    taxRate?: number;
  }>;
  coupon?: {
    discountType: 'PERCENTAGE' | 'FIXED';
    discountValue: number;
    maxDiscountAmount?: number | null;
    minOrderAmount?: number | null;
  } | null;
  customShippingFee?: number;
}

export interface OrderCalculationResult {
  subtotal: number;
  discountAmount: number;
  shippingFee: number;
  taxAmount: number;
  totalAmount: number;
}

export function round(value: number, decimals = 2): number {
  return Number(Math.round(Number(value + 'e' + decimals)) + 'e-' + decimals);
}

export function calculateOrderTotals(input: OrderCalculationInput): OrderCalculationResult {
  let subtotal = 0;

  for (const item of input.items) {
    subtotal += item.price * item.quantity;
  }
  subtotal = round(subtotal);

  // Discount calculation
  let discountAmount = 0;
  if (input.coupon) {
    const { discountType, discountValue, maxDiscountAmount, minOrderAmount } = input.coupon;
    const isEligible = !minOrderAmount || subtotal >= minOrderAmount;

    if (isEligible) {
      if (discountType === 'PERCENTAGE') {
        discountAmount = round((subtotal * discountValue) / 100);
        if (maxDiscountAmount && discountAmount > maxDiscountAmount) {
          discountAmount = maxDiscountAmount;
        }
      } else {
        discountAmount = Math.min(discountValue, subtotal);
      }
    }
  }
  discountAmount = round(discountAmount);

  // Subtotal after discount
  const discountedSubtotal = Math.max(0, subtotal - discountAmount);

  // Shipping calculation
  let shippingFee = 0;
  if (input.customShippingFee !== undefined) {
    shippingFee = input.customShippingFee;
  } else {
    shippingFee = discountedSubtotal >= env.FREE_SHIPPING_THRESHOLD ? 0 : env.STANDARD_SHIPPING_FEE;
  }
  shippingFee = round(shippingFee);

  // Tax calculation (5% standard, or item-specific)
  let taxAmount = 0;
  for (const item of input.items) {
    const rate = item.taxRate !== undefined ? item.taxRate : env.DEFAULT_TAX_RATE;
    const itemTotal = item.price * item.quantity;
    // Calculate tax proportionally on discounted base
    const itemRatio = subtotal > 0 ? itemTotal / subtotal : 0;
    const taxablePortion = discountedSubtotal * itemRatio;
    taxAmount += taxablePortion * rate;
  }
  taxAmount = round(taxAmount);

  // Total
  const totalAmount = round(discountedSubtotal + shippingFee + taxAmount);

  return {
    subtotal,
    discountAmount,
    shippingFee,
    taxAmount,
    totalAmount,
  };
}
