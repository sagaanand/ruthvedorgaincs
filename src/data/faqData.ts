export interface FAQItem {
  id: string;
  category: 'products' | 'ordering' | 'usage';
  question: string;
  answer: string;
}

export const FAQS: FAQItem[] = [
  {
    id: 'faq-1',
    category: 'products',
    question: 'What is the Bilona method for making Ghee?',
    answer: 'The Bilona method is an ancient Vedic, slow-churning process used to make pure Desi Ghee. It involves boiling grass-fed A2 cow milk, setting it into curd overnight, and then bi-directionally hand-churning the curd using a wooden churner (Bilona) to separate butter (makkhan). This cultured butter is then gently simmered on a low flame until clear golden ghee is separated, leaving all medicinal and nutritional qualities intact.'
  },
  {
    id: 'faq-2',
    category: 'products',
    question: 'What does "cold-pressed" oil mean?',
    answer: 'Cold-pressed refers to an oil extraction method where organic seeds (such as safflower, coconut, or groundnut) are crushed and pressed at low temperatures without using chemical solvents, refining agents, or external high heat. This ensures that the natural flavor, aroma, essential fatty acids, and heat-sensitive nutrients remain preserved.'
  },
  {
    id: 'faq-3',
    category: 'products',
    question: 'Are your products 100% organic?',
    answer: 'Yes, we are deeply committed to providing products that are completely pure, chemical-free, and natural. Our ingredients are sourced directly from trusted family-run partner farms across Karnataka that practice organic, regenerative, and sustainable agriculture without chemical pesticides or fertilizers.'
  },
  {
    id: 'faq-4',
    category: 'ordering',
    question: 'What are the shipping costs and delivery times?',
    answer: 'We offer Free Shipping on all orders over ₹750 across India. For orders below ₹750, a standard shipping fee of ₹60 is applied. Deliveries within Bengaluru typically take 2-3 business days, while national deliveries to other cities take 5-7 business days with active tracking.'
  },
  {
    id: 'faq-5',
    category: 'usage',
    question: 'Can I use your Safflower Oil for skin care?',
    answer: 'Absolutely! Our cold-pressed Safflower Oil is not only extraordinary for cooking, but also celebrated in Ayurvedic skin care. It is naturally rich in linoleic acid and Vitamin E, which makes it a deeply nourishing, non-comedogenic, and light botanical moisturizer.'
  },
  {
    id: 'faq-6',
    category: 'ordering',
    question: 'What is your return policy?',
    answer: 'We stand firmly behind the purity and quality of our products. If you receive a damaged jar or are not satisfied with your purchase for any reason, please contact our customer care via WhatsApp or email (hello@ruthvedorganic.com) within 7 days of delivery, and we will arrange a replacement or refund.'
  }
];
