# 🌾 Ruthved Organic — Production E-Commerce Backend

A high-performance, modular, and production-ready Node.js & TypeScript e-commerce backend architected for **Ruthved Organic** — an authentic Indian organic food brand specializing in Vedic Bilona A2 Desi Cow Ghee, cold-pressed (Mara Chekku) virgin oils, raw wild forest honey, and traditional wellness products.

---

## 📑 Table of Contents

1. [Architectural Overview](#1-architectural-overview)
2. [Technology Stack](#2-technology-stack)
3. [Project Directory Layout](#3-project-directory-layout)
4. [Database & Prisma Schema](#4-database--prisma-schema)
5. [Installation & Local Setup](#5-installation--local-setup)
6. [Database Migration & Seeding](#6-database-migration--seeding)
7. [Authentication & Authorization (RBAC)](#7-authentication--authorization-rbac)
8. [E-Commerce Core Modules](#8-e-commerce-core-modules)
   * [Catalog & Inventory Ledger](#catalog--inventory-ledger)
   * [Cart & Financial Calculation Engine](#cart--financial-calculation-engine)
   * [Order Lifecycle State Machine](#order-lifecycle-state-machine)
   * [Razorpay Payment Gateway & Webhook Security](#razorpay-payment-gateway--webhook-security)
   * [Coupon & Discount Engine](#coupon--discount-engine)
   * [Notifications & Communications](#notifications--communications)
9. [REST API Endpoints & Swagger Docs](#9-rest-api-endpoints--swagger-docs)
10. [Automated Testing & Quality Assurance](#10-automated-testing--quality-assurance)
11. [Containerization & Docker Deployment](#11-containerization--docker-deployment)
12. [Cloud Production Deployment (India-Optimized)](#12-cloud-production-deployment-india-optimized)

---

## 1. Architectural Overview

The backend is built following clean-architecture principles, domain-driven module separation, and defensive financial computing:

* **Strict Server Authority**: Cart totals, discounts, shipping fees, and taxes are **always** calculated on the server. Client-provided prices or totals are never trusted.
* **ACID Transactions**: Checkout creation, inventory reservation, and payment capture run within Prisma database transactions to eliminate overselling and race conditions.
* **Idempotent Webhooks**: Razorpay webhooks verify SHA256 HMAC signatures against the raw request body before executing idempotent order status updates.
* **Auditable Ledger**: Inventory additions, checkout reservations, cancellations, and restocks are logged to an immutable `InventoryMovement` ledger.

---

## 2. Technology Stack

| Layer | Technology |
|---|---|
| **Runtime** | Node.js 20 LTS (NodeNext ESM) |
| **Framework** | Express.js 4.x |
| **Language** | TypeScript 5.6 (strict mode) |
| **Database** | PostgreSQL 16 |
| **ORM** | Prisma ORM 5.22 |
| **Authentication** | JWT Access (15m) + Rotating Refresh Tokens (7d), Bcrypt hashing |
| **Validation** | Zod 3.23 (body, query, param schemas) |
| **API Documentation** | Swagger UI / OpenAPI 3.0 (`/api/docs`) |
| **Payments** | Razorpay (Orders API, Webhooks, Refunds) |
| **Media Processing** | Sharp (WebP conversion) + S3 / Local storage driver |
| **Email** | Nodemailer (HTML transactional emails with brand design) |
| **WhatsApp** | Meta WhatsApp Cloud API (Graph API v19.0) |
| **Queue / Background Jobs**| BullMQ + Redis (with in-memory fallback) |
| **Structured Logging** | Pino + pino-http |
| **Testing** | Vitest + Supertest |
| **Containerization** | Docker multi-stage build + Docker Compose |

---

## 3. Project Directory Layout

```
backend/
├── Dockerfile                  # Multi-stage production container build
├── docker-compose.yml          # PostgreSQL 16 + Redis 7 + Express backend
├── package.json                # Dependencies and npm scripts
├── tsconfig.json               # NodeNext TypeScript configuration
├── .env.example                # Documented configuration template
├── prisma/
│   ├── schema.prisma           # 29 normalized models, relations & indexes
│   └── seed.ts                 # Full Ruthved Organic catalog & admin seed
├── src/
│   ├── app.ts                  # Express application setup, security, routes
│   ├── server.ts               # HTTP bootstrap with graceful shutdown
│   ├── config/                 # Env, logger, Prisma client, Swagger spec, constants
│   ├── middleware/             # Auth, role check, validation, rate limit, upload, errors
│   ├── integrations/           # Razorpay SDK, order creation, HMAC signature check
│   ├── services/               # Email, WhatsApp, invoice formatter, S3 storage
│   ├── jobs/                   # BullMQ worker queue for async notifications
│   ├── utils/                  # Bcrypt hash, JWT tokens, response helpers, calculation
│   ├── types/                  # Express user augmentation & global types
│   └── modules/                # 19 domain-driven feature modules
│       ├── auth/               # Register, login, refresh tokens, logout, forgot/reset
│       ├── users/              # Profile view, password update, user management
│       ├── addresses/          # Customer delivery addresses (home/work, default)
│       ├── categories/         # Category hierarchy, slugs, banner images
│       ├── products/           # Catalog, variants, SKUs, inventory, soft delete
│       ├── inventory/          # Stock adjustment, movements ledger, low-stock alerts
│       ├── cart/               # Persistent cart, session cart, login merge, auto-calc
│       ├── wishlist/           # Customer wishlist, move to cart
│       ├── orders/             # Order creation, checkout calculations, status transitions
│       ├── payments/           # Razorpay orders, client verification, webhooks, refunds
│       ├── shipping/           # Pincode serviceability, tracking IDs, courier updates
│       ├── coupons/            # Percentage/fixed discounts, min cart value, usage limits
│       ├── reviews/            # 1-5 star ratings, verified purchase check, moderation
│       ├── homepage/           # Dynamic CMS: banners, featured collections, stories
│       ├── customers/          # Admin customer directory, search, lifetime spend metrics
│       ├── notifications/      # Notification dispatch log, retries, test triggers
│       ├── settings/           # Store settings: free shipping threshold, GST rates
│       ├── admin/              # Financial KPIs, revenue breakdown, audit logs
│       └── analytics/          # Sales trends, top selling products, customer acquisition
└── tests/                      # Automated Vitest test suite
    ├── auth.test.ts            # Password hash, JWT signature, tampered tokens
    ├── calculation.test.ts     # Subtotal, tiered coupons, GST taxes, free shipping
    ├── orderStateMachine.test.ts # Permitted vs forbidden status transitions
    ├── paymentSecurity.test.ts # Razorpay checkout & webhook HMAC SHA256 validation
    └── api.test.ts             # Supertest HTTP tests (health, 404, protected routes)
```

---

## 4. Database & Prisma Schema

The database contains **29 normalized models** adhering to 3NF standards:

* **Authentication & Users**: `User`, `Role`, `Permission`, `UserPermission`, `RefreshToken`, `Address`
* **Product Catalog**: `Category`, `Product`, `ProductVariant`, `ProductImage`
* **Inventory Ledger**: `Inventory`, `InventoryMovement`
* **Shopping**: `Cart`, `CartItem`, `Wishlist`, `WishlistItem`
* **Order & Payments**: `Order`, `OrderItem`, `OrderEvent`, `Payment`, `Refund`, `Shipment`
* **Marketing & Discounts**: `Coupon`, `CouponRedemption`, `Review`
* **Storefront CMS & Operations**: `Notification`, `Banner`, `FAQ`, `Testimonial`, `StoreSetting`, `AuditLog`

---

## 5. Installation & Local Setup

### Prerequisites
* Node.js >= 20.x
* PostgreSQL >= 15.x (or Docker)
* Redis (optional, for BullMQ async jobs)

### 1. Clone & Install Dependencies
```bash
cd backend
npm install
```

### 2. Environment Configuration
Copy `.env.example` to `.env`:
```bash
cp .env.example .env
```
Update `DATABASE_URL` with your local PostgreSQL credentials:
```env
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/ruthved_organic?schema=public"
```

### 3. Generate Prisma Client
```bash
npx prisma generate
```

### 4. Start Development Server
```bash
npm run dev
```
Server runs at `http://localhost:5000`. Interactive Swagger UI is available at `http://localhost:5000/api/docs`.

---

## 6. Database Migration & Seeding

### Apply Schema to PostgreSQL
```bash
# Push schema directly in development:
npm run prisma:push

# Or create a formal migration:
npm run prisma:migrate
```

### Run Seed Script
The seed script populates the Ruthved Organic catalog, categories, admin users, inventory, discount coupons, and FAQs:
```bash
npm run seed
```

#### Pre-seeded Default Accounts:
* **Super Admin**:
  * Email: `admin@ruthvedorganic.com`
  * Password: `Admin@123456`
* **Test Customer**:
  * Email: `customer@ruthvedorganic.com`
  * Password: `Customer@123456`

---

## 7. Authentication & Authorization (RBAC)

### Token Lifecycles
* **Access Token**: Short-lived JWT (15 minutes), passed via `Authorization: Bearer <token>`.
* **Refresh Token**: Long-lived token (7 days), stored in an HTTP-only secure cookie and verified against the database. Token rotation is enforced upon each refresh request.

### Supported System Roles
1. `SUPER_ADMIN`: Full root system privileges and account management.
2. `ADMIN`: Catalog, customer, and operations administration.
3. `ORDER_MANAGER`: Order processing, shipments, status updates, and returns.
4. `INVENTORY_MANAGER`: Stock adjustments, warehouse restocking, and alerts.
5. `CONTENT_MANAGER`: Banners, blog, FAQs, testimonials, and homepage CMS.
6. `CUSTOMER_SUPPORT`: Customer profile lookup, order tracking, and support notes.
7. `CUSTOMER`: Storefront browsing, cart, checkout, reviews, and order tracking.

---

## 8. E-Commerce Core Modules

### Catalog & Inventory Ledger
* Supports single products and multi-variant items (e.g. 250ml, 500ml, 1L, 5L).
* Every quantity change generates an `InventoryMovement` entry tracking previous stock, change delta, resulting stock, actor, and reason.

### Cart & Financial Calculation Engine
* **Subtotal**: Sum of `(price × quantity)` across valid items.
* **Discount**: Validated against coupon limits (`PERCENTAGE` with maximum cap or `FIXED`).
* **Shipping**: Automatically waived (₹0) when subtotal meets the free-shipping threshold (default: ₹999); otherwise standard shipping fee (₹79) applies.
* **Tax**: Item-specific or standard 5% GST calculated on the discounted taxable base.

### Order Lifecycle State Machine
Orders transition across immutable stages:
```
PENDING ──► AWAITING_PAYMENT ──► CONFIRMED ──► PROCESSING ──► PACKED ──► SHIPPED ──► OUT_FOR_DELIVERY ──► DELIVERED
   │               │                 │              │
   ▼               ▼                 ▼              ▼
CANCELLED ◄────────┴─────────────────┴──────────────┴───► REFUND_PENDING ──► REFUNDED
```

### Razorpay Payment Gateway & Webhook Security
1. Client calls `POST /api/v1/orders/checkout`.
2. Backend creates a pending order, reserves stock, and calls Razorpay Orders API.
3. Razorpay order ID and checkout details are returned to the client.
4. Client completes Razorpay checkout modal and sends response to `POST /api/v1/payments/verify`.
5. Backend computes `crypto.createHmac('sha256', secret).update(order_id + "|" + payment_id).digest('hex')` and marks order as `CONFIRMED`.
6. Webhooks received at `POST /api/v1/payments/webhook` verify raw body signatures and update payment status idempotently.

---

## 9. REST API Endpoints & Swagger Docs

Interactive Swagger UI: `http://localhost:5000/api/docs`
Raw OpenAPI Specification: `http://localhost:5000/api/docs.json`

### Core Route Summary:
| Route | Method | Description | Auth Required |
|---|---|---|---|
| `/health` | GET | Healthcheck and uptime status | None |
| `/api/v1/auth/register` | POST | Customer registration | None |
| `/api/v1/auth/login` | POST | Customer & Admin login | None |
| `/api/v1/auth/refresh` | POST | Refresh JWT access token | Refresh Cookie |
| `/api/v1/products` | GET | Catalog search, filter, paginate | None |
| `/api/v1/products/:slug` | GET | Single product details & variants | None |
| `/api/v1/categories` | GET | Category tree & metadata | None |
| `/api/v1/cart` | GET | Customer / guest cart summary | Optional |
| `/api/v1/cart/items` | POST | Add product or variant to cart | Optional |
| `/api/v1/wishlist` | GET | Customer saved wishlist | Customer |
| `/api/v1/coupons/validate` | POST | Server coupon code validation | None |
| `/api/v1/orders/checkout` | POST | Create order & reserve stock | Optional / Customer |
| `/api/v1/payments/verify` | POST | Verify Razorpay payment signature| None |
| `/api/v1/payments/webhook` | POST | Idempotent Razorpay webhook | HMAC signature |
| `/api/v1/shipping/serviceability/:pincode` | GET | Check delivery serviceability | None |
| `/api/v1/admin/dashboard` | GET | Financial KPIs & sales metrics | Admin |
| `/api/v1/admin/orders` | GET | Manage store orders | Admin / Order Manager |
| `/api/v1/admin/orders/:id/status` | PATCH | Update order lifecycle status | Admin / Order Manager |
| `/api/v1/customers` | GET | Customer directory & spend metrics| Admin |
| `/api/v1/inventory/adjust` | POST | Manual stock adjustment & ledger | Admin / Inventory Mgr |

---

## 10. Automated Testing & Quality Assurance

Run the complete Vitest test suite:
```bash
npm test
```
To run tests in watch mode:
```bash
npm run test:watch
```

### Production Build Validation
Compile TypeScript to `dist/`:
```bash
npm run build
```

---

## 11. Containerization & Docker Deployment

### Run Full Stack with Docker Compose
```bash
docker compose up -d --build
```
This launches:
* **PostgreSQL 16**: Port 5432 with persistent volume
* **Redis 7**: Port 6379 with persistent volume
* **Ruthved Backend**: Port 5000 with healthcheck and graceful shutdown

To view logs:
```bash
docker compose logs -f backend
```

---

## 12. Cloud Production Deployment (India-Optimized)

For low-latency delivery across India, deploy in the **AWS Mumbai (ap-south-1)** region or **DigitalOcean Bangalore (blr1)**:

1. **Database**: Managed PostgreSQL with connection pooling (e.g. Supabase, AWS RDS PostgreSQL, or Neon).
2. **Object Storage**: S3-compatible bucket (AWS S3 Mumbai or Cloudflare R2) for product photography.
3. **Razorpay Live Setup**:
   * Switch `RAZORPAY_KEY_ID` and `RAZORPAY_KEY_SECRET` to Live mode.
   * Add webhook URL `https://api.ruthvedorganic.com/api/v1/payments/webhook` in Razorpay Dashboard.
   * Enable events: `payment.captured`, `payment.failed`, `refund.processed`.
4. **HTTPS / SSL**: Terminate TLS at Cloudflare or AWS CloudFront with HTTP/2 enabled.

---

## 🌾 Ruthved Organic — Pure Vedic Nutrition
*Trust in Nature's Best*
