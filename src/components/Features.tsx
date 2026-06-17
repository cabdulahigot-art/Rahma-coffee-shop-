import { useState } from 'react';
import { motion } from 'motion/react';
import { Flame, Star, Award } from 'lucide-react';

type RoastType = 'light' | 'medium' | 'dark' | 'decaf';

interface TasteProfile {
  sweetness: number;
  acidity: number;
  body: number;
  description: string;
}

const ROAST_PROFILES: Record<RoastType, TasteProfile> = {
  light: {
    sweetness: 65,
    acidity: 90,
    body: 50,
    description: 'Bright citrus accents, delicate jasmine notes, and high vibrant acidity. Ideal for showcasing true floral variety origins.'
  },
  medium: {
    sweetness: 85,
    acidity: 60,
    body: 80,
    description: 'Perfectly balanced with rich caramel sweetness, mild fruit acidity, and a smooth medium creamy body.'
  },
  dark: {
    sweetness: 90,
    acidity: 25,
    body: 95,
    description: 'Deep, bold flavor featuring complex dark Belgian chocolate notes under low acidity, heavy full body, and robust sweet finish.'
  },
  decaf: {
    sweetness: 75,
    acidity: 35,
    body: 70,
    description: 'Polished Swiss Water processed brew maintaining full flavor warmth, toasted pecan sweetness, and standard body.'
  }
};

export default function Features() {
  const [activeRoast, setActiveRoast] = useState<RoastType>('medium');
  const profile = ROAST_PROFILES[activeRoast];

  return (
    <section id="bean-to-cup" className="py-16 md:py-20 bg-[#fcf9f8]">
      <div className="max-w-container-max mx-auto px-4 md:px-margin-desktop">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          
          {/* Bento Card 1: Taste Profile & Artisanal Process (Col-span-7) */}
          <div className="col-span-12 lg:col-span-7 bg-[#e5e2e1] rounded-[2.5rem] p-8 md:p-10 flex flex-col justify-between shadow-xs">
            <div>
              <span className="text-[#8e4e00] font-bold tracking-widest text-[11px] uppercase mb-2 block">
                Our Artisanal Roastery
              </span>
              <h2 className="font-display text-2xl md:text-3xl text-[#1c1b1b] font-extrabold mb-4">
                Taste & Roast Profile
              </h2>
              <p className="text-[#564334] text-xs sm:text-sm leading-relaxed mb-6">
                Our head roasters calibrate temperature curves for each direct-trade micro-lot, ensuring state-of-the-art timing extracts peak sweetness and aroma.
              </p>

              {/* Selector Presets */}
              <div className="mb-6">
                <span className="text-[10px] font-bold text-[#564334] block mb-3 uppercase tracking-wider">
                  Select Roast Preset:
                </span>
                <div className="flex flex-wrap gap-2">
                  {(Object.keys(ROAST_PROFILES) as RoastType[]).map((roast) => (
                    <button
                      key={roast}
                      type="button"
                      id={`roast-tab-${roast}`}
                      onClick={() => setActiveRoast(roast)}
                      className={`px-4 py-2 text-xs font-bold rounded-full border transition-all cursor-pointer ${
                        activeRoast === roast
                          ? 'bg-[#8e4e00] text-white border-[#8e4e00] shadow-sm'
                          : 'bg-white text-[#564334] border-[#dcc2ae] hover:border-[#8e4e00]/50'
                      }`}
                    >
                      {roast.toUpperCase()}
                    </button>
                  ))}
                </div>
              </div>

              {/* Dynamic Preset Note */}
              <motion.div
                key={activeRoast}
                initial={{ opacity: 0, x: -6 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-white/60 border-l-4 border-[#8e4e00] p-4 rounded-r-2xl mb-8"
              >
                <p className="text-xs font-semibold text-[#564334] italic leading-relaxed">
                  "{profile.description}"
                </p>
              </motion.div>
            </div>

            {/* Taste Metrics customized to Bento slider style */}
            <div className="space-y-4 pt-4 border-t border-[#dcc2ae]/40">
              {/* Sweetness */}
              <div className="space-y-1.5">
                <div className="flex justify-between items-center text-xs font-bold text-[#1c1b1b]">
                  <span className="uppercase tracking-wider">Melted Sweetness</span>
                  <span className="font-mono text-[#8e4e00]">{profile.sweetness}%</span>
                </div>
                <div className="h-2 bg-[#fcf9f8] rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${profile.sweetness}%` }}
                    transition={{ duration: 0.8, ease: 'easeOut' }}
                    className="h-full bg-[#8e4e00] rounded-full"
                  />
                </div>
              </div>

              {/* Acidity */}
              <div className="space-y-1.5">
                <div className="flex justify-between items-center text-xs font-bold text-[#1c1b1b]">
                  <span className="uppercase tracking-wider">Vibrant Acidity</span>
                  <span className="font-mono text-[#8e4e00]">{profile.acidity}%</span>
                </div>
                <div className="h-2 bg-[#fcf9f8] rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${profile.acidity}%` }}
                    transition={{ duration: 0.8, ease: 'easeOut' }}
                    className="h-full bg-[#8e4e00] rounded-full"
                  />
                </div>
              </div>

              {/* Body */}
              <div className="space-y-1.5">
                <div className="flex justify-between items-center text-xs font-bold text-[#1c1b1b]">
                  <span className="uppercase tracking-wider">Balanced Body</span>
                  <span className="font-mono text-[#8e4e00]">{profile.body}%</span>
                </div>
                <div className="h-2 bg-[#fcf9f8] rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${profile.body}%` }}
                    transition={{ duration: 0.8, ease: 'easeOut' }}
                    className="h-full bg-[#8e4e00] rounded-full"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Bento Card 2: Freshly Roasted Block (Col-span-5) */}
          <div className="col-span-12 lg:col-span-5 bg-[#ffdad4] text-[#410000] p-8 md:p-10 rounded-[2.5rem] flex flex-col justify-between items-center text-center relative overflow-hidden shadow-xs hover:shadow-sm transition-shadow duration-300">
            {/* Ambient background blur circles */}
            <div className="absolute -right-10 -bottom-10 w-48 h-48 bg-[#aa3527]/10 rounded-full blur-2xl pointer-events-none" />
            <div className="absolute -left-10 -top-10 w-48 h-48 bg-[#ff9000]/10 rounded-full blur-2xl pointer-events-none" />

            <div className="my-auto flex flex-col items-center z-10">
              <motion.div
                animate={{ rotate: [0, 45, 90, 135, 180, 225, 270, 315, 360] }}
                transition={{ repeat: Infinity, duration: 15, ease: 'linear' }}
                className="w-14 h-14 bg-[#aa3527] text-white rounded-full mb-6 flex items-center justify-center shadow-sm border border-white/20"
              >
                <Flame size={22} className="fill-current text-white" />
              </motion.div>
              <h3 className="font-display text-2xl font-bold mb-3 tracking-tight text-[#410000]">
                Roasted Fresh Daily
              </h3>
              <p className="text-[#6f0703] text-sm leading-relaxed max-w-xs mb-6">
                Small batches roasted locally at 5:30 AM every morning for peak vibrant flavors, served freshest.
              </p>
            </div>

            <div className="w-full pt-6 border-t border-[#aa3527]/10 flex justify-around items-center text-[10px] font-bold uppercase tracking-wider text-[#6f0703] z-10">
              <div className="flex items-center gap-1">
                <Award size={14} className="text-[#aa3527]" />
                <span>100% Organic</span>
              </div>
              <div className="flex items-center gap-1">
                <Star size={14} className="text-[#aa3527]" />
                <span>Direct Trade</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
