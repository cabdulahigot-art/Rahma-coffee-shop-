import { motion, AnimatePresence } from 'motion/react';
import { X, Award, Gift, Clock, Sparkles, Smile } from 'lucide-react';

interface UserProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  userEmail: string;
}

export default function UserProfileModal({ isOpen, onClose, userEmail }: UserProfileModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <div id="user-profile-modal-container" className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            id="user-profile-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          />

          {/* Card */}
          <motion.div
            id="user-profile-card"
            initial={{ scale: 0.95, opacity: 0, y: 15 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 15 }}
            transition={{ type: 'spring', duration: 0.4 }}
            className="relative w-full max-w-md bg-surface rounded-2xl shadow-2xl border border-outline-variant z-10 overflow-hidden"
          >
            {/* Header banner */}
            <div className="bg-primary p-6 text-white relative">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-xl" />
              <button 
                type="button" 
                id="close-profile-btn"
                onClick={onClose}
                className="absolute top-4 right-4 text-white/85 hover:text-white p-1 rounded-full bg-black/20 hover:bg-black/35 transition-colors"
                aria-label="Close"
              >
                <X size={16} />
              </button>

              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center border border-white/20 text-primary-container">
                  <Award size={26} className="fill-current" />
                </div>
                <div>
                  <h3 className="font-display text-lg font-bold">Rahma Bean Club</h3>
                  <p className="text-[10px] text-primary-fixed uppercase tracking-widest font-bold">Bronze Tier Account</p>
                </div>
              </div>
            </div>

            {/* Content area */}
            <div className="p-6 space-y-6">
              
              {/* Profile Details Card */}
              <div className="bg-white border border-outline-variant/60 rounded-xl p-4 space-y-2">
                <span className="text-[10px] font-bold text-on-surface-variant/70 block uppercase tracking-wide">Member Information</span>
                <div className="text-xs space-y-1">
                  <div className="flex justify-between">
                    <span className="text-on-surface-variant font-semibold">User:</span>
                    <span className="font-bold text-burgundy">Coffee Lover</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-on-surface-variant font-semibold">Registered Email:</span>
                    <span className="font-bold text-on-surface select-all">{userEmail || 'guest@example.com'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-on-surface-variant font-semibold">Registered Phone:</span>
                    <span className="text-on-surface">(555) 019-2834</span>
                  </div>
                </div>
              </div>

              {/* Progress to free coffee */}
              <div className="space-y-2.5">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-bold text-burgundy font-display flex items-center gap-1">
                    <Gift size={14} className="text-primary" />
                    <span>Free Drink Reward Bar</span>
                  </span>
                  <span className="font-semibold text-primary">6 / 8 Specialty Cups</span>
                </div>
                
                <div className="relative">
                  {/* Stepper circles */}
                  <div className="flex justify-between relative z-10">
                    {[1, 2, 3, 4, 5, 6, 7, 8].map((step) => (
                      <div 
                        key={step} 
                        className={`w-6 h-6 rounded-full text-[10px] font-bold flex items-center justify-center border-2 transition-all ${
                          step <= 6 
                            ? 'bg-primary text-white border-primary shadow-xs' 
                            : 'bg-white text-zinc-400 border-zinc-200'
                        }`}
                      >
                        {step}
                      </div>
                    ))}
                  </div>
                  <div className="absolute top-3 left-3 right-3 h-0.5 bg-zinc-200 -z-10" />
                  <div className="absolute top-3 left-3 w-[72%] h-0.5 bg-primary -z-10" />
                </div>
                <p className="text-[10px] text-on-surface-variant text-center font-medium">
                  Buy 2 more handcraft cups to claim an organic Single-Origin specialty for free!
                </p>
              </div>

              {/* Membership benefits list */}
              <div className="pt-4 border-t border-outline-variant/30 space-y-2">
                <span className="text-[10px] font-bold text-burgundy uppercase block tracking-wider font-display">Special Perks unlocked:</span>
                <ul className="text-xs text-on-surface-variant space-y-1.5 list-none pl-1">
                  <li className="flex items-center gap-2">
                    <Sparkles size={12} className="text-primary flex-shrink-0" />
                    <span>Free double espresso shot on your birthday</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Clock size={12} className="text-primary flex-shrink-0" />
                    <span>Early priority queue for seasonal roasts</span>
                  </li>
                </ul>
              </div>

              {/* Friendly notice footer */}
              <div className="flex gap-2 p-3 bg-primary-fixed/20 border border-primary/20 rounded-xl text-xs font-semibold text-burgundy justify-center items-center">
                <Smile size={16} className="text-primary" />
                <span>Thank you for being a part of Rahma Coffee Shop!</span>
              </div>

            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
