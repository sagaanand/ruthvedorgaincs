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
        'Made from pure A2 cow milk using the ancient wooden Bilona method. Slow-churned from cultured curd, rich in gut-nourishing butyric acid, natural golden aroma, and granular texture.',
      image: '/images/photoshoot/DESI GHEE - 1L front.jpg',
      link: '/shop/desi-cow-ghee',
      badge: 'Heritage Best Seller',
      price: 'Starting at ₹499'
    },
    {
      id: 'honey',
      title: 'Raw Wild Honey',
      tagline: '100% Unprocessed & Harvested from Natural Forest Hives',
      description:
        'Sourced ethically from wild forest apiaries and bottled unheated without any sugar syrup or additives. A living powerhouse of antioxidants, natural pollen, and active digestive enzymes.',
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
        'Traditionally wood-pressed Coconut, Sesame, Peanut, and Castor oils below 40°C. Zero chemical refining, retaining natural plant sterols, natural Vitamin E, and authentic nutty aroma.',
      image: '/images/photoshoot/Four 500ML - front.jpg',
      link: '/shop?category=oils',
      badge: 'Zero Solvents • 100% Virgin',
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
      
      {/* 1. HERO CAROUSEL SECTION WITH LOGO ACCENTS */}
      <section className="relative overflow-hidden pt-4 pb-14 sm:pt-8 sm:pb-20 border-b border-ivory-200/70 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-saffron-100/40 via-leaf-50/25 to-ivory-50">
        
        {/* Soft Ambient Brand Blobs */}
        <div className="absolute top-10 left-1/4 w-96 h-96 bg-saffron-200/30 rounded-full blur-3xl pointer-events-none -z-10" />
        <div className="absolute top-20 right-1/4 w-96 h-96 bg-leaf-200/25 rounded-full blur-3xl pointer-events-none -z-10" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="relative min-h-[500px] sm:min-h-[540px] flex items-center">
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
                  
                  {/* Brand Tag Pill */}
                  <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/90 backdrop-blur-xs border border-saffron-200 shadow-xs text-xs font-bold uppercase tracking-wider">
                    <Sparkles className="w-3.5 h-3.5 text-saffron-500 fill-saffron-500" />
                    <span className="text-forest-900">{slide.badge}</span>
                    <span className="text-saffron-300">•</span>
                    <span className="text-saffron-600 font-extrabold">{slide.price}</span>
                  </div>

                  <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-bold text-forest-950 leading-[1.14] tracking-tight">
                    {slide.title}
                  </h1>

                  <p className="text-xs sm:text-sm text-leaf-700 font-bold uppercase tracking-widest flex items-center justify-center lg:justify-start gap-1.5">
                    <Leaf className="w-4 h-4 text-leaf-600 inline" />
                    <span>{slide.tagline}</span>
                  </p>

                  <p className="text-sm sm:text-base text-forest-700/90 leading-relaxed max-w-xl mx-auto lg:mx-0">
                    {slide.description}
                  </p>

                  <div className="pt-2 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                    <Link
                      to={slide.link}
                      className="btn-saffron w-full sm:w-auto text-sm px-8 py-4 shadow-glow-orange flex items-center justify-center gap-2 group"
                    >
                      <span>Explore Product</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                    <Link
                      to="/story"
                      className="w-full sm:w-auto text-sm px-7 py-4 rounded-full border-2 border-forest-800/20 text-forest-900 hover:bg-forest-900 hover:text-white font-bold transition-all text-center"
                    >
                      Our Traditional Method
                    </Link>
                  </div>
                </div>

                {/* Right Image */}
                <div className="lg:col-span-5 flex justify-center">
                  <div className="relative w-72 h-72 sm:w-88 sm:h-88 lg:w-[420px] lg:h-[420px]">
                    {/* Glowing Sun/Leaf Gradient Behind Bottle */}
                    <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-saffron-300/40 via-gold-200/40 to-leaf-300/30 blur-2xl transform scale-110" />
                    <div className="relative w-full h-full rounded-3xl bg-white/85 backdrop-blur-md border border-white/90 p-8 shadow-premium flex items-center justify-center group">
                      <img
                        src={slide.image}
                        alt={slide.title}
                        className="w-full h-full object-contain filter drop-shadow-xl transform group-hover:scale-105 transition-transform duration-500"
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
                  className={`h-2.5 rounded-full transition-all duration-300 ${
                    i === currentSlide ? 'w-9 bg-saffron-500 shadow-xs' : 'w-2.5 bg-ivory-300 hover:bg-saffron-300'
                  }`}
                  aria-label={`Go to slide ${i + 1}`}
                />
              ))}
            </div>

            {/* Arrows */}
            <div className="flex items-center gap-2">
              <button
                onClick={prevSlide}
                className="p-2.5 rounded-full bg-white border border-ivory-300 text-forest-700 hover:bg-saffron-500 hover:text-white hover:border-saffron-500 transition-all shadow-xs"
                aria-label="Previous slide"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={nextSlide}
                className="p-2.5 rounded-full bg-white border border-ivory-300 text-forest-700 hover:bg-saffron-500 hover:text-white hover:border-saffron-500 transition-all shadow-xs"
                aria-label="Next slide"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

        </div>
      </section>

      {/* 2. TRUST PILLARS (Clean, Color-Coded, No Clumsy Box Borders) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 sm:-mt-10 relative z-20">
        <div className="bg-white rounded-2xl shadow-premium border border-ivory-200/90 p-6 sm:p-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          
          <div className="flex items-start gap-4">
            <div className="p-3 rounded-xl bg-saffron-50 text-saffron-600 border border-saffron-100 flex-shrink-0">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-serif font-bold text-sm text-forest-950">Vedic Bilona Method</h4>
              <p className="text-xs text-forest-600 mt-1 leading-relaxed">Hand-churned from cultured A2 curd with sacred wooden churners.</p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="p-3 rounded-xl bg-leaf-50 text-leaf-600 border border-leaf-100 flex-shrink-0">
              <Leaf className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-serif font-bold text-sm text-forest-950">Wood-Pressed Oils</h4>
              <p className="text-xs text-forest-600 mt-1 leading-relaxed">Slow Mara Chekku extraction under 40°C to preserve natural vitamins.</p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="p-3 rounded-xl bg-gold-50 text-gold-600 border border-gold-100 flex-shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-serif font-bold text-sm text-forest-950">Zero Chemicals</h4>
              <p className="text-xs text-forest-600 mt-1 leading-relaxed">No paraffin, chemical solvents, preservatives, or artificial aroma.</p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="p-3 rounded-xl bg-forest-50 text-forest-800 border border-forest-100 flex-shrink-0">
              <Truck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-serif font-bold text-sm text-forest-950">Free Express Shipping</h4>
              <p className="text-xs text-forest-600 mt-1 leading-relaxed">Safe eco-glass packaging delivered free across India on orders &gt; ₹750.</p>
            </div>
          </div>

        </div>
      </section>

      {/* 3. PRODUCT CATEGORIES SHOWCASE WITH BRAND COLOR ACCENTS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-saffron-600 uppercase tracking-widest text-xs font-bold">
            Authentic Farm Offerings
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-forest-950 mt-1.5">
            Pure Traditional Harvests
          </h2>
          <p className="text-forest-600 text-sm mt-2 leading-relaxed">
            Every product is handcrafted using centuries-old Indian practices to protect vital nutrients and pure taste.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Category 1: Ghee (Saffron Theme) */}
          <div className="group relative bg-white rounded-2xl p-6 border border-ivory-200 shadow-soft hover:shadow-premium hover:-translate-y-1 transition-all duration-300 overflow-hidden flex flex-col justify-between">
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-saffron-400 to-saffron-600" />
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-saffron-600">A2 Vedic Dairy</span>
              <h3 className="font-serif text-xl font-bold text-forest-950 mt-1">Desi Cow Ghee</h3>
              <p className="text-xs text-forest-600 mt-1.5 leading-relaxed">
                Hand-churned from cultured A2 curd using wooden bilona. Golden, granular, and deeply aromatic.
              </p>
            </div>
            <div className="my-5 h-44 flex items-center justify-center">
              <img
                src="/images/photoshoot/DESI GHEE - 500ML front.jpg"
                alt="A2 Desi Cow Ghee"
                className="max-h-full object-contain group-hover:scale-105 transition-transform duration-300 drop-shadow-sm"
              />
            </div>
            <Link
              to="/shop/desi-cow-ghee"
              className="inline-flex items-center justify-between text-xs font-bold uppercase tracking-wider text-forest-900 group-hover:text-saffron-600 pt-3 border-t border-ivory-200 transition-colors"
            >
              <span>Explore Ghee</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          {/* Category 2: Cold-Pressed Oils (Leaf Green Theme) */}
          <div className="group relative bg-white rounded-2xl p-6 border border-ivory-200 shadow-soft hover:shadow-premium hover:-translate-y-1 transition-all duration-300 overflow-hidden flex flex-col justify-between">
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-leaf-400 to-leaf-600" />
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-leaf-600">Mara Chekku</span>
              <h3 className="font-serif text-xl font-bold text-forest-950 mt-1">Cold-Pressed Oils</h3>
              <p className="text-xs text-forest-600 mt-1.5 leading-relaxed">
                Coconut, Sesame, Castor & Peanut oils. Extracted slowly without friction heat or chemical solvents.
              </p>
            </div>
            <div className="my-5 h-44 flex items-center justify-center">
              <img
                src="/images/photoshoot/COCONUT OIL - 1L front.jpg"
                alt="Cold-Pressed Oils"
                className="max-h-full object-contain group-hover:scale-105 transition-transform duration-300 drop-shadow-sm"
              />
            </div>
            <Link
              to="/shop?category=oils"
              className="inline-flex items-center justify-between text-xs font-bold uppercase tracking-wider text-forest-900 group-hover:text-leaf-600 pt-3 border-t border-ivory-200 transition-colors"
            >
              <span>View All Oils</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          {/* Category 3: Raw Wild Honey (Sun Gold Theme) */}
          <div className="group relative bg-white rounded-2xl p-6 border border-ivory-200 shadow-soft hover:shadow-premium hover:-translate-y-1 transition-all duration-300 overflow-hidden flex flex-col justify-between">
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-gold-400 to-gold-600" />
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-gold-600">Wild Apiary</span>
              <h3 className="font-serif text-xl font-bold text-forest-950 mt-1">Natural Wild Honey</h3>
              <p className="text-xs text-forest-600 mt-1.5 leading-relaxed">
                Cruelty-free forest harvested, completely unheated and raw with intact bio-enzymes and natural pollen.
              </p>
            </div>
            <div className="my-5 h-44 flex items-center justify-center">
              <img
                src="/images/photoshoot/HONEY - 1KG back.jpg"
                alt="Natural Wild Honey"
                className="max-h-full object-contain group-hover:scale-105 transition-transform duration-300 drop-shadow-sm"
              />
            </div>
            <Link
              to="/shop/natural-wild-honey"
              className="inline-flex items-center justify-between text-xs font-bold uppercase tracking-wider text-forest-900 group-hover:text-gold-600 pt-3 border-t border-ivory-200 transition-colors"
            >
              <span>Explore Honey</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          {/* Category 4: Herbal Dhoop & Combos (Forest / Leaf Theme) */}
          <div className="group relative bg-white rounded-2xl p-6 border border-ivory-200 shadow-soft hover:shadow-premium hover:-translate-y-1 transition-all duration-300 overflow-hidden flex flex-col justify-between">
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-forest-600 to-leaf-600" />
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-leaf-700">Sacred Wellness</span>
              <h3 className="font-serif text-xl font-bold text-forest-950 mt-1">Herbal Dhoop & Sets</h3>
              <p className="text-xs text-forest-600 mt-1.5 leading-relaxed">
                100% charcoal-free cow dung dhoop sticks and curated multi-oil kitchen wellness hampers.
              </p>
            </div>
            <div className="my-5 h-44 flex items-center justify-center">
              <img
                src="/images/photoshoot/DHOOP STICKS - front.jpg"
                alt="Herbal Dhoop Sticks"
                className="max-h-full object-contain group-hover:scale-105 transition-transform duration-300 drop-shadow-sm"
              />
            </div>
            <Link
              to="/shop?category=wellness"
              className="inline-flex items-center justify-between text-xs font-bold uppercase tracking-wider text-forest-900 group-hover:text-leaf-700 pt-3 border-t border-ivory-200 transition-colors"
            >
              <span>Explore Wellness</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>

      {/* 4. FEATURED PRODUCTS CATALOG */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-10 pb-4 border-b border-ivory-200">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-leaf-50 border border-leaf-200 text-leaf-800 text-xs font-bold uppercase tracking-wider mb-2">
              <Leaf className="w-3.5 h-3.5 text-leaf-600" />
              <span>Direct From Our Organic Farms</span>
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-forest-950">
              Our Bestselling Staples
            </h2>
          </div>
          <Link
            to="/shop"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-forest-800/20 text-xs font-bold uppercase tracking-wider text-forest-900 hover:bg-forest-900 hover:text-white transition-all shadow-xs"
          >
            <span>View All Products</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* 5. EDITORIAL ABOUT US / WHY RUTHVED (Atmospheric Deep Canvas with Saffron Glow) */}
      <section className="relative bg-gradient-to-br from-forest-950 via-[#182917] to-forest-950 text-ivory-100 py-16 sm:py-24 overflow-hidden border-y border-forest-800">
        
        {/* Ambient Glows */}
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-saffron-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-leaf-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            <div className="lg:col-span-6 space-y-6">
              <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-saffron-500/15 border border-saffron-500/30 text-saffron-400 text-xs uppercase tracking-widest font-bold">
                <Sparkles className="w-3 h-3 text-saffron-400" />
                Trust in Nature’s Best Since 2010
              </span>
              
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight">
                Rooted in Tradition. <br />
                <span className="text-saffron-400 font-serif italic">Nurtured with Love.</span>
              </h2>
              
              <p className="text-forest-200/90 text-sm sm:text-base leading-relaxed">
                At Ruthved Organic, we believe the purest solutions for a healthy life come from our roots — in nature, in tradition, and in the love with which we prepare our products.
              </p>
              <p className="text-forest-200/90 text-sm sm:text-base leading-relaxed">
                Every jar of Desi Ghee and every drop of cold-pressed oil is a tribute to the wisdom passed down through generations. Using age-old methods like the Vedic Bilona technique and wood-pressed oil extraction, we ensure that what reaches your home is untouched by chemicals and full of nature’s original goodness.
              </p>

              <div className="pt-2 grid grid-cols-2 gap-4 border-t border-forest-800/80">
                <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                  <span className="font-serif text-3xl sm:text-4xl font-bold text-saffron-400">50,000+</span>
                  <p className="text-xs text-forest-300 mt-1 font-medium">Families Nourished</p>
                </div>
                <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                  <span className="font-serif text-3xl sm:text-4xl font-bold text-leaf-400">100%</span>
                  <p className="text-xs text-forest-300 mt-1 font-medium">Zero-Chemical Guarantee</p>
                </div>
              </div>

              <div className="pt-2">
                <Link to="/story" className="btn-saffron text-xs py-3.5 px-8 shadow-glow-orange inline-flex items-center gap-2">
                  <span>Read Our Complete Journey</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            <div className="lg:col-span-6">
              <div className="relative rounded-3xl overflow-hidden shadow-elevated border border-forest-800 bg-forest-950 p-3 sm:p-4">
                <img
                  src="/images/DESI COW GHEE (6).avif"
                  alt="Ruthved Organic Traditional Heritage"
                  className="w-full h-auto max-h-[460px] object-cover rounded-2xl"
                />
                <div className="absolute bottom-6 left-6 right-6 bg-forest-950/95 backdrop-blur-md p-4 sm:p-5 rounded-2xl border border-forest-700/80 text-xs text-forest-200 shadow-xl">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="w-2 h-2 rounded-full bg-saffron-400 animate-pulse" />
                    <p className="font-serif font-bold text-white text-sm">
                      The Vedic Bilona Difference
                    </p>
                  </div>
                  <p className="mt-1 text-forest-300 leading-relaxed">
                    Hand-churned clockwise & counter-clockwise from whole curd using sacred wood churners to honor ancient Ayurvedic traditions.
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
          <span className="text-saffron-600 uppercase tracking-widest text-xs font-bold">
            Real Kitchen Stories
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-forest-950 mt-1.5">
            What Our Patrons Say
          </h2>
          <p className="text-forest-600 text-sm mt-2">
            Read authentic reviews from home chefs and wellness enthusiasts across India.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {TESTIMONIALS.map(t => (
            <div
              key={t.id}
              className="bg-white rounded-2xl p-6 sm:p-8 border border-ivory-200 shadow-soft hover:shadow-premium hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between relative"
            >
              <div>
                <div className="flex items-center gap-1 text-gold-500 mb-4">
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
                  <h4 className="font-serif font-bold text-forest-950 text-sm">{t.name}</h4>
                  <span className="text-xs text-forest-500">{t.role}</span>
                </div>
                <span className="text-[11px] font-bold text-leaf-700 bg-leaf-50 px-2.5 py-1 rounded-full border border-leaf-200">
                  {t.product}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 7. VERIFIED PROMOTIONAL BANNER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-forest-950 via-forest-900 to-[#1d351b] rounded-3xl p-8 sm:p-12 text-white shadow-elevated border border-forest-800 relative overflow-hidden">
          
          {/* Subtle Accent Glow */}
          <div className="absolute right-0 top-0 w-80 h-80 bg-saffron-500/15 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-2xl space-y-4">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-saffron-500 text-white font-bold text-xs uppercase tracking-wider shadow-glow-orange">
              <Sparkles className="w-3.5 h-3.5" />
              Special Welcome Gift
            </span>
            <h3 className="font-serif text-3xl sm:text-4xl font-bold leading-tight text-white">
              Enjoy 15% Off Your First Order + Free Nationwide Delivery
            </h3>
            <p className="text-forest-200 text-sm leading-relaxed">
              Use code <strong className="font-mono bg-forest-950 px-3 py-1 rounded-md text-saffron-300 border border-saffron-400/40">FIRST15</strong> at checkout to experience traditional, chemical-free nutrition.
            </p>
            <div className="pt-2 flex flex-wrap gap-4">
              <Link to="/shop" className="btn-saffron text-xs py-3.5 px-8 shadow-glow-orange">
                Shop Organic Now
              </Link>
              <a
                href={BUSINESS_INFO.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-leaf text-xs py-3.5 px-6 shadow-glow-green text-white font-bold"
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
          <span className="text-saffron-600 uppercase tracking-widest text-xs font-bold">Have Questions?</span>
          <h2 className="font-serif text-3xl font-bold text-forest-950 mt-1.5">
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
              className="bg-white rounded-2xl p-6 border border-ivory-200 shadow-soft hover:border-saffron-200 transition-colors"
            >
              <h4 className="font-serif font-bold text-forest-950 text-base mb-2">
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
            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-forest-900 hover:text-saffron-600 transition-colors"
          >
            <span>View All FAQs & Delivery Policies</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

    </div>
  );
};
