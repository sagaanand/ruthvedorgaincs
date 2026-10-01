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
    image: '/images/photoshoot/DESI GHEE - 1L front.jpg',
    gallery: [
      '/images/photoshoot/DESI GHEE - 1L front.jpg',
      '/images/photoshoot/DESI GHEE - 1L right.jpg',
      '/images/photoshoot/DESI GHEE - 1L back.jpg',
      '/images/photoshoot/DESI GHEE - 1L left.jpg',
      '/images/photoshoot/DESI GHEE - 500ML front.jpg',
      '/images/photoshoot/DESI GHEE - 250ML front.jpg',
      '/images/DESI COW GHEE (6).avif'
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
      { size: '250ml', price: 499, inStock: true },
      { size: '500ml', price: 950, inStock: true },
      { size: '1000ml (1L)', price: 1850, inStock: true }
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
    image: '/images/photoshoot/COCONUT OIL - 1L front.jpg',
    gallery: [
      '/images/photoshoot/COCONUT OIL - 1L front.jpg',
      '/images/photoshoot/COCONUT OIL - 1L back.jpg',
      '/images/photoshoot/COCONUT OIL - 500ML front.jpg',
      '/images/photoshoot/COCONUT OIL - 5L front.jpg'
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
      { size: '1000ml (1L)', price: 640, inStock: true },
      { size: '5 Litres', price: 2950, inStock: true }
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
    image: '/images/photoshoot/GROUNDNUT OIL - 1L front.jpg',
    gallery: [
      '/images/photoshoot/GROUNDNUT OIL - 1L front.jpg',
      '/images/photoshoot/GROUNDNUT OIL - 1L back.jpg',
      '/images/photoshoot/GROUNDNUT OIL - 5L front.jpg'
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
  },
  {
    id: 'black-sesame-oil',
    slug: 'cold-pressed-black-sesame-oil',
    name: 'Cold-Pressed Black Sesame Oil',
    subtitle: 'Pure Gingelly Oil • Heritage Mara Chekku',
    category: 'oils',
    tag: 'New',
    price: 540,
    originalPrice: 620,
    rating: 4.8,
    reviewsCount: 64,
    image: '/images/photoshoot/BLACK SESAME OIL- 1L front.jpg',
    gallery: [
      '/images/photoshoot/BLACK SESAME OIL- 1L front.jpg',
      '/images/photoshoot/BLACK SESAME OIL- 1L back.jpg',
      '/images/photoshoot/BLACK SESAME OIL- 5L front.jpg'
    ],
    shortDescription: 'Extracted from premium black sesame seeds. Revered in Ayurveda as the "King of Oils" for culinary richness, bone density, and restorative body massage.',
    description: 'Traditionally cold-pressed from black sesame seeds without chemical heat. Packed with sesamol, natural calcium, zinc, and healthy unsaturated fatty acids for radiant health.',
    highlights: [
      'Rich in rare antioxidants (Sesamol & Sesamolin) — strengthens bone density',
      'Warm Ayurvedic potency, ideal for traditional South Indian cuisines & abhyanga',
      'Zero chemical bleaches, trans-fats, or solvent extractions',
      'Unadulterated deep nutty aroma and authentic rich amber hue'
    ],
    benefits: [
      'Promotes blood circulation and healthy arterial function',
      'Nourishes dry skin and strengthens muscular tissues',
      'Superior smoke point suitable for authentic spice seasoning'
    ],
    processMethod: 'Pressed in heavy Mara Chekku wood mortars with a hint of natural palm jaggery to absorb residual bitterness without adding sweetness, as practiced in Tamil and Kannada heritage traditions.',
    storageInstructions: 'Store in an amber bottle in a cool, dark cabinet away from direct stove heat.',
    shelfLife: '12 Months',
    origin: 'Karnataka Farming Belts',
    ingredients: '100% Pure Cold-Pressed Black Sesame (Gingelly) Seed Oil',
    variants: [
      { size: '1000ml (1L)', price: 540, inStock: true },
      { size: '5 Litres', price: 2550, inStock: true }
    ],
    featured: true
  },
  {
    id: 'castor-oil',
    slug: 'cold-pressed-castor-oil',
    name: 'Cold-Pressed Pure Castor Oil',
    subtitle: 'Pure Ricinoleic Elixir for Hair & Skin Therapy',
    category: 'oils',
    tag: 'New',
    price: 290,
    originalPrice: 340,
    rating: 4.9,
    reviewsCount: 88,
    image: '/images/photoshoot/CASTOR OIL - 1L front.jpg',
    gallery: [
      '/images/photoshoot/CASTOR OIL - 1L front.jpg',
      '/images/photoshoot/CASTOR OIL - 1L back.jpg',
      '/images/photoshoot/CASTOR OIL - 500ML front.jpg',
      '/images/photoshoot/CASTOR OIL - 500ML side.jpg'
    ],
    shortDescription: 'Unrefined, hexane-free cold-pressed castor oil. High in Ricinoleic Acid (90%) for dense hair regrowth, eyelash thickening, joint relief, and scalp nourishment.',
    description: 'Extracted at low temperatures from premium certified castor seeds. Thick, viscous, and deeply moisturizing without any artificial additives or hexane processing.',
    highlights: [
      'Contains 90% Ricinoleic Acid for exceptional hair root reinforcement',
      'Promotes eyebrow and eyelash volume naturally',
      'Traditional remedy for cracked heels, stretch marks, and dry cuticles',
      '100% pure, unrefined, and chemical-free'
    ],
    benefits: [
      'Locks deep moisture into dry hair strands and split ends',
      'Soothes inflamed skin patches with natural antimicrobial properties',
      'Used for classical Ayurvedic warm abdominal packs (Castor Oil Packs)'
    ],
    processMethod: 'Cold expeller pressing of raw castor beans without bleaching or hexane deodorization, preserving its therapeutic density and lipid chain.',
    storageInstructions: 'Store tightly capped at room temperature. For topical use, warm slightly before massaging into scalp or skin.',
    shelfLife: '24 Months',
    origin: 'Karnataka, India',
    ingredients: '100% Pure Cold-Pressed Ricinus Communis (Castor) Seed Oil',
    variants: [
      { size: '500ml', price: 290, inStock: true },
      { size: '1000ml (1L)', price: 520, inStock: true }
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
    featured: false
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
    image: '/images/photoshoot/HONEY - 1KG back.jpg',
    gallery: [
      '/images/photoshoot/HONEY - 1KG back.jpg',
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
    id: 'organic-dhoop-sticks',
    slug: 'traditional-herbal-dhoop-sticks',
    name: 'Natural Herbal Dhoop Sticks',
    subtitle: 'Charcoal-Free Sacred Cow Dung & Ayurvedic Herbs',
    category: 'wellness',
    tag: 'Best Seller',
    price: 240,
    originalPrice: 280,
    rating: 4.9,
    reviewsCount: 135,
    image: '/images/photoshoot/DHOOP STICKS - front.jpg',
    gallery: [
      '/images/photoshoot/DHOOP STICKS - front.jpg',
      '/images/photoshoot/DHOOP STICKS - open.jpg',
      '/images/photoshoot/DHOOP STICKS - open 2.jpg',
      '/images/photoshoot/DHOOP STICKS - open 3.jpg',
      '/images/photoshoot/DHOOP STICKS - back.jpg'
    ],
    shortDescription: 'Crafted using indigenous cow dung, pure cow ghee, camphor, and 14 sacred Ayurvedic herbs. Purifies household air and creates a serene spiritual environment.',
    description: 'Every dhoop stick we craft is a tribute to ancient Vedic wisdom. Handcrafted without harmful charcoal, artificial chemical fragrances, or toxic burning agents. Releases soothing medicinal smoke that cleanses negative energy and brings temple-like calm.',
    highlights: [
      '100% Charcoal-Free & Sulfur-Free — zero toxic black soot',
      'Made with Desi Cow Dung, Ghee, Guggal, Loban, and Ayurvedic botanicals',
      'Purifies atmospheric air and repels seasonal insects naturally',
      'Slow burning with a gentle, long-lasting natural temple aroma'
    ],
    benefits: [
      'Enhances meditation, yoga, and prayer concentration',
      'Gentle on lungs, non-irritating to sensitive nasal passages',
      'Eco-friendly, biodegradable sacred ash useful as organic plant fertilizer'
    ],
    processMethod: 'Desi cow dung is sun-dried, powdered, and hand-blended with Bilona ghee, natural tree resins, and aromatic botanicals before being rolled and cure-dried naturally in the shade.',
    storageInstructions: 'Store in an airtight box away from moisture to retain freshness and aromatic potency.',
    shelfLife: '24 Months',
    origin: 'Bengaluru, Karnataka',
    ingredients: 'Desi Cow Dung, Desi Ghee, Guggal, Loban, Camphor, Haldi, Natural Resins & Sacred Herbs',
    variants: [
      { size: 'Standard Box (30 Sticks)', price: 240, inStock: true },
      { size: 'Pooja Value Pack (3 Boxes)', price: 650, inStock: true }
    ],
    featured: true
  },
  {
    id: 'four-oils-combo',
    slug: 'four-500ml-wellness-oil-pack',
    name: 'Four 500ML Wellness Oil Pack',
    subtitle: 'Essential Heritage Cooking & Therapy Bundle',
    category: 'combos',
    tag: 'Best Seller',
    price: 1490,
    originalPrice: 1650,
    rating: 5.0,
    reviewsCount: 42,
    image: '/images/photoshoot/Four 500ML - front.jpg',
    gallery: [
      '/images/photoshoot/Four 500ML - front.jpg',
      '/images/photoshoot/Four 500ML - front 2.jpg',
      '/images/photoshoot/Four 500ML - back.jpg'
    ],
    shortDescription: 'A curated 4-bottle collection of cold-pressed staples: Coconut Oil, Groundnut Oil, Black Sesame Oil, and Castor Oil in convenient 500ml glass bottles.',
    description: 'Elevate your home cooking and personal care with this complete multi-oil wellness set. Provides the full spectrum of heart-healthy cooking fats and traditional topical elixirs at special savings.',
    highlights: [
      'Includes 4 cold-pressed staples: Coconut (500ml), Groundnut (500ml), Sesame (500ml), Castor (500ml)',
      'Save over 10% compared to purchasing individual bottles',
      'Premium gifting-ready protective packaging',
      '100% Wood-Pressed (Mara Chekku) purity guaranteed'
    ],
    benefits: [
      'Complete culinary variety for frying, seasoning, and baking',
      'Includes therapeutic Castor and Sesame for personal care rituals',
      'Great introduction to unrefined, chemical-free living'
    ],
    processMethod: 'Traditional Vaagai wood-press and cold expeller extractions preserved under 40°C in certified hygienic conditions.',
    storageInstructions: 'Store in pantry away from heat.',
    shelfLife: '9 Months',
    origin: 'Karnataka, India',
    ingredients: 'Virgin Coconut Oil, Groundnut Oil, Black Sesame Oil, Pure Castor Oil',
    variants: [
      { size: '4 x 500ML Combo Set', price: 1490, inStock: true }
    ],
    featured: true
  },
  {
    id: 'five-in-one-hamper',
    slug: 'five-in-one-heritage-hamper',
    name: '5-in-One Heritage Organic Hamper',
    subtitle: 'Grand Master Collection: Ghee, Oils & Dhoop',
    category: 'combos',
    tag: 'Limited',
    price: 2490,
    originalPrice: 2850,
    rating: 5.0,
    reviewsCount: 56,
    image: '/images/photoshoot/5 in one front.jpg',
    gallery: [
      '/images/photoshoot/5 in one front.jpg',
      '/images/photoshoot/5 in one back.jpg'
    ],
    shortDescription: 'The ultimate Vedic wellness hamper: A2 Desi Cow Ghee, Coconut Oil, Groundnut Oil, Wild Honey, and Herbal Dhoop Sticks in an artisanal gift box.',
    description: 'Experience the full heritage of Ruthved Organic in one majestic hamper. Perfect for festive gifting, housewarming blessings, or stocking a truly chemical-free kitchen.',
    highlights: [
      'Complete set: Desi Ghee (500ml), Coconut Oil (500ml), Groundnut Oil (500ml), Honey (500g), Herbal Dhoop Box',
      'Special promotional price with free pan-India shipping',
      'Handcrafted with Vedic rituals and authentic village wisdom',
      'Packaged in an elegant, eco-friendly heritage presentation box'
    ],
    benefits: [
      'All daily kitchen and spiritual essentials in a single curated set',
      'Unsurpassed purity from our native Karnataka partner farms',
      'Delivered securely nationwide in protective eco-cushioning'
    ],
    processMethod: 'Artisanal traditional preparation across our Bilona dairy, wood-press facilities, and sacred herbal workshops.',
    storageInstructions: 'Store individual jars according to their respective guidelines.',
    shelfLife: '12 Months',
    origin: 'Bengaluru, Karnataka, India',
    ingredients: 'A2 Desi Cow Ghee, Cold-Pressed Coconut Oil, Groundnut Oil, Raw Honey, Herbal Dhoop',
    variants: [
      { size: 'Complete 5-Piece Hamper', price: 2490, inStock: true }
    ],
    featured: true
  }
];
