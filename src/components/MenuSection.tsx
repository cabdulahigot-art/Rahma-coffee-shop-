import { useState } from 'react';
import { Search, ShoppingBag, SlidersHorizontal, Info, ChevronRight } from 'lucide-react';
import { MenuItem } from '../types';
import { MENU_ITEMS } from '../data';

interface MenuSectionProps {
  onAddToCartInstant: (item: MenuItem) => void;
  onAddToCartCustomized: (item: MenuItem) => void;
}

export default function MenuSection({ onAddToCartInstant, onAddToCartCustomized }: MenuSectionProps) {
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'coffee' | 'cold-brew' | 'tea' | 'pastry'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredItems = MENU_ITEMS.filter((item) => {
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          item.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const categories = [
    { id: 'all', label: 'Full Menu' },
    { id: 'coffee', label: 'Craft Espresso' },
    { id: 'cold-brew', label: 'Nitro Cold Brew' },
    { id: 'tea', label: 'Organic Tea' },
    { id: 'pastry', label: 'Parisian Bakery' }
  ] as const;

  return (
    <section id="menu" className="py-24 max-w-container-max mx-auto px-6 md:px-margin-desktop">
      {/* Title block */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-12">
        <div>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-extrabold text-burgundy tracking-tight">
            Our Signature Menu
          </h2>
          <p className="text-on-surface-variant mt-2 font-medium text-sm md:text-base">
            Hand-selected favorites for the meticulous coffee connoisseur.
          </p>
        </div>
        <div className="flex items-center gap-2 text-primary hover:text-primary/90 font-bold transition-all text-sm group cursor-pointer">
          <span>Fresh Brewed Daily</span>
          <ChevronRight size={16} className="group-hover:translate-x-0.5 transition-transform" />
        </div>
      </div>

      {/* Search & Category Filter Controls */}
      <div className="flex flex-col lg:flex-row gap-4 justify-between items-stretch lg:items-center mb-10 pb-6 border-b border-outline-variant/30">
        
        {/* Categories slider */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none max-w-full">
          {categories.map((cat) => (
            <button
              key={cat.id}
              type="button"
              id={`cat-filter-${cat.id}`}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-5 py-2.5 rounded-full text-xs font-bold whitespace-nowrap transition-all uppercase tracking-wider cursor-pointer border ${
                selectedCategory === cat.id
                  ? 'bg-[#8e4e00] text-white border-[#8e4e00]'
                  : 'bg-white text-[#564334] border-[#dcc2ae] hover:bg-[#e5e2e1]'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Real-time search bar */}
        <div className="relative w-full lg:max-w-xs">
          <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none text-on-surface-variant/40">
            <Search size={18} />
          </span>
          <input
            type="text"
            id="menu-search-input"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search specialties (e.g. Latte)..."
            className="w-full text-xs sm:text-sm pl-10 pr-4 py-3 bg-white border border-outline-variant rounded-xl focus:outline-none focus:ring-1 focus:ring-primary focus:border-border-primary"
          />
        </div>
      </div>

      {/* Products Grid */}
      {filteredItems.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6" id="menu-items-grid">
          {filteredItems.map((item) => (
            <div 
              key={item.id}
              id={`menu-item-card-${item.id}`}
              className="group bg-white border border-[#dcc2ae] rounded-[2rem] overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1 flex flex-col h-full"
            >
              {/* Product Card Image */}
              <div className="relative h-56 w-full overflow-hidden bg-zinc-50">
                <img 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                  src={item.image} 
                  alt={item.alt}
                  referrerPolicy="no-referrer"
                />
                
                {/* Category small badge */}
                <span className="absolute top-4 left-4 bg-[#1c1b1b]/80 text-white backdrop-blur-xs text-[9px] uppercase tracking-widest font-black px-2.5 py-1 rounded-md">
                  {item.category.replace('-', ' ')}
                </span>

                {/* Customizable badge tag */}
                {item.customizable && (
                  <span className="absolute top-4 right-4 bg-[#ffdad4] text-[#410000] font-black text-[9px] uppercase tracking-wider px-2.5 py-1 rounded-full flex items-center gap-1 shadow-sm">
                    <SlidersHorizontal size={10} />
                    <span>Custom</span>
                  </span>
                )}
              </div>

              {/* Information */}
              <div className="p-6 flex flex-col flex-1 justify-between">
                <div>
                  <div className="flex justify-between items-start gap-2 mb-2">
                    <h3 className="font-display text-sm sm:text-base font-extrabold text-[#1c1b1b] group-hover:text-[#8e4e00] transition-colors leading-tight">
                      {item.name}
                    </h3>
                    <span className="text-[#8e4e00] font-black text-sm sm:text-base whitespace-nowrap">
                      ${item.price.toFixed(2)}
                    </span>
                  </div>
                  
                  <p className="text-xs text-[#564334] line-clamp-2 leading-relaxed mb-5 font-medium">
                    {item.description}
                  </p>
                </div>

                {/* Button Action */}
                <button
                  type="button"
                  id={`add-to-cart-btn-${item.id}`}
                  onClick={() => {
                    if (item.customizable) {
                      onAddToCartCustomized(item);
                    } else {
                      onAddToCartInstant(item);
                    }
                  }}
                  className="w-full bg-[#8e4e00] hover:bg-[#8e4e00]/95 text-white font-bold py-3 px-4 rounded-xl text-xs flex items-center justify-center gap-2 transition-all active:scale-[0.98] shadow-xs cursor-pointer"
                >
                  <ShoppingBag size={14} />
                  <span>{item.customizable ? 'Customize & Add' : 'Quick Add to Order'}</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-16 bg-white border border-outline-variant/60 rounded-2xl" id="no-results-view">
          <div className="inline-flex items-center justify-center p-3 rounded-full bg-primary/10 text-primary mb-3">
            <Info size={28} />
          </div>
          <h3 className="font-display text-lg font-bold text-burgundy">No specialties found</h3>
          <p className="text-on-surface-variant text-xs mt-1 max-w-sm mx-auto">
            We couldn't find any coffee or pastry matching your query. Please check your keywords or adjust filters.
          </p>
        </div>
      )}
    </section>
  );
}
