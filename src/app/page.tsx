"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, AnimatePresence, useInView, animate } from "framer-motion";
import { ChevronDown, ArrowRight, Building2, Users, Ticket, X, Sun, Moon, Play } from "lucide-react";

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
      if (['A', 'BUTTON'].includes(target.tagName) || target.closest('.cursor-pointer')) {
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

// --- ANIMATED COUNTER COMPONENT ---
function AnimatedCounter({ to, duration = 2 }: { to: number; duration?: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
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

export default function SalesDeck() {
  // Main Page Scroll
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const heroOpacity = useTransform(scrollYProgress, [0, 0.05], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.05], [1, 1.1]);

  // Horizontal Scroll Config
  const horizontalScrollRef = useRef(null);
  const { scrollYProgress: horizontalProgress } = useScroll({
    target: horizontalScrollRef,
  });
  const x = useTransform(horizontalProgress, [0, 1], ["0%", "-65%"]);

  // State
  const [activeModule, setActiveModule] = useState<"none" | "events">("none");
  const [theme, setTheme] = useState<"dark" | "light">("dark");

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  const titleWords = ["AMERICAN", "DREAM"];

  return (
    <main ref={containerRef} className="relative min-h-screen cursor-none md:cursor-auto">
      <CustomCursor />

      {/* Theme Toggle Button */}
      <button
        onClick={toggleTheme}
        className="fixed top-6 right-6 z-50 w-12 h-12 bg-card-bg border border-card-border rounded-full flex items-center justify-center shadow-lg hover:border-accent-gold transition-colors cursor-pointer"
        aria-label="Toggle Theme"
      >
        {theme === "dark" ? <Sun className="w-5 h-5 text-accent-gold" /> : <Moon className="w-5 h-5 text-accent-gold" />}
      </button>

      {/* --- 1. HERO SECTION (VIDEO BACKGROUND) --- */}
      <motion.section
        className="sticky top-0 h-screen w-full flex flex-col justify-center items-center overflow-hidden"
        style={{ opacity: heroOpacity, scale: heroScale }}
      >
        <div className={`absolute inset-0 z-0 ${theme === 'dark' ? 'bg-black' : 'bg-background'}`}>
          <video
            autoPlay
            muted
            loop
            playsInline
            poster="https://images.unsplash.com/photo-1511556820780-d912e42b4980?q=80&w=2574&auto=format&fit=crop"
            className={`w-full h-full object-cover transition-opacity duration-1000 ${theme === 'dark' ? 'opacity-80 mix-blend-screen contrast-125' : 'opacity-40 saturate-50'}`}
          >
            {/* High Quality Abstract Gold/Luxury Loop */}
            <source src="https://assets.mixkit.co/videos/preview/mixkit-particles-of-sand-and-yellow-dust-12190-large.mp4" type="video/mp4" />
            {/* Fallback City Aerial */}
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
            <span className="uppercase tracking-[0.3em] text-accent-gold text-sm font-semibold">The Ultimate Destination</span>
            <div className="h-[1px] w-12 bg-accent-gold" />
          </motion.div>

          <h1 className="text-6xl md:text-8xl lg:text-9xl font-bold tracking-tighter mb-8 text-foreground drop-shadow-xl overflow-hidden flex flex-col items-center">
            {titleWords.map((word, wordIdx) => (
              <div key={wordIdx} className="overflow-hidden flex">
                {Array.from(word).map((letter, letterIdx) => (
                  <motion.span
                    key={letterIdx}
                    initial={{ y: "150%" }}
                    animate={{ y: "0%" }}
                    transition={{
                      duration: 0.8,
                      ease: [0.33, 1, 0.68, 1], // Custom dramatic ease-out
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

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.2 }}
            className="text-xl md:text-2xl text-foreground opacity-90 max-w-2xl font-light leading-relaxed drop-shadow-md mt-4"
          >
            Not just a mall. A 3-million square foot city of retail, dining, and endless entertainment.
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.8 }}
          className="absolute bottom-12 flex flex-col items-center gap-2"
        >
          <span className="text-xs uppercase tracking-widest text-foreground opacity-60">Scroll to Explore</span>
          <ChevronDown className="w-5 h-5 text-accent-gold animate-bounce" />
        </motion.div>
      </motion.section>

      {/* --- 2. SCALE & DATA SECTION (ANIMATED COUNTERS & PARALLAX) --- */}
      <section className="relative z-10 bg-background min-h-screen py-32 px-6 md:px-20 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-20%" }}
              transition={{ duration: 1 }}
            >
              <h2 className="text-4xl md:text-6xl font-bold mb-8 text-foreground leading-tight">Unprecedented <br /><span className="text-accent-gold">Scale.</span></h2>
              <p className="text-xl text-foreground opacity-80 font-light mb-12 leading-relaxed">
                Located minutes from New York City, drawing from a population of 20+ million. This is a captive audience at an unimaginable scale.
              </p>

              <div className="grid grid-cols-2 gap-x-10 gap-y-12">
                <div className="border-l-2 border-accent-gold/40 pl-6">
                  <div className="text-4xl md:text-6xl font-bold mb-2 text-foreground font-serif">
                    <AnimatedCounter to={40} duration={2} />M+
                  </div>
                  <div className="text-sm tracking-wider uppercase text-foreground opacity-60 font-semibold">Annual Visitors</div>
                </div>
                <div className="border-l-2 border-accent-gold/40 pl-6">
                  <div className="text-4xl md:text-6xl font-bold mb-2 text-foreground font-serif">
                    <AnimatedCounter to={3} duration={1.5} />M+
                  </div>
                  <div className="text-sm tracking-wider uppercase text-foreground opacity-60 font-semibold">Square Feet</div>
                </div>
                <div className="border-l-2 border-accent-gold/40 pl-6">
                  <div className="text-4xl md:text-6xl font-bold mb-2 text-foreground font-serif">
                    <AnimatedCounter to={450} duration={2.5} />+
                  </div>
                  <div className="text-sm tracking-wider uppercase text-foreground opacity-60 font-semibold">Retail & Dining</div>
                </div>
                <div className="border-l-2 border-accent-gold/40 pl-6">
                  <div className="text-4xl md:text-6xl font-bold mb-2 text-foreground font-serif">
                    <AnimatedCounter to={15} duration={1.5} />+
                  </div>
                  <div className="text-sm tracking-wider uppercase text-foreground opacity-60 font-semibold">Major Attractions</div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2 }}
              className="relative h-[600px] rounded-2xl overflow-hidden group shadow-2xl border border-card-border"
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
      </section>

      {/* --- 3. THE AVENUE: TRUE HORIZONTAL SCROLL --- */}
      <section ref={horizontalScrollRef} className="relative z-10 bg-card-bg h-[400vh] border-y border-card-border">
        <div className="sticky top-0 h-screen flex flex-col justify-center overflow-hidden">

          <div className="absolute left-0 top-0 w-1/4 h-full bg-gradient-to-r from-card-bg to-transparent z-10 pointer-events-none" />

          <div className="w-full pl-6 md:pl-20 z-20 mb-10 w-screen shrink-0">
            <h2 className="text-5xl md:text-7xl font-bold tracking-tight mb-4 font-serif text-foreground">The Avenue</h2>
            <p className="text-xl text-foreground opacity-80 font-light leading-relaxed max-w-2xl">
              An unrivaled curation of the world's most prestigious luxury houses, set within a breathtaking, art-filled concourse.
            </p>
          </div>

          <motion.div style={{ x }} className="flex gap-10 pl-6 md:pl-20 z-20 items-center">
            {[
              { name: "Hermès", src: "https://images.unsplash.com/photo-1549439602-43ebca2327af?q=80&w=2670&auto=format&fit=crop" },
              { name: "Saint Laurent", src: "https://images.unsplash.com/photo-1560243563-062bfc001d68?q=80&w=2670&auto=format&fit=crop" },
              { name: "Gucci", src: "https://images.unsplash.com/photo-1555529771-835f59fc5efe?q=80&w=2574&auto=format&fit=crop" },
              { name: "Balenciaga", src: "https://images.unsplash.com/photo-1581044777550-4cfa60707c03?q=80&w=2668&auto=format&fit=crop" },
              { name: "Louis Vuitton", src: "https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?q=80&w=2670&auto=format&fit=crop" },
            ].map((brand) => (
              <div
                key={brand.name}
                className="w-[70vw] md:w-[500px] h-[60vh] shrink-0 relative rounded-2xl overflow-hidden group cursor-pointer shadow-xl border border-card-border"
              >
                <img src={brand.src} alt={brand.name} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-80 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute bottom-10 left-10">
                  <div className="text-white text-4xl font-serif font-semibold transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 drop-shadow-md">{brand.name}</div>
                  <div className="text-accent-gold text-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500 mt-2 flex items-center gap-2 font-medium">
                    Inquire Space <ArrowRight className="w-5 h-5" />
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* --- 4. ENTERTAINMENT & ATTRACTIONS (INTERACTIVE GRID) --- */}
      <section className="relative z-10 bg-background min-h-screen py-40 px-6 md:px-20 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col md:flex-row justify-between items-end mb-20"
          >
            <h2 className="text-4xl md:text-6xl font-bold max-w-2xl leading-tight text-foreground">
              A Global <br /><span className="text-accent-gold">Entertainment</span> Platform.
            </h2>
            <p className="text-foreground opacity-80 font-light max-w-md mt-6 md:mt-0 leading-relaxed">
              Where else can your customers ski, surf, ride rollercoasters, and shop flagship boutiques all under one roof?
            </p>
          </motion.div>

          {/* Interactive grid elements shifting inward on scroll */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="bg-black border border-card-border rounded-2xl h-[600px] p-10 flex flex-col justify-end relative overflow-hidden group shadow-lg cursor-pointer"
            >
              <img src="https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?q=80&w=2670&auto=format&fit=crop" className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:scale-110 transition-transform duration-1000" alt="Theme park" />
              <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent" />

              {/* Interactive reveal plate inside the card */}
              <div className="absolute inset-0 bg-accent-gold/95 transform translate-y-full group-hover:translate-y-0 transition-transform duration-700 ease-[0.33,1,0.68,1] flex items-center justify-center p-10 z-20">
                <div className="text-center">
                  <Play className="w-16 h-16 text-black mx-auto mb-6 opacity-0 group-hover:opacity-100 transition-opacity duration-1000 delay-200 fill-black" />
                  <h3 className="text-black text-2xl font-bold tracking-wide">Watch Highlight Reel</h3>
                </div>
              </div>

              <div className="relative z-10 transition-transform duration-700 group-hover:-translate-y-4">
                <Ticket className="w-10 h-10 text-accent-gold mb-4" />
                <h3 className="text-3xl font-bold mb-2 text-white">Nickelodeon Universe</h3>
                <p className="text-white/80 line-clamp-2">The largest indoor theme park in the Western Hemisphere. Featuring record-breaking rollercoasters.</p>
              </div>
            </motion.div>

            <div className="grid grid-rows-2 gap-6 h-[600px]">
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
                onClick={() => setActiveModule("events")}
                className="bg-black border border-card-border rounded-2xl p-8 flex flex-col justify-end relative overflow-hidden group shadow-lg cursor-pointer"
              >
                <img src="https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?q=80&w=2670&auto=format&fit=crop" className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:scale-110 transition-transform duration-1000" alt="Water park" />
                <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent" />

                <div className="absolute inset-0 bg-accent-gold/95 transform translate-y-full group-hover:translate-y-0 transition-transform duration-700 ease-[0.33,1,0.68,1] flex items-center justify-center p-10 z-20">
                  <h3 className="text-black text-xl font-bold uppercase tracking-widest opacity-0 group-hover:opacity-100 duration-1000 delay-200 flex items-center">Explore Module <ArrowRight className="w-5 h-5 ml-2" /></h3>
                </div>

                <div className="relative z-10 transition-transform duration-700 group-hover:-translate-y-4">
                  <h3 className="text-2xl font-bold mb-1 text-white">DreamWorks Water Park</h3>
                  <p className="text-sm text-white/80">North America's largest indoor water park.</p>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.4 }}
                onClick={() => setActiveModule("events")}
                className="bg-black border border-card-border rounded-2xl p-8 flex flex-col justify-end relative overflow-hidden group shadow-lg cursor-pointer"
              >
                <img src="https://images.unsplash.com/photo-1551698618-1dfe5d97d256?q=80&w=2670&auto=format&fit=crop" className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:scale-110 transition-transform duration-1000" alt="Snow park" />
                <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent" />

                <div className="absolute inset-0 bg-accent-gold/95 transform translate-y-full group-hover:translate-y-0 transition-transform duration-700 ease-[0.33,1,0.68,1] flex items-center justify-center p-10 z-20">
                  <h3 className="text-black text-xl font-bold uppercase tracking-widest opacity-0 group-hover:opacity-100 duration-1000 delay-200 flex items-center">Explore Module <ArrowRight className="w-5 h-5 ml-2" /></h3>
                </div>

                <div className="relative z-10 transition-transform duration-700 group-hover:-translate-y-4">
                  <h3 className="text-2xl font-bold mb-1 text-white">Big SNOW</h3>
                  <p className="text-sm text-white/80">North America's first indoor real-snow ski resort.</p>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* --- 5. BUSINESS ACTION MODULES (THE PUSH) --- */}
      <section className="relative z-10 bg-card-bg py-32 px-6 md:px-20 border-t border-card-border overflow-hidden">
        <div className="max-w-5xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">Create Your Moment.</h2>
            <p className="text-xl text-foreground opacity-80 font-light mb-16 max-w-2xl mx-auto leading-relaxed">
              Whether you're opening a flagship, activating a global partnership, or hosting a legendary event, the platform is yours.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: Building2, title: "Retail Leasing", subtitle: "Join the curated selection of luxury, lifestyle, and global brands.", action: "View Availabilities" },
              { icon: Users, title: "Brand Sponsorships", subtitle: "Take over digital networks, physical spaces, and entire concourses.", action: "View Deck" }
            ].map((item, i) => (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.6 }}
                key={item.title}
                className="p-10 bg-background border border-card-border hover:border-accent-gold transition-colors duration-300 rounded-2xl text-left group cursor-pointer shadow-md relative"
              >
                <item.icon className="w-8 h-8 text-accent-gold mb-6 relative z-10" />
                <h3 className="text-2xl font-bold mb-4 text-foreground relative z-10">{item.title}</h3>
                <p className="text-foreground opacity-70 mb-8 text-sm leading-relaxed relative z-10">{item.subtitle}</p>
                <div className="flex items-center text-sm font-semibold group-hover:text-accent-gold transition-colors text-foreground relative z-10">
                  {item.action} <ArrowRight className="w-4 h-4 ml-2 transform group-hover:translate-x-2 transition-transform" />
                </div>
              </motion.div>
            ))}

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.6 }}
              onClick={() => setActiveModule("events")}
              className="p-10 bg-accent-gold text-black rounded-2xl text-left group cursor-pointer hover:bg-[#b08c48] transition-colors duration-300 relative overflow-hidden shadow-lg"
            >
              <Ticket className="w-8 h-8 text-black mb-6 relative z-10" />
              <h3 className="text-2xl font-bold mb-4 relative z-10">Event Bookings</h3>
              <p className="text-black/80 mb-8 text-sm leading-relaxed relative z-10">From concert halls to convention spaces, host scaleable experiences.</p>
              <div className="flex items-center text-sm font-bold relative z-10">
                Explore Event Modules <ArrowRight className="w-4 h-4 ml-2 transform group-hover:translate-x-2 transition-transform" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* --- EXPANDABLE MODULE: EVENTS --- */}
      <AnimatePresence>
        {activeModule === "events" && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-[99999] overflow-y-auto"
            style={{ backgroundColor: 'var(--overlay-bg)', backdropFilter: 'blur(20px)' }}
          >
            <div className="min-h-screen px-6 md:px-20 py-10">
              <div className="max-w-7xl mx-auto">
                <div className="flex justify-between items-center mb-16 pt-10 border-b border-card-border pb-10">
                  <div>
                    <span className="text-accent-gold tracking-widest uppercase text-sm font-bold mb-2 block">Events & Programming</span>
                    <h2 className="text-4xl md:text-6xl font-bold text-foreground">The Stages</h2>
                  </div>
                  <button
                    onClick={() => setActiveModule("none")}
                    className="w-14 h-14 bg-card-bg border border-card-border hover:bg-accent-gold hover:text-black hover:border-transparent rounded-full flex items-center justify-center transition-colors text-foreground shadow-md cursor-pointer"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
                  <div>
                    <img src="https://images.unsplash.com/photo-1540039155732-6762b513fd8b?q=80&w=2626&auto=format&fit=crop" className="w-full aspect-video object-cover rounded-xl mb-8 shadow-2xl border border-card-border" alt="Concert Stage" />
                    <h3 className="text-3xl font-bold mb-4 text-foreground">The Dream Stage</h3>
                    <p className="text-foreground opacity-80 font-light mb-8 text-lg leading-relaxed">
                      A central hub for fashion shows, celebrity appearances, and live broadcasts. Built-in LED arrays and stadium-grade sound. Capacity: 5,000 standing.
                    </p>
                    <button className="px-8 py-4 bg-accent-gold text-black font-bold hover:bg-black hover:text-white transition-colors rounded-none shadow-lg cursor-pointer">Download Tech Specs</button>
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
                        <button className="px-6 py-3 bg-black text-white font-bold w-full hover:bg-white hover:text-black hover:border-black border border-transparent transition-all shadow-md group-hover:scale-105 transform">Contact Events Team</button>
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
