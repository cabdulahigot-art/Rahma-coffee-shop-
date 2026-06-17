import { motion } from 'motion/react';
import { Sparkles, ArrowDown, ExternalLink } from 'lucide-react';

export default function Hero() {
  const handleScrollToMenu = () => {
    const el = document.getElementById('menu');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <section id="hero-section" className="py-8 md:py-12 bg-[#fcf9f8]">
      <div className="max-w-container-max mx-auto px-4 md:px-margin-desktop">
        
        {/* Bento Grid layout container */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          
          {/* Bento Card 1: Main Branding (Col-span-7) */}
          <div 
            id="hero-bento-branding"
            className="col-span-12 lg:col-span-7 bg-[#8e4e00] rounded-[2.5rem] p-8 md:p-12 flex flex-col justify-between relative overflow-hidden shadow-sm min-h-[460px] lg:min-h-[520px] group"
          >
            {/* Visual Abstract Decorative Elements */}
            <div className="absolute -right-20 -bottom-20 w-80 h-80 bg-[#633400] rounded-full opacity-60 transition-transform duration-700 group-hover:scale-110 pointer-events-none" />
            <div className="absolute -right-10 -bottom-10 w-64 h-64 bg-[#ff9000] rounded-full opacity-25 blur-3xl pointer-events-none" />
            <div className="absolute top-10 left-10 w-48 h-48 bg-white/5 rounded-full blur-2xl pointer-events-none" />

            <div className="z-10">
              {/* Welcome Tag */}
              <motion.div
                id="hero-tag-wrap"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="inline-flex items-center gap-1.5 px-4 y-1.5 py-1 rounded-full bg-white/10 border border-white/20 text-[#ffb779] text-xs font-bold tracking-wider uppercase mb-6"
              >
                <Sparkles size={13} className="fill-[#ffb779]/20" />
                <span>Award Winning Roastery</span>
              </motion.div>

              {/* Heading */}
              <motion.h1 
                id="hero-heading"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.1 }}
                className="font-display text-4xl sm:text-5xl md:text-6xl font-extrabold text-white leading-[1.1] tracking-tight mb-6"
              >
                Brewed to <br />
                <span className="text-[#ffb779]">Perfection</span>
              </motion.h1>

              {/* Subtitle */}
              <motion.p
                id="hero-subtitle"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.2 }}
                className="font-sans text-sm sm:text-base md:text-lg text-white/85 max-w-md leading-relaxed mb-8"
              >
                Experience the rich aroma of our handcrafted, ethically sourced, and locally roasted beans. Crafted with pure passion & micro-lot dedication in every single pour.
              </motion.p>
            </div>

            {/* Actions */}
            <motion.div
              id="hero-actions"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="z-10 flex flex-wrap items-center gap-4 mt-auto"
            >
              <button
                onClick={handleScrollToMenu}
                id="hero-order-now-btn"
                className="bg-white text-[#8e4e00] hover:bg-[#fcf9f8] font-bold px-8 py-3.5 rounded-xl text-sm transition-colors cursor-pointer shadow-sm hover:shadow active:scale-[0.98]"
              >
                Order Online
              </button>
              <button
                onClick={handleScrollToMenu}
                id="hero-explore-menu-btn"
                className="bg-transparent text-white border-2 border-white/30 hover:border-white hover:bg-white/10 font-bold px-8 py-3.5 rounded-xl text-sm transition-all cursor-pointer active:scale-[0.98]"
              >
                Explore Menu
              </button>
            </motion.div>
          </div>

          {/* Bento Card 2: Ambient Vibe Image frame (Col-span-5) */}
          <div 
            id="hero-bento-image-card"
            className="col-span-12 lg:col-span-5 rounded-[2.5rem] overflow-hidden relative shadow-sm min-h-[300px] lg:min-h-0 flex flex-col justify-end group cursor-pointer"
            onClick={handleScrollToMenu}
          >
            {/* Img background */}
            <img 
              alt="Premium freshly brewed cappuccino with latte art and golden butter croissant" 
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCsTWp8xdHMTmBrpxM1wDZ6L75bjx6Jt3SdyNHKRF417uw0Xd-sXXVPYfZ5VaV_JBIaphKA2-8oko8NOdYESmLui4ApWmeafXRfQiCoirFRubscy09ptmtXsbeDmXUTDdBOn_djKt-CZEtSgNjlVrW-muFR2MwYSG5fRMpuqePjCFfhAlua1AR3H1mMHO8GsY7sWtLnErivJa6Vr8JFNMp6CT552eQM67yrsVKkt9otwkTSD90VUWY98wkmqoG8LUvw0K28ztVDBseU"
              referrerPolicy="no-referrer"
            />
            {/* Gentle dark gradient cover */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent transition-opacity duration-300 pointer-events-none" />

            <div className="relative z-10 p-8 m-4 bg-white/95 backdrop-blur-md rounded-3xl shadow-md border border-white/30 transform transition-transform duration-300 hover:translate-y-[-2px]">
              <span className="text-[10px] uppercase font-bold tracking-widest text-[#8e4e00] block mb-1">
                The Aroma House Specialty
              </span>
              <h3 className="font-display text-xl font-bold text-[#1c1b1b] mb-1.5 flex items-center justify-between">
                <span>Latte Art Daily Special</span>
                <ExternalLink size={14} className="text-[#8e4e00]" />
              </h3>
              <p className="text-xs text-[#564334] leading-relaxed">
                Award-winning espresso blended perfectly with silky, steamed local milk and microfoam art. Order today alongside freshly baked French croissants.
              </p>
            </div>
          </div>

        </div>

        {/* Decorative arrow helper */}
        <div className="mt-8 flex flex-col items-center gap-1 opacity-60 animate-bounce cursor-pointer justify-center" onClick={handleScrollToMenu}>
          <span className="text-[10px] font-extrabold text-[#564334] uppercase tracking-widest">Discover More Below</span>
          <ArrowDown size={12} className="text-[#8e4e00]" />
        </div>

      </div>
    </section>
  );
}
