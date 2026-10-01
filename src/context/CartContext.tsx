import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product } from '../types/product';
import { CartItem, CartContextType } from '../types/cart';
import { BUSINESS_INFO } from '../data/businessInfo';

const CartContext = createContext<CartContextType | undefined>(undefined);

const STORAGE_KEY = 'ruthved_cart_items';
const COUPON_STORAGE_KEY = 'ruthved_applied_coupon';

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [appliedCoupon, setAppliedCoupon] = useState<string | null>(() => {
    try {
      return localStorage.getItem(COUPON_STORAGE_KEY) || null;
    } catch {
      return null;
    }
  });

  const [isCartOpen, setIsCartOpen] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch (e) {
      console.error('Failed to save cart to localStorage', e);
    }
  }, [items]);

  useEffect(() => {
    try {
      if (appliedCoupon) {
        localStorage.setItem(COUPON_STORAGE_KEY, appliedCoupon);
      } else {
        localStorage.removeItem(COUPON_STORAGE_KEY);
      }
    } catch (e) {
      console.error('Failed to save coupon to localStorage', e);
    }
  }, [appliedCoupon]);

  const addToCart = (product: Product, selectedSize?: string, quantity: number = 1) => {
    const variant = selectedSize
      ? product.variants.find(v => v.size === selectedSize) || product.variants[0]
      : product.variants[0];

    const sizeName = variant?.size || 'Standard';
    const unitPrice = variant?.price || product.price;
    const compositeId = `${product.id}-${sizeName}`;

    setItems(prevItems => {
      const existingIndex = prevItems.findIndex(i => i.id === compositeId);
      if (existingIndex > -1) {
        const updated = [...prevItems];
        updated[existingIndex].quantity += quantity;
        return updated;
      }
      return [
        ...prevItems,
        {
          id: compositeId,
          productId: product.id,
          name: product.name,
          subtitle: product.subtitle,
          image: product.image,
          size: sizeName,
          price: unitPrice,
          quantity: quantity
        }
      ];
    });

    setIsCartOpen(true);
  };

  const removeFromCart = (itemId: string) => {
    setItems(prev => prev.filter(item => item.id !== itemId));
  };

  const updateQuantity = (itemId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(itemId);
      return;
    }
    setItems(prev =>
      prev.map(item => (item.id === itemId ? { ...item, quantity } : item))
    );
  };

  const clearCart = () => {
    setItems([]);
    setAppliedCoupon(null);
  };

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const freeShippingThreshold = BUSINESS_INFO.freeShippingThreshold;

  const shippingFee = subtotal === 0 || subtotal >= freeShippingThreshold ? 0 : BUSINESS_INFO.defaultShippingCost;

  // 15% discount if FIRST15 is applied
  const discount = appliedCoupon?.toUpperCase() === BUSINESS_INFO.promoOffer.code
    ? Math.round(subtotal * (BUSINESS_INFO.promoOffer.discountPercent / 100))
    : 0;

  const total = Math.max(0, subtotal - discount + shippingFee);

  const applyCoupon = (code: string) => {
    const cleanCode = code.trim().toUpperCase();
    if (cleanCode === BUSINESS_INFO.promoOffer.code) {
      setAppliedCoupon(cleanCode);
      return { success: true, message: `Coupon ${cleanCode} applied! 15% discount has been credited.` };
    }
    return { success: false, message: 'Invalid coupon code. Try using FIRST15 for 15% off.' };
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
  };

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        totalItems,
        subtotal,
        shippingFee,
        freeShippingThreshold,
        discount,
        total,
        isCartOpen,
        setIsCartOpen,
        appliedCoupon,
        applyCoupon,
        removeCoupon
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
