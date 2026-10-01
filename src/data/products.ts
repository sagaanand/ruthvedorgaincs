import { Product } from '../types/product';

export const PRODUCTS: Product[] = [
  {
    id: 'desi-ghee',
    slug: 'desi-cow-ghee',
    name: 'A2 Desi Cow Ghee',
    subtitle: 'Hand-Churned Traditional Bilona Method',
    category: 'ghee',
    tag: 'Best Seller',
    price: 950,
    originalPrice: 1100,
    rating: 4.9,
    reviewsCount: 148,
    image: '/images/desi.avif',
    gallery: [
      '/images/desi.avif',
      '/images/DESI COW GHEE (6).avif',
    ],
    shortDescription: 'Made from pure A2 cow milk using the ancient Vedic Bilona method. Rich in nutrition, golden in color, granular in texture, and deeply aromatic.',
    description: 'Made from A2 cow milk using the traditional Bilona method, our Desi Ghee is rich in nutrition, easy to digest, and full of flavor. It promotes gut health, boosts immunity, and is ideal for cooking, ayurvedic use, or simply adding a spoonful of goodness to your daily meals.',
    highlights: [
      'Rich in vitamins A, D, E & K — boosts immunity and aids digestion',
      'Helps strengthen bones, joints, and promotes gut health',
      'Perfect for cooking, ayurveda, and spiritual rituals',
      'Pure grass-fed native Indian cows, zero additives or preservatives'
    ],
    benefits: [
      'Hand-churned from cultured curd (Makkhan) rather than raw cream',
      'Supports memory, digestive fire (Agni), and cellular rejuvenation',
      'High smoke point (250°C), making it the safest medium for cooking',
      'Lactose & casein free during clarification, soothing for sensitive tummies'
    ],
    processMethod: 'Traditional 5-step Bilona technique: Grass-fed cow milk is boiled, cultured overnight into curd, two-way churned with wooden bilona to yield makkhan, and slowly clarified on earthen stoves into pure golden granular ghee.',
    storageInstructions: 'Store in a cool, dry place away from direct sunlight. Do not refrigerate. Always use a clean, dry wooden or stainless steel spoon.',
    shelfLife: '12 Months from date of packaging',
    origin: 'Karnataka, India',
    ingredients: '100% Pure Clarified Butterfat from Cultured A2 Cow Milk',
    variants: [
      { size: '500ml', price: 950, inStock: true },
      { size: '1000ml (1L)', price: 1850, inStock: true }
    ],
    featured: true
  },
  {
    id: 'natural-honey',
    slug: 'natural-wild-honey',
    name: 'Natural Wild Honey',
    subtitle: '100% Raw, Unprocessed & Hive-Harvested',
    category: 'honey',
    tag: 'New',
    price: 490,
    originalPrice: 560,
    rating: 4.8,
    reviewsCount: 92,
    image: '/images/honey.avif',
    gallery: [
      '/images/honey.avif'
    ],
    shortDescription: 'Sourced from natural forest hives and bottled without any additives. A powerhouse of antioxidants, natural enzymes, and therapeutic minerals.',
    description: 'Sourced from natural hives and bottled without any additives, our honey is a powerhouse of antioxidants, minerals, and enzymes. It helps build immunity, soothes sore throats, aids digestion, and is a natural energy booster — a perfect replacement for refined sugar.',
    highlights: [
      'Rich in antioxidants, enzymes & minerals — boosts immunity',
      'Natural sweetener & energy booster, perfect for detox drinks',
      'Helps soothe sore throats and improve daily digestion',
      'Never ultra-filtered or pasteurized, keeping pollen intact'
    ],
    benefits: [
      'Natural antibacterials fight seasonal cough and cold',
      'Low glycemic response compared to white cane sugar',
      'Loaded with natural bio-flavonoids and phytonutrients',
      'Great natural pre-workout booster and metabolic reviver'
    ],
    processMethod: 'Cruelty-free sustainable harvesting from wild forest blooms in Karnataka. Settled by gravity and cold-strained through muslin cloth with zero thermal heating.',
    storageInstructions: 'Keep in glass jar at room temperature. Natural honey may crystallize over time; simply place the jar in warm water to reliquify.',
    shelfLife: '18 Months from harvest',
    origin: 'Western Ghats Forest Belts, Karnataka',
    ingredients: '100% Pure Raw Multi-Floral Wild Honey',
    variants: [
      { size: '500g', price: 490, inStock: true },
      { size: '1kg', price: 920, inStock: true }
    ],
    featured: true
  },
  {
    id: 'coconut-oil',
    slug: 'cold-pressed-coconut-oil',
    name: 'Cold-Pressed Coconut Oil',
    subtitle: 'Extra Virgin, Wood-Pressed & Nutrient-Dense',
    category: 'oils',
    tag: 'Best Seller',
    price: 340,
    originalPrice: 399,
    rating: 4.9,
    reviewsCount: 118,
    image: '/images/oil.avif',
    gallery: [
      '/images/oil.avif'
    ],
    shortDescription: 'Extracted without heat from mature coconuts. Ideal for high-heat cooking, oil pulling, deep hair conditioning, and radiant skincare.',
    description: 'Our cold-pressed Coconut Oil is extracted without heat, preserving its nutrients. Use it for cooking, as a hair oil, or skin moisturizer. Filled with medium-chain triglycerides (MCTs) and lauric acid.',
    highlights: [
      'Rich in healthy fats — supports heart health and weight management',
      'Ideal for cooking, traditional oil pulling, skin and hair care',
      'Antibacterial and antifungal properties — promotes holistic wellness',
      'Fresh natural aroma with zero chemical deodorizers or bleaches'
    ],
    benefits: [
      'Contains 50%+ Lauric Acid for immune reinforcement',
      'Strengthens hair roots and deeply nourishes the scalp',
      'Excellent for Ayurvedic morning Gandusha (oil pulling)',
      'Stable saturated fat profile that does not oxidize easily'
    ],
    processMethod: 'Slow cold expeller press from fresh sun-dried sulfur-free copra kernels below 45°C, preserving delicate volatile aromatic compounds and antioxidants.',
    storageInstructions: 'Store in a dry pantry away from heat. Naturally solidifies below 24°C without altering purity or quality.',
    shelfLife: '12 Months',
    origin: 'Coastal Karnataka, India',
    ingredients: '100% Pure Cold-Pressed Virgin Coconut Oil',
    variants: [
      { size: '500ml', price: 340, inStock: true },
      { size: '1000ml (1L)', price: 640, inStock: true }
    ],
    featured: true
  },
  {
    id: 'safflower-oil',
    slug: 'safflower-oil-kusuma',
    name: 'Safflower Oil (Kusuma Oil)',
    subtitle: 'Cold-Pressed & Rich in Linoleic Fatty Acids',
    category: 'oils',
    tag: 'Limited',
    price: 420,
    originalPrice: 480,
    rating: 4.7,
    reviewsCount: 76,
    image: '/images/oil3.avif',
    gallery: [
      '/images/oil3.avif'
    ],
    shortDescription: 'Traditionally cold-pressed and chemical-free. Supports heart health, manages healthy cholesterol, and provides an exceptionally light culinary profile.',
    description: 'Traditionally cold-pressed and chemical-free, our Safflower Oil supports heart health, manages cholesterol, and is rich in Omega-6 fatty acids. Its light taste makes it a great choice for everyday cooking, salad dressings, and natural skin hydration.',
    highlights: [
      'High in Omega-6 fatty acids — promotes cardiovascular health',
      'Light and easy to digest — ideal for daily family use',
      'Supports natural skin glow and hair nourishment',
      'High smoke point suitable for sautéing, frying, and baking'
    ],
    benefits: [
      'High concentration of Linoleic Acid promotes blood circulation',
      'Zero trans-fats, zero mineral oil adulteration',
      'Gentle on stomach, non-greasy culinary mouthfeel',
      'Doubles as an Ayurvedic botanical topical hydrator'
    ],
    processMethod: 'Traditional wood-pressed method in wooden mortars (Kachi Ghani) at room temperature, followed by unhurried natural gravity sedimentation.',
    storageInstructions: 'Store in an airtight dark or amber bottle away from direct heat to protect polyunsaturated fatty acids.',
    shelfLife: '9 Months',
    origin: 'North Karnataka Farming Clusters',
    ingredients: '100% Pure Cold-Pressed Safflower (Carthamus tinctorius) Seeds Oil',
    variants: [
      { size: '1000ml (1L)', price: 420, inStock: true },
      { size: '5 Litres', price: 1999, inStock: true }
    ],
    featured: true
  },
  {
    id: 'groundnut-oil',
    slug: 'wood-pressed-groundnut-oil',
    name: 'Wood-Pressed Groundnut Oil',
    subtitle: 'Cold Mara Chekku Peanut Oil',
    category: 'oils',
    tag: 'Best Seller',
    price: 380,
    originalPrice: 440,
    rating: 4.9,
    reviewsCount: 165,
    image: '/images/oil2.avif',
    gallery: [
      '/images/oil2.avif'
    ],
    shortDescription: 'Pressed from sun-dried organic groundnuts using the heritage wood-press method. Retains wholesome aroma, plant proteins, and authentic nutty taste.',
    description: 'Pressed from sun-dried groundnuts using the wood-press method, this oil retains its natural aroma, protein-rich content, and earthy flavor. Essential for authentic Indian cooking, rich in natural Vitamin E and heart-friendly monounsaturated fats.',
    highlights: [
      'Retains natural flavor and aroma — perfect for Indian cooking',
      'Rich in Vitamin E, plant sterols, and healthy MUFA',
      'Supports heart health and helps balance LDL cholesterol',
      'Free from chemical refining, argemone oil, or solvents'
    ],
    benefits: [
      'High smoke point ideal for deep frying, tadka, and daily curries',
      'Contains Resveratrol, a powerful cardiovascular antioxidant',
      'Unbleached natural golden hue with natural peanut fragrance',
      'Supports healthy metabolism and cellular repair'
    ],
    processMethod: 'Heritage Vaagai wood-press (Mara Chekku) churning below 40°C. Seeds are crushed slowly without friction heat, ensuring live enzymes and natural antioxidants remain intact.',
    storageInstructions: 'Keep in a cool dry pantry. Do not expose to moisture. Close lid tightly after every use.',
    shelfLife: '9 Months',
    origin: 'Karnataka, India',
    ingredients: '100% Pure Wood-Pressed Groundnut (Peanut) Oil',
    variants: [
      { size: '1000ml (1L)', price: 380, inStock: true },
      { size: '5 Litres', price: 1800, inStock: true }
    ],
    featured: true
  }
];
