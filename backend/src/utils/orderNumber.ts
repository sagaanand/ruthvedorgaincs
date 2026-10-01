import crypto from 'crypto';

/**
 * Generates unique human-readable order number: RO-YYYYMM-XXXXX
 * Example: RO-202610-84920
 */
export function generateOrderNumber(): string {
  const date = new Date();
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const random = crypto.randomInt(10000, 99999);
  return `RO-${year}${month}-${random}`;
}

/**
 * Generates unique refund tracking reference: REF-YYYYMM-XXXXX
 */
export function generateRefundNumber(): string {
  const date = new Date();
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const random = crypto.randomInt(1000, 9999);
  return `REF-${year}${month}-${random}`;
}
