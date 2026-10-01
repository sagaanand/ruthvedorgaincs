import { z } from 'zod';
import { BannerPlacement } from '@prisma/client';

export const bannerSchema = z.object({
  body: z.object({
    title: z.string().min(2),
    subtitle: z.string().optional(),
    imageUrl: z.string().url(),
    mobileImageUrl: z.string().url().optional(),
    linkUrl: z.string().optional(),
    buttonText: z.string().optional(),
    placement: z.nativeEnum(BannerPlacement).default(BannerPlacement.HERO),
    displayOrder: z.number().int().default(0),
    isActive: z.boolean().default(true),
  }),
});

export const faqSchema = z.object({
  body: z.object({
    question: z.string().min(5),
    answer: z.string().min(5),
    category: z.string().default('General'),
    displayOrder: z.number().int().default(0),
    isActive: z.boolean().default(true),
  }),
});

export const testimonialSchema = z.object({
  body: z.object({
    name: z.string().min(2),
    role: z.string().optional(),
    quote: z.string().min(10),
    productMention: z.string().optional(),
    rating: z.number().int().min(1).max(5).default(5),
    avatarUrl: z.string().optional(),
    displayOrder: z.number().int().default(0),
    isFeatured: z.boolean().default(true),
  }),
});
