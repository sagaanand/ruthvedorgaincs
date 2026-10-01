import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  ShieldCheck,
  Sparkles,
  Truck,
  Leaf,
  ChevronLeft,
  ChevronRight,
  Star
} from 'lucide-react';
import { PRODUCTS } from '../data/products';
import { TESTIMONIALS } from '../data/testimonials';
import { FAQS } from '../data/faqData';
import { ProductCard } from '../components/products/ProductCard';
import { BUSINESS_INFO } from '../data/businessInfo';

export const HomePage: React.FC = () => {
  // Hero slides data based on original Flickity carousel
  const heroSlides = [
    {
      id: 'ghee',
      title: 'A2 Desi Cow Ghee',
      tagline: 'Vedic Bilona Churned from Grass-Fed A2 Milk',
      description:
        'Made from A2 cow milk using the traditional Bilona method, our Desi Ghee is rich in nutrition, easy to digest, and full of flavor. Promotes gut health, boosts immunity, and adds a spoonful of pure goodness to your daily meals.',
      image: '/images/photoshoot/DESI GHEE - 1L front.jpg',
      link: '/shop/desi-cow-ghee',
      badge: 'Heritage Best Seller',
      price: 'Starting at ₹499'
    },
    {
      id: 'honey',
      title: 'Raw Wild Honey',
      tagline: '100% Unprocessed & Harvested from Natural Hives',
      description:
        'Sourced from natural forest hives and bottled without any additives, our honey is a powerhouse of antioxidants, minerals, and active enzymes. The perfect restorative alternative to refined sugar.',
      image: '/images/photoshoot/HONEY - 1KG back.jpg',
      link: '/shop/natural-wild-honey',
      badge: 'Pure Forest Harvest',
      price: 'Starting at ₹490'
    },
    {
      id: 'oil',
      title: 'Heritage Cold-Pressed Oils',
      tagline: 'Traditional Wood-Pressed (Mara Chekku) Extraction',
      description:
        'Traditionally cold-pressed and chemical-free Coconut, Sesame, Peanut, and Castor oils. Preserves authentic aroma, plant sterols, and natural Vitamin E for pure everyday wellbeing.',
      image: '/images/photoshoot/Four 500ML - front.jpg',
      link: '/shop?category=oils',
      badge: 'Zero Chemicals',
      price: 'Starting at ₹290'
    }
  ];

  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % heroSlides.length);
    }, 6500);
    return () => clearInterval(timer);
  }, [heroSlides.length]);

  const nextSlide = () => setCurrentSlide((currentSlide + 1) % heroSlides.length);
  const prevSlide = () => setCurrentSlide((currentSlide - 1 + heroSlides.length) % heroSlides.length);

  const featuredProducts = PRODUCTS.slice(0, 4);

  return (
    <div className="space-y-16 sm:space-y-24">
      
      {/* 1. HERO CAROUSEL SECTION */}
      <section className="relative bg-gradient-to-b from-ivory-100 via-ivory-50 to-ivory-100 overflow-hidden pt-4 pb-12 sm:pt-8 sm:pb-20 border-b border-ivory-200/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="relative min-h-[480px] sm:min-h-[540px] flex items-center">
            {heroSlides.map((slide, index) => (
              <div
                key={slide.id}
                className={`transition-all duration-700 ease-in-out w-full grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center ${
                  index === currentSlide
                    ? 'opacity-100 translate-x-0 relative z-10'
                    : 'opacity-0 absolute inset-0 pointer-events-none -translate-x-6'
                }`}
              >
                {/* Left Text */}
                <div className="lg:col-span-7 space-y-5 text-center lg:text-left">
                  <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-forest-100 border border-forest-200 text-forest-800 text-xs font-semibold uppercase tracking-wider">
                    <Sparkles className="w-3.5 h-3.5 text-gold-600" />
                    <span>{slide.badge}</span>
                    <span className="text-forest-400">•</span>
                    <span className="text-gold-700">{slide.price}</span>
                  </div>

                  <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-bold text-forest-900 leading-[1.15]">
                    {slide.title}
                  </h1>

                  <p className="text-sm sm:text-base text-gold-700 font-medium tracking-wide uppercase">
                    {slide.tagline}
                  </p>

                  <p className="text-sm sm:text-base text-forest-700/80 leading-relaxed max-w-xl mx-auto lg:mx-0">
                    {slide.description}
                  </p>

                  <div className="pt-2 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                    <Link
                      to={slide.link}
                      className="btn-primary w-full sm:w-auto text-sm px-8 py-4 shadow-premium"
                    >
                      <span>Explore Product</span>
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                    <Link
                      to="/story"
                      className="btn-outline-forest w-full sm:w-auto text-sm px-6 py-4"
                    >
                      Our Traditional Method
                    </Link>
                  </div>
                </div>

                {/* Right Image */}
                <div className="lg:col-span-5 flex justify-center">
                  <div className="relative w-64 h-64 sm:w-80 sm:h-80 lg:w-96 lg:h-96">
                    {/* Decorative Ring Background */}
                    <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-gold-200/50 to-forest-100/60 blur-xl transform scale-110" />
                    <div className="relative w-full h-full rounded-3xl bg-white/70 backdrop-blur-xs border border-ivory-200/80 p-6 shadow-premium flex items-center justify-center">
                      <img
                        src={slide.image}
                        alt={slide.title}
                        className="w-full h-full object-contain filter drop-shadow-lg transform hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Carousel Controls */}
          <div className="flex items-center justify-between pt-8 border-t border-ivory-200/80 mt-6">
            {/* Dots */}
            <div className="flex items-center gap-2">
              {heroSlides.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentSlide(i)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    i === currentSlide ? 'w-8 bg-forest-800' : 'w-2 bg-ivory-300 hover:bg-forest-400'
                  }`}
                  aria-label={`Go to slide ${i + 1}`}
                />
              ))}
            </div>

            {/* Arrows */}
            <div className="flex items-center gap-2">
              <button
                onClick={prevSlide}
                className="p-2 rounded-full bg-white border border-ivory-300 text-forest-700 hover:bg-forest-800 hover:text-white transition-colors shadow-xs"
                aria-label="Previous slide"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={nextSlide}
                className="p-2 rounded-full bg-white border border-ivory-300 text-forest-700 hover:bg-forest-800 hover:text-white transition-colors shadow-xs"
                aria-label="Next slide"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>

        </div>
      </section>

      {/* 2. TRUST PILLARS BAR */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6">
        <div className="bg-white rounded-2xl shadow-soft border border-ivory-200 p-6 sm:p-8 grid grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="flex items-start gap-3.5">
            <div className="p-2.5 rounded-xl bg-forest-50 text-forest-800">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-serif font-bold text-sm text-forest-900">Vedic Bilona Method</h4>
              <p className="text-xs text-forest-600 mt-0.5">Hand-churned from A2 cultured curd</p>
            </div>
          </div>

          <div className="flex items-start gap-3.5">
            <div className="p-2.5 rounded-xl bg-forest-50 text-forest-800">
              <Leaf className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-serif font-bold text-sm text-forest-900">Wood-Pressed Oils</h4>
              <p className="text-xs text-forest-600 mt-0.5">Cold Mara Chekku below 40°C</p>
            </div>
          </div>

          <div className="flex items-start gap-3.5">
            <div className="p-2.5 rounded-xl bg-forest-50 text-forest-800">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-serif font-bold text-sm text-forest-900">Zero Chemicals</h4>
              <p className="text-xs text-forest-600 mt-0.5">No solvents, additives, or bleaches</p>
            </div>
          </div>

          <div className="flex items-start gap-3.5">
            <div className="p-2.5 rounded-xl bg-forest-50 text-forest-800">
              <Truck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-serif font-bold text-sm text-forest-900">Free Shipping</h4>
              <p className="text-xs text-forest-600 mt-0.5">All orders over ₹750 across India</p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. PRODUCT CATEGORIES SHOWCASE */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-gold-600 uppercase tracking-widest text-xs font-semibold">Our Farm Offerings</span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-forest-900 mt-1">
            Pure Traditional Harvests
          </h2>
          <p className="text-forest-600 text-sm mt-2">
            Every product is handcrafted using centuries-old Indian practices to protect vital nutrients and pure taste.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Category 1: Ghee */}
          <div className="group relative bg-white rounded-2xl p-6 border border-ivory-200/90 shadow-soft hover:shadow-premium transition-all overflow-hidden flex flex-col justify-between">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-gold-600">A2 Vedic Dairy</span>
              <h3 className="font-serif text-xl font-bold text-forest-900 mt-1">Desi Cow Ghee</h3>
              <p className="text-xs text-forest-600 mt-1.5 leading-relaxed">
                Hand-churned from cultured A2 curd using wooden bilona. Golden, granular, and deeply aromatic.
              </p>
            </div>
            <div className="my-5 h-44 flex items-center justify-center">
              <img
                src="/images/photoshoot/DESI GHEE - 500ML front.jpg"
                alt="A2 Desi Cow Ghee"
                className="max-h-full object-contain group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <Link
              to="/shop/desi-cow-ghee"
              className="inline-flex items-center justify-between text-xs font-bold uppercase tracking-wider text-forest-800 hover:text-gold-600 pt-3 border-t border-ivory-200 transition-colors"
            >
              <span>Explore Ghee</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Category 2: Cold-Pressed Oils */}
          <div className="group relative bg-white rounded-2xl p-6 border border-ivory-200/90 shadow-soft hover:shadow-premium transition-all overflow-hidden flex flex-col justify-between">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-gold-600">Mara Chekku</span>
              <h3 className="font-serif text-xl font-bold text-forest-900 mt-1">Cold-Pressed Oils</h3>
              <p className="text-xs text-forest-600 mt-1.5 leading-relaxed">
                Coconut, Sesame, Castor & Peanut oils. Extracted slowly without friction heat or chemical solvents.
              </p>
            </div>
            <div className="my-5 h-44 flex items-center justify-center">
              <img
                src="/images/photoshoot/COCONUT OIL - 1L front.jpg"
                alt="Cold-Pressed Oils"
                className="max-h-full object-contain group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <Link
              to="/shop?category=oils"
              className="inline-flex items-center justify-between text-xs font-bold uppercase tracking-wider text-forest-800 hover:text-gold-600 pt-3 border-t border-ivory-200 transition-colors"
            >
              <span>View All Oils</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Category 3: Raw Wild Honey */}
          <div className="group relative bg-white rounded-2xl p-6 border border-ivory-200/90 shadow-soft hover:shadow-premium transition-all overflow-hidden flex flex-col justify-between">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-gold-600">Wild Apiary</span>
              <h3 className="font-serif text-xl font-bold text-forest-900 mt-1">Natural Wild Honey</h3>
              <p className="text-xs text-forest-600 mt-1.5 leading-relaxed">
                Cruelty-free forest harvested, completely unheated and raw with intact bio-enzymes and pollen.
              </p>
            </div>
            <div className="my-5 h-44 flex items-center justify-center">
              <img
                src="/images/photoshoot/HONEY - 1KG back.jpg"
                alt="Natural Wild Honey"
                className="max-h-full object-contain group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <Link
              to="/shop/natural-wild-honey"
              className="inline-flex items-center justify-between text-xs font-bold uppercase tracking-wider text-forest-800 hover:text-gold-600 pt-3 border-t border-ivory-200 transition-colors"
            >
              <span>Explore Honey</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Category 4: Herbal Dhoop & Combos */}
          <div className="group relative bg-white rounded-2xl p-6 border border-ivory-200/90 shadow-soft hover:shadow-premium transition-all overflow-hidden flex flex-col justify-between">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-gold-600">Sacred Wellness</span>
              <h3 className="font-serif text-xl font-bold text-forest-900 mt-1">Herbal Dhoop & Sets</h3>
              <p className="text-xs text-forest-600 mt-1.5 leading-relaxed">
                100% charcoal-free cow dung dhoop sticks and specially curated multi-oil kitchen hampers.
              </p>
            </div>
            <div className="my-5 h-44 flex items-center justify-center">
              <img
                src="/images/photoshoot/DHOOP STICKS - front.jpg"
                alt="Herbal Dhoop Sticks"
                className="max-h-full object-contain group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <Link
              to="/shop?category=wellness"
              className="inline-flex items-center justify-between text-xs font-bold uppercase tracking-wider text-forest-800 hover:text-gold-600 pt-3 border-t border-ivory-200 transition-colors"
            >
              <span>Explore Wellness</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* 4. FEATURED PRODUCTS CATALOG */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-10 pb-4 border-b border-ivory-200">
          <div>
            <span className="text-gold-600 uppercase tracking-widest text-xs font-semibold">Store Catalog</span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-forest-900">
              Our Bestselling Staples
            </h2>
          </div>
          <Link
            to="/shop"
            className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-forest-800 hover:text-gold-600 transition-colors"
          >
            <span>View All Products</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* 5. EDITORIAL ABOUT US / WHY RUTHVED */}
      <section className="bg-forest-900 text-ivory-100 py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            <div className="lg:col-span-6 space-y-6">
              <span className="text-gold-400 text-xs uppercase tracking-widest font-semibold">
                Trust in Nature’s Best Since 2010
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight">
                About Ruthved Organic
              </h2>
              <p className="text-forest-200/90 text-sm sm:text-base leading-relaxed">
                At Ruthved Organic, we believe the purest solutions for a healthy life come from our roots — in nature, in tradition, and in the love with which we prepare our products.
              </p>
              <p className="text-forest-200/90 text-sm sm:text-base leading-relaxed">
                Every jar of Desi Ghee and every drop of cold-pressed oil is a tribute to the wisdom passed down through generations. Using age-old, traditional methods like the Bilona technique and wood-pressed oil extraction, we ensure that what reaches your home is untouched by chemicals and full of nature’s original goodness.
              </p>

              <div className="pt-2 grid grid-cols-2 gap-4 border-t border-forest-800">
                <div>
                  <span className="font-serif text-3xl font-bold text-gold-400">50,000+</span>
                  <p className="text-xs text-forest-300 mt-1">Families Nourished</p>
                </div>
                <div>
                  <span className="font-serif text-3xl font-bold text-gold-400">100%</span>
                  <p className="text-xs text-forest-300 mt-1">Chemical-Free Pure</p>
                </div>
              </div>

              <div className="pt-4">
                <Link to="/story" className="btn-gold text-xs py-3.5 px-8">
                  <span>Read Our Complete Journey</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            <div className="lg:col-span-6">
              <div className="relative rounded-3xl overflow-hidden shadow-elevated border border-forest-800 bg-forest-950 p-4">
                <img
                  src="/images/DESI COW GHEE (6).avif"
                  alt="Ruthved Organic Traditional Heritage"
                  className="w-full h-auto max-h-[460px] object-cover rounded-2xl"
                />
                <div className="absolute bottom-8 left-8 right-8 bg-forest-900/90 backdrop-blur-md p-4 rounded-xl border border-forest-700 text-xs text-forest-200">
                  <p className="font-serif font-bold text-white text-sm">
                    The Vedic Bilona Difference
                  </p>
                  <p className="mt-0.5 text-forest-300">
                    Hand-churned clockwise & counter-clockwise using sacred wood churners to honor ancient Ayurvedic traditions.
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 6. VERIFIED CUSTOMER TESTIMONIALS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-gold-600 uppercase tracking-widest text-xs font-semibold">Real Feedback</span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-forest-900 mt-1">
            Customer Testimonials
          </h2>
          <p className="text-forest-600 text-sm mt-2">
            What our everyday patrons and chefs say about our purity and authentic taste.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {TESTIMONIALS.map(t => (
            <div
              key={t.id}
              className="bg-white rounded-2xl p-6 sm:p-8 border border-ivory-200/90 shadow-soft flex flex-col justify-between relative"
            >
              <div>
                <div className="flex items-center gap-1 text-amber-500 mb-4">
                  {[...Array(t.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>
                <p className="text-forest-800 text-sm leading-relaxed italic">
                  "{t.quote}"
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-ivory-200 flex items-center justify-between">
                <div>
                  <h4 className="font-serif font-bold text-forest-900 text-sm">{t.name}</h4>
                  <span className="text-xs text-forest-500">{t.role}</span>
                </div>
                <span className="text-[11px] font-semibold text-gold-700 bg-gold-50 px-2 py-1 rounded-md border border-gold-200">
                  {t.product}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 7. VERIFIED PROMOTIONAL BANNER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-forest-800 via-forest-900 to-forest-800 rounded-3xl p-8 sm:p-12 text-white shadow-elevated border border-forest-700 relative overflow-hidden">
          <div className="relative z-10 max-w-2xl space-y-4">
            <span className="badge-tag bg-gold-500 text-forest-950 font-bold">
              Special Welcome Gift
            </span>
            <h3 className="font-serif text-3xl sm:text-4xl font-bold leading-tight">
              Enjoy 15% Off Your First Order + Free Shipping Above ₹750
            </h3>
            <p className="text-forest-200 text-sm leading-relaxed">
              Use code <strong className="font-mono bg-forest-950/80 px-2.5 py-1 rounded text-gold-300 border border-gold-400/40">FIRST15</strong> at checkout to taste the true difference of traditional, chemical-free nutrition.
            </p>
            <div className="pt-2 flex flex-wrap gap-4">
              <Link to="/shop" className="btn-gold text-xs py-3.5 px-8">
                Shop Organic Now
              </Link>
              <a
                href={BUSINESS_INFO.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-outline-white text-xs py-3.5 px-6"
              >
                Inquire on WhatsApp
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 8. FAQ PREVIEW */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <span className="text-gold-600 uppercase tracking-widest text-xs font-semibold">Have Questions?</span>
          <h2 className="font-serif text-3xl font-bold text-forest-900 mt-1">
            Frequently Asked Questions
          </h2>
          <p className="text-forest-600 text-sm mt-2">
            Clear answers regarding our traditional Bilona method, cold-pressing, and doorstep delivery.
          </p>
        </div>

        <div className="space-y-4">
          {FAQS.slice(0, 3).map(faq => (
            <div
              key={faq.id}
              className="bg-white rounded-xl p-5 border border-ivory-200/90 shadow-soft"
            >
              <h4 className="font-serif font-bold text-forest-900 text-base mb-2">
                {faq.question}
              </h4>
              <p className="text-xs sm:text-sm text-forest-700 leading-relaxed">
                {faq.answer}
              </p>
            </div>
          ))}
        </div>

        <div className="text-center mt-8">
          <Link
            to="/faq"
            className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-forest-800 hover:text-gold-600 transition-colors"
          >
            <span>View All FAQs & Delivery Policies</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

    </div>
  );
};
