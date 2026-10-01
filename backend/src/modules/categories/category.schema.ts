import { z } from 'zod';

export const createCategorySchema = z.object({
  body: z.object({
    name: z.string().min(2, 'Category name must have at least 2 characters'),
    slug: z.string().min(2, 'Slug is required'),
    description: z.string().optional(),
    image: z.string().optional(),
    parentId: z.string().uuid().optional().nullable(),
    displayOrder: z.number().int().default(0),
    isActive: z.boolean().default(true),
    metaTitle: z.string().optional(),
    metaDescription: z.string().optional(),
  }),
});

export const updateCategorySchema = z.object({
  body: createCategorySchema.shape.body.partial(),
});
