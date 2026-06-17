import { useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, ShoppingCart, Info } from 'lucide-react';

interface NotificationProps {
  msg: string;
  isOpen: boolean;
  onClose: () => void;
  type?: 'success' | 'info';
}

export default function Notification({ msg, isOpen, onClose, type = 'success' }: NotificationProps) {
  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        onClose();
      }, 3500);
      return () => clearTimeout(timer);
    }
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          id="toast-notification"
          initial={{ opacity: 0, y: -20, x: '-50%' }}
          animate={{ opacity: 1, y: 0, x: '-50%' }}
          exit={{ opacity: 0, y: -20, x: '-50%' }}
          className="fixed top-24 left-1/2 -translate-x-1/2 z-50 w-full max-w-sm px-4"
        >
          <div className="bg-zinc-900 text-white p-3.5 rounded-xl shadow-xl flex items-center gap-3 border border-zinc-750/30 text-xs sm:text-sm font-semibold">
            {type === 'success' ? (
              <div className="bg-primary p-1.5 rounded-lg text-white">
                <ShoppingCart size={16} />
              </div>
            ) : (
              <div className="bg-blue-600 p-1.5 rounded-lg text-white">
                <Info size={16} />
              </div>
            )}
            <div className="flex-grow">
              <p className="leading-tight">{msg}</p>
            </div>
            <button
              onClick={onClose}
              className="text-zinc-400 hover:text-white text-xs font-bold px-1.5 py-0.5 rounded"
            >
              Okay
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
