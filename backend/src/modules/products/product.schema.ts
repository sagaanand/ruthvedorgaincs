import { z } from 'zod';

export const variantInputSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(1, 'Variant name (e.g. 500ml, 1kg) is required'),
  sku: z.string().min(1, 'Variant SKU is required'),
  price: z.coerce.number().positive('Price must be greater than 0'),
  originalPrice: z.coerce.number().positive().optional().nullable(),
  stock: z.coerce.number().int().nonnegative().default(0),
  weightInGrams: z.coerce.number().int().positive().optional().nullable(),
  isActive: z.boolean().default(true),
});

export const createProductSchema = z.object({
  body: z.object({
    name: z.string().min(2, 'Product name is required'),
    slug: z.string().min(2, 'Slug is required'),
    sku: z.string().min(2, 'SKU is required'),
    categoryId: z.string().uuid('Valid Category ID is required'),
    shortDescription: z.string().min(5, 'Short description is required'),
    fullDescription: z.string().min(10, 'Full description is required'),
    ingredients: z.string().optional().nullable(),
    specifications: z.record(z.any()).optional().nullable(),
    netWeight: z.string().optional().nullable(),
    taxRate: z.coerce.number().default(0.05),
    price: z.coerce.number().positive('Base price must be greater than 0'),
    discountedPrice: z.coerce.number().positive().optional().nullable(),
    isFeatured: z.boolean().default(false),
    isBestSeller: z.boolean().default(false),
    isActive: z.boolean().default(true),
    lowStockThreshold: z.coerce.number().int().default(10),
    metaTitle: z.string().optional().nullable(),
    metaDescription: z.string().optional().nullable(),
    variants: z.array(variantInputSchema).optional().default([]),
    images: z
      .array(
        z.object({
          url: z.string().url(),
          altText: z.string().optional(),
          isPrimary: z.boolean().default(false),
          displayOrder: z.number().int().default(0),
        })
      )
      .optional()
      .default([]),
  }),
});

export const updateProductSchema = z.object({
  body: createProductSchema.shape.body.partial(),
});

export const productQuerySchema = z.object({
  query: z.object({
    page: z.coerce.number().int().positive().default(1),
    limit: z.coerce.number().int().positive().default(12),
    category: z.string().optional(),
    search: z.string().optional(),
    minPrice: z.coerce.number().optional(),
    maxPrice: z.coerce.number().optional(),
    sortBy: z.enum(['price-low', 'price-high', 'rating', 'newest', 'featured']).default('featured'),
    tag: z.enum(['all', 'featured', 'bestseller']).default('all'),
    includeInactive: z.string().optional(),
  }),
});
