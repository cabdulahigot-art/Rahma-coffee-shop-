import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, CheckCircle2, ChevronRight, Store, MapPin, CreditCard, Receipt, Clock, Smile } from 'lucide-react';
import { CartItem, OrderDetails } from '../types';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  discountAmount: number;
  appliedPromo: string;
  onOrderSuccess: () => void;
}

export default function CheckoutModal({
  isOpen,
  onClose,
  cartItems,
  discountAmount,
  appliedPromo,
  onOrderSuccess
}: CheckoutModalProps) {
  const [step, setStep] = useState<'form' | 'success'>('form');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [orderType, setOrderType] = useState<'pickup' | 'delivery'>('pickup');
  const [pickupTime, setPickupTime] = useState('As soon as possible');
  const [address, setAddress] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'apple-pay' | 'cash'>('card');
  const [baristaNote, setBaristaNote] = useState('');
  const [orderNum, setOrderNum] = useState('');
  const [progressStep, setProgressStep] = useState(1); // progress timeline

  useEffect(() => {
    if (isOpen) {
      setStep('form');
      setProgressStep(1);
    }
  }, [isOpen]);

  // Handle auto timeline stepper for order status once success is shown!
  useEffect(() => {
    if (step === 'success') {
      const timer1 = setTimeout(() => setProgressStep(2), 3000); // grinding
      const timer2 = setTimeout(() => setProgressStep(3), 8500); // brewing
      const timer3 = setTimeout(() => setProgressStep(4), 16000); // packing/ready
      return () => {
        clearTimeout(timer1);
        clearTimeout(timer2);
        clearTimeout(timer3);
      };
    }
  }, [step]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !phone) {
      alert('Please fill out all required fields.');
      return;
    }
    if (orderType === 'delivery' && !address) {
      alert('Please enter your delivery street address.');
      return;
    }

    // Generate simulated order reference code
    const rand = Math.floor(1000 + Math.random() * 9000);
    setOrderNum(`BREW-${rand}`);
    
    // Switch view step
    setStep('success');
  };

  const calculateSubtotal = () => {
    return cartItems.reduce((acc, item) => {
      let itemPrice = item.menuItem.price;
      if (item.customization.size === 'Large') {
        itemPrice += 0.75;
      }
      if (['Oat Milk', 'Almond Milk'].includes(item.customization.milk)) {
        itemPrice += 0.50;
      }
      return acc + (itemPrice * item.quantity);
    }, 0);
  };

  const subtotal = calculateSubtotal();
  const tax = (subtotal - discountAmount) * 0.0825;
  const deliveryOrSvcFee = subtotal > 0 ? 1.50 : 0;
  const total = subtotal - discountAmount + tax + deliveryOrSvcFee;

  // Render Simulated Success Bill
  const renderSuccess = () => (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      id="receipt-success-view"
      className="p-6 md:p-8 space-y-6 text-center max-h-[85vh] overflow-y-auto"
    >
      <div className="flex flex-col items-center justify-center">
        <motion.div
          initial={{ scale: 0.6 }}
          animate={{ scale: 1, rotate: [0, 10, -10, 0] }}
          transition={{ type: 'spring', duration: 0.5 }}
          className="bg-emerald-50 text-emerald-600 p-4 rounded-full mb-3"
        >
          <CheckCircle2 size={46} className="stroke-[2.5]" />
        </motion.div>
        
        <h3 className="font-display text-2xl font-bold text-burgundy">Barista Received Order!</h3>
        <p className="text-xs text-emerald-800 font-semibold bg-emerald-100/60 px-4 py-1.5 rounded-full mt-2 inline-block">
          Order Code: {orderNum}
        </p>
      </div>

      {/* Progress timeline tracker */}
      <div className="bg-zinc-50 border border-outline-variant/60 rounded-xl p-4 text-left space-y-4">
        <div className="flex justify-between items-center pb-2 border-b border-zinc-200">
          <span className="text-xs font-bold text-burgundy uppercase font-display">Brew Progress Tracker</span>
          <span className="text-[10px] text-zinc-500 font-mono italic animate-pulse">Live status</span>
        </div>
        
        <div className="grid grid-cols-4 gap-2 relative">
          {/* Stepper bubbles */}
          {[
            { step: 1, label: 'Verified', desc: 'Order approved' },
            { step: 2, label: 'Grinding', desc: 'Fresh coffee beans' },
            { step: 3, label: 'Brewing', desc: 'Extracting espresso' },
            { step: 4, label: 'Ready', desc: orderType === 'pickup' ? 'Counter pick' : 'With driver' }
          ].map((s) => (
            <div key={s.step} className="flex flex-col items-center text-center">
              <div 
                className={`w-7 h-7 rounded-full text-xs font-bold flex items-center justify-center border-2 mb-1.5 transition-all ${
                  progressStep >= s.step 
                    ? 'bg-primary text-white border-primary shadow-sm' 
                    : 'bg-white text-zinc-400 border-zinc-200'
                }`}
              >
                {s.step}
              </div>
              <span className={`text-[10px] font-bold block ${progressStep >= s.step ? 'text-primary' : 'text-zinc-400'}`}>
                {s.label}
              </span>
              <span className="text-[9px] text-zinc-400 hidden xs:block">{s.desc}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Order details description */}
      <div className="bg-white border border-outline-variant rounded-xl p-4 text-left space-y-3 shadow-xs">
        <div className="flex justify-between text-xs text-on-surface-variant font-semibold">
          <span>Delivery Option: {orderType === 'pickup' ? 'Pickup Counter' : 'Delivery Address'}</span>
          <span>Payment: {paymentMethod === 'card' ? 'Visa *4242' : paymentMethod === 'apple-pay' ? 'Apple Pay NFC' : 'Pay at Counter'}</span>
        </div>
        
        {orderType === 'pickup' ? (
          <div className="flex gap-2 p-2.5 bg-zinc-50 rounded-lg text-xs font-medium text-burgundy">
            <Clock size={16} className="text-primary flex-shrink-0" />
            <span>Target preparation time: <strong>{pickupTime}</strong></span>
          </div>
        ) : (
          <div className="flex gap-2 p-2.5 bg-zinc-50 rounded-lg text-xs font-medium text-burgundy">
            <MapPin size={16} className="text-primary flex-shrink-0" />
            <span>Delivered immediately to: <strong>{address}</strong></span>
          </div>
        )}

        {/* Bill summary list */}
        <div className="border-t border-zinc-150 pt-3 space-y-1.5 text-xs text-on-surface-variant">
          {cartItems.map((item) => (
            <div key={item.id} className="flex justify-between">
              <span>{item.quantity}x {item.menuItem.name} {item.customization.size !== 'Standard' && `(${item.customization.size})`}</span>
              <span className="font-mono">${(item.menuItem.price * item.quantity).toFixed(2)}</span>
            </div>
          ))}
          
          <div className="border-t border-zinc-100 pt-2 flex justify-between font-bold text-burgundy font-display">
            <span>Amount Charged</span>
            <span className="font-mono text-primary text-sm">${total.toFixed(2)}</span>
          </div>
        </div>
      </div>

      {/* Quick notice of real operation flow */}
      <div className="flex items-center gap-2 p-3 bg-primary-fixed/20 border border-primary/20 rounded-xl text-left text-xs leading-relaxed text-burgundy font-medium justify-center">
        <Smile size={18} className="text-primary flex-shrink-0" />
        <span>Come on in! Present Order Code <strong>{orderNum}</strong> at the counter when you arrive.</span>
      </div>

      {/* Submit / Finish button */}
      <button
        onClick={() => {
          onOrderSuccess(); // clear basket
          onClose(); // close
        }}
        id="finish-checkout-btn"
        className="w-full bg-primary text-white py-3.5 rounded-xl text-sm font-bold shadow-md hover:opacity-90 transition-all cursor-pointer"
      >
        Done & Start New Order
      </button>
    </motion.div>
  );

  return (
    <AnimatePresence>
      {isOpen && (
        <div id="checkout-modal-backdrop-wrap" className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-hidden">
          {/* Backdrop screen */}
          <motion.div
            id="checkout-modal-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          />

          {/* Form Card */}
          <motion.div
            id="checkout-modal-card"
            initial={{ scale: 0.95, opacity: 0, y: 15 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 15 }}
            transition={{ type: 'spring', duration: 0.4 }}
            className="relative w-full max-w-xl bg-surface rounded-2xl shadow-2xl border border-outline-variant z-10 overflow-hidden"
          >
            {/* Header section with X button */}
            <div className="p-5 border-b border-outline-variant flex justify-between items-center bg-white">
              <div className="flex items-center gap-2">
                <Receipt className="text-primary" size={20} />
                <h3 className="font-display text-lg font-bold text-burgundy">
                  {step === 'form' ? 'Checkout & Place Order' : 'Order Receipt Summary'}
                </h3>
              </div>
              <button
                type="button"
                id="close-checkout-header-btn"
                onClick={onClose}
                className="p-1.5 rounded-full hover:bg-zinc-150 text-on-surface-variant transition-colors"
                aria-label="Close"
              >
                <X size={18} />
              </button>
            </div>

            {step === 'form' ? (
              <form onSubmit={handleSubmit} className="p-6 md:p-8 space-y-5 max-h-[80vh] overflow-y-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Name field */}
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-burgundy block uppercase tracking-wider font-display">Customer Name *</label>
                    <input
                      required
                      type="text"
                      id="checkout-name-input"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Liam Smith"
                      className="w-full text-xs sm:text-sm p-2.5 bg-white border border-outline-variant rounded-lg focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary placeholder-on-surface-variant/40"
                    />
                  </div>

                  {/* Phone field */}
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-burgundy block uppercase tracking-wider font-display">Phone Number *</label>
                    <input
                      required
                      type="tel"
                      id="checkout-phone-input"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="e.g. (555) 019-2834"
                      className="w-full text-xs sm:text-sm p-2.5 bg-white border border-outline-variant rounded-lg focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary placeholder-on-surface-variant/40"
                    />
                  </div>
                </div>

                {/* Email address */}
                <div className="space-y-1">
                  <label className="text-xs font-bold text-burgundy block uppercase tracking-wider font-display">Email Address *</label>
                  <input
                    required
                    type="email"
                    id="checkout-email-input"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="e.g. liam@example.com"
                    className="w-full text-xs sm:text-sm p-2.5 bg-white border border-outline-variant rounded-lg focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary placeholder-on-surface-variant/40"
                  />
                </div>

                {/* Order Type Delivery Selector toggle buttons */}
                <div className="space-y-2">
                  <label className="text-xs font-bold text-burgundy block uppercase tracking-wider font-display">Service Choice</label>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      type="button"
                      id="order-pickup-btn"
                      onClick={() => setOrderType('pickup')}
                      className={`flex items-center justify-center gap-2 p-3 rounded-lg border text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                        orderType === 'pickup'
                          ? 'border-primary bg-primary-fixed/30 text-primary'
                          : 'border-outline-variant bg-white text-on-surface-variant hover:border-primary/50'
                      }`}
                    >
                      <Store size={15} />
                      <span>Regular Bar Counter Pickup</span>
                    </button>
                    <button
                      type="button"
                      id="order-delivery-btn"
                      onClick={() => setOrderType('delivery')}
                      className={`flex items-center justify-center gap-2 p-3 rounded-lg border text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                        orderType === 'delivery'
                          ? 'border-primary bg-primary-fixed/30 text-primary'
                          : 'border-outline-variant bg-white text-on-surface-variant hover:border-primary/50'
                      }`}
                    >
                      <MapPin size={15} />
                      <span>Deliver to doorstep</span>
                    </button>
                  </div>
                </div>

                {/* Conditional forms based on Pickup vs Delivery */}
                {orderType === 'pickup' ? (
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-burgundy block uppercase tracking-wider font-display">Pickup Schedule Time</label>
                    <select
                      id="pickup-time-select"
                      value={pickupTime}
                      onChange={(e) => setPickupTime(e.target.value)}
                      className="w-full text-xs sm:text-sm p-2.5 bg-white border border-outline-variant rounded-lg focus:outline-none focus:ring-1 focus:ring-primary"
                    >
                      <option value="As soon as possible">As soon as possible (~10-15 Min Ready)</option>
                      <option value="In 15 minutes">In 15 minutes</option>
                      <option value="In 30 minutes">In 30 minutes</option>
                      <option value="In 1 hour">In 1 hour</option>
                      <option value="In 2 hours">In 2 hours</option>
                    </select>
                  </div>
                ) : (
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-burgundy block uppercase tracking-wider font-display">Street Address for Delivery *</label>
                    <input
                      required={orderType === 'delivery'}
                      type="text"
                      id="delivery-address-input"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      placeholder="e.g. 104 Fresh Bean Way, Apt 3"
                      className="w-full text-xs sm:text-sm p-2.5 bg-white border border-outline-variant rounded-lg focus:outline-none focus:ring-1 focus:ring-primary placeholder-on-surface-variant/40"
                    />
                  </div>
                )}

                {/* Payment Selection Options */}
                <div className="space-y-2">
                  <label className="text-xs font-bold text-burgundy block uppercase tracking-wider font-display">Simulated Secure Payment Provider</label>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { id: 'card', label: 'Credit Card', icon: CreditCard },
                      { id: 'apple-pay', label: 'Apple Pay', icon: Smile },
                      { id: 'cash', label: 'Pay at Counter', icon: Store }
                    ].map((p) => {
                      const IconComp = p.icon;
                      return (
                        <button
                          key={p.id}
                          type="button"
                          id={`pay-method-${p.id}`}
                          onClick={() => setPaymentMethod(p.id as any)}
                          className={`flex flex-col items-center justify-center p-2.5 rounded-lg border text-center transition-all cursor-pointer ${
                            paymentMethod === p.id
                              ? 'border-primary bg-primary-fixed/20 text-primary font-semibold'
                              : 'border-outline-variant bg-white text-on-surface-variant hover:border-outline'
                          }`}
                        >
                          <IconComp size={16} className="mb-1 text-primary" />
                          <span className="text-[10px] whitespace-nowrap">{p.label}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Additional barista requests */}
                <div className="space-y-1">
                  <label className="text-xs font-bold text-burgundy block uppercase tracking-wider font-display">Any other request?</label>
                  <input
                    type="text"
                    id="checkout-notes-input"
                    value={baristaNote}
                    onChange={(e) => setBaristaNote(e.target.value)}
                    placeholder="e.g. Leave on bench outside if delivery..."
                    className="w-full text-xs p-2.5 bg-white border border-outline-variant rounded-lg focus:outline-none focus:ring-1 focus:ring-primary placeholder-on-surface-variant/40"
                  />
                </div>

                {/* Form submit confirmation and billing summaries */}
                <div className="pt-4 border-t border-outline-variant/60 flex items-center justify-between gap-4">
                  <div>
                    <span className="text-[11px] text-on-surface-variant font-medium block">Total Payable</span>
                    <span className="text-base sm:text-lg font-bold text-primary font-mono">${total.toFixed(2)}</span>
                  </div>
                  <button
                    type="submit"
                    id="confirm-checkout-submit-btn"
                    className="bg-primary hover:bg-primary/95 text-white text-xs sm:text-sm font-bold px-6 py-3 rounded-xl flex items-center gap-1 shadow-md cursor-pointer"
                  >
                    <span>Place Order</span>
                    <ChevronRight size={14} />
                  </button>
                </div>
              </form>
            ) : (
              renderSuccess()
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
