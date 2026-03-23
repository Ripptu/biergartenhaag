import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'motion/react';
import { MapPin, Clock, Phone, ArrowRight, X } from 'lucide-react';

function App() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const bottleY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const bottleRotate = useTransform(scrollYProgress, [0, 1], ["15deg", "5deg"]);

  // Weather & Status State
  const [weather, setWeather] = useState<number | null>(null);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  
  // Admin Triple-Click State
  const [clickCount, setClickCount] = useState(0);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [showAdminModal, setShowAdminModal] = useState(false);
  const [passwordInput, setPasswordInput] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  // Menu State
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    // Fetch weather for Haag an der Amper
    fetch('https://api.open-meteo.com/v1/forecast?latitude=48.45&longitude=11.8333&current_weather=true')
      .then(res => res.json())
      .then(data => {
        if (data.current_weather) {
          setWeather(Math.round(data.current_weather.temperature));
        }
      })
      .catch(err => console.error("Weather fetch error:", err));

    // Fetch open/closed status
    fetch('/api/status')
      .then(res => res.json())
      .then(data => setIsOpen(data.isOpen))
      .catch(err => console.error("Status fetch error:", err));
  }, []);

  const handleLogoClick = () => {
    setClickCount(prev => prev + 1);
  };

  useEffect(() => {
    if (clickCount > 0) {
      const timer = setTimeout(() => setClickCount(0), 1000);
      if (clickCount === 3) {
        setShowPasswordModal(true);
        setClickCount(0);
      }
      return () => clearTimeout(timer);
    }
  }, [clickCount]);

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordInput === "vamela") {
      setShowPasswordModal(false);
      setShowAdminModal(true);
      setPasswordInput("");
      setErrorMsg("");
    } else {
      setErrorMsg("Falsches Passwort");
    }
  };

  const handleStatusChange = (newStatus: boolean) => {
    fetch('/api/status', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password: "vamela", status: newStatus })
    })
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setIsOpen(data.isOpen);
          setShowAdminModal(false);
        }
      })
      .catch(err => console.error("Status update error:", err));
  };

  return (
    <div className="min-h-screen flex flex-col font-sans bg-brand-dark selection:bg-brand-orange selection:text-white" ref={containerRef}>
      {/* Main Content Area - Off-White */}
      <main className="relative bg-brand-light text-brand-dark md:rounded-[40px] md:mx-8 md:mt-8 overflow-hidden flex-grow flex flex-col shadow-2xl z-10">
        
        {/* Navigation */}
        <nav className="absolute top-0 left-0 w-full z-40 flex items-center justify-between px-6 py-6 md:px-12 md:py-8 text-brand-light">
          {/* Left: Weather & Status Pill */}
          <div className="flex items-center gap-2 md:gap-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-3 py-1.5 md:px-4 md:py-2 text-xs md:text-sm font-medium shadow-xl">
            <span>{weather !== null ? `${weather}°C` : '--°C'}</span>
            <div className="w-1 h-1 rounded-full bg-white/50"></div>
            <span className={isOpen ? "text-emerald-400" : "text-red-400"}>{isOpen ? "Geöffnet" : "Geschlossen"}</span>
          </div>

          {/* Center Logo */}
          <div className="flex flex-col items-center justify-center absolute left-1/2 top-6 md:top-8 -translate-x-1/2 z-50">
            <img 
              src="https://scontent-dus1-1.xx.fbcdn.net/v/t39.30808-6/492210388_1194107815843563_1337847489003514631_n.jpg?_nc_cat=107&ccb=1-7&_nc_sid=1d70fc&_nc_ohc=U8HBK_TVC-IQ7kNvwFC16cb&_nc_oc=Adrp7WGp9IZ5ZLrnOlBB_k4OCDBXmbZH2nICFQUhzM41Aaw0ApstRvJKhLoufNR5M-I&_nc_zt=23&_nc_ht=scontent-dus1-1.xx&_nc_gid=VpvR-4i101hrQSTgMW4htw&_nc_ss=7a30f&oh=00_AfxDWlAHvTqA1Kq8M86JECQ6U3_DndL1N-vq-Q2NXp7mEA&oe=69C4DE28" 
              alt="Schlossallee Logo" 
              className="h-20 w-20 md:h-32 md:w-32 object-cover rounded-full shadow-2xl cursor-pointer select-none active:scale-95 transition-transform" 
              referrerPolicy="no-referrer"
              onClick={handleLogoClick}
            />
          </div>

          {/* Mobile Menu Icon (Always visible for minimalist look) */}
          <div 
            className="flex flex-col gap-1.5 md:gap-2 cursor-pointer z-50 hover:opacity-70 transition-opacity"
            onClick={() => setIsMenuOpen(true)}
          >
             <div className="w-6 md:w-8 h-[2px] bg-brand-light"></div>
             <div className="w-6 md:w-8 h-[2px] bg-brand-light"></div>
          </div>
        </nav>

        {/* SECTION A: Hero Area */}
        <section className="relative min-h-[100svh] md:min-h-[85vh] flex flex-col justify-end px-4 sm:px-6 md:px-12 lg:px-20 pt-48 md:pt-64 pb-24 md:pb-20 z-20 overflow-hidden">
          
          {/* Hero Background Image */}
          <div className="absolute inset-0 z-0 bg-brand-dark">
            <img 
              src="https://s1.directupload.eu/images/260323/haugqfhy.webp" 
              alt="Biergarten Background" 
              className="w-full h-[55vh] md:h-full object-cover md:object-cover object-center opacity-90 md:opacity-100"
              referrerPolicy="no-referrer"
            />
            {/* Gradient overlay for mobile to blend the image into the dark background, solid overlay for desktop */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-brand-dark/80 to-brand-dark md:bg-black/40 md:bg-none"></div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-8 w-full items-end relative z-10 mt-auto">
            
            {/* Right Content (Heading) - Order 1 on mobile, Order 2 on desktop */}
            <div className="lg:col-span-6 flex flex-col gap-6 md:gap-8 items-start lg:items-end text-left lg:text-right z-20 order-1 lg:order-2">
              <h2 className="font-serif text-[13vw] sm:text-6xl md:text-7xl lg:text-[5.5rem] leading-[0.9] tracking-tight text-brand-light uppercase">
                Wo jede<br />Mass eine<br />Geschichte<br />erzählt.
              </h2>
            </div>

            {/* Left Content (Subtext & Buttons) - Order 2 on mobile, Order 1 on desktop */}
            <div className="lg:col-span-6 flex flex-col gap-6 md:gap-8 z-20 order-2 lg:order-1 mt-2 md:mt-0">
              <p className="text-base sm:text-lg md:text-xl text-brand-light/90 leading-relaxed font-medium max-w-xl">
                Bayerische Gemütlichkeit seit 1926. Erlebe einen der schönsten und größten Biergärten der Region, idyllisch gelegen unter alten Kastanien im Herzen von Haag an der Amper.
              </p>
              
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mt-2 md:mt-4">
                <a href="#schmankerl" className="w-full sm:w-auto text-center bg-brand-orange text-white rounded-full px-8 py-3.5 md:py-3 font-medium hover:bg-brand-orange/90 transition-colors shadow-lg shadow-brand-orange/20">
                  Speisen & Getränke
                </a>
                <a href="#kontakt" className="w-full sm:w-auto text-center border border-brand-light/30 text-brand-light rounded-full px-8 py-3.5 md:py-3 font-medium hover:bg-brand-light/10 transition-colors">
                  Lage & Anfahrt
                </a>
              </div>
            </div>

          </div>

        </section>

        {/* Partner Logo Strip */}
        <div className="border-t border-brand-dark/10 py-8 px-6 md:px-16 flex flex-wrap justify-center md:justify-between items-center gap-8 text-brand-dark/40 bg-brand-dark/5">
          <div className="font-serif text-xl tracking-tight hover:text-brand-dark transition-colors cursor-pointer">Hofbräuhaus Freising</div>
          <div className="font-serif text-xl tracking-tight hover:text-brand-dark transition-colors cursor-pointer">Backhaus Weiß</div>
          <div className="font-serif text-xl tracking-tight hover:text-brand-dark transition-colors cursor-pointer">Ortsmetzgerei Haag</div>
          <div className="font-serif text-xl tracking-tight hover:text-brand-dark transition-colors cursor-pointer">Ampertalbahn</div>
        </div>

        {/* SECTION B: Unsere Schmankerl & Hütt'n */}
        <section id="schmankerl" className="py-16 md:py-24 px-4 sm:px-6 md:px-12 lg:px-20 relative z-20 bg-brand-light">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 md:mb-16 gap-6 md:gap-8">
              <h2 className="font-serif text-4xl sm:text-5xl md:text-7xl text-brand-dark leading-none uppercase">
                Unsere<br />Schmankerl<br />& Hütt'n
              </h2>
              <p className="text-brand-dark/70 max-w-md text-base md:text-lg font-medium">
                Handwerklich perfekt und premium. Entdecke unsere kulinarische Vielfalt. <br/><br/>
                <span className="text-brand-orange">Übrigens:</span> Die eigene Brotzeit darf bei uns ganz traditionell mitgebracht werden.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Item 1 */}
              <motion.div whileHover={{ y: -10 }} className="group cursor-pointer">
                <div className="aspect-[4/5] rounded-3xl overflow-hidden mb-6 relative">
                  <img src="https://s1.directupload.eu/images/260321/e8uqintp.webp" alt="Jaga Bier" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" referrerPolicy="no-referrer" />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500"></div>
                </div>
                <h3 className="font-serif text-2xl mb-2">Das naturtrübe Jaga Bier</h3>
                <p className="text-brand-dark/60">Süffig, ehrlich und direkt aus dem Fass. Unser ganzer Stolz.</p>
              </motion.div>

              {/* Item 2 */}
              <motion.div whileHover={{ y: -10 }} className="group cursor-pointer mt-0 md:mt-12">
                <div className="aspect-[4/5] rounded-3xl overflow-hidden mb-6 relative">
                  <img src="https://www.radioarabella.de/storage/thumbs/1275x/323622.webp" alt="Steckerlfisch" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" referrerPolicy="no-referrer" />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500"></div>
                </div>
                <h3 className="font-serif text-2xl mb-2">Steckerlfisch-Braterei</h3>
                <p className="text-brand-dark/60">Frisch über dem offenen Feuer gegrillt. Ein bayerischer Klassiker.</p>
              </motion.div>

              {/* Item 3 */}
              <motion.div whileHover={{ y: -10 }} className="group cursor-pointer mt-0 lg:mt-24">
                <div className="aspect-[4/5] rounded-3xl overflow-hidden mb-6 relative">
                  <img src="https://static.express.de/__images/2022/07/02/6d4d3850-bc96-46c5-80c0-ba1a13d3adc2.jpeg?w=4000&h=2667&fm=jpg&s=942917e7817d1db3a6b03e363a3d33a9" alt="Würstl-Grill" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" referrerPolicy="no-referrer" />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500"></div>
                </div>
                <h3 className="font-serif text-2xl mb-2">Würstl-Grill & Backstube</h3>
                <p className="text-brand-dark/60">Regionale Spezialitäten, knusprige Brezn und süße Versuchungen.</p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* SECTION C: Ein Paradies für Familien */}
        <section id="familien" className="py-16 md:py-24 px-4 sm:px-6 md:px-12 lg:px-20 relative z-20 bg-brand-dark/5">
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-16 items-center">
            <div className="order-2 lg:order-1">
              <div className="aspect-square md:aspect-[4/3] rounded-[40px] overflow-hidden relative shadow-2xl">
                <img src="https://www.radtourenchef.de/radwege/haag-an-der-amper/biergarten-schlossallee/bilder/biergarten-schlossallee1.jpg" alt="Kinder im Biergarten" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
              </div>
            </div>
            <div className="order-1 lg:order-2 flex flex-col gap-6">
              <h2 className="font-serif text-5xl md:text-6xl text-brand-dark leading-[1.1] uppercase">
                Ein Paradies<br />für Familien.
              </h2>
              <p className="text-lg text-brand-dark/70 leading-relaxed">
                Während die Eltern in Ruhe ihr kühles Jaga Bier unter den schattigen Kastanien genießen, wartet auf die kleinen Gäste das ganz große Abenteuer. 
              </p>
              <p className="text-lg text-brand-dark/70 leading-relaxed">
                Unser riesiger Abenteuerspielplatz und die legendäre <strong className="text-brand-dark font-semibold">Ampertal-Kindereisenbahn</strong> machen den Besuch für die ganze Familie unvergesslich.
              </p>
              <div className="mt-4">
                <a href="#" className="inline-flex items-center gap-2 text-brand-orange font-medium hover:gap-4 transition-all">
                  Mehr für Kinder entdecken <ArrowRight size={20} />
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION D: Join the Club (Events) */}
        <section id="events" className="py-16 md:py-24 px-4 sm:px-6 md:px-12 lg:px-20 relative z-20 bg-brand-light">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12 md:mb-20">
              <h2 className="font-serif text-5xl sm:text-6xl md:text-8xl text-brand-dark leading-none uppercase mb-4 md:mb-6">
                Kultur &<br />Events
              </h2>
              <p className="text-lg md:text-xl text-brand-dark/60 font-medium">Limitierte Erlebnisse unter Kastanien.</p>
            </div>

            <div className="flex flex-col gap-8">
              {/* Event 1 - Highlight */}
              <div className="group relative bg-brand-dark text-brand-light rounded-3xl p-8 md:p-12 overflow-hidden cursor-pointer hover:shadow-2xl transition-shadow">
                <div className="absolute top-0 right-0 w-1/2 h-full opacity-20 group-hover:opacity-40 transition-opacity duration-700">
                  <img src="https://i0.wp.com/www.siltry.de/bild/haa9.jpg" alt="Lampion-Fest" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                  <div className="absolute inset-0 bg-gradient-to-r from-brand-dark to-transparent"></div>
                </div>
                <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-8">
                  <div>
                    <span className="text-brand-orange font-bold tracking-widest uppercase text-sm mb-4 block">Zentrales Highlight</span>
                    <h3 className="font-serif text-5xl md:text-7xl mb-4">Das Lampion-Fest</h3>
                    <p className="text-brand-light/80 text-lg max-w-md">
                      Sobald es dunkel wird, erleuchten tausende Lampions den Biergarten. Ein magischer Abend mit Live-Musik und besonderer Atmosphäre.
                    </p>
                  </div>
                  <div className="text-left md:text-right">
                    <div className="font-serif text-6xl md:text-8xl text-brand-orange">15.</div>
                    <div className="text-2xl font-medium tracking-widest uppercase">August</div>
                  </div>
                </div>
              </div>

              {/* Event 2 */}
              <div className="group flex flex-col md:flex-row items-center justify-between gap-8 py-8 border-b border-brand-dark/10 cursor-pointer hover:px-4 transition-all">
                <div className="flex-1">
                  <h3 className="font-serif text-4xl text-brand-dark mb-2 group-hover:text-brand-orange transition-colors">Live-Musik: Austro-Pop</h3>
                  <p className="text-brand-dark/60">Mit der lokalen Stadtkapelle und Special Guests.</p>
                </div>
                <div className="text-right flex items-center gap-8">
                  <div className="text-xl font-medium">Ab 18:00 Uhr</div>
                  <div className="font-serif text-4xl text-brand-dark">22. <span className="text-2xl uppercase tracking-widest">Mai</span></div>
                </div>
              </div>

              {/* Event 3 */}
              <div className="group flex flex-col md:flex-row items-center justify-between gap-8 py-8 border-b border-brand-dark/10 cursor-pointer hover:px-4 transition-all">
                <div className="flex-1">
                  <h3 className="font-serif text-4xl text-brand-dark mb-2 group-hover:text-brand-orange transition-colors">Oldtimer-Motorradtreffen</h3>
                  <p className="text-brand-dark/60">Historische Maschinen, Benzingespräche und zünftige Brotzeit.</p>
                </div>
                <div className="text-right flex items-center gap-8">
                  <div className="text-xl font-medium">Ganztägig</div>
                  <div className="font-serif text-4xl text-brand-dark">05. <span className="text-2xl uppercase tracking-widest">Jun</span></div>
                </div>
              </div>
            </div>
          </div>
        </section>

      </main>

      {/* SECTION E: Visit Us / Footer (Dark Green Background) */}
      <footer id="kontakt" className="bg-brand-dark text-brand-light pt-24 md:pt-32 pb-8 md:pb-12 px-4 sm:px-6 md:px-12 lg:px-20 relative -mt-10 md:-mt-20 z-0">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 md:gap-16">
          
          {/* Info */}
          <div className="lg:col-span-5 flex flex-col gap-8">
            <h2 className="font-serif text-5xl uppercase">Besuch uns.</h2>
            
            <div className="flex flex-col gap-6 mt-4">
              <div className="flex items-start gap-4">
                <MapPin className="text-brand-orange shrink-0 mt-1" />
                <div>
                  <h4 className="font-bold text-lg mb-1">Adresse</h4>
                  <p className="text-brand-light/70">Freisinger Str. 1<br/>85410 Haag a.d. Amper</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <Clock className="text-brand-orange shrink-0 mt-1" />
                <div>
                  <h4 className="font-bold text-lg mb-1">Öffnungszeiten</h4>
                  <p className="text-brand-light/70">Mo - Do: 14:00 - 22:00 Uhr<br/>Fr - So & Feiertage: 11:30 - 22:00 Uhr</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <Phone className="text-brand-orange shrink-0 mt-1" />
                <div>
                  <h4 className="font-bold text-lg mb-1">Kontakt</h4>
                  <p className="text-brand-light/70">+49 (0) 8167 12345<br/>servus@schlossallee-haag.de</p>
                </div>
              </div>
            </div>
          </div>

          {/* Reservation Form */}
          <div className="lg:col-span-7 bg-white/5 rounded-3xl p-8 md:p-12 border border-white/10">
            <h3 className="font-serif text-3xl mb-2">Tisch im Salett'l reservieren</h3>
            <p className="text-brand-light/60 mb-8">Für größere Gruppen oder bei unsicherem Wetter empfehlen wir eine Reservierung in unserem überdachten Salett'l.</p>
            
            <form className="flex flex-col gap-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-medium text-brand-light/80">Name</label>
                  <input type="text" className="bg-transparent border-b border-white/20 pb-2 focus:outline-none focus:border-brand-orange transition-colors text-white" placeholder="Dein Name" />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-medium text-brand-light/80">E-Mail</label>
                  <input type="email" className="bg-transparent border-b border-white/20 pb-2 focus:outline-none focus:border-brand-orange transition-colors text-white" placeholder="deine@email.de" />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-medium text-brand-light/80">Datum</label>
                  <input type="date" className="bg-transparent border-b border-white/20 pb-2 focus:outline-none focus:border-brand-orange transition-colors text-white" />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-medium text-brand-light/80">Personen</label>
                  <select className="bg-transparent border-b border-white/20 pb-2 focus:outline-none focus:border-brand-orange transition-colors text-white appearance-none">
                    <option className="text-brand-dark">2 Personen</option>
                    <option className="text-brand-dark">4 Personen</option>
                    <option className="text-brand-dark">6 Personen</option>
                    <option className="text-brand-dark">8+ Personen</option>
                  </select>
                </div>
              </div>
              <button type="button" className="mt-4 bg-brand-orange text-white rounded-full px-8 py-4 font-bold hover:bg-brand-orange/90 transition-colors self-start">
                Reservierung anfragen
              </button>
            </form>
          </div>
        </div>

        <div className="max-w-7xl mx-auto mt-24 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-brand-light/40">
          <p>© 2026 Schlossallee-Biergarten Haag an der Amper. Alle Rechte vorbehalten.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-brand-light transition-colors">Impressum</a>
            <a href="#" className="hover:text-brand-light transition-colors">Datenschutz</a>
          </div>
        </div>
      </footer>

      {/* Fullscreen Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: "-100%" }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: "-100%" }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-[100] bg-brand-dark flex flex-col items-center justify-center"
          >
            <button 
              onClick={() => setIsMenuOpen(false)}
              className="absolute top-6 right-6 md:top-8 md:right-12 text-brand-light hover:text-brand-orange transition-colors z-[110]"
            >
              <X size={40} strokeWidth={1.5} />
            </button>
            <nav className="flex flex-col items-center gap-8 text-center">
              <a href="#schmankerl" onClick={() => setIsMenuOpen(false)} className="font-serif text-4xl md:text-6xl text-brand-light hover:text-brand-orange transition-colors uppercase">Schmankerl</a>
              <a href="#familien" onClick={() => setIsMenuOpen(false)} className="font-serif text-4xl md:text-6xl text-brand-light hover:text-brand-orange transition-colors uppercase">Familien</a>
              <a href="#events" onClick={() => setIsMenuOpen(false)} className="font-serif text-4xl md:text-6xl text-brand-light hover:text-brand-orange transition-colors uppercase">Events</a>
              <a href="#kontakt" onClick={() => setIsMenuOpen(false)} className="font-serif text-4xl md:text-6xl text-brand-light hover:text-brand-orange transition-colors uppercase">Kontakt</a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Password Modal */}
      <AnimatePresence>
        {showPasswordModal && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
          >
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-brand-dark border border-white/10 rounded-3xl p-8 w-full max-w-sm relative shadow-2xl"
            >
              <button 
                onClick={() => setShowPasswordModal(false)}
                className="absolute top-4 right-4 text-white/50 hover:text-white transition-colors"
              >
                <X size={20} />
              </button>
              <h3 className="text-2xl font-serif text-brand-light mb-6">Admin Login</h3>
              <form onSubmit={handlePasswordSubmit} className="flex flex-col gap-4">
                <input 
                  type="password" 
                  value={passwordInput}
                  onChange={(e) => setPasswordInput(e.target.value)}
                  placeholder="Passwort" 
                  className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-brand-light focus:outline-none focus:border-brand-orange transition-colors"
                  autoFocus
                />
                {errorMsg && <p className="text-red-400 text-sm">{errorMsg}</p>}
                <button 
                  type="submit"
                  className="bg-brand-orange text-white rounded-xl px-4 py-3 font-medium hover:bg-brand-orange/90 transition-colors"
                >
                  Bestätigen
                </button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Admin Status Modal */}
      <AnimatePresence>
        {showAdminModal && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
          >
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-brand-dark border border-white/10 rounded-3xl p-8 w-full max-w-sm relative shadow-2xl"
            >
              <button 
                onClick={() => setShowAdminModal(false)}
                className="absolute top-4 right-4 text-white/50 hover:text-white transition-colors"
              >
                <X size={20} />
              </button>
              <h3 className="text-2xl font-serif text-brand-light mb-6">Status ändern</h3>
              <div className="flex flex-col gap-4">
                <button 
                  onClick={() => handleStatusChange(true)}
                  className={`rounded-xl px-4 py-4 font-medium transition-colors border ${isOpen ? 'bg-emerald-500/20 border-emerald-500/50 text-emerald-400' : 'bg-white/5 border-white/10 text-brand-light hover:bg-white/10'}`}
                >
                  Geöffnet
                </button>
                <button 
                  onClick={() => handleStatusChange(false)}
                  className={`rounded-xl px-4 py-4 font-medium transition-colors border ${!isOpen ? 'bg-red-500/20 border-red-500/50 text-red-400' : 'bg-white/5 border-white/10 text-brand-light hover:bg-white/10'}`}
                >
                  Geschlossen
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;
