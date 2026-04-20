"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence, useInView, animate } from "framer-motion";
import { ChevronDown, ArrowRight, Building2, Users, Ticket, X, Sun, Moon, Play, ChevronRight, ChevronLeft, Menu } from "lucide-react";

// --- CUSTOM CURSOR ---
function CustomCursor() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (['A', 'BUTTON', 'LI'].includes(target.tagName) || target.closest('.cursor-pointer') || target.closest('button')) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener("mousemove", updateMousePosition);
    window.addEventListener("mouseover", handleMouseOver);
    return () => {
      window.removeEventListener("mousemove", updateMousePosition);
      window.removeEventListener("mouseover", handleMouseOver);
    };
  }, []);

  return (
    <motion.div
      className="fixed top-0 left-0 w-8 h-8 rounded-full border border-accent-gold pointer-events-none z-[99999] hidden md:block"
      style={{ mixBlendMode: 'difference' }}
      animate={{
        x: mousePosition.x - 16,
        y: mousePosition.y - 16,
        scale: isHovering ? 2.5 : 1,
        backgroundColor: isHovering ? "rgba(197, 160, 89, 0.15)" : "transparent"
      }}
      transition={{ type: "spring", stiffness: 400, damping: 28, mass: 0.5 }}
    />
  );
}

// --- ANIMATED COUNTER ---
function AnimatedCounter({ to, duration = 2 }: { to: number; duration?: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (inView) {
      const controls = animate(0, to, {
        duration,
        ease: "easeOut",
        onUpdate(value) {
          setValue(Math.round(value));
        }
      });
      return () => controls.stop();
    }
  }, [inView, to, duration]);

  return <span ref={ref}>{value}</span>;
}

// --- SLIDE 0: HERO OVERVIEW ---
function HeroSlide({ theme, nextSlide }: { theme: string, nextSlide: () => void }) {
  const titleWords = ["AMERICAN", "DREAM"];
  return (
    <div className="relative w-full h-full flex flex-col justify-center items-center overflow-hidden">
      <div className={`absolute inset-0 z-0 ${theme === 'dark' ? 'bg-black' : 'bg-background'}`}>
        <video
          autoPlay
          muted
          loop
          playsInline
          poster="https://images.unsplash.com/photo-1511556820780-d912e42b4980?q=80&w=2574&auto=format&fit=crop"
          className={`w-full h-full object-cover transition-opacity duration-1000 ${theme === 'dark' ? 'opacity-80 mix-blend-screen contrast-125' : 'opacity-40 saturate-50'}`}
        >
          <source src="https://assets.mixkit.co/videos/preview/mixkit-particles-of-sand-and-yellow-dust-12190-large.mp4" type="video/mp4" />
          <source src="https://assets.mixkit.co/videos/preview/mixkit-aerial-view-of-city-traffic-and-skyscrapers-3103-large.mp4" type="video/mp4" />
        </video>
        <div className={`absolute inset-0 bg-gradient-to-t ${theme === 'dark' ? 'from-background via-background/40' : 'from-background via-background/60'} to-transparent`} />
      </div>

      <div className="z-10 text-center px-4 max-w-5xl mx-auto flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="flex items-center gap-3 mb-6"
        >
          <div className="h-[1px] w-12 bg-accent-gold" />
          <span className="uppercase tracking-[0.3em] text-accent-gold text-sm font-semibold">Interactive Sales Deck</span>
          <div className="h-[1px] w-12 bg-accent-gold" />
        </motion.div>

        <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter mb-8 text-foreground drop-shadow-xl overflow-hidden flex flex-col items-center">
          {titleWords.map((word, wordIdx) => (
            <div key={wordIdx} className="overflow-hidden flex">
              {Array.from(word).map((letter, letterIdx) => (
                <motion.span
                  key={letterIdx}
                  initial={{ y: "150%" }}
                  animate={{ y: "0%" }}
                  transition={{
                    duration: 0.8,
                    ease: [0.33, 1, 0.68, 1],
                    delay: 0.3 + (wordIdx * 0.2) + (letterIdx * 0.04)
                  }}
                  className="inline-block"
                >
                  {letter}
                </motion.span>
              ))}
            </div>
          ))}
        </h1>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.2 }}
          className="text-lg md:text-xl text-foreground opacity-90 max-w-3xl font-light leading-relaxed drop-shadow-md mt-4"
        >
          <p className="mb-4">Not just a mall. A 3-million square foot city of retail, dining, and endless entertainment.</p>
          <p className="text-base md:text-lg opacity-80">It transcends traditional retail, acting as a global lifestyle destination that seamlessly blends world-class shopping, diverse dining experiences, and record-breaking attractions under one roof. We draw millions of international and domestic visitors annually, turning foot traffic into measurable brand growth.</p>
        </motion.div>
      </div>
    </div>
  );
}

// --- SLIDE 1: SCALE & DATA ---
function ScaleSlide() {
  return (
    <div className="w-full h-full bg-background flex flex-col justify-center px-6 md:px-16 overflow-y-auto pt-16">
      <div className="max-w-6xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-10 items-center pb-24">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-foreground leading-tight">Unprecedented <br /><span className="text-accent-gold">Scale.</span></h2>
          <div className="text-lg text-foreground opacity-80 font-light mb-10 leading-relaxed max-w-xl">
            <p className="mb-4">Located minutes from New York City, drawing from a population of 20+ million. This is a captive audience at an unimaginable scale.</p>
            <p className="text-base">Our location provides unparalleled access to one of the most affluent and densely populated MSAs in the world. Visitors don't just stop by; our diverse mix of attractions drives an average dwell time of over 4 hours—more than triple the industry standard. This translates directly to increased impressions, higher basket sizes, and unprecedented brand exposure.</p>
          </div>

          <div className="grid grid-cols-2 gap-x-6 gap-y-10">
            <div className="border-l-2 border-accent-gold/40 pl-5">
              <div className="text-3xl lg:text-4xl font-bold mb-1 text-foreground font-serif">
                <AnimatedCounter to={40} duration={2} />M+
              </div>
              <div className="text-xs tracking-wider uppercase text-foreground opacity-60 font-semibold">Annual Visitors</div>
            </div>
            <div className="border-l-2 border-accent-gold/40 pl-5">
              <div className="text-3xl lg:text-4xl font-bold mb-1 text-foreground font-serif">
                <AnimatedCounter to={3} duration={1.5} />M+
              </div>
              <div className="text-xs tracking-wider uppercase text-foreground opacity-60 font-semibold">Square Feet</div>
            </div>
            <div className="border-l-2 border-accent-gold/40 pl-5">
              <div className="text-3xl lg:text-4xl font-bold mb-1 text-foreground font-serif">
                <AnimatedCounter to={450} duration={2.5} />+
              </div>
              <div className="text-xs tracking-wider uppercase text-foreground opacity-60 font-semibold">Retail & Dining</div>
            </div>
            <div className="border-l-2 border-accent-gold/40 pl-5">
              <div className="text-3xl lg:text-4xl font-bold mb-1 text-foreground font-serif">
                <AnimatedCounter to={15} duration={1.5} />+
              </div>
              <div className="text-xs tracking-wider uppercase text-foreground opacity-60 font-semibold">Major Attractions</div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="relative h-[400px] w-full rounded-2xl overflow-hidden group shadow-2xl border border-card-border"
        >
          <img
            src="https://images.unsplash.com/photo-1496309732348-3627f3f040ee?q=80&w=2548&auto=format&fit=crop"
            alt="New York Skyline"
            className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-all duration-700" />
        </motion.div>
      </div>
    </div>
  );
}

// --- SLIDE 2: THE AVENUE ---
function AvenueSlide() {
  const brands = [
    { name: "Hermès", src: "https://images.unsplash.com/photo-1549439602-43ebca2327af?q=80&w=2670&auto=format&fit=crop" },
    { name: "Saint Laurent", src: "https://images.unsplash.com/photo-1560243563-062bfc001d68?q=80&w=2670&auto=format&fit=crop" },
    { name: "Gucci", src: "https://images.unsplash.com/photo-1555529771-835f59fc5efe?q=80&w=2574&auto=format&fit=crop" },
    { name: "Balenciaga", src: "https://images.unsplash.com/photo-1581044777550-4cfa60707c03?q=80&w=2668&auto=format&fit=crop" },
    { name: "Louis Vuitton", src: "https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?q=80&w=2670&auto=format&fit=crop" },
  ];

  return (
    <div className="w-full h-full bg-card-bg flex flex-col justify-center px-6 md:px-16 pt-16 pb-20 relative">
      <div className="absolute left-0 top-0 w-1/6 h-full bg-gradient-to-r from-card-bg to-transparent z-10 pointer-events-none hidden md:block" />
      <div className="absolute right-0 top-0 w-1/6 h-full bg-gradient-to-l from-card-bg to-transparent z-10 pointer-events-none hidden md:block" />

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full z-20 mb-6 shrink-0 md:pl-6"
      >
        <span className="text-accent-gold uppercase tracking-widest text-xs font-semibold block mb-2">Retail Showcase</span>
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-4 font-serif text-foreground">The Avenue</h2>
        <div className="text-lg text-foreground opacity-80 font-light leading-relaxed max-w-2xl">
          <p className="mb-3">An unrivaled curation of the world's most prestigious luxury houses, set within a breathtaking, art-filled concourse.</p>
          <p className="text-base hidden md:block">Designed for the discerning consumer, The Avenue rivals the world's greatest shopping streets. Surrounded by Michelin-starred dining concepts and VIP valet services, it offers an exclusive ecosystem where high-net-worth visitors engage with ultra-premium brands in a highly controlled, sophisticated environment.</p>
        </div>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="flex gap-4 z-20 items-center overflow-x-auto pb-4 snap-x snap-mandatory px-2 md:px-6 hide-scrollbar flex-1 min-h-[300px]"
      >
        {brands.map((brand, i) => (
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 + i * 0.1 }}
            key={brand.name}
            className="w-[85vw] md:w-[40vw] lg:w-[350px] h-full max-h-[450px] shrink-0 relative rounded-2xl overflow-hidden group cursor-pointer shadow-lg border border-card-border snap-center"
          >
            <img src={brand.src} alt={brand.name} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-80 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="absolute bottom-6 left-6 right-6">
              <div className="text-white text-2xl font-serif font-semibold transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500">{brand.name}</div>
              <div className="text-accent-gold text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-500 mt-2 flex items-center gap-1 font-medium tracking-wide uppercase">
                View Renderings <ArrowRight className="w-3 h-3" />
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}

// --- SLIDE 3: ENTERTAINMENT ---
function EntertainmentSlide({ openEvents }: { openEvents: () => void }) {
  return (
    <div className="w-full h-full bg-background flex flex-col justify-center px-6 md:px-16 pt-16 pb-20 overflow-y-auto">
      <div className="max-w-6xl mx-auto w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col md:flex-row justify-between items-end mb-8"
        >
          <div>
            <span className="text-accent-gold uppercase tracking-widest text-xs font-semibold block mb-2">Experiences</span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold max-w-xl leading-tight text-foreground">
              A Global <span className="text-accent-gold italic font-serif pr-2">Platform</span>
            </h2>
          </div>
          <div className="text-foreground opacity-80 font-light max-w-md mt-4 md:mt-0 leading-relaxed text-sm lg:text-base">
            <p className="mb-3">Where else can your customers ski, surf, ride rollercoasters, and shop flagship boutiques all under one roof?</p>
            <p className="hidden md:block">Our record-breaking attractions do more than entertain; they draw international tourism and convert the property into a year-round vacation destination. This integrated approach ensures consistent traffic resilience regardless of seasonality or macro-economic retail trends.</p>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6 h-[450px]">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-black rounded-2xl h-full p-6 flex flex-col justify-end relative overflow-hidden group shadow-md cursor-pointer border border-card-border"
          >
            <img src="https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?q=80&w=2670&auto=format&fit=crop" className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:scale-110 transition-transform duration-1000" alt="Theme park" />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />

            <div className="absolute inset-0 bg-accent-gold/95 transform translate-y-full group-hover:translate-y-0 transition-transform duration-700 flex items-center justify-center p-10 z-20">
               <div className="text-center">
                <Play className="w-12 h-12 text-black mx-auto mb-4 opacity-0 group-hover:opacity-100 transition-opacity duration-1000 delay-100 fill-black" />
                <h3 className="text-black text-xl font-bold tracking-wide">Watch Highlight Reel</h3>
              </div>
            </div>

            <div className="relative z-10 transition-transform duration-700 group-hover:-translate-y-2">
              <Ticket className="w-6 h-6 text-accent-gold mb-3" />
              <h3 className="text-2xl font-bold mb-1 text-white">Nickelodeon Universe</h3>
              <p className="text-white/80 text-sm">The largest indoor theme park in the Western Hemisphere.</p>
            </div>
          </motion.div>

          <div className="grid grid-rows-2 gap-4 h-full">
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              onClick={openEvents}
              className="bg-black rounded-2xl p-6 flex flex-col justify-end relative overflow-hidden group shadow-md cursor-pointer border border-card-border"
            >
              <img src="https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?q=80&w=2670&auto=format&fit=crop" className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:scale-110 transition-transform duration-1000" alt="Water park" />
              <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent" />
              <div className="absolute inset-0 bg-accent-gold/95 transform translate-y-full group-hover:translate-y-0 transition-transform duration-700 flex items-center justify-center p-6 z-20">
                 <h3 className="text-black text-sm font-bold uppercase tracking-widest opacity-0 group-hover:opacity-100 duration-1000 delay-100 flex items-center">Explore Event Modules <ArrowRight className="w-4 h-4 ml-2" /></h3>
              </div>
              <div className="relative z-10 transition-transform duration-700 group-hover:-translate-y-1">
                <h3 className="text-xl font-bold mb-1 text-white">DreamWorks Water Park</h3>
                <p className="text-xs text-white/80">North America's largest indoor water park.</p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              onClick={openEvents}
              className="bg-black rounded-2xl p-6 flex flex-col justify-end relative overflow-hidden group shadow-md cursor-pointer border border-card-border"
            >
              <img src="https://images.unsplash.com/photo-1551698618-1dfe5d97d256?q=80&w=2670&auto=format&fit=crop" className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:scale-110 transition-transform duration-1000" alt="Snow park" />
              <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent" />
              <div className="absolute inset-0 bg-accent-gold/95 transform translate-y-full group-hover:translate-y-0 transition-transform duration-700 flex items-center justify-center p-6 z-20">
                 <h3 className="text-black text-sm font-bold uppercase tracking-widest opacity-0 group-hover:opacity-100 duration-1000 delay-100 flex items-center">Explore Event Modules <ArrowRight className="w-4 h-4 ml-2" /></h3>
              </div>
              <div className="relative z-10 transition-transform duration-700 group-hover:-translate-y-1">
                <h3 className="text-xl font-bold mb-1 text-white">Big SNOW</h3>
                <p className="text-xs text-white/80">North America's first indoor real-snow ski resort.</p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}

// --- SLIDE 4: BUSINESS ACTIONS / CTA ---
function BusinessSlide({ openEvents }: { openEvents: () => void }) {
  return (
    <div className="w-full h-full bg-card-bg flex flex-col justify-center px-6 md:px-16 pt-16 pb-20 overflow-y-auto">
      <div className="max-w-5xl mx-auto w-full text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <span className="text-accent-gold uppercase tracking-widest text-xs font-semibold block mb-4">Partnerships</span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-foreground font-serif">Create Your Moment.</h2>
          <div className="text-lg text-foreground opacity-80 font-light mb-12 max-w-3xl mx-auto leading-relaxed">
            <p className="mb-4">Whether you're opening a flagship, activating a global partnership, or hosting a legendary event, the platform is yours.</p>
            <p className="text-base hidden md:block">We offer customizable real estate for every ambition. From permanent, multi-level architectural flagships, to high-impact digital billboard takeovers that dominate the central atrium, to turnkey pop-up spaces that allow digitally-native brands to seamlessly test the physical market.</p>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { icon: Building2, title: "Retail Leasing", subtitle: "Join the curated selection of luxury, lifestyle, and global brands.", action: "View Availabilities" },
            { icon: Users, title: "Brand Sponsorship", subtitle: "Take over digital networks, physical spaces, and entire concourses.", action: "View Prospectus" }
          ].map((item, i) => (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + i * 0.1, duration: 0.5 }}
              key={item.title}
              className="p-8 bg-background border border-card-border hover:border-accent-gold transition-colors duration-300 rounded-2xl text-left group cursor-pointer shadow-sm relative"
            >
              <item.icon className="w-8 h-8 text-accent-gold mb-6 relative z-10" />
              <h3 className="text-2xl font-bold mb-3 text-foreground relative z-10">{item.title}</h3>
              <p className="text-foreground opacity-60 mb-8 text-sm leading-relaxed relative z-10">{item.subtitle}</p>
              <div className="flex items-center text-xs font-bold uppercase tracking-wider group-hover:text-accent-gold transition-colors text-foreground relative z-10 mt-auto">
                {item.action} <ArrowRight className="w-4 h-4 ml-2 transform group-hover:translate-x-2 transition-transform" />
              </div>
            </motion.div>
          ))}

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            onClick={openEvents}
            className="p-8 bg-accent-gold text-black rounded-2xl text-left group cursor-pointer hover:bg-[#b08c48] transition-colors duration-300 relative overflow-hidden shadow-md flex flex-col"
          >
            <Ticket className="w-8 h-8 text-black mb-6 relative z-10" />
            <h3 className="text-2xl font-bold mb-3 relative z-10">Event Bookings</h3>
            <p className="text-black/80 mb-8 text-sm leading-relaxed relative z-10">From concert halls to convention spaces, host scaleable experiences.</p>
            <div className="flex items-center text-xs font-bold uppercase tracking-wider relative z-10 mt-auto">
              Explore Event Modules <ArrowRight className="w-4 h-4 ml-2 transform group-hover:translate-x-2 transition-transform" />
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

// --- MAIN PAGE (CONTROLLER) ---
export default function SalesDeck() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [activeModule, setActiveModule] = useState<"none" | "events">("none");
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const chapters = [
    { id: 0, title: "01. Introduction", subtitle: "Overview" },
    { id: 1, title: "02. Scale & Reach", subtitle: "Demographics" },
    { id: 2, title: "03. The Avenue", subtitle: "Luxury Retail" },
    { id: 3, title: "04. Entertainment", subtitle: "Attractions" },
    { id: 4, title: "05. Opportunities", subtitle: "Leasing & Events" }
  ];

  const totalSlides = chapters.length;

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev < totalSlides - 1 ? prev + 1 : prev));
  }, [totalSlides]);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev > 0 ? prev - 1 : prev));
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (activeModule !== "none") return;
      if (['ArrowRight', 'ArrowDown', 'Space'].includes(e.code)) {
        e.preventDefault();
        nextSlide();
      } else if (['ArrowLeft', 'ArrowUp'].includes(e.code)) {
        e.preventDefault();
        prevSlide();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [nextSlide, prevSlide, activeModule]);

  const fadeVariants: any = {
    initial: { opacity: 0, y: 15 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
    exit: { opacity: 0, y: -15, transition: { duration: 0.4, ease: "easeOut" } }
  };

  return (
    <main className="flex h-screen w-screen overflow-hidden bg-background text-foreground cursor-none md:cursor-auto">
      <CustomCursor />
      
      {/* DIGIDECK-STYLE NAVIGATION SIDEBAR */}
      <AnimatePresence>
        {isSidebarOpen && (
          <motion.nav 
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: 280, opacity: 1 }}
            exit={{ width: 0, opacity: 0 }}
            className="hidden md:flex w-[280px] bg-card-bg border-r border-card-border flex-col justify-between shrink-0 h-full z-50 relative"
          >
            <div className="p-8">
              <div className="flex items-center justify-between mb-10">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 bg-accent-gold rounded-sm" />
                  <span className="font-bold text-sm tracking-widest uppercase">The Deck</span>
                </div>
              </div>
              <h2 className="font-serif text-2xl font-semibold mb-8 text-foreground/90">American Dream</h2>
              
              <ul className="space-y-4">
                {chapters.map((chapter) => (
                  <li 
                    key={chapter.id}
                    onClick={() => setCurrentSlide(chapter.id)}
                    className="cursor-pointer group flex items-start"
                  >
                    <div className={`w-[2px] h-8 mr-4 transition-colors ${currentSlide === chapter.id ? 'bg-accent-gold' : 'bg-transparent group-hover:bg-card-border'}`} />
                    <div>
                      <div className={`text-sm font-semibold transition-colors ${currentSlide === chapter.id ? 'text-foreground' : 'text-foreground/50 group-hover:text-foreground/80'}`}>
                        {chapter.title}
                      </div>
                      <div className={`text-xs mt-1 transition-colors ${currentSlide === chapter.id ? 'text-accent-gold' : 'text-foreground/30 group-hover:text-foreground/50'}`}>
                        {chapter.subtitle}
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <div className="p-8 border-t border-card-border">
               <div className="text-xs text-foreground/40 font-medium tracking-wide">
                 Presented by <br/><span className="text-foreground/70 font-bold uppercase mt-1 inline-block">Commercial Team</span>
               </div>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>

      {/* MAIN PRESENTATION CANVAS */}
      <div className="flex-1 relative flex flex-col h-screen overflow-hidden bg-background">
        
        {/* Presentation Header Controls */}
        <div className="absolute top-0 w-full z-40 p-6 flex justify-between items-center pointer-events-none">
          <div className="flex items-center gap-4 pointer-events-auto">
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="p-3 bg-card-bg/80 backdrop-blur border border-card-border rounded-lg hover:border-accent-gold transition-colors text-foreground shadow-sm cursor-pointer hidden md:block"
              aria-label="Toggle Navigation"
            >
              <Menu className="w-5 h-5" />
            </button>
          </div>
          
          <button
            onClick={toggleTheme}
            className="p-3 bg-card-bg/80 backdrop-blur border border-card-border rounded-lg flex items-center justify-center shadow-sm hover:border-accent-gold transition-colors cursor-pointer pointer-events-auto"
            aria-label="Toggle Theme"
          >
            {theme === "dark" ? <Sun className="w-5 h-5 text-accent-gold" /> : <Moon className="w-5 h-5 text-accent-gold" />}
          </button>
        </div>

        {/* Slide Area */}
        <div className="flex-1 relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              variants={fadeVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="absolute inset-0 w-full h-full"
            >
              {currentSlide === 0 && <HeroSlide theme={theme} nextSlide={nextSlide} />}
              {currentSlide === 1 && <ScaleSlide />}
              {currentSlide === 2 && <AvenueSlide />}
              {currentSlide === 3 && <EntertainmentSlide openEvents={() => setActiveModule("events")} />}
              {currentSlide === 4 && <BusinessSlide openEvents={() => setActiveModule("events")} />}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Presentation Bottom Controls */}
        <div className="absolute bottom-6 right-6 z-40 flex items-center gap-4">
          <div className="bg-card-bg/80 backdrop-blur border border-card-border rounded-full py-2 px-4 text-xs font-bold tracking-widest text-foreground/70 shadow-sm hidden md:block">
            {currentSlide + 1} / {totalSlides}
          </div>
          <div className="flex gap-2 bg-card-bg/80 backdrop-blur border border-card-border rounded-full p-1 shadow-sm">
            <button 
              onClick={prevSlide} 
              disabled={currentSlide === 0} 
              className="p-2 rounded-full hover:bg-background transition-colors disabled:opacity-30 disabled:pointer-events-none cursor-pointer"
            >
              <ChevronLeft className="w-5 h-5 text-foreground" />
            </button>
            <button 
              onClick={nextSlide} 
              disabled={currentSlide === totalSlides - 1} 
              className="p-2 rounded-full hover:bg-background transition-colors disabled:opacity-30 disabled:pointer-events-none cursor-pointer"
            >
              <ChevronRight className="w-5 h-5 text-foreground" />
            </button>
          </div>
        </div>

      </div>

      {/* --- EXPANDABLE MODULE: EVENTS (Modal Overlay) --- */}
      <AnimatePresence>
        {activeModule === "events" && (
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-[99999] overflow-y-auto"
            style={{ backgroundColor: 'var(--overlay-bg)', backdropFilter: 'blur(20px)' }}
          >
             <div className="min-h-screen px-6 md:px-20 py-10 pb-32">
              <div className="max-w-7xl mx-auto">
                <div className="flex justify-between items-center mb-16 pt-10 border-b border-card-border pb-10">
                  <div>
                    <span className="text-accent-gold tracking-widest uppercase text-sm font-bold mb-2 block">Premium Venue Modules</span>
                    <h2 className="text-4xl md:text-6xl font-bold text-foreground">The Stages</h2>
                  </div>
                  <button
                    onClick={() => setActiveModule("none")}
                    className="p-4 bg-card-bg border border-card-border hover:bg-accent-gold hover:text-black hover:border-transparent rounded-full flex items-center justify-center transition-colors text-foreground shadow-md cursor-pointer"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
                   {/* Same Event Modal Content as Before */}
                   <div>
                    <img src="https://images.unsplash.com/photo-1540039155732-6762b513fd8b?q=80&w=2626&auto=format&fit=crop" className="w-full aspect-video object-cover rounded-xl mb-8 shadow-2xl border border-card-border" alt="Concert Stage" />
                    <h3 className="text-3xl font-bold mb-4 text-foreground">The Dream Stage</h3>
                    <p className="text-foreground opacity-80 font-light mb-8 text-lg leading-relaxed">
                      A central hub for fashion shows, celebrity appearances, and live broadcasts. Built-in LED arrays and stadium-grade sound. Capacity: 5,000 standing.
                    </p>
                    <button className="px-8 py-4 bg-accent-gold text-black font-bold hover:bg-black hover:text-white transition-colors rounded-none shadow-lg cursor-pointer text-sm uppercase tracking-wider">Download Tech Specs</button>
                  </div>

                  <div>
                    <div className="space-y-6">
                      <div className="p-8 border border-card-border bg-card-bg rounded-xl hover:border-accent-gold transition-colors shadow-sm cursor-pointer hover:-translate-y-1 transform duration-300">
                        <h4 className="text-xl font-bold text-accent-gold mb-2">Exposition Halls</h4>
                        <p className="text-foreground opacity-80 text-sm leading-relaxed">Over 100,000 sq ft of blank canvas space for trade shows, sneaker conventions, and immersive pop-ups with direct loading dock access.</p>
                      </div>
                      <div className="p-8 border border-card-border bg-card-bg rounded-xl hover:border-accent-gold transition-colors shadow-sm cursor-pointer hover:-translate-y-1 transform duration-300">
                        <h4 className="text-xl font-bold text-accent-gold mb-2">VIP Lounges</h4>
                        <p className="text-foreground opacity-80 text-sm leading-relaxed">Intimate, ultra-luxury spaces designed for brand dinners, influencer gifting suites, and private previews.</p>
                      </div>
                      <div className="p-10 border border-card-border bg-accent-gold rounded-xl hover:bg-[#b08c48] transition-colors text-center mt-10 shadow-lg text-black cursor-pointer group">
                        <h3 className="text-2xl font-bold mb-4">Ready to Book?</h3>
                        <p className="text-black/80 text-sm mb-6 font-medium">Our production team is standing by to bring your vision to life.</p>
                        <button className="px-6 py-3 bg-black text-white font-bold w-full uppercase tracking-wider text-xs hover:bg-white hover:text-black hover:border-black border border-transparent transition-all shadow-md">Contact Events Team</button>
                      </div>
                    </div>
                  </div>

                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
