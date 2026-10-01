import { describe, it, expect } from 'vitest';
import { VALID_ORDER_TRANSITIONS, ORDER_STATUSES } from '../src/config/constants.js';

describe('Order Lifecycle & State Machine Transitions', () => {
  function canTransition(currentStatus: string, nextStatus: string): boolean {
    const allowed = VALID_ORDER_TRANSITIONS[currentStatus];
    return Array.isArray(allowed) && allowed.includes(nextStatus);
  }

  it('should allow valid happy-path forward transitions', () => {
    expect(canTransition(ORDER_STATUSES.PENDING, ORDER_STATUSES.AWAITING_PAYMENT)).toBe(true);
    expect(canTransition(ORDER_STATUSES.AWAITING_PAYMENT, ORDER_STATUSES.CONFIRMED)).toBe(true);
    expect(canTransition(ORDER_STATUSES.CONFIRMED, ORDER_STATUSES.PROCESSING)).toBe(true);
    expect(canTransition(ORDER_STATUSES.PROCESSING, ORDER_STATUSES.PACKED)).toBe(true);
    expect(canTransition(ORDER_STATUSES.PACKED, ORDER_STATUSES.SHIPPED)).toBe(true);
    expect(canTransition(ORDER_STATUSES.SHIPPED, ORDER_STATUSES.OUT_FOR_DELIVERY)).toBe(true);
    expect(canTransition(ORDER_STATUSES.OUT_FOR_DELIVERY, ORDER_STATUSES.DELIVERED)).toBe(true);
  });

  it('should allow cancellation flows from pending and confirmed states', () => {
    expect(canTransition(ORDER_STATUSES.PENDING, ORDER_STATUSES.CANCELLED)).toBe(true);
    expect(canTransition(ORDER_STATUSES.AWAITING_PAYMENT, ORDER_STATUSES.CANCELLED)).toBe(true);
    expect(canTransition(ORDER_STATUSES.CONFIRMED, ORDER_STATUSES.CANCELLATION_REQUESTED)).toBe(true);
    expect(canTransition(ORDER_STATUSES.CANCELLATION_REQUESTED, ORDER_STATUSES.CANCELLED)).toBe(true);
    expect(canTransition(ORDER_STATUSES.CANCELLED, ORDER_STATUSES.REFUND_PENDING)).toBe(true);
    expect(canTransition(ORDER_STATUSES.REFUND_PENDING, ORDER_STATUSES.REFUNDED)).toBe(true);
  });

  it('should strictly reject invalid backwards or illegal transitions', () => {
    // Cannot transition back from DELIVERED to PENDING
    expect(canTransition(ORDER_STATUSES.DELIVERED, ORDER_STATUSES.PENDING)).toBe(false);
    // Cannot transition from DELIVERED to CANCELLED directly
    expect(canTransition(ORDER_STATUSES.DELIVERED, ORDER_STATUSES.CANCELLED)).toBe(false);
    // Cannot transition from REFUNDED to CONFIRMED
    expect(canTransition(ORDER_STATUSES.REFUNDED, ORDER_STATUSES.CONFIRMED)).toBe(false);
    // Cannot transition from SHIPPED directly to PENDING
    expect(canTransition(ORDER_STATUSES.SHIPPED, ORDER_STATUSES.PENDING)).toBe(false);
  });
});
