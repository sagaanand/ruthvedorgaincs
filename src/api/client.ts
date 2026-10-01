/**
 * 🌾 Ruthved Organic — Production API Client
 * Typed API client connecting the React frontend to the Express backend.
 */

const API_BASE_URL = (import.meta as any).env?.VITE_API_URL || 'http://localhost:5000/api/v1';

// Token storage helpers
let accessToken: string | null = localStorage.getItem('ruthved_access_token');

export const setAuthToken = (token: string | null) => {
  accessToken = token;
  if (token) {
    localStorage.setItem('ruthved_access_token', token);
  } else {
    localStorage.removeItem('ruthved_access_token');
  }
};

export const getAuthToken = () => accessToken;

export class ApiError extends Error {
  statusCode: number;
  errors?: any;

  constructor(message: string, statusCode: number, errors?: any) {
    super(message);
    this.name = 'ApiError';
    this.statusCode = statusCode;
    this.errors = errors;
  }
}

async function request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  const url = `${API_BASE_URL}${endpoint.startsWith('/') ? endpoint : `/${endpoint}`}`;

  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    Accept: 'application/json',
    ...(options.headers as Record<string, string>),
  };

  if (accessToken) {
    headers['Authorization'] = `Bearer ${accessToken}`;
  }

  const response = await fetch(url, {
    ...options,
    headers,
    credentials: 'include', // sends refresh token cookie
  });

  const contentType = response.headers.get('content-type');
  const isJson = contentType && contentType.includes('application/json');
  const data = isJson ? await response.json() : await response.text();

  if (!response.ok) {
    const message = (data && data.message) || response.statusText || 'An error occurred';
    throw new ApiError(message, response.status, data?.errors);
  }

  return (data?.data !== undefined ? data.data : data) as T;
}

// ------------------------------------------------------------
// 1. AUTH API
// ------------------------------------------------------------
export const authApi = {
  register: (body: { name: string; email: string; phone?: string; password: string }) =>
    request<{ user: any; accessToken: string }>('/auth/register', {
      method: 'POST',
      body: JSON.stringify(body),
    }),

  login: (body: { email?: string; phone?: string; password: string }) =>
    request<{ user: any; accessToken: string }>('/auth/login', {
      method: 'POST',
      body: JSON.stringify(body),
    }),

  logout: () =>
    request('/auth/logout', {
      method: 'POST',
    }),

  refreshToken: () =>
    request<{ accessToken: string }>('/auth/refresh', {
      method: 'POST',
    }),

  getProfile: () => request<any>('/users/me'),

  updateProfile: (body: { name?: string; phone?: string }) =>
    request<any>('/users/me', {
      method: 'PATCH',
      body: JSON.stringify(body),
    }),
};

// ------------------------------------------------------------
// 2. PRODUCTS & CATEGORIES API
// ------------------------------------------------------------
export const productsApi = {
  getAll: (params?: { page?: number; limit?: number; category?: string; search?: string; featured?: boolean }) => {
    const searchParams = new URLSearchParams();
    if (params?.page) searchParams.set('page', String(params.page));
    if (params?.limit) searchParams.set('limit', String(params.limit));
    if (params?.category) searchParams.set('category', params.category);
    if (params?.search) searchParams.set('search', params.search);
    if (params?.featured !== undefined) searchParams.set('featured', String(params.featured));
    const query = searchParams.toString();
    return request<{ products: any[]; pagination: any }>(`/products${query ? `?${query}` : ''}`);
  },

  getBySlug: (slug: string) => request<any>(`/products/${slug}`),

  getCategories: () => request<any[]>('/categories'),
};

// ------------------------------------------------------------
// 3. CART & WISHLIST API
// ------------------------------------------------------------
export const cartApi = {
  getCart: (sessionId?: string) => {
    const query = sessionId ? `?sessionId=${sessionId}` : '';
    return request<any>(`/cart${query}`);
  },

  addItem: (body: { productId: string; variantId?: string; quantity: number; sessionId?: string }) =>
    request<any>('/cart/items', {
      method: 'POST',
      body: JSON.stringify(body),
    }),

  updateItem: (itemId: string, quantity: number, sessionId?: string) =>
    request<any>(`/cart/items/${itemId}`, {
      method: 'PATCH',
      body: JSON.stringify({ quantity, sessionId }),
    }),

  removeItem: (itemId: string, sessionId?: string) =>
    request<any>(`/cart/items/${itemId}`, {
      method: 'DELETE',
      body: JSON.stringify({ sessionId }),
    }),

  clearCart: (sessionId?: string) =>
    request<any>('/cart', {
      method: 'DELETE',
      body: JSON.stringify({ sessionId }),
    }),
};

export const wishlistApi = {
  getWishlist: () => request<any[]>('/wishlist'),
  add: (productId: string) =>
    request<any>('/wishlist', {
      method: 'POST',
      body: JSON.stringify({ productId }),
    }),
  remove: (productId: string) =>
    request<any>(`/wishlist/${productId}`, {
      method: 'DELETE',
    }),
};

// ------------------------------------------------------------
// 4. ORDERS & CHECKOUT API
// ------------------------------------------------------------
export const ordersApi = {
  createOrder: (body: {
    items: Array<{ productId: string; variantId?: string; quantity: number }>;
    shippingAddress: {
      fullName: string;
      phone: string;
      addressLine1: string;
      addressLine2?: string;
      city: string;
      state: string;
      postalCode: string;
      country?: string;
    };
    customerName: string;
    customerEmail: string;
    customerPhone: string;
    paymentMethod: 'ONLINE' | 'COD';
    couponCode?: string;
    orderNotes?: string;
  }) =>
    request<{ order: any; razorpayOrder?: any }>('/orders/checkout', {
      method: 'POST',
      body: JSON.stringify(body),
    }),

  getMyOrders: (page = 1, limit = 10) =>
    request<{ orders: any[]; pagination: any }>(`/orders?page=${page}&limit=${limit}`),

  getOrderById: (orderId: string) => request<any>(`/orders/${orderId}`),

  cancelOrder: (orderId: string, reason: string) =>
    request<any>(`/orders/${orderId}/cancel`, {
      method: 'POST',
      body: JSON.stringify({ reason }),
    }),
};

// ------------------------------------------------------------
// 5. PAYMENTS API (Razorpay)
// ------------------------------------------------------------
export const paymentsApi = {
  verifyPayment: (body: {
    orderId: string;
    razorpayOrderId: string;
    razorpayPaymentId: string;
    razorpaySignature: string;
  }) =>
    request<{ success: boolean; orderId: string; status: string }>('/payments/verify', {
      method: 'POST',
      body: JSON.stringify(body),
    }),
};

// ------------------------------------------------------------
// 6. COUPONS API
// ------------------------------------------------------------
export const couponsApi = {
  validateCoupon: (code: string, cartAmount: number) =>
    request<{
      isValid: boolean;
      discountAmount: number;
      coupon: { code: string; discountType: string; discountValue: number };
    }>('/coupons/validate', {
      method: 'POST',
      body: JSON.stringify({ code, cartAmount }),
    }),
};

// ------------------------------------------------------------
// 7. REVIEWS API
// ------------------------------------------------------------
export const reviewsApi = {
  getProductReviews: (productId: string, page = 1) =>
    request<{ reviews: any[]; summary: any; pagination: any }>(`/reviews/product/${productId}?page=${page}`),

  createReview: (body: {
    productId: string;
    rating: number;
    title?: string;
    comment: string;
    images?: string[];
  }) =>
    request<any>('/reviews', {
      method: 'POST',
      body: JSON.stringify(body),
    }),
};

// ------------------------------------------------------------
// 8. SHIPPING & SERVICEABILITY
// ------------------------------------------------------------
export const shippingApi = {
  checkServiceability: (pincode: string) => request<any>(`/shipping/serviceability/${pincode}`),
};

// ------------------------------------------------------------
// 9. ADMIN API
// ------------------------------------------------------------
export const adminApi = {
  getDashboardMetrics: (startDate?: string, endDate?: string) => {
    const params = new URLSearchParams();
    if (startDate) params.set('startDate', startDate);
    if (endDate) params.set('endDate', endDate);
    return request<any>(`/admin/dashboard?${params.toString()}`);
  },

  getOrders: (params?: { page?: number; limit?: number; status?: string }) => {
    const query = new URLSearchParams(params as any).toString();
    return request<any>(`/admin/orders${query ? `?${query}` : ''}`);
  },

  updateOrderStatus: (orderId: string, status: string, notes?: string) =>
    request<any>(`/admin/orders/${orderId}/status`, {
      method: 'PATCH',
      body: JSON.stringify({ status, notes }),
    }),

  getCustomers: (page = 1, limit = 20, search?: string) => {
    const params = new URLSearchParams({ page: String(page), limit: String(limit) });
    if (search) params.set('search', search);
    return request<any>(`/customers?${params.toString()}`);
  },

  getInventory: () => request<any>('/inventory'),

  adjustStock: (body: { productId: string; variantId?: string; quantityChange: number; reason: string }) =>
    request<any>('/inventory/adjust', {
      method: 'POST',
      body: JSON.stringify(body),
    }),
};
