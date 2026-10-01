export const swaggerDocument = {
  openapi: '3.0.0',
  info: {
    title: 'Ruthved Organic REST API',
    version: '1.0.0',
    description:
      'Production-ready backend API documentation for Ruthved Organic — A2 Desi Cow Ghee (Bilona Method), Cold-Pressed Oils, Wild Honey & Traditional Agro Products.',
    contact: {
      name: 'Ruthved Organic Engineering Support',
      email: 'orders@ruthvedorganic.com',
      url: 'https://ruthvedorganic.com',
    },
  },
  servers: [
    {
      url: '/api/v1',
      description: 'Primary API v1 Gateway',
    },
  ],
  components: {
    securitySchemes: {
      BearerAuth: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        description: 'Provide your JWT access token retrieved from /auth/login or /auth/register',
      },
    },
    schemas: {
      ApiResponse: {
        type: 'object',
        properties: {
          success: { type: 'boolean' },
          message: { type: 'string' },
          data: { type: 'object' },
        },
      },
    },
  },
  paths: {
    '/health': {
      get: {
        summary: 'System health check and uptime probe',
        tags: ['System'],
        responses: {
          200: { description: 'System healthy' },
        },
      },
    },
    '/auth/register': {
      post: {
        summary: 'Register customer account',
        tags: ['Authentication'],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                required: ['name', 'email', 'password'],
                properties: {
                  name: { type: 'string', example: 'Priya Sharma' },
                  email: { type: 'string', example: 'priya@example.com' },
                  phone: { type: 'string', example: '9876543210' },
                  password: { type: 'string', example: 'Organic@2026' },
                },
              },
            },
          },
        },
        responses: { 201: { description: 'User registered successfully' } },
      },
    },
    '/auth/login': {
      post: {
        summary: 'Authenticate user with email or phone',
        tags: ['Authentication'],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                required: ['emailOrPhone', 'password'],
                properties: {
                  emailOrPhone: { type: 'string', example: 'priya@example.com' },
                  password: { type: 'string', example: 'Organic@2026' },
                },
              },
            },
          },
        },
        responses: { 200: { description: 'Login successful' } },
      },
    },
    '/products': {
      get: {
        summary: 'Retrieve paginated and filtered product catalog',
        tags: ['Products'],
        parameters: [
          { name: 'category', in: 'query', schema: { type: 'string' } },
          { name: 'search', in: 'query', schema: { type: 'string' } },
          { name: 'tag', in: 'query', schema: { type: 'string', enum: ['all', 'featured', 'bestseller'] } },
          { name: 'sortBy', in: 'query', schema: { type: 'string', enum: ['price-low', 'price-high', 'rating', 'newest', 'featured'] } },
          { name: 'page', in: 'query', schema: { type: 'integer', default: 1 } },
          { name: 'limit', in: 'query', schema: { type: 'integer', default: 12 } },
        ],
        responses: { 200: { description: 'Product list retrieved' } },
      },
    },
    '/products/{slug}': {
      get: {
        summary: 'Get detailed product by slug with variants and ratings',
        tags: ['Products'],
        parameters: [
          { name: 'slug', in: 'path', required: true, schema: { type: 'string' } },
        ],
        responses: { 200: { description: 'Product details' } },
      },
    },
    '/categories': {
      get: {
        summary: 'Get all product categories with product counts',
        tags: ['Categories'],
        responses: { 200: { description: 'Categories retrieved' } },
      },
    },
    '/cart': {
      get: {
        summary: 'Get current customer or guest cart with recalculated totals',
        tags: ['Cart'],
        parameters: [
          { name: 'guestToken', in: 'query', schema: { type: 'string' } },
          { name: 'couponCode', in: 'query', schema: { type: 'string' } },
        ],
        responses: { 200: { description: 'Cart summary' } },
      },
    },
    '/cart/items': {
      post: {
        summary: 'Add item or variant to cart with real-time stock check',
        tags: ['Cart'],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                required: ['productId', 'quantity'],
                properties: {
                  productId: { type: 'string' },
                  variantId: { type: 'string' },
                  quantity: { type: 'integer', default: 1 },
                  guestToken: { type: 'string' },
                },
              },
            },
          },
        },
        responses: { 200: { description: 'Item added' } },
      },
    },
    '/orders/checkout': {
      post: {
        summary: 'Submit checkout with atomic stock reservation and payment intent',
        tags: ['Orders'],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                required: ['customerName', 'customerEmail', 'customerPhone', 'shippingAddress', 'items'],
                properties: {
                  customerName: { type: 'string' },
                  customerEmail: { type: 'string' },
                  customerPhone: { type: 'string' },
                  shippingAddress: { type: 'object' },
                  items: { type: 'array' },
                  couponCode: { type: 'string' },
                  paymentMethod: { type: 'string', enum: ['ONLINE', 'COD'] },
                },
              },
            },
          },
        },
        responses: { 201: { description: 'Order created' } },
      },
    },
    '/payments/verify': {
      post: {
        summary: 'Verify Razorpay signature and capture payment',
        tags: ['Payments'],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                required: ['orderId', 'razorpayOrderId', 'razorpayPaymentId', 'razorpaySignature'],
                properties: {
                  orderId: { type: 'string' },
                  razorpayOrderId: { type: 'string' },
                  razorpayPaymentId: { type: 'string' },
                  razorpaySignature: { type: 'string' },
                },
              },
            },
          },
        },
        responses: { 200: { description: 'Payment verified' } },
      },
    },
    '/shipping/serviceability': {
      get: {
        summary: 'Check PIN code delivery windows and eligibility',
        tags: ['Shipping'],
        parameters: [
          { name: 'pincode', in: 'query', required: true, schema: { type: 'string' } },
        ],
        responses: { 200: { description: 'PIN code serviceability' } },
      },
    },
    '/coupons/validate': {
      post: {
        summary: 'Validate coupon code against cart amount',
        tags: ['Coupons'],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                required: ['code', 'cartTotal'],
                properties: {
                  code: { type: 'string', example: 'FIRST15' },
                  cartTotal: { type: 'number', example: 1200 },
                },
              },
            },
          },
        },
        responses: { 200: { description: 'Coupon validity' } },
      },
    },
    '/admin/dashboard': {
      get: {
        summary: 'Admin dashboard financial KPIs, orders breakdown, low stock alerts',
        tags: ['Admin'],
        security: [{ BearerAuth: [] }],
        responses: { 200: { description: 'Dashboard metrics' } },
      },
    },
  },
};

export const swaggerSpec = swaggerDocument;
