export type ProductCategory = 'all' | 'ghee' | 'oils' | 'honey';

export interface ProductVariant {
  size: string;
  price: number;
  inStock: boolean;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  subtitle: string;
  category: 'ghee' | 'oils' | 'honey';
  tag?: 'Best Seller' | 'New' | 'Limited';
  price: number;
  originalPrice?: number;
  rating: number;
  reviewsCount: number;
  image: string;
  gallery: string[];
  shortDescription: string;
  description: string;
  highlights: string[];
  benefits: string[];
  processMethod: string;
  storageInstructions: string;
  shelfLife: string;
  origin: string;
  ingredients: string;
  variants: ProductVariant[];
  featured?: boolean;
}
