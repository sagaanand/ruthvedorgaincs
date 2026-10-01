import React, { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search, ArrowUpDown, ShieldCheck, Truck, RefreshCw } from 'lucide-react';
import { PRODUCTS } from '../data/products';
import { ProductCategory } from '../types/product';
import { ProductCard } from '../components/products/ProductCard';

export const ShopPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialCategory = (searchParams.get('category') as ProductCategory) || 'all';

  const [selectedCategory, setSelectedCategory] = useState<ProductCategory>(initialCategory);
  const [sortBy, setSortBy] = useState<'featured' | 'price-low' | 'price-high' | 'rating'>('featured');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTag, setSelectedTag] = useState<string>('all');

  const categories: { id: ProductCategory; label: string }[] = [
    { id: 'all', label: 'All Products' },
    { id: 'ghee', label: 'A2 Desi Cow Ghee' },
    { id: 'oils', label: 'Cold-Pressed Oils' },
    { id: 'honey', label: 'Raw Wild Honey' },
  ];

  const tags = ['all', 'Best Seller', 'New', 'Limited'];

  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter(product => {
      const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
      const matchesTag = selectedTag === 'all' || product.tag === selectedTag;
      const query = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !query ||
        product.name.toLowerCase().includes(query) ||
        product.subtitle.toLowerCase().includes(query) ||
        product.shortDescription.toLowerCase().includes(query);

      return matchesCategory && matchesTag && matchesSearch;
    }).sort((a, b) => {
      if (sortBy === 'price-low') return a.price - b.price;
      if (sortBy === 'price-high') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
    });
  }, [selectedCategory, selectedTag, searchQuery, sortBy]);

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
    <div className="py-8 sm:py-12 space-y-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      {/* Page Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <span className="text-gold-600 uppercase tracking-widest text-xs font-semibold">
          100% Traditional Indian Storefront
        </span>
        <h1 className="font-serif text-3xl sm:text-5xl font-bold text-forest-900">
          Pure Organic Pantry
        </h1>
        <p className="text-sm text-forest-600 leading-relaxed">
          From Vedic Bilona A2 Desi Ghee to slow-crushed wood-pressed oils and raw forest honey — explore natural nourishment directly from Karnataka’s organic farms.
        </p>
      </div>

      {/* Filter and Control Bar */}
      <div className="bg-white rounded-2xl p-4 sm:p-6 border border-ivory-200 shadow-soft space-y-4">
        
        {/* Top row: Categories & Search */}
        <div className="flex flex-col lg:flex-row items-center justify-between gap-4">
          
          {/* Category Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto w-full lg:w-auto pb-2 lg:pb-0 scrollbar-none">
            {categories.map(cat => (
              <button
                key={cat.id}
                onClick={() => handleCategoryChange(cat.id)}
                className={`px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wider whitespace-nowrap transition-all ${
                  selectedCategory === cat.id
                    ? 'bg-forest-800 text-white shadow-sm'
                    : 'bg-ivory-100 text-forest-700 hover:bg-ivory-200'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Search Input */}
          <div className="relative w-full lg:w-72">
            <Search className="w-4 h-4 text-forest-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-ivory-50 border border-ivory-200 rounded-full text-xs text-forest-900 placeholder:text-forest-400 focus:outline-none focus:ring-1 focus:ring-forest-800"
            />
          </div>
        </div>

        {/* Bottom row: Tags and Sorting */}
        <div className="pt-3 border-t border-ivory-200/80 flex flex-wrap items-center justify-between gap-3 text-xs">
          
          {/* Tags */}
          <div className="flex items-center gap-2">
            <span className="text-forest-400 font-medium">Tag:</span>
            {tags.map(tag => (
              <button
                key={tag}
                onClick={() => setSelectedTag(tag)}
                className={`px-2.5 py-1 rounded-md transition-colors ${
                  selectedTag === tag
                    ? 'bg-gold-500 text-white font-semibold'
                    : 'bg-ivory-100 text-forest-600 hover:bg-ivory-200'
                }`}
              >
                {tag === 'all' ? 'All Tags' : tag}
              </button>
            ))}
          </div>

          {/* Sort By */}
          <div className="flex items-center gap-2 ml-auto">
            <ArrowUpDown className="w-3.5 h-3.5 text-forest-400" />
            <span className="text-forest-500 font-medium">Sort By:</span>
            <select
              value={sortBy}
              onChange={e => setSortBy(e.target.value as any)}
              className="bg-ivory-50 border border-ivory-200 rounded-lg px-2.5 py-1 text-forest-800 focus:outline-none focus:ring-1 focus:ring-forest-800 text-xs font-medium cursor-pointer"
            >
              <option value="featured">Featured First</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Top Rated</option>
            </select>
          </div>
        </div>

      </div>

      {/* Product Count & Active Status */}
      <div className="flex items-center justify-between text-xs text-forest-500 px-1">
        <span>Showing <strong>{filteredProducts.length}</strong> organic products</span>
        {(selectedCategory !== 'all' || selectedTag !== 'all' || searchQuery) && (
          <button
            onClick={() => {
              setSelectedCategory('all');
              setSelectedTag('all');
              setSearchQuery('');
            }}
            className="text-forest-800 hover:text-gold-600 underline font-semibold"
          >
            Reset Filters
          </button>
        )}
      </div>

      {/* Products Grid */}
      {filteredProducts.length === 0 ? (
        <div className="bg-white rounded-2xl p-12 text-center border border-ivory-200 space-y-3">
          <p className="font-serif text-xl font-bold text-forest-900">No matching products found</p>
          <p className="text-xs text-forest-600 max-w-sm mx-auto">
            Try adjusting your search keywords or removing selected tags to view our authentic catalog.
          </p>
          <button
            onClick={() => {
              setSelectedCategory('all');
              setSelectedTag('all');
              setSearchQuery('');
            }}
            className="btn-primary text-xs py-2.5 px-6 mt-2"
          >
            Clear All Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}

      {/* Bottom Assurance Strip */}
      <div className="bg-ivory-50 rounded-2xl p-6 border border-ivory-200 grid grid-cols-1 md:grid-cols-3 gap-6 text-xs text-forest-700">
        <div className="flex items-center gap-3">
          <ShieldCheck className="w-5 h-5 text-gold-600 flex-shrink-0" />
          <span><strong>100% Traditional Assurance:</strong> Zero artificial essence, mineral oils, or additives.</span>
        </div>
        <div className="flex items-center gap-3">
          <Truck className="w-5 h-5 text-gold-600 flex-shrink-0" />
          <span><strong>Safe Glass Packaging:</strong> Shipped in shock-absorbent eco-packaging nationwide.</span>
        </div>
        <div className="flex items-center gap-3">
          <RefreshCw className="w-5 h-5 text-gold-600 flex-shrink-0" />
          <span><strong>7-Day Quality Guarantee:</strong> Easy replacement if damaged or compromised in transit.</span>
        </div>
      </div>

    </div>
  );
};
