import { useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Features from './components/Features';
import MenuSection from './components/MenuSection';
import CartDrawer from './components/CartDrawer';
import CheckoutModal from './components/CheckoutModal';
import StorySection from './components/StorySection';
import CustomizationModal from './components/CustomizationModal';
import UserProfileModal from './components/UserProfileModal';
import Notification from './components/Notification';
import { CartItem, MenuItem, MenuItemCustomization } from './types';

export default function App() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isCustomiseOpen, setIsCustomiseOpen] = useState(false);
  const [selectedItemForCustomise, setSelectedItemForCustomise] = useState<MenuItem | null>(null);

  // checkout helpers
  const [discountAmount, setDiscountAmount] = useState(0);
  const [appliedPromo, setAppliedPromo] = useState('');

  // active toast message
  const [toastMessage, setToastMessage] = useState('');
  const [isToastOpen, setIsToastOpen] = useState(false);
  const [toastType, setToastType] = useState<'success' | 'info'>('success');

  // Load cart from localStorage on mount (optional polish)
  useEffect(() => {
    const saved = localStorage.getItem('rahma_coffee_cart');
    if (saved) {
      try {
        setCart(JSON.parse(saved));
      } catch (err) {
        console.error('Failed to parse cached cart', err);
      }
    }
  }, []);

  // Sync cart to localStorage
  useEffect(() => {
    localStorage.setItem('rahma_coffee_cart', JSON.stringify(cart));
  }, [cart]);

  const showToast = (msg: string, type: 'success' | 'info' = 'success') => {
    setToastMessage(msg);
    setToastType(type);
    setIsToastOpen(true);
  };

  // Add pastry directly (non-customizable)
  const handleAddInstant = (menuItem: MenuItem) => {
    const defaultCust: MenuItemCustomization = {
      size: 'Standard',
      milk: 'None',
      sweetness: 'Standard',
      temperature: 'Hot'
    };
    addToCart(menuItem, defaultCust);
  };

  // Trigger drink customization
  const handleAddCustomiseTrigger = (menuItem: MenuItem) => {
    setSelectedItemForCustomise(menuItem);
    setIsCustomiseOpen(true);
  };

  // Callback from customisation modal
  const handleConfirmCustomise = (customization: MenuItemCustomization) => {
    if (selectedItemForCustomise) {
      addToCart(selectedItemForCustomise, customization);
    }
  };

  const addToCart = (menuItem: MenuItem, customization: MenuItemCustomization) => {
    const instanceId = menuItem.id + '-' + JSON.stringify(customization);
    
    setCart((prevCart) => {
      const existingIdx = prevCart.findIndex((item) => item.id === instanceId);
      if (existingIdx > -1) {
        const updated = [...prevCart];
        updated[existingIdx].quantity += 1;
        showToast(`Increased quantity of ${menuItem.name} in basket!`);
        return updated;
      } else {
        showToast(`Added ${menuItem.name} to basket!`);
        return [...prevCart, { id: instanceId, menuItem, quantity: 1, customization }];
      }
    });
  };

  const handleUpdateQuantity = (id: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      setCart((prev) => prev.filter((item) => item.id !== id));
      showToast('Item removed from order.', 'info');
    } else {
      setCart((prev) =>
        prev.map((item) => (item.id === id ? { ...item, quantity: newQuantity } : item))
      );
    }
  };

  const handleRemoveItem = (id: string) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
    showToast('Item removed from order.', 'info');
  };

  const handleProceedToCheckout = (disc: number, promo: string) => {
    setDiscountAmount(disc);
    setAppliedPromo(promo);
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  const handleOrderSuccess = () => {
    setCart([]); // Reset basket
    setDiscountAmount(0);
    setAppliedPromo('');
    showToast('Thank you! Your order has been placed successfully.', 'success');
  };

  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  // Simulated metadata information
  const userEmail = 'cabdulahigot@gmail.com';

  return (
    <div className="bg-background text-on-surface antialiased min-h-screen font-sans">
      
      {/* Dynamic Header */}
      <Header 
        cartCount={cartCount} 
        onCartClick={() => setIsCartOpen(true)}
        onUserClick={() => setIsProfileOpen(true)}
      />

      {/* Main Sections */}
      <main className="pt-16 pb-12">
        <Hero />
        <Features />
        
        {/* Menu Section */}
        <MenuSection 
          onAddToCartInstant={handleAddInstant}
          onAddToCartCustomized={handleAddCustomiseTrigger}
        />

        {/* Marquee Graphic Divider */}
        <section className="py-12 overflow-hidden bg-surface-container select-none">
          <div className="flex whitespace-nowrap animate-marquee">
            <span className="font-display text-4xl sm:text-6xl md:text-8xl leading-none text-outline-variant/30 uppercase mx-8">
              Handcrafted • Freshly Roasted • Ethical Sourcing • Specialty Brew • 
            </span>
            <span className="font-display text-4xl sm:text-6xl md:text-8xl leading-none text-outline-variant/30 uppercase mx-8">
              Handcrafted • Freshly Roasted • Ethical Sourcing • Specialty Brew • 
            </span>
          </div>
        </section>

        <StorySection />
      </main>

      {/* Footer */}
      <footer className="bg-surface-container-lowest border-t border-outline-variant py-12">
        <div className="max-w-container-max mx-auto px-6 md:px-margin-desktop grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Logo brand signature */}
          <div className="space-y-4">
            <h3 className="font-display text-lg font-bold text-burgundy">Rahma Coffee Shop</h3>
            <p className="text-xs text-on-surface-variant max-w-sm leading-relaxed">
              Serving organic single-origin specialty coffees, nitro draft brew, custom ceremonials, and warm Parisian croissants. Sourced ethically via Direct Trade.
            </p>
          </div>

          {/* Opening house hours */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold text-burgundy uppercase tracking-wider font-display">Coffee House Hours</h4>
            <div className="text-xs text-on-surface-variant space-y-1">
              <p>Monday - Friday: 6:30 AM - 7:00 PM</p>
              <p>Saturday - Sunday: 7:30 AM - 8:00 PM</p>
              <p className="text-primary italic">In-house Daily Batch Roasting starts at 5:00 AM</p>
            </div>
          </div>

          {/* Quick links & contact info */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold text-burgundy uppercase tracking-wider font-display">Location & Contact</h4>
            <div className="text-xs text-on-surface-variant space-y-1">
              <p>📍 101 Specialty Brew Blvd, Downtown</p>
              <p>📞 Phone: (555) 019-2834</p>
              <p>✉️ Support: cabdulahigot@gmail.com</p>
            </div>
          </div>

        </div>

        {/* Trade Mark copyright */}
        <div className="max-w-container-max mx-auto px-6 md:px-margin-desktop border-t border-outline-variant/40 mt-8 pt-8 flex flex-col sm:flex-row justify-between text-[11px] text-on-surface-variant/75 gap-4">
          <p>© 2026 Rahma Coffee Shop. Brewed to perfection with premium passion.</p>
          <div className="flex gap-4">
            <a href="#menu" className="hover:underline hover:text-primary">Order Menu</a>
            <span>•</span>
            <a href="#our-story" className="hover:underline hover:text-primary">Our Roast Story</a>
            <span>•</span>
            <a href="#bean-to-cup" className="hover:underline hover:text-primary">Artisanal Process</a>
          </div>
        </div>
      </footer>

      {/* Floating interactive composite states (Drawers and Modals) */}
      <CustomizationModal 
        isOpen={isCustomiseOpen}
        onClose={() => {
          setIsCustomiseOpen(false);
          setSelectedItemForCustomise(null);
        }}
        menuItem={selectedItemForCustomise}
        onConfirm={handleConfirmCustomise}
      />

      <CartDrawer 
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cart}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onCheckout={handleProceedToCheckout}
      />

      <CheckoutModal 
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        cartItems={cart}
        discountAmount={discountAmount}
        appliedPromo={appliedPromo}
        onOrderSuccess={handleOrderSuccess}
      />

      <UserProfileModal 
        isOpen={isProfileOpen}
        onClose={() => setIsProfileOpen(false)}
        userEmail={userEmail}
      />

      {/* Persistent floating dynamic feedback list banner toasts */}
      <Notification 
        msg={toastMessage}
        isOpen={isToastOpen}
        onClose={() => setIsToastOpen(false)}
        type={toastType}
      />

    </div>
  );
}
