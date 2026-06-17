import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Check } from 'lucide-react';
import { MenuItem, MenuItemCustomization } from '../types';

interface CustomizationModalProps {
  isOpen: boolean;
  onClose: () => void;
  menuItem: MenuItem | null;
  onConfirm: (customization: MenuItemCustomization) => void;
}

export default function CustomizationModal({
  isOpen,
  onClose,
  menuItem,
  onConfirm
}: CustomizationModalProps) {
  const [size, setSize] = useState<'Standard' | 'Large'>('Standard');
  const [milk, setMilk] = useState<'Whole Milk' | 'Skim Milk' | 'Oat Milk' | 'Almond Milk' | 'None'>('Whole Milk');
  const [sweetness, setSweetness] = useState<'None' | 'Less' | 'Standard' | 'Extra'>('Standard');
  const [temperature, setTemperature] = useState<'Hot' | 'Iced'>('Hot');
  const [specialNotes, setSpecialNotes] = useState('');

  // Reset defaults when item changes or modal opens
  useEffect(() => {
    if (menuItem) {
      setSize('Standard');
      setMilk(menuItem.category === 'pastry' ? 'None' : 'Whole Milk');
      setSweetness('Standard');
      setTemperature(menuItem.id.toLowerCase().includes('iced') ? 'Iced' : 'Hot');
      setSpecialNotes('');
    }
  }, [menuItem, isOpen]);

  if (!menuItem) return null;

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    onConfirm({
      size,
      milk,
      sweetness,
      temperature,
      specialNotes: specialNotes.trim() || undefined
    });
    onClose();
  };

  const extraCost = (size === 'Large' ? 0.75 : 0) + 
    (['Oat Milk', 'Almond Milk'].includes(milk) ? 0.50 : 0);

  const totalPrice = menuItem.price + extraCost;

  return (
    <AnimatePresence>
      {isOpen && (
        <div id="custom-modal-container" className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            id="custom-modal-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          />

          {/* Modal Card */}
          <motion.div
            id="custom-modal-card"
            initial={{ scale: 0.95, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 20 }}
            transition={{ type: 'spring', duration: 0.4 }}
            className="relative w-full max-w-lg bg-surface rounded-2xl shadow-xl overflow-hidden border border-outline-variant z-10 flex flex-col max-h-[90vh]"
          >
            {/* Header image background */}
            <div className="relative h-40 bg-zinc-100 overflow-hidden">
              <img 
                src={menuItem.image} 
                alt={menuItem.name} 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent" />
              <button 
                type="button"
                id="close-custom-modal-btn"
                onClick={onClose}
                className="absolute top-4 right-4 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-colors"
                aria-label="Close"
              >
                <X size={18} />
              </button>
              <div className="absolute bottom-4 left-6 right-6 text-white">
                <span className="text-xs font-bold uppercase tracking-widest text-primary-container">
                  {menuItem.category.replace('-', ' ')}
                </span>
                <h3 className="text-2xl font-bold font-display mt-1">{menuItem.name}</h3>
              </div>
            </div>

            {/* Form */}
            <form onSubmit={handleAdd} className="p-6 overflow-y-auto flex-1 space-y-5">
              {/* Size Option */}
              <div className="space-y-2">
                <label className="text-sm font-semibold text-burgundy block font-display">Select Size</label>
                <div className="grid grid-cols-2 gap-3">
                  {(['Standard', 'Large'] as const).map((s) => (
                    <button
                      key={s}
                      type="button"
                      id={`size-btn-${s}`}
                      onClick={() => setSize(s)}
                      className={`flex justify-between items-center px-4 py-3 rounded-lg border text-sm font-medium transition-all ${
                        size === s
                          ? 'border-primary bg-primary-fixed/30 text-primary font-bold'
                          : 'border-outline-variant bg-white text-on-surface-variant hover:border-primary/50'
                      }`}
                    >
                      <span>{s}</span>
                      <span className="text-xs text-on-surface-variant/80">
                        {s === 'Large' ? '+$0.75' : 'Standard'}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Temperature Selection */}
              <div className="space-y-2">
                <label className="text-sm font-semibold text-burgundy block font-display">Serving Temperature</label>
                <div className="grid grid-cols-2 gap-3">
                  {(['Hot', 'Iced'] as const).map((temp) => (
                    <button
                      key={temp}
                      type="button"
                      id={`temp-btn-${temp}`}
                      onClick={() => setTemperature(temp)}
                      className={`flex items-center justify-center gap-2 px-4 py-3 rounded-lg border text-sm font-medium transition-all ${
                        temperature === temp
                          ? 'border-primary bg-primary-fixed/30 text-primary font-bold'
                          : 'border-outline-variant bg-white text-on-surface-variant hover:border-primary/50'
                      }`}
                    >
                      <span className={`w-2.5 h-2.5 rounded-full ${temp === 'Hot' ? 'bg-orange-500' : 'bg-sky-400'}`} />
                      <span>{temp}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Milk Option (if not pastry) */}
              {menuItem.category !== 'pastry' && (
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-burgundy block font-display">Milk Choice</label>
                  <div className="grid grid-cols-2 gap-2">
                    {(['Whole Milk', 'Skim Milk', 'Oat Milk', 'Almond Milk', 'None'] as const).map((m) => (
                      <button
                        key={m}
                        type="button"
                        id={`milk-btn-${m.replace(' ', '-')}`}
                        onClick={() => setMilk(m)}
                        className={`flex justify-between items-center px-3 py-2.5 rounded-lg border text-xs transition-all ${
                          milk === m
                            ? 'border-primary bg-primary-fixed/30 text-primary font-semibold'
                            : 'border-outline-variant bg-white text-on-surface-variant hover:border-outline'
                        }`}
                      >
                        <span>{m}</span>
                        {['Oat Milk', 'Almond Milk'].includes(m) && (
                          <span className="text-[10px] text-primary">+$0.50</span>
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Sweetness Selector (if not pastry) */}
              {menuItem.category !== 'pastry' && (
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-burgundy block font-display">Sweetness Level</label>
                  <div className="grid grid-cols-4 gap-2">
                    {(['None', 'Less', 'Standard', 'Extra'] as const).map((sweet) => (
                      <button
                        key={sweet}
                        type="button"
                        id={`sweetness-btn-${sweet}`}
                        onClick={() => setSweetness(sweet)}
                        className={`py-2 px-1 text-center rounded-lg border text-xs transition-all ${
                          sweetness === sweet
                            ? 'border-primary bg-primary-fixed/30 text-primary font-semibold'
                            : 'border-outline-variant bg-white text-on-surface-variant hover:border-outline'
                        }`}
                      >
                        {sweet}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Special Barista Notes */}
              <div className="space-y-1.5">
                <label className="text-sm font-semibold text-burgundy block font-display">Barista Instructions</label>
                <textarea
                  id="barista-notes-input"
                  value={specialNotes}
                  onChange={(e) => setSpecialNotes(e.target.value)}
                  placeholder="e.g., extra foam, caramel syrup, decaf roast..."
                  maxLength={150}
                  className="w-full h-18 text-xs p-2.5 bg-white border border-outline-variant rounded-lg focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary resize-none placeholder-on-surface-variant/55"
                />
              </div>

              {/* Sticky Footer in Form */}
              <div className="pt-4 border-t border-outline-variant/60 flex items-center justify-between gap-4">
                <div>
                  <span className="text-xs text-on-surface-variant font-medium">Subtotal</span>
                  <div className="text-xl font-bold text-burgundy font-display">${totalPrice.toFixed(2)}</div>
                </div>
                <button
                  type="submit"
                  id="confirm-customization-btn"
                  className="bg-primary text-white text-sm font-semibold px-6 py-3 rounded-lg hover:bg-primary/95 active:scale-95 transition-all flex items-center gap-1.5 shadow-sm"
                >
                  <Check size={16} />
                  Add customized
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
