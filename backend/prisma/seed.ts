import { PrismaClient, UserRole, DiscountType } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting Ruthved Organic database seed...');

  // 1. Seed Roles & Users
  const passwordHash = await bcrypt.hash('Admin@123456', 10);
  const customerPasswordHash = await bcrypt.hash('Customer@123456', 10);

  const admin = await prisma.user.upsert({
    where: { email: 'admin@ruthvedorganic.com' },
    update: {},
    create: {
      email: 'admin@ruthvedorganic.com',
      name: 'Ruthved Super Admin',
      phone: '+919876543210',
      passwordHash,
      role: UserRole.SUPER_ADMIN,
      isActive: true,
      isEmailVerified: true,
      isPhoneVerified: true,
    },
  });
  console.log(`👤 Admin created: ${admin.email}`);

  const customer = await prisma.user.upsert({
    where: { email: 'customer@ruthvedorganic.com' },
    update: {},
    create: {
      email: 'customer@ruthvedorganic.com',
      name: 'Aditi Sharma',
      phone: '+919876543211',
      passwordHash: customerPasswordHash,
      role: UserRole.CUSTOMER,
      isActive: true,
      isEmailVerified: true,
      isPhoneVerified: true,
      addresses: {
        create: {
          fullName: 'Aditi Sharma',
          phone: '+919876543211',
          addressLine1: 'Flat 402, Green Meadows',
          addressLine2: 'Indiranagar 100ft Road',
          city: 'Bengaluru',
          state: 'Karnataka',
          postalCode: '560038',
          country: 'India',
          isDefault: true,
          type: 'HOME',
        },
      },
    },
  });
  console.log(`👤 Customer created: ${customer.email}`);

  // 2. Seed Categories
  const categoriesData = [
    {
      name: 'A2 Desi Cow Ghee',
      slug: 'a2-desi-cow-ghee',
      description: 'Pure Vedic Bilona method A2 Ghee made from grass-fed native Indian cows.',
      image: '/images/photoshoot/DESI GHEE - 1L front.jpg',
      displayOrder: 1,
    },
    {
      name: 'Cold-Pressed Oils',
      slug: 'cold-pressed-oils',
      description: 'Traditional wood-pressed (Mara Chekku) virgin oils extracted below 45°C.',
      image: '/images/photoshoot/COCONUT OIL - 1L front.jpg',
      displayOrder: 2,
    },
    {
      name: 'Organic Wild Honey',
      slug: 'organic-honey',
      description: 'Raw, unpasteurized, single-origin forest honey straight from tribal bee-keepers.',
      image: '/images/photoshoot/HONEY - front.jpg',
      displayOrder: 3,
    },
    {
      name: 'Traditional Wellness & Combos',
      slug: 'traditional-wellness',
      description: 'Ayurvedic herbal dhoop, native superfoods, and curated gift boxes.',
      image: '/images/photoshoot/DHOOP - front.jpg',
      displayOrder: 4,
    },
  ];

  const categoryMap = new Map<string, string>();
  for (const cat of categoriesData) {
    const created = await prisma.category.upsert({
      where: { slug: cat.slug },
      update: { name: cat.name, description: cat.description, image: cat.image },
      create: cat,
    });
    categoryMap.set(cat.slug, created.id);
  }
  console.log(`📂 ${categoryMap.size} Categories seeded`);

  // 3. Seed Products with Variants and Inventory
  const products = [
    {
      slug: 'desi-cow-ghee',
      name: 'A2 Desi Cow Ghee',
      sku: 'RUT-GHEE-001',
      categorySlug: 'a2-desi-cow-ghee',
      shortDescription: 'Made from pure A2 cow milk using the ancient Vedic Bilona method.',
      fullDescription: 'Made from A2 cow milk using the traditional Bilona method, our Desi Ghee is rich in nutrition, easy to digest, and full of flavor. Hand-churned from cultured curd (Makkhan).',
      ingredients: '100% Pure Clarified Butterfat from Cultured A2 Cow Milk',
      netWeight: '500ml',
      price: 950,
      discountedPrice: 950,
      stockQuantity: 150,
      featured: true,
      images: [
        '/images/photoshoot/DESI GHEE - 1L front.jpg',
        '/images/photoshoot/DESI GHEE - 1L right.jpg',
        '/images/photoshoot/DESI GHEE - 500ML front.jpg',
      ],
      variants: [
        { name: '250ml Glass Jar', sku: 'RUT-GHEE-250ML', price: 499, stock: 50 },
        { name: '500ml Glass Jar', sku: 'RUT-GHEE-500ML', price: 950, stock: 60 },
        { name: '1000ml (1L) Glass Jar', sku: 'RUT-GHEE-1L', price: 1850, stock: 40 },
      ],
    },
    {
      slug: 'cold-pressed-coconut-oil',
      name: 'Cold-Pressed Coconut Oil',
      sku: 'RUT-OIL-COC-001',
      categorySlug: 'cold-pressed-oils',
      shortDescription: 'Extra virgin wood-pressed coconut oil from sun-dried copra.',
      fullDescription: 'Our cold-pressed Coconut Oil is extracted without heat, preserving its nutrients. Packed with medium-chain triglycerides (MCTs) and over 50% lauric acid.',
      ingredients: '100% Pure Wood-Pressed Virgin Coconut Oil',
      netWeight: '500ml',
      price: 340,
      discountedPrice: 340,
      stockQuantity: 200,
      featured: true,
      images: [
        '/images/photoshoot/COCONUT OIL - 1L front.jpg',
        '/images/photoshoot/COCONUT OIL - 500ML front.jpg',
      ],
      variants: [
        { name: '500ml Glass Bottle', sku: 'RUT-OIL-COC-500ML', price: 340, stock: 80 },
        { name: '1000ml (1L) Glass Bottle', sku: 'RUT-OIL-COC-1L', price: 640, stock: 70 },
        { name: '5 Litres Tin', sku: 'RUT-OIL-COC-5L', price: 2950, stock: 50 },
      ],
    },
    {
      slug: 'wood-pressed-groundnut-oil',
      name: 'Wood-Pressed Groundnut Oil',
      sku: 'RUT-OIL-GND-001',
      categorySlug: 'cold-pressed-oils',
      shortDescription: 'Cold Mara Chekku Peanut Oil with high smoke point and authentic nutty aroma.',
      fullDescription: 'Pressed from farm-fresh local peanuts on traditional Vaagai wood rotaries. Unrefined, unbleached, with natural antioxidants and vitamin E intact.',
      ingredients: '100% Pure Wood-Pressed Native Groundnuts',
      netWeight: '1000ml',
      price: 360,
      discountedPrice: 360,
      stockQuantity: 180,
      featured: true,
      images: [
        '/images/photoshoot/GROUNDNUT OIL - 1L front.jpg',
        '/images/photoshoot/GROUNDNUT OIL - 500ML front.jpg',
      ],
      variants: [
        { name: '500ml Glass Bottle', sku: 'RUT-OIL-GND-500ML', price: 190, stock: 60 },
        { name: '1000ml (1L) Glass Bottle', sku: 'RUT-OIL-GND-1L', price: 360, stock: 80 },
        { name: '5 Litres Tin', sku: 'RUT-OIL-GND-5L', price: 1750, stock: 40 },
      ],
    },
    {
      slug: 'wood-pressed-sesame-oil',
      name: 'Wood-Pressed Sesame (Gingelly) Oil',
      sku: 'RUT-OIL-SES-001',
      categorySlug: 'cold-pressed-oils',
      shortDescription: 'Slow-pressed with palm jaggery for balancing natural sesame notes.',
      fullDescription: 'Authentic South Indian Gingelly oil pressed from native black sesame seeds with palm jaggery on wooden churns.',
      ingredients: 'Pure Black Sesame Seeds, Palm Jaggery',
      netWeight: '1000ml',
      price: 440,
      discountedPrice: 440,
      stockQuantity: 120,
      featured: false,
      images: ['/images/photoshoot/SESAME OIL - 1L front.jpg'],
      variants: [
        { name: '500ml Glass Bottle', sku: 'RUT-OIL-SES-500ML', price: 230, stock: 50 },
        { name: '1000ml (1L) Glass Bottle', sku: 'RUT-OIL-SES-1L', price: 440, stock: 70 },
      ],
    },
    {
      slug: 'wood-pressed-mustard-oil',
      name: 'Wood-Pressed Mustard Oil',
      sku: 'RUT-OIL-MUS-001',
      categorySlug: 'cold-pressed-oils',
      shortDescription: 'Pungent, cold-pressed golden yellow mustard oil with high natural allyl isothiocyanate.',
      fullDescription: 'Cold-pressed from small grain mustard seeds on slow wooden expellers. Delivers sharp aroma and digestive pungency for authentic pickling and Indian curries.',
      ingredients: '100% Pure Wood-Pressed Mustard Seeds',
      netWeight: '1000ml',
      price: 320,
      discountedPrice: 320,
      stockQuantity: 140,
      featured: false,
      images: ['/images/photoshoot/MUSTARD OIL - 1L front.jpg'],
      variants: [
        { name: '500ml Glass Bottle', sku: 'RUT-OIL-MUS-500ML', price: 170, stock: 60 },
        { name: '1000ml (1L) Glass Bottle', sku: 'RUT-OIL-MUS-1L', price: 320, stock: 80 },
      ],
    },
    {
      slug: 'wood-pressed-castor-oil',
      name: 'Wood-Pressed Pure Castor Oil',
      sku: 'RUT-OIL-CAS-001',
      categorySlug: 'cold-pressed-oils',
      shortDescription: 'Thick, hexane-free castor oil for hair regrowth, brows, and skin barrier nourishment.',
      fullDescription: 'Cold expeller pressed from certified organic castor seeds. Rich in ricinoleic acid for deep hair follicle stimulation and Ayurvedic castor oil packs.',
      ingredients: '100% Pure Virgin Castor Oil',
      netWeight: '500ml',
      price: 290,
      discountedPrice: 290,
      stockQuantity: 90,
      featured: false,
      images: ['/images/photoshoot/CASTOR OIL - 500ML front.jpg'],
      variants: [
        { name: '250ml Glass Bottle', sku: 'RUT-OIL-CAS-250ML', price: 160, stock: 40 },
        { name: '500ml Glass Bottle', sku: 'RUT-OIL-CAS-500ML', price: 290, stock: 50 },
      ],
    },
    {
      slug: 'wild-raw-forest-honey',
      name: 'Raw Wild Forest Honey',
      sku: 'RUT-HNY-001',
      categorySlug: 'organic-honey',
      shortDescription: 'Unfiltered, raw multifloral honey gathered from deep Nilgiri reserve forests.',
      fullDescription: 'Never boiled, ultra-filtered, or adulterated with rice syrup. Contains natural bee pollen, propolis, and live digestive enzymes.',
      ingredients: '100% Pure Raw Forest Honey',
      netWeight: '500g',
      price: 499,
      discountedPrice: 499,
      stockQuantity: 110,
      featured: true,
      images: ['/images/photoshoot/HONEY - front.jpg'],
      variants: [
        { name: '250g Jar', sku: 'RUT-HNY-250G', price: 260, stock: 40 },
        { name: '500g Jar', sku: 'RUT-HNY-500G', price: 499, stock: 70 },
      ],
    },
  ];

  for (const p of products) {
    const categoryId = categoryMap.get(p.categorySlug);
    if (!categoryId) continue;

    const product = await prisma.product.upsert({
      where: { slug: p.slug },
      update: {
        name: p.name,
        price: p.price,
        discountedPrice: p.discountedPrice,
        stockQuantity: p.stockQuantity,
        featured: p.featured,
        shortDescription: p.shortDescription,
        fullDescription: p.fullDescription,
        ingredients: p.ingredients,
        netWeight: p.netWeight,
        categoryId,
      },
      create: {
        name: p.name,
        slug: p.slug,
        sku: p.sku,
        categoryId,
        shortDescription: p.shortDescription,
        fullDescription: p.fullDescription,
        ingredients: p.ingredients,
        netWeight: p.netWeight,
        price: p.price,
        discountedPrice: p.discountedPrice,
        stockQuantity: p.stockQuantity,
        featured: p.featured,
        images: {
          create: p.images.map((img, idx) => ({
            url: img,
            altText: `${p.name} angle ${idx + 1}`,
            isPrimary: idx === 0,
            sortOrder: idx,
          })),
        },
      },
    });

    // Seed or update Inventory record
    await prisma.inventory.upsert({
      where: { productId: product.id },
      update: { currentStock: p.stockQuantity },
      create: {
        productId: product.id,
        currentStock: p.stockQuantity,
        reservedStock: 0,
        lowStockThreshold: 15,
      },
    });

    // Seed Variants
    for (const v of p.variants) {
      await prisma.productVariant.upsert({
        where: { sku: v.sku },
        update: { price: v.price, stockQuantity: v.stock },
        create: {
          productId: product.id,
          name: v.name,
          sku: v.sku,
          price: v.price,
          stockQuantity: v.stock,
        },
      });
    }
  }
  console.log(`🌾 ${products.length} Products and variants seeded with live inventory`);

  // 4. Seed Coupons
  const coupons = [
    {
      code: 'FIRST15',
      description: '15% off for first-time orders above ₹799',
      discountType: DiscountType.PERCENTAGE,
      discountValue: 15,
      minOrderAmount: 799,
      maxDiscountAmount: 300,
      usageLimit: 1000,
      perCustomerLimit: 1,
      isActive: true,
      startDate: new Date('2025-01-01'),
      endDate: new Date('2030-12-31'),
    },
    {
      code: 'RUTHVED10',
      description: '10% discount on all orders above ₹499',
      discountType: DiscountType.PERCENTAGE,
      discountValue: 10,
      minOrderAmount: 499,
      maxDiscountAmount: 200,
      usageLimit: 5000,
      perCustomerLimit: 3,
      isActive: true,
      startDate: new Date('2025-01-01'),
      endDate: new Date('2030-12-31'),
    },
    {
      code: 'FLAT100',
      description: 'Flat ₹100 instant discount on orders above ₹1200',
      discountType: DiscountType.FIXED,
      discountValue: 100,
      minOrderAmount: 1200,
      usageLimit: 2000,
      perCustomerLimit: 2,
      isActive: true,
      startDate: new Date('2025-01-01'),
      endDate: new Date('2030-12-31'),
    },
  ];

  for (const c of coupons) {
    await prisma.coupon.upsert({
      where: { code: c.code },
      update: c,
      create: c,
    });
  }
  console.log(`🎟️ ${coupons.length} Discount coupons seeded`);

  // 5. Seed Store Settings
  const defaultSettings = [
    { key: 'STORE_NAME', value: 'Ruthved Organic', description: 'Brand trading name' },
    { key: 'FREE_SHIPPING_THRESHOLD', value: '999', description: 'Subtotal required for 100% free delivery across India' },
    { key: 'STANDARD_SHIPPING_FEE', value: '79', description: 'Standard shipping charge for orders below threshold' },
    { key: 'TAX_RATE', value: '5', description: 'Applicable GST percentage for organic foods' },
    { key: 'SUPPORT_PHONE', value: '+91 98765 43210', description: 'Customer support WhatsApp / Helpline' },
    { key: 'SUPPORT_EMAIL', value: 'care@ruthvedorganic.com', description: 'Customer care email' },
  ];

  for (const s of defaultSettings) {
    await prisma.storeSetting.upsert({
      where: { key: s.key },
      update: { value: s.value, description: s.description },
      create: s,
    });
  }
  console.log(`⚙️ ${defaultSettings.length} Store settings initialized`);

  // 6. Seed FAQs
  const faqs = [
    {
      question: 'What is the Bilona method used for your A2 Desi Cow Ghee?',
      answer: 'The traditional Vedic Bilona method involves boiling grass-fed A2 cow milk, culturing it into curd overnight, two-way hand churning with wooden bilona to separate makkhan (butter), and slow-clarifying over low earthen heat.',
      category: 'Ghee',
      displayOrder: 1,
    },
    {
      question: 'Are your cold-pressed oils truly unrefined?',
      answer: 'Yes! All Ruthved Organic oils are wood-pressed on Mara Chekku machines without heat or chemical solvents. We filter them naturally through pure cotton cloth so natural nutrients and antioxidants remain intact.',
      category: 'Oils',
      displayOrder: 2,
    },
    {
      question: 'How fast is delivery?',
      answer: 'Orders are dispatched within 24 hours. Metro deliveries take 2-3 business days, and rest of India takes 4-5 business days with full online tracking.',
      category: 'Shipping',
      displayOrder: 3,
    },
  ];

  for (const f of faqs) {
    const existing = await prisma.fAQ.findFirst({ where: { question: f.question } });
    if (!existing) {
      await prisma.fAQ.create({ data: f });
    }
  }
  console.log(`❓ FAQs seeded`);

  console.log('✅ Ruthved Organic database seed completed successfully!');
}

main()
  .catch((e) => {
    console.error('❌ Error during database seed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
