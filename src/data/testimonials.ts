export interface Testimonial {
  id: string;
  name: string;
  role: string;
  location?: string;
  rating: number;
  product: string;
  quote: string;
}

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 'test-1',
    name: 'Ananya Kulkarni',
    role: 'Regular Customer',
    location: 'Bengaluru',
    rating: 5,
    product: 'A2 Desi Cow Ghee',
    quote: "I've been using Ruthved Organic Desi Ghee for the past three months, and it tastes exactly like the homemade ghee my grandmother used to make. The aroma, purity, and texture are unmatched."
  },
  {
    id: 'test-2',
    name: 'Rahul Deshpande',
    role: 'Chef & Food Blogger',
    location: 'Pune',
    rating: 5,
    product: 'Wood-Pressed Groundnut Oil',
    quote: "Absolutely loved the quality of the Groundnut Oil! It's light, aromatic, and adds an authentic flavor to every dish. Knowing it's cold-pressed and chemical-free makes it even better."
  },
  {
    id: 'test-3',
    name: 'Sneha Patil',
    role: 'Health Enthusiast',
    location: 'Bengaluru',
    rating: 5,
    product: 'Cold-Pressed Safflower Oil',
    quote: "Ruthved Organic Safflower Oil is a gem! I use it both for cooking and as a natural moisturizer for my skin. It's pure, fresh, and I love the fact that it's made using traditional methods."
  }
];
