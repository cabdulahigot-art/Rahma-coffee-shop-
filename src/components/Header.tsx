import { useState, useEffect } from 'react';
import { ShoppingCart, User, Menu, X, Coffee } from 'lucide-react';

interface HeaderProps {
  cartCount: number;
  onCartClick: () => void;
  onUserClick: () => void;
}

export default function Header({ cartCount, onCartClick, onUserClick }: HeaderProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLinkClick = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <header 
      id="main-app-header"
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled 
          ? 'bg-surface/90 backdrop-blur-lg shadow-sm border-b border-outline-variant py-3' 
          : 'bg-surface/80 backdrop-blur-md border-b border-outline-variant py-4 md:py-5'
      }`}
    >
      <nav className="flex justify-between items-center px-4 md:px-margin-desktop w-full max-w-container-max mx-auto">
        {/* Brand Logo */}
        <div 
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="flex items-center gap-2 cursor-pointer group"
          id="logo-wrap"
        >
          <div className="bg-primary/10 p-1.5 rounded-lg text-primary group-hover:bg-primary group-hover:text-white transition-all">
            <Coffee size={22} className="stroke-[2.5]" />
          </div>
          <div className="font-display text-xl md:text-2xl font-bold text-primary tracking-tight group-hover:opacity-90 transition-opacity">
            Rahma Coffee Shop
          </div>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8" id="desktop-nav">
          <button 
            onClick={() => handleLinkClick('menu')}
            className="font-sans text-sm font-medium text-on-surface-variant hover:text-primary transition-colors cursor-pointer"
          >
            Menu
          </button>
          <button 
            onClick={() => handleLinkClick('bean-to-cup')}
            className="font-sans text-sm font-medium text-on-surface-variant hover:text-primary transition-colors cursor-pointer"
          >
            Our Process
          </button>
          <button 
            onClick={() => handleLinkClick('our-story')}
            className="font-sans text-sm font-medium text-on-surface-variant hover:text-primary transition-colors cursor-pointer"
          >
            Our Story
          </button>
          <button 
            onClick={() => handleLinkClick('testimonials')}
            className="font-sans text-sm font-medium text-on-surface-variant hover:text-primary transition-colors cursor-pointer"
          >
            Reviews
          </button>
        </div>

        {/* Utilities */}
        <div className="flex items-center gap-2 md:gap-4" id="utilities-wrap">
          {/* Cart Trigger */}
          <button 
            id="header-cart-btn"
            onClick={onCartClick}
            className="relative p-2.5 text-on-surface-variant hover:text-primary hover:bg-primary-fixed/20 rounded-full transition-all duration-200"
            aria-label="Shopping Cart"
          >
            <ShoppingCart size={20} />
            {cartCount > 0 && (
              <span 
                id="cart-badge-indicator"
                className="absolute -top-1 -right-1 bg-secondary text-white text-[10px] md:text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center animate-bounce shadow-md"
              >
                {cartCount}
              </span>
            )}
          </button>

          {/* User Trigger */}
          <button 
            id="header-user-btn"
            onClick={onUserClick}
            className="p-2.5 text-on-surface-variant hover:text-primary hover:bg-primary-fixed/20 rounded-full transition-all duration-200"
            aria-label="User Profile"
          >
            <User size={20} />
          </button>

          {/* Mobile Menu Toggle */}
          <button 
            id="mobile-menu-toggle-btn"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2.5 text-on-surface-variant hover:text-primary rounded-full transition-colors"
            aria-label="Toggle Mobile Menu"
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>

      {/* Mobile drawer overlay */}
      {mobileMenuOpen && (
        <div id="mobile-drawer-overlay" className="md:hidden fixed inset-0 top-[60vh] bg-black/40 z-30 backdrop-blur-xs" onClick={() => setMobileMenuOpen(false)}>
          <div 
            id="mobile-drawer-contents"
            className="bg-surface border-b border-outline-variant p-6 flex flex-col gap-4 animate-fade-in"
            onClick={(e) => e.stopPropagation()}
          >
            <button 
              onClick={() => handleLinkClick('menu')}
              className="text-left font-sans text-base font-medium text-burgundy py-2 border-b border-outline-variant/30"
            >
              Order & Menu
            </button>
            <button 
              onClick={() => handleLinkClick('bean-to-cup')}
              className="text-left font-sans text-base font-medium text-burgundy py-2 border-b border-outline-variant/30"
            >
              Bean to Cup Process
            </button>
            <button 
              onClick={() => handleLinkClick('our-story')}
              className="text-left font-sans text-base font-medium text-burgundy py-2 border-b border-outline-variant/30"
            >
              Our Roast Story
            </button>
            <button 
              onClick={() => handleLinkClick('testimonials')}
              className="text-left font-sans text-base font-medium text-burgundy py-2"
            >
              Reviews & Location
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
