import React, { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search, ArrowUpDown, Leaf } from 'lucide-react';
import { PRODUCTS } from '../data/products';
import { ProductCategory } from '../types/product';
import { OrganicProductCard } from '../components/products/OrganicProductCard';
import { WatercolorDivider } from '../components/common/WatercolorDivider';

export const ShopPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialCategory = (searchParams.get('category') as ProductCategory) || 'all';

  const [selectedCategory, setSelectedCategory] = useState<ProductCategory>(initialCategory);
  const [sortBy, setSortBy] = useState<'featured' | 'price-low' | 'price-high' | 'rating'>('featured');
  const [searchQuery, setSearchQuery] = useState('');

  const categories: { id: ProductCategory; label: string }[] = [
    { id: 'all', label: 'All Products' },
    { id: 'ghee', label: 'A2 Desi Cow Ghee' },
    { id: 'oils', label: 'Cold-Pressed Oils' },
    { id: 'honey', label: 'Raw Forest Honey' },
    { id: 'wellness', label: 'Dhoop & Combos' },
  ];

  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((product) => {
      const matchesCategory =
        selectedCategory === 'all' ||
        product.category === selectedCategory ||
        (selectedCategory === 'wellness' && (product.category === 'wellness' || product.category === 'combos'));
      const query = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !query ||
        product.name.toLowerCase().includes(query) ||
        product.subtitle.toLowerCase().includes(query) ||
        product.shortDescription.toLowerCase().includes(query);

      return matchesCategory && matchesSearch;
    }).sort((a, b) => {
      if (sortBy === 'price-low') return a.price - b.price;
      if (sortBy === 'price-high') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
    });
  }, [selectedCategory, searchQuery, sortBy]);

  const handleCategoryChange = (cat: ProductCategory) => {
    setSelectedCategory(cat);
    if (cat === 'all') {
      searchParams.delete('category');
    } else {
      searchParams.set('category', cat);
    }
    setSearchParams(searchParams);
  };

  return (
    <div className="min-h-screen bg-[#F7F1E4] bg-[url('/images/textures/parchment.jpg')] bg-repeat [background-size:600px_auto] [background-blend-mode:multiply] py-12 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Editorial Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#536B3F]/10 text-[#536B3F] text-xs font-semibold uppercase tracking-widest">
            <Leaf className="w-3.5 h-3.5 text-[#536B3F]" />
            <span>UNCOMPROMISED ORGANIC PANTRY</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-5xl font-bold text-[#263F27]">
            The Ruthved Pantry
          </h1>
          <WatercolorDivider className="my-1" />
          <p className="text-sm sm:text-base text-[#282619]/75 font-normal leading-relaxed">
            From Vedic Bilona A2 Desi Cow Ghee to slow-pressed Mara Chekku virgin oils and raw forest honey — explore pure Indian nourishment straight from nature.
          </p>
        </div>

        {/* Filters & Search Control Bar */}
        <div className="p-4 sm:p-6 rounded-3xl bg-white/90 backdrop-blur-xs border border-[#EDE2CB] shadow-soft space-y-4">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-4">
            
            {/* Category Tabs */}
            <div className="flex items-center gap-2 overflow-x-auto w-full lg:w-auto pb-2 lg:pb-0 scrollbar-none">
              {categories.map((cat) => {
                const isActive = selectedCategory === cat.id;
                return (
                  <button
                    key={cat.id}
                    onClick={() => handleCategoryChange(cat.id)}
                    className={`px-4 sm:px-5 py-2 rounded-full text-xs font-semibold tracking-wider uppercase whitespace-nowrap transition-all duration-300 ${
                      isActive
                        ? 'bg-[#263F27] text-[#F7F1E4] shadow-xs'
                        : 'bg-[#FAF7F0] text-[#282619]/75 hover:bg-white hover:text-[#263F27] border border-[#EDE2CB]'
                    }`}
                  >
                    {cat.label}
                  </button>
                );
              })}
            </div>

            {/* Search Input & Sort Dropdown */}
            <div className="flex items-center gap-3 w-full lg:w-auto justify-end">
              <div className="relative flex-1 sm:w-64">
                <Search className="w-4 h-4 text-[#A5AD89] absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 rounded-full bg-[#FAF7F0] border border-[#EDE2CB] text-xs text-[#282619] placeholder-[#282619]/50 focus:outline-none focus:ring-1 focus:ring-[#C6A16A]"
                />
              </div>

              <div className="relative shrink-0">
                <select
                  value={sortBy}
                  onChange={(e: any) => setSortBy(e.target.value)}
                  className="appearance-none pl-4 pr-9 py-2 rounded-full bg-[#FAF7F0] border border-[#EDE2CB] text-xs font-medium text-[#282619] focus:outline-none focus:ring-1 focus:ring-[#C6A16A] cursor-pointer"
                >
                  <option value="featured">Featured First</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Highest Rated</option>
                </select>
                <ArrowUpDown className="w-3.5 h-3.5 text-[#A5AD89] absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>

          </div>
        </div>

        {/* Product Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {filteredProducts.map((product) => (
              <OrganicProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 p-8 rounded-3xl bg-white/70 border border-[#EDE2CB] max-w-md mx-auto space-y-4">
            <Leaf className="w-10 h-10 text-[#C6A16A] mx-auto opacity-70" />
            <h3 className="font-serif text-xl font-bold text-[#263F27]">
              No products found
            </h3>
            <p className="text-xs text-[#282619]/70">
              We couldn't find any items matching your current search or filter criteria.
            </p>
            <button
              onClick={() => {
                setSelectedCategory('all');
                setSearchQuery('');
              }}
              className="btn-forest text-xs py-2.5 px-6"
            >
              Reset Filters
            </button>
          </div>
        )}

      </div>
    </div>
  );
};

export default ShopPage;
