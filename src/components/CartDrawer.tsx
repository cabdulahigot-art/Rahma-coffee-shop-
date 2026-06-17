import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Sliders, Trash2, Plus, Minus, Ticket, Check } from 'lucide-react';
import { CartItem } from '../types';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (id: string, newQuantity: number) => void;
  onRemoveItem: (id: string) => void;
  onCheckout: (discountAmount: number, promoApplied: string) => void;
}

export default function CartDrawer({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onCheckout
}: CartDrawerProps) {
  const [promoCode, setPromoCode] = useState('');
  const [promoError, setPromoError] = useState('');
  const [discountPercent, setDiscountPercent] = useState(0);
  const [appliedPromo, setAppliedPromo] = useState('');

  const calculateSubtotal = () => {
    return cartItems.reduce((acc, item) => {
      let itemPrice = item.menuItem.price;
      // account for customizations
      if (item.customization.size === 'Large') {
        itemPrice += 0.75;
      }
      if (['Oat Milk', 'Almond Milk'].includes(item.customization.milk)) {
        itemPrice += 0.50;
      }
      return acc + (itemPrice * item.quantity);
    }, 0);
  };

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    setPromoError('');
    const code = promoCode.trim().toUpperCase();
    
    if (code === 'BARISTA20') {
      setDiscountPercent(20);
      setAppliedPromo('BARISTA20');
      setPromoCode('');
    } else if (code === 'COFFEE10') {
      setDiscountPercent(10);
      setAppliedPromo('COFFEE10');
      setPromoCode('');
    } else {
      setPromoError('Invalid promo code. Try "BARISTA20"');
    }
  };

  const handleRemovePromo = () => {
    setDiscountPercent(0);
    setAppliedPromo('');
  };

  const subtotal = calculateSubtotal();
  const discValue = (subtotal * discountPercent) / 100;
  const taxRate = 0.0825; // 8.25%
  const computedTax = (subtotal - discValue) * taxRate;
  const deliveryOrSvcFee = subtotal > 0 ? 1.50 : 0;
  const orderTotal = subtotal - discValue + computedTax + deliveryOrSvcFee;

  return (
    <AnimatePresence>
      {isOpen && (
        <div id="cart-drawer-overlay-container" className="fixed inset-0 z-50 overflow-hidden">
          {/* Backdrop screen */}
          <motion.div
            id="cart-drawer-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-xs"
          />

          {/* Drawer container */}
          <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
            <motion.div
              id="cart-drawer-card"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="w-screen max-w-md bg-surface border-l border-outline-variant flex flex-col shadow-2xl h-full"
            >
              {/* Header */}
              <div className="p-6 border-b border-outline-variant flex justify-between items-center bg-white">
                <div>
                  <h3 className="font-display text-lg font-bold text-burgundy">Your Order Selection</h3>
                  <p className="text-xs text-on-surface-variant font-medium">
                    {cartItems.length} specialty {cartItems.length === 1 ? 'item' : 'items'} in basket
                  </p>
                </div>
                <button 
                  type="button"
                  id="close-cart-btn"
                  onClick={onClose}
                  className="p-2 text-on-surface-variant hover:text-burgundy hover:bg-zinc-100 rounded-full transition-all"
                  aria-label="Close Basket"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Items List */}
              <div className="flex-1 overflow-y-auto p-6 space-y-4" id="cart-items-list-container">
                {cartItems.length > 0 ? (
                  cartItems.map((item) => {
                    const extra = (item.customization.size === 'Large' ? 0.75 : 0) + 
                                  (['Oat Milk', 'Almond Milk'].includes(item.customization.milk) ? 0.50 : 0);
                    const perPrice = item.menuItem.price + extra;
                    return (
                      <div 
                        key={item.id}
                        id={`cart-item-row-${item.id}`}
                        className="bg-white border border-outline-variant/60 rounded-xl p-4 flex gap-3 shadow-xs hover:border-outline-variant transition-colors"
                      >
                        {/* Thumbnail */}
                        <div className="h-16 w-16 rounded-lg overflow-hidden bg-zinc-100 flex-shrink-0">
                          <img 
                            src={item.menuItem.image} 
                            alt={item.menuItem.name} 
                            className="w-full h-full object-cover"
                            referrerPolicy="no-referrer"
                          />
                        </div>

                        {/* Details */}
                        <div className="flex-grow flex flex-col justify-between">
                          <div>
                            <div className="flex justify-between items-start gap-1">
                              <h4 className="font-display text-xs sm:text-sm font-bold text-on-surface leading-tight">
                                {item.menuItem.name}
                              </h4>
                              <span className="font-mono text-xs font-bold text-burgundy">
                                ${(perPrice * item.quantity).toFixed(2)}
                              </span>
                            </div>

                            {/* Custom options bullet lines */}
                            {item.menuItem.customizable && (
                              <div className="inline-flex flex-wrap gap-x-2 gap-y-0.5 mt-1 text-[10px] text-on-surface-variant/85 font-medium">
                                <span>{item.customization.size}</span>
                                <span>•</span>
                                <span>{item.customization.temperature}</span>
                                {item.customization.milk !== 'None' && (
                                  <>
                                    <span>•</span>
                                    <span>{item.customization.milk}</span>
                                  </>
                                )}
                                <span>•</span>
                                <span>{item.customization.sweetness} Sweet</span>
                              </div>
                            )}

                            {/* Barista special instruction note */}
                            {item.customization.specialNotes && (
                              <div className="mt-1 text-[10px] text-primary bg-primary-fixed/15 px-2 py-0.5 rounded italic">
                                Note: {item.customization.specialNotes}
                              </div>
                            )}
                          </div>

                          {/* Action rows: Quantity editor & delete */}
                          <div className="flex justify-between items-center mt-3 pt-2.5 border-t border-outline-variant/30">
                            <div className="flex items-center border border-outline-variant rounded-lg bg-zinc-50 overflow-hidden">
                              <button
                                type="button"
                                id={`cart-decrease-${item.id}`}
                                onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                                className="p-1 px-2.5 hover:bg-zinc-200 text-on-surface-variant transition-colors"
                              >
                                <Minus size={11} className="stroke-[3]" />
                              </button>
                              <span className="px-2.5 font-mono text-xs font-semibold text-on-surface">
                                {item.quantity}
                              </span>
                              <button
                                type="button"
                                id={`cart-increase-${item.id}`}
                                onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                                className="p-1 px-2.5 hover:bg-zinc-200 text-on-surface-variant transition-colors"
                              >
                                <Plus size={11} className="stroke-[3]" />
                              </button>
                            </div>
                            
                            <button
                              type="button"
                              id={`cart-remove-${item.id}`}
                              onClick={() => onRemoveItem(item.id)}
                              className="text-on-surface-variant/75 hover:text-secondary p-1"
                              aria-label="Remove item"
                            >
                              <Trash2 size={14} />
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <div className="text-center py-20 flex flex-col items-center justify-center h-full">
                    <div className="w-14 h-14 rounded-full bg-primary-fixed/25 text-primary flex items-center justify-center mb-4">
                      <Sliders size={26} />
                    </div>
                    <h4 className="font-display text-sm font-bold text-burgundy">Your basket is resting</h4>
                    <p className="text-xs text-on-surface-variant max-w-xs mt-1 leading-relaxed">
                      Explore our fresh seasonal menu to add organic single-origin specialty drinks, custom matcha, or Parisian butter pastries to your order.
                    </p>
                  </div>
                )}
              </div>

              {/* Promo Code Input & Checkout Summary sticky footer */}
              {cartItems.length > 0 && (
                <div className="border-t border-outline-variant bg-white p-6 shadow-md space-y-4">
                  {/* Promo Form */}
                  {!appliedPromo ? (
                    <form onSubmit={handleApplyPromo} className="space-y-1.5">
                      <div className="flex gap-2">
                        <div className="relative flex-grow">
                          <Ticket size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant/60" />
                          <input
                            type="text"
                            id="promo-code-input"
                            value={promoCode}
                            onChange={(e) => {
                              setPromoCode(e.target.value);
                              setPromoError('');
                            }}
                            placeholder="Enter promo code (BARISTA20)"
                            className="w-full text-xs pl-9 pr-3 py-2.5 bg-zinc-50 border border-outline-variant rounded-lg focus:outline-none focus:ring-1 focus:ring-primary uppercase"
                          />
                        </div>
                        <button
                          type="submit"
                          id="apply-promo-btn"
                          className="bg-burgundy text-white text-xs font-semibold px-4 py-2 rounded-lg hover:opacity-90 active:scale-95 transition-all whitespace-nowrap cursor-pointer"
                        >
                          Apply
                        </button>
                      </div>
                      {promoError && (
                        <p className="text-[10px] text-error font-medium pl-1">{promoError}</p>
                      )}
                    </form>
                  ) : (
                    <div className="flex items-center justify-between bg-emerald-50 text-emerald-800 border border-emerald-200 p-2.5 rounded-lg text-xs font-medium">
                      <div className="flex items-center gap-1.5">
                        <Check size={14} className="stroke-[3]" />
                        <span>Promo Applied: <strong>{appliedPromo}</strong> (-{discountPercent}%)</span>
                      </div>
                      <button
                        type="button"
                        id="remove-promo-btn"
                        onClick={handleRemovePromo}
                        className="text-[10px] text-zinc-500 hover:text-zinc-800 underline uppercase tracking-wider"
                      >
                        Remove
                      </button>
                    </div>
                  )}

                  {/* Calculations breakdown list */}
                  <div className="space-y-2 text-xs text-on-surface-variant font-medium border-b border-zinc-100 pb-3">
                    <div className="flex justify-between">
                      <span>Drinks & Pastries Subtotal</span>
                      <span className="font-mono text-on-surface">${subtotal.toFixed(2)}</span>
                    </div>
                    {discountPercent > 0 && (
                      <div className="flex justify-between text-emerald-700">
                        <span>Promo Code Saving</span>
                        <span className="font-mono">-${discValue.toFixed(2)}</span>
                      </div>
                    )}
                    <div className="flex justify-between">
                      <span>Coffee House Tax (8.25%)</span>
                      <span className="font-mono text-on-surface">${computedTax.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Service & Packing Charge</span>
                      <span className="font-mono text-on-surface">${deliveryOrSvcFee.toFixed(2)}</span>
                    </div>
                  </div>

                  <div className="flex justify-between items-end mb-4">
                    <span className="text-sm font-semibold text-burgundy font-display">Estimated Total</span>
                    <span className="font-mono text-xl font-bold text-primary">${orderTotal.toFixed(2)}</span>
                  </div>

                  <button
                    type="button"
                    id="checkout-now-btn"
                    onClick={() => onCheckout(discValue, appliedPromo)}
                    className="w-full bg-primary hover:bg-primary/95 text-white font-bold py-4 rounded-xl text-sm flex items-center justify-center gap-2 transition-all active:scale-95 shadow-md"
                  >
                    Proceed to Ordering
                  </button>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
}
