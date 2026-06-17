import { TESTIMONIALS } from '../data';
import { Star, ShieldCheck, Award, Leaf, MapPin, Calendar, Compass, ArrowUpRight } from 'lucide-react';

export default function StorySection() {
  const founder = TESTIMONIALS[0];

  return (
    <section id="our-story" className="py-16 md:py-20 bg-[#fcf9f8]">
      <div className="max-w-container-max mx-auto px-4 md:px-margin-desktop space-y-8">
        
        {/* Row 1: Ethical Sourcing collage (Bento columns) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          
          {/* Sourcing details (Col-span-7) */}
          <div className="col-span-12 lg:col-span-7 bg-[#f0eded] text-[#1c1b1b] p-8 md:p-10 rounded-[2.5rem] flex flex-col justify-between shadow-xs">
            <div>
              <span className="text-[10px] font-bold text-[#8e4e00] tracking-widest uppercase block mb-2">
                Ethical Sourcing & Community
              </span>
              <h2 className="font-display text-2xl md:text-3xl font-extrabold text-[#1c1b1b] tracking-tight mb-4">
                Honoring Every Single Grower
              </h2>
              <p className="text-[#564334] text-xs sm:text-sm leading-relaxed mb-6 font-medium">
                At Rahma Coffee Shop, our focus extends light years beyond the final pour. We partner directly with family-run farms in Colombia, Ethiopia, and Sumatra to guarantee fair-wage micro-lot trades. This "Direct Sourcing" model secures stable income for farmers while delivering the earth's premium organic beans to our local roasting drum.
              </p>
            </div>
            
            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-[#dcc2ae]/40">
              <div className="space-y-1">
                <div className="text-[#8e4e00]"><ShieldCheck size={20} className="stroke-[2.5]" /></div>
                <h4 className="text-[11px] font-bold text-[#1c1b1b] uppercase font-display tracking-tight">100% Certified</h4>
                <p className="text-[9px] text-[#564334] font-medium">Organic & direct trade</p>
              </div>
              <div className="space-y-1">
                <div className="text-[#8e4e00]"><Award size={20} className="stroke-[2.5]" /></div>
                <h4 className="text-[11px] font-bold text-[#1c1b1b] uppercase font-display tracking-tight">Micro-Lots</h4>
                <p className="text-[9px] text-[#564334] font-medium">Traceable to single estates</p>
              </div>
              <div className="space-y-1">
                <div className="text-[#8e4e00]"><Leaf size={20} className="stroke-[2.5]" /></div>
                <h4 className="text-[11px] font-bold text-[#1c1b1b] uppercase font-display tracking-tight">Eco Friendly</h4>
                <p className="text-[9px] text-[#564334] font-medium">Carbon neutral roasting</p>
              </div>
            </div>
          </div>

          {/* Sourcing image (Col-span-5) */}
          <div className="col-span-12 lg:col-span-5 rounded-[2.5rem] overflow-hidden shadow-xs relative min-h-[300px] group">
            <img 
              src="https://images.unsplash.com/photo-1442512595331-e89e73853f31?auto=format&fit=crop&q=80&w=800" 
              alt="Ethical espresso roasting process and vintage green grinder" 
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#8e4e00]/60 via-transparent to-transparent pointer-events-none" />
            <div className="absolute bottom-6 left-6 right-6">
              <span className="bg-white/90 backdrop-blur-md text-[#8e4e00] text-[10px] font-bold uppercase tracking-wider px-3.5 py-1.5 rounded-full inline-flex items-center gap-1">
                <Compass size={11} className="animate-spin-slow" />
                <span>Our Roasting Lab</span>
              </span>
            </div>
          </div>
        </div>

        {/* Row 2: Testimonial & Consistency Rating block (Bento columns) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          
          {/* Testimonial Card (Col-span-8) */}
          <div id="testimonials" className="col-span-12 lg:col-span-8 bg-white border border-[#dcc2ae] rounded-[2.5rem] p-8 md:p-10 relative overflow-hidden shadow-xs flex flex-col justify-between">
            <div className="absolute top-0 right-0 w-44 h-44 bg-[#ff9000]/5 rounded-full blur-3xl -z-10" />
            
            <div className="flex gap-1 text-amber-500 mb-6">
              {[...Array( founder.rating )].map((_, i) => (
                <Star key={i} size={15} className="fill-current text-[#ff9000]" />
              ))}
            </div>
            
            <blockquote className="font-display text-base sm:text-lg md:text-xl text-[#1c1b1b] font-bold leading-relaxed italic mb-8">
              "{founder.comment}"
            </blockquote>

            <div className="flex items-center gap-3 pt-4 border-t border-[#dcc2ae]/45 w-fit">
              <img 
                src={founder.avatar} 
                alt={founder.name} 
                className="w-12 h-12 rounded-full border border-[#8e4e00]/20 object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="text-left">
                <h4 className="text-xs font-extrabold text-[#1c1b1b] tracking-wide uppercase">{founder.name}</h4>
                <p className="text-[10px] text-[#564334] font-medium">{founder.role}</p>
              </div>
            </div>
          </div>

          {/* Accent Block: Consistency Rating (Col-span-4) */}
          <div className="col-span-12 lg:col-span-4 bg-[#00b8fd] rounded-[2.5rem] p-8 md:p-10 flex flex-col justify-center items-center text-white text-center shadow-xs group hover:scale-[1.01] transition-all duration-300 relative overflow-hidden select-none">
            {/* Background floating overlay */}
            <div className="absolute -right-10 -bottom-10 w-36 h-36 bg-white/10 rounded-full blur-xl pointer-events-none" />
            <div className="absolute -left-10 -top-10 w-36 h-36 bg-black/10 rounded-full blur-xl pointer-events-none" />
            
            <div className="text-7xl md:text-8xl font-serif italic mb-2 font-black tracking-tighter drop-shadow-sm group-hover:scale-105 transition-transform duration-500">
              98
            </div>
            <p className="text-xs font-bold tracking-widest uppercase mb-1">Consistency Rating</p>
            <p className="text-white/80 text-[10px] font-medium max-w-[180px] leading-relaxed">
              Calculated dynamically over 12,000+ hand-pulled espresso shots this year.
            </p>
          </div>
        </div>

        {/* Row 3: Visit Us (Col-span-6) & FAQ (Col-span-6) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch pt-4">
          
          {/* Location Block (Col-span-6) */}
          <div className="col-span-12 lg:col-span-6 bg-[#f0eded] rounded-[2.5rem] p-8 md:p-10 flex justify-between items-end relative overflow-hidden shadow-xs hover:shadow-sm transition-all group">
            <div className="space-y-4">
              <span className="inline-flex items-center gap-1 bg-white/80 text-[#8e4e00] px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-wider">
                <MapPin size={10} />
                <span>Downtown Store</span>
              </span>
              <div>
                <h3 className="text-xl font-bold text-[#1c1b1b]">Visit Our Coffee Bar</h3>
                <p className="text-xs text-[#564334] mt-2 leading-relaxed">
                  101 Specialty Brew Blvd, Downtown<br/>
                  Open Daily: 06:00 — 21:00
                </p>
              </div>
            </div>
            <a 
              href="https://maps.google.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-xs hover:bg-[#8e4e00] hover:text-white transition-colors cursor-pointer text-[#8e4e00] shrink-0"
              aria-label="Find store on map"
            >
              <ArrowUpRight size={18} className="stroke-[2.5]" />
            </a>
          </div>

          {/* Quick FAQ/Help (Col-span-6) */}
          <div className="col-span-12 lg:col-span-6 bg-white border border-[#dcc2ae] rounded-[2.5rem] p-8 md:p-10 flex flex-col justify-between shadow-xs">
            <div className="space-y-1.5">
              <span className="inline-flex items-center gap-1 bg-amber-50 text-amber-800 px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-wider">
                <Calendar size={10} />
                <span>Live Brew Stats</span>
              </span>
              <h3 className="text-lg font-bold text-[#1c1b1b] pt-1">Fresh & Traceable</h3>
              <p className="text-xs text-[#564334] leading-relaxed">
                Placing an order launches a real live brew progress tracker. You can monitor grinding, extracting, and packing milestones directly on your receipt page.
              </p>
            </div>
            <div className="pt-4 border-t border-[#dcc2ae]/40 flex items-center gap-2 text-[10px] font-bold text-[#8e4e00]">
              <span>In-house Daily Batch Roasting starts at 5:00 AM</span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
