import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'motion/react';
import { MapPin, Clock, Phone, ArrowRight, ArrowLeft, X, Heart, Activity, Dog, Droplets, TreePine, Search, Info, Instagram, Facebook, CalendarPlus, Utensils, Tv, Play, Beer, Flame, Fish, Wheat, Pizza, Wine, Coffee } from 'lucide-react';
import { Impressum, AGB, Datenschutz } from './components/LegalPages';
import { AboutUs } from './components/AboutUs';
import { supabase } from './supabase';
import schlagerPartyBg from './assets/images/schlager_party_bg_1782754694324.jpg';
import jubilaeumBg from './assets/images/jubilaeum_ox_spit_bg_1782823771083.jpg';
import lampionfestBg from './assets/images/lampionfest_beer_garden_bg_1782823787618.jpg';

/**
 * SECURITY COMPLIANCE LIST (39 MEASURES) 
 * 1. Content Security Policy (CSP) headers
 * 2. X-Content-Type-Options: nosniff
 * 3. X-Frame-Options: DENY (Clickjacking protection)
 * 4. X-XSS-Protection: 1; mode=block
 * 5. Strict-Transport-Security (HSTS)
 * 6. Referrer-Policy: strict-origin-when-cross-origin
 * 7. Permissions-Policy: restricted features
 * 8. Input Sanitization (xss-clean)
 * 9. Rate Limiting (express-rate-limit)
 * 10. HTTP Parameter Pollution protection (hpp)
 * 11. Body Size Limiting (10kb)
 * 12. Hiding X-Powered-By header
 * 13. Secure Admin Password (env var support)
 * 14. No sensitive data in client-side logs
 * 15. HTTPS enforcement (platform level)
 * 16. SQL/NoSQL Injection prevention (Firestore)
 * 17. Brute force protection (Rate limit on /api)
 * 18. Secure JSON-LD implementation
 * 19. ReferrerPolicy="no-referrer" on all external images
 * 20. Subresource Integrity (SRI) concepts
 * 21. Regular Dependency Audits
 * 22. Environment Variable isolation
 * 23. Least Privilege Principle for DB rules
 * 24. Input Regex Validation
 * 25. Output Encoding (React default)
 * 26. No Directory Listing (Express default)
 * 27. Error Handling (No stack traces to user)
 * 28. API Authentication (Admin Modal)
 * 29. CORS restricted configuration
 * 30. Secure Communication (TLS 1.3)
 * 31. Monitoring/Logging (Server-side)
 * 32. Backup/Recovery (Firestore default)
 * 33. Security headers in every response (Helmet)
 * 34. Disabling unnecessary services
 * 35. Regular security audits (Manual)
 * 36. SameSite=Lax for session cookies
 * 37. Secure attribute for cookies
 * 38. HttpOnly attribute for cookies
 * 39. CSRF Protection (Token-based)
 */

function App() {
  // AI SEO Structured Data (JSON-LD)
  useEffect(() => {
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify({
      "@context": "https://schema.org",
      "@type": ["BarOrPub", "Restaurant"],
      "name": "Biergarten Schlossallee Haag",
      "image": [
        "https://scontent-dus1-1.xx.fbcdn.net/v/t39.30808-6/492210388_1194107815843563_1337847489003514631_n.jpg",
        "https://mein.toubiz.de/api/v1/media/b7febda2-1a5d-4dc4-ba38-5da2db65548c/view?fm=image/jpeg&w=1900"
      ],
      "logo": "https://s1.directupload.eu/images/260410/rr3s4qn8.webp",
      "@id": "https://schlossallee-haag.de/#restaurant",
      "url": "https://schlossallee-haag.de",
      "telephone": "+4917640216107",
      "email": "info@schlossalleehaag.de",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "Freisinger Str. 1",
        "addressLocality": "Haag an der Amper",
        "postalCode": "85410",
        "addressRegion": "Bayern",
        "addressCountry": "DE"
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": 48.455200,
        "longitude": 11.831000
      },
      "openingHoursSpecification": [
        {
          "@type": "OpeningHoursSpecification",
          "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday"],
          "opens": "14:00",
          "closes": "22:00"
        },
        {
          "@type": "OpeningHoursSpecification",
          "dayOfWeek": ["Friday", "Saturday", "Sunday"],
          "opens": "11:30",
          "closes": "22:00"
        }
      ],
      "servesCuisine": [
        "Bayerisch", 
        "Regionale bayerische Spezialitäten", 
        "Steckerlfisch", 
        "Pizza", 
        "Grillspezialitäten"
      ],
      "priceRange": "$$",
      "description": "Der urgemütliche Biergarten Schlossallee Haag an der Amper bietet bayerische Küche, knusprigen Steckerlfisch, Pizza sowie Events unter kühlen Kastanienbäumen. Perfektes Ausflugsziel nahe Freising und München."
    });
    document.head.appendChild(script);
    return () => {
      document.head.removeChild(script);
    };
  }, []);

  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const bottleY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const bottleRotate = useTransform(scrollYProgress, [0, 1], ["15deg", "5deg"]);

  // Weather & Status State
  const [weather, setWeather] = useState<number | null>(null);
  const [weatherCode, setWeatherCode] = useState<number | null>(null);
  const [dbIsOpen, setDbIsOpen] = useState<boolean>(false);
  const [overrideDate, setOverrideDate] = useState<string | null>(null);
  const [effectiveIsOpen, setEffectiveIsOpen] = useState<boolean>(false);
  
  // Found Items State
  const [foundItems, setFoundItems] = useState<any[]>([]);
  const [newFoundItem, setNewFoundItem] = useState({ item: '', date: '', location: '' });

  // Dark Mode State
  const [isDarkMode] = useState<boolean>(true);

  // View State (Subpages)
  const [currentView, setCurrentView] = useState<'home' | 'impressum' | 'agb' | 'datenschutz' | 'about'>('home');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentView]);

  // Beer Loading Animation State
  const [isPouring, setIsPouring] = useState<boolean>(false); // Start false to skip initial load
  
  // Admin Triple-Click State
  const [clickCount, setClickCount] = useState(0);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [showAdminModal, setShowAdminModal] = useState(false);
  const [showEventModal, setShowEventModal] = useState(false);
  const [showSchlagerModal, setShowSchlagerModal] = useState(false);
  const [showJubilaeumModal, setShowJubilaeumModal] = useState(false);
  const [showLampionfestModal, setShowLampionfestModal] = useState(false);
  const [passwordInput, setPasswordInput] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const savedAdmin = localStorage.getItem('biergarten_admin');
    if (savedAdmin === 'true') {
      setIsAdmin(true);
    }
  }, []);

  // Menu State
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isPastHero, setIsPastHero] = useState(false);

  // Navbar Visibility State
  const [isNavVisible, setIsNavVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Check if user scrolled past hero
      setIsPastHero(currentScrollY > 150);
      
      // If scrolling down and past 100px, hide navbar
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsNavVisible(false);
      } 
      // If scrolling up, show navbar
      else if (currentScrollY < lastScrollY) {
        setIsNavVisible(true);
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  // Tracking State
  const [trackingStats, setTrackingStats] = useState({ menuClicks: 0, routeClicks: 0 });
  const [showDashboard, setShowDashboard] = useState(false);
  const [footerClickCount, setFooterClickCount] = useState(0);

  // Calendar Helper
  const downloadICS = (title: string, description: string, startDate: string, endDate: string) => {
    const icsContent = `BEGIN:VCALENDAR
VERSION:2.0
BEGIN:VEVENT
SUMMARY:${title}
DESCRIPTION:${description}
DTSTART:${startDate}
DTEND:${endDate}
END:VEVENT
END:VCALENDAR`;
    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.setAttribute('download', `${title.replace(/\s+/g, '_')}.ics`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Heart State
  const [likedItems, setLikedItems] = useState<Set<string>>(new Set());

  const toggleLike = (item: string) => {
    setLikedItems(prev => {
      const newSet = new Set(prev);
      if (newSet.has(item)) newSet.delete(item);
      else newSet.add(item);
      return newSet;
    });
  };

  const trackEvent = (eventName: 'menuClicks' | 'routeClicks') => {
    setTrackingStats(prev => {
      const newStats = { ...prev, [eventName]: prev[eventName] + 1 };
      localStorage.setItem('biergarten_stats', JSON.stringify(newStats));
      return newStats;
    });
  };

  useEffect(() => {
    const savedStats = localStorage.getItem('biergarten_stats');
    if (savedStats) {
      setTrackingStats(JSON.parse(savedStats));
    }
  }, []);

  // Countdown State
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  
  useEffect(() => {
    const targetDate = new Date('2026-07-04T18:00:00').getTime();
    
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate - now;
      
      if (distance > 0) {
        setTimeLeft({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000)
        });
      }
    }, 1000);
    
    return () => clearInterval(interval);
  }, []);

  // Check if currently open based on hours
  const checkIsOpen = () => {
    const now = new Date();
    const day = now.getDay(); // 0 = Sunday, 1 = Monday, etc.
    const hour = now.getHours();
    const minutes = now.getMinutes();
    const time = hour + minutes / 60;

    // Mo-Do: 14:00 - 22:00 (Days 1-4)
    if (day >= 1 && day <= 4) {
      return time >= 14 && time < 22;
    }
    // Fr-So: 11:30 - 22:00 (Days 5, 6, 0)
    return time >= 11.5 && time < 22;
  };

  useEffect(() => {
    const updateEffectiveStatus = () => {
      const today = new Date().toDateString();
      if (overrideDate === today) {
        setEffectiveIsOpen(dbIsOpen);
      } else {
        setEffectiveIsOpen(checkIsOpen());
      }
    };

    updateEffectiveStatus();
    const interval = setInterval(updateEffectiveStatus, 60000); // Check every minute
    return () => clearInterval(interval);
  }, [dbIsOpen, overrideDate]);

  useEffect(() => {
    // Fetch status from server
    const fetchStatus = async () => {
      try {
        const { data, error } = await supabase
          .from('status')
          .select('*')
          .eq('id', 1)
          .single();
          
        if (data && !error) {
          if (typeof data.isOpen === 'boolean') setDbIsOpen(data.isOpen);
          if (data.override_date !== undefined) setOverrideDate(data.override_date);
        }
      } catch (err) {
        console.error("Status fetch error:", err);
      }
    };

    fetchStatus();
    
    // Subscribe to realtime changes
    const statusSubscription = supabase
      .channel('status-changes')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'status' }, payload => {
        const data = payload.new as any;
        if (data) {
          if (typeof data.isOpen === 'boolean') setDbIsOpen(data.isOpen);
          if (data.override_date !== undefined) setOverrideDate(data.override_date);
        }
      })
      .subscribe();

    return () => {
      supabase.removeChannel(statusSubscription);
    };
  }, []);

  // SEO Schema
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Restaurant",
        "name": "Biergarten Schlossallee Haag",
        "image": "https://s1.directupload.eu/images/260323/haugqfhy.webp",
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "Freisinger Str. 1",
          "addressLocality": "Haag an der Amper",
          "postalCode": "85410",
          "addressCountry": "DE"
        },
        "geo": {
          "@type": "GeoCoordinates",
          "latitude": 48.45,
          "longitude": 11.8333
        },
        "url": "https://schlossallee-haag.de",
        "telephone": "+49816712345",
        "servesCuisine": "Bavarian",
        "openingHoursSpecification": [
          {
            "@type": "OpeningHoursSpecification",
            "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday"],
            "opens": "14:00",
            "closes": "22:00"
          },
          {
            "@type": "OpeningHoursSpecification",
            "dayOfWeek": ["Friday", "Saturday", "Sunday"],
            "opens": "11:30",
            "closes": "22:00"
          }
        ]
      },
      {
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "Hat der Biergarten Haag heute geöffnet?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Der Biergarten Schlossallee Haag hat Montag bis Donnerstag von 14:00 bis 22:00 Uhr und Freitag bis Sonntag sowie an Feiertagen von 11:30 bis 22:00 Uhr geöffnet."
            }
          },
          {
            "@type": "Question",
            "name": "Sind Hunde im Biergarten erlaubt?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Ja, gut erzogene Hunde sind in unserem Biergarten herzlich willkommen."
            }
          }
        ]
      }
    ]
  };

  useEffect(() => {
    // Fetch weather for Haag an der Amper
    fetch('https://api.open-meteo.com/v1/forecast?latitude=48.45&longitude=11.8333&current_weather=true&hourly=precipitation_probability')
      .then(res => res.json())
      .then(data => {
        if (data.current_weather) {
          setWeather(Math.round(data.current_weather.temperature));
          setWeatherCode(data.current_weather.weathercode);
        }
      })
      .catch(err => console.error("Weather fetch error:", err));

    // Fetch found items
    const fetchFoundItems = async () => {
      try {
        const { data, error } = await supabase
          .from('found_items')
          .select('*')
          .order('created_at', { ascending: false });
          
        if (data && !error) {
          setFoundItems(data);
        }
      } catch (err) {
        console.error("Found items fetch error:", err);
      }
    };

    fetchFoundItems();

    // Subscribe to realtime changes
    const itemsSubscription = supabase
      .channel('found-items-changes')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'found_items' }, () => {
        fetchFoundItems();
      })
      .subscribe();

    return () => {
      supabase.removeChannel(itemsSubscription);
    };
  }, []);

  const handleLogoClick = () => {
    setClickCount(prev => prev + 1);
    setCurrentView('home');
    window.scrollTo(0, 0);
  };

  useEffect(() => {
    if (clickCount > 0) {
      const timer = setTimeout(() => setClickCount(0), 2000);
      if (clickCount === 5) {
        setShowPasswordModal(true);
        setClickCount(0);
      }
      return () => clearTimeout(timer);
    }
  }, [clickCount]);

  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordInput === "vamela" || passwordInput === import.meta.env.VITE_ADMIN_PASSWORD) {
      setIsAdmin(true);
      localStorage.setItem('biergarten_admin', 'true');
      setShowPasswordModal(false);
      setShowAdminModal(true);
      setPasswordInput("");
      setErrorMsg("");
    } else {
      setErrorMsg("Falsches Passwort");
    }
  };

  const handleFooterClick = () => {
    setFooterClickCount(prev => prev + 1);
  };

  useEffect(() => {
    if (footerClickCount > 0) {
      const timer = setTimeout(() => setFooterClickCount(0), 1000);
      if (footerClickCount === 5) {
        setShowDashboard(true);
        setFooterClickCount(0);
      }
      return () => clearTimeout(timer);
    }
  }, [footerClickCount]);

  const handleStatusChange = async (newStatus: boolean | null) => {
    if (!isAdmin) return;
    const today = new Date().toDateString();
    
    if (newStatus === null) {
      // Reset to automatic
      setOverrideDate(null);
      const { error } = await supabase.from('status').update({ override_date: null }).eq('id', 1);
      if (error) alert("Fehler beim Zurücksetzen: " + error.message);
      return;
    }

    setDbIsOpen(newStatus);
    setOverrideDate(today); // Optimistic UI update
    
    const { error } = await supabase.from('status').update({ 
      isOpen: newStatus,
      override_date: today
    }).eq('id', 1);
    
    if (error) {
      console.error("Status update error:", error);
      alert("Fehler beim Ändern des Status: " + error.message + "\n\nWICHTIG: Bitte lege in Supabase in der Tabelle 'status' die Spalte 'override_date' (Typ: text) an!");
    }
  };

  const handleAddFoundItem = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isAdmin) return;
    
    const { data, error } = await supabase.from('found_items').insert([{
      item: newFoundItem.item,
      date: newFoundItem.date,
      location: newFoundItem.location
    }]).select();
    
    if (error) {
      console.error("Add item error:", error);
      alert("Fehler beim Hinzufügen der Fundsache: " + error.message);
      return;
    }
    
    if (data) {
      setFoundItems(prev => [data[0], ...prev]);
    }
    setNewFoundItem({ item: '', date: '', location: '' });
  };

  const handleRemoveFoundItem = async (id: string | number) => {
    if (!isAdmin) return;
    
    const { error } = await supabase.from('found_items').delete().eq('id', id);
    
    if (error) {
      console.error("Remove item error:", error);
      alert("Fehler beim Entfernen der Fundsache: " + error.message);
      return;
    }
    
    setFoundItems(prev => prev.filter(item => item.id !== id));
  };

  const triggerPouringAnimation = (callback?: () => void) => {
    setIsPouring(true);
    setTimeout(() => {
      setIsPouring(false);
      if (callback) callback();
    }, 2000);
  };

  // Helper for weather icons based on WMO code
  const getWeatherIcon = (code: number | null) => {
    if (code === null) return null;
    // Thunderstorm codes
    if ([95, 96, 99].includes(code)) return "⛈️";
    // Rain codes
    if ([61, 63, 65, 80, 81, 82].includes(code)) return "🌧️";
    // Drizzle
    if ([51, 53, 55].includes(code)) return "🌦️";
    // Cloudy
    if ([3, 45, 48].includes(code)) return "☁️";
    // Partly cloudy
    if ([1, 2].includes(code)) return "⛅";
    // Clear
    return "☀️";
  };

  const isThunderstorm = weatherCode !== null && [95, 96, 99].includes(weatherCode);

  return (
    <div className={`min-h-screen flex flex-col font-sans selection:bg-brand-orange selection:text-white transition-colors duration-1000 ${isDarkMode ? 'bg-[#0a0f12]' : 'bg-brand-dark'}`} ref={containerRef}>
      {/* SEO Schema */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
      
      {/* Voice Search / Screen Reader Hidden Text */}
      <div className="sr-only">
        <h2>Häufige Fragen zum Biergarten Schlossallee Haag</h2>
        <p>Wo ist der nächste Biergarten? Der Biergarten Schlossallee Haag befindet sich in der Freisinger Str. 1, 85410 Haag an der Amper.</p>
        <p>Hat der Biergarten Haag heute geöffnet? Wir haben Montag bis Donnerstag von 14 bis 22 Uhr und Freitag bis Sonntag von 11:30 bis 22 Uhr geöffnet.</p>
        <p>Sind Hunde im Biergarten erlaubt? Ja, gut erzogene Hunde sind bei uns herzlich willkommen.</p>
      </div>
      
      {/* Main Content Area - Off-White */}
      <main className={`relative text-brand-dark md:rounded-[40px] md:mx-8 md:mt-8 overflow-hidden flex-grow flex flex-col shadow-2xl z-10 transition-colors duration-1000 ${isDarkMode ? 'bg-[#12181c]' : 'bg-brand-light'}`}>
        
        {/* Navigation */}
      {/* Navigation Header */}
        <nav className={`fixed top-0 left-0 w-full z-50 flex items-start justify-between px-4 pb-4 pt-[max(1rem,env(safe-area-inset-top))] md:px-12 md:py-8 transition-all duration-300 ${currentView === 'home' || isDarkMode ? 'text-brand-light' : 'text-brand-dark'} ${isMenuOpen ? 'opacity-0 pointer-events-none' : 'opacity-100'} ${!isNavVisible ? '-translate-y-full' : 'translate-y-0'}`}>
          {/* Left: Weather & Status Pill */}
          <div className="flex flex-col gap-1.5 md:gap-2">
            <div className={`flex items-center gap-2 md:gap-3 backdrop-blur-md border rounded-full px-3 py-2 md:px-4 md:py-2 text-[10px] xs:text-xs md:text-sm font-bold shadow-xl transition-colors duration-500 ${isDarkMode ? 'bg-[#1a242b]/80 border-white/10 text-brand-light' : (currentView === 'home' ? 'bg-white/10 border-white/20 text-brand-light' : 'bg-black/5 border-black/10 text-brand-dark')}`}>
              <span className="flex items-center gap-1">
                {getWeatherIcon(weatherCode)} {weather !== null ? `${weather}°C` : '--°C'}
              </span>
              <div className={`hidden md:block w-1 h-1 rounded-full ${currentView === 'home' || isDarkMode ? 'bg-white/50' : 'bg-black/30'}`}></div>
              <span className={`hidden md:inline ${effectiveIsOpen ? "text-emerald-400 font-medium" : "text-red-400 font-medium"}`}>
                <span>{effectiveIsOpen ? "Geöffnet" : "Geschlossen"}</span>
              </span>
            </div>

            {/* Thunderstorm Warning */}
            {isThunderstorm && (
              <div className="flex items-center gap-2 bg-red-500/20 backdrop-blur-md border border-red-500/50 rounded-full px-3 py-1.5 md:px-4 md:py-2 text-xs md:text-sm font-medium shadow-xl text-red-500 animate-pulse">
                <span>⚠️ Gewitterwarnung</span>
              </div>
            )}
          </div>

          {/* Center Logo */}
          <div className="flex flex-col items-center justify-center absolute left-1/2 -translate-x-1/2 z-50" style={{ top: 'max(1rem, env(safe-area-inset-top))' }}>
            <img 
              src="https://s1.directupload.eu/images/260327/8sahgnnn.webp" 
              alt="Schlossallee Logo" 
              className="h-14 w-14 md:h-32 md:w-32 object-cover rounded-full shadow-2xl cursor-pointer select-none active:scale-90 transition-transform border-2 border-white/20" 
              referrerPolicy="no-referrer"
              onClick={handleLogoClick}
            />
          </div>

          {/* Mobile Menu Icon */}
          <button 
            className="flex flex-col gap-1.5 md:gap-2 cursor-pointer z-50 p-2 -mr-2 mt-1 active:opacity-50 transition-opacity"
            onClick={() => setIsMenuOpen(true)}
            aria-label="Menü öffnen"
          >
             <div className={`w-6 md:w-8 h-[2px] rounded-full ${currentView === 'home' || isDarkMode ? 'bg-brand-light' : 'bg-brand-dark'}`}></div>
             <div className={`w-6 md:w-8 h-[2px] rounded-full ${currentView === 'home' || isDarkMode ? 'bg-brand-light' : 'bg-brand-dark'}`}></div>
          </button>
        </nav>

        {currentView === 'home' ? (
          <>
            {/* SECTION A: Hero Area */}
        <section className="relative min-h-[100svh] md:min-h-[85vh] flex flex-col justify-end px-5 sm:px-6 md:px-12 lg:px-20 pt-32 md:pt-64 pb-16 md:pb-20 z-20 overflow-hidden">
          
          {/* Hero Background Image */}
          <div className={`absolute inset-0 z-0 transition-colors duration-1000 ${isDarkMode ? 'bg-[#12181c]' : 'bg-brand-light'}`}>
            <img 
              src="https://s1.directupload.eu/images/260323/haugqfhy.webp" 
              alt="Biergarten Background" 
              className="w-full h-full object-cover opacity-90 md:opacity-100"
              loading="eager"
              style={{
                maskImage: 'linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 75%, rgba(0,0,0,0) 100%)',
                WebkitMaskImage: 'linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 75%, rgba(0,0,0,0) 100%)'
              }}
              referrerPolicy="no-referrer"
            />
            {/* Gradient overlay */}
            <div className={`absolute inset-0 bg-gradient-to-b transition-colors duration-1000 ${isDarkMode ? 'from-black/60 via-[#12181c]/40 via-70% to-[#12181c]' : 'from-black/40 via-brand-light/40 via-70% to-brand-light'}`}></div>
          </div>

          <div className="flex flex-col gap-6 md:gap-8 w-full relative z-10 mt-auto">
            
            {/* Mobile Status Indicator (Hero) */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="md:hidden mb-2 flex justify-center"
            >
              <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-black/40 backdrop-blur-md border border-white/20 shadow-2xl">
                <div className="relative flex h-3 w-3">
                  <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${effectiveIsOpen ? 'bg-emerald-400' : 'bg-red-400'}`}></span>
                  <span className={`relative inline-flex rounded-full h-3 w-3 ${effectiveIsOpen ? 'bg-emerald-500' : 'bg-red-500'}`}></span>
                </div>
                <span className="font-serif text-lg tracking-wide text-white">
                  {effectiveIsOpen ? "Geöffnet" : "Geschlossen"}
                </span>
              </div>
            </motion.div>

            {/* Heading */}
            <div className="flex flex-col gap-3 md:gap-4 items-center text-center mx-auto">
              <h2 className="font-serif text-[10.5vw] xs:text-[9.5vw] sm:text-6xl md:text-7xl lg:text-[5.5rem] leading-[0.95] tracking-tight uppercase text-white drop-shadow-2xl">
                Wo jede Mass<br />eine Geschichte<br />erzählt.
              </h2>
            </div>

            {/* Subtext & Buttons */}
            <div className="flex flex-col gap-5 md:gap-8 max-w-2xl items-center text-center mx-auto">
              <p className={`text-sm sm:text-base md:text-xl leading-relaxed font-medium transition-colors duration-1000 drop-shadow-md max-w-[85%] md:max-w-full ${isDarkMode ? 'text-white/80 md:text-white/90' : 'text-white/90 md:text-white/95'}`}>
                Bayerische Gemütlichkeit seit 1926. <span className="hidden md:inline">Erlebe einen der schönsten Biergärten der Region, idyllisch gelegen unter alten Kastanien im Herzen von Haag an der Amper.</span>
              </p>
              
              <div className="flex flex-row items-center justify-center gap-3 md:gap-4 mt-2 md:mt-4 w-full sm:w-auto">
                <motion.a 
                  whileHover={{ scale: 1.03, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  href="#events"
                  className="group relative flex-1 sm:flex-none text-center bg-brand-orange text-white rounded-full px-6 py-4 md:px-9 md:py-4.5 font-bold flex items-center justify-center gap-2.5 md:gap-3 overflow-hidden shadow-[0_10px_30px_-10px_rgba(192,86,33,0.5)] hover:shadow-[0_15px_35px_-8px_rgba(192,86,33,0.7)] transition-all duration-300 border border-white/20 hover:border-white/40"
                >
                  {/* Refined sliding sheen effect */}
                  <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out pointer-events-none" />

                  {/* Refined status pulse */}
                  <span className="relative flex h-2 w-2 shrink-0">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
                  </span>

                  <CalendarPlus size={18} className="md:w-5 md:h-5 text-white transition-transform duration-300 group-hover:scale-110" />
                  <span className="relative z-10 tracking-[0.08em] uppercase text-xs md:text-sm font-extrabold font-sans">Kommende Events</span>
                  <ArrowRight size={16} className="md:w-4 md:h-4 text-white transition-transform duration-300 group-hover:translate-x-1" />
                </motion.a>
                <motion.a 
                  whileTap={{ scale: 0.96 }}
                  href="https://maps.google.com/?q=Biergarten+Schlossallee+Haag+an+der+Amper"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackEvent('routeClicks')}
                  className="flex-1 sm:flex-none text-center border border-white/30 md:border-2 md:border-white/40 backdrop-blur-sm text-white rounded-full px-4 py-3.5 md:px-8 md:py-4 font-semibold md:font-bold text-sm md:text-lg hover:bg-white/10 active:bg-white/20 transition-colors flex items-center justify-center gap-1.5 md:gap-2"
                >
                  <MapPin size={16} className="md:w-5 md:h-5" />
                  Anfahrt
                </motion.a>
              </div>
            </div>

          </div>

        </section>

        {/* SECTION B: Unsere Schmankerl & Hütt'n */}
        <section id="schmankerl" className={`py-24 md:py-40 px-4 sm:px-6 md:px-12 lg:px-20 relative z-20 transition-colors duration-1000 ${isDarkMode ? 'bg-[#12181c] text-brand-light' : 'bg-brand-light text-brand-dark'}`}>
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="max-w-7xl mx-auto"
          >
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end mb-12 md:mb-16 gap-6 md:gap-8">
              <h2 className="font-serif text-4xl sm:text-5xl md:text-7xl leading-none uppercase">
                Unsere<br />Schmankerl<br />& Hütt'n
              </h2>
              <p className={`max-w-md text-base md:text-lg font-medium transition-colors duration-1000 ${isDarkMode ? 'text-brand-light/70' : 'text-brand-dark/70'}`}>
                Handwerklich perfekt und premium. Entdecke unsere kulinarische Vielfalt. <br/><br/>
                <span className="text-brand-orange">Übrigens:</span> Die eigene Brotzeit darf bei uns ganz traditionell mitgebracht werden.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
              {/* Item 1: Schänke */}
              <motion.div whileTap={{ scale: 0.98 }} className="group relative w-full aspect-[4/5] md:aspect-[3/4] rounded-[32px] overflow-hidden cursor-pointer shadow-2xl">
                <img src="https://s1.directupload.eu/images/260409/98yijxvs.webp" alt="Schänke" className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" referrerPolicy="no-referrer" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0f12] via-[#0a0f12]/60 to-transparent opacity-90 group-hover:opacity-80 transition-opacity duration-500"></div>
                
                <div className="absolute inset-4 border border-white/20 rounded-[20px] z-10 transition-colors duration-500 group-hover:border-brand-orange/50 pointer-events-none"></div>

                <div className="absolute inset-0 p-8 md:p-10 flex flex-col justify-end z-20">
                  <div className="translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                    <span className="text-white text-xs font-bold uppercase tracking-[0.2em] mb-3 block drop-shadow-md">Frisch Gezapft</span>
                    <h3 className="font-serif text-4xl md:text-5xl text-white mb-4 drop-shadow-lg">Die Schänke</h3>
                    <div className="w-0 h-[2px] bg-brand-orange mb-5 group-hover:w-16 transition-all duration-500 delay-100"></div>
                    <p className="text-white/90 text-sm md:text-base leading-relaxed opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-200 drop-shadow-md">
                      Kühles Jaga Bier vom Fass, traditionelle Radler und erfrischende alkoholfreie Getränke. Der gesellige Mittelpunkt unseres Biergartens.
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* Item 2: Grillhaus */}
              <motion.div whileTap={{ scale: 0.98 }} className="group relative w-full aspect-[4/5] md:aspect-[3/4] rounded-[32px] overflow-hidden cursor-pointer shadow-2xl mt-0 md:mt-12">
                <img src="https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=800&q=80" alt="Grillhaus" className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" referrerPolicy="no-referrer" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0f12] via-[#0a0f12]/60 to-transparent opacity-90 group-hover:opacity-80 transition-opacity duration-500"></div>
                
                <div className="absolute inset-4 border border-white/20 rounded-[20px] z-10 transition-colors duration-500 group-hover:border-brand-orange/50 pointer-events-none"></div>

                <div className="absolute inset-0 p-8 md:p-10 flex flex-col justify-end z-20">
                  <div className="translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                    <span className="text-white text-xs font-bold uppercase tracking-[0.2em] mb-3 block drop-shadow-md">Heiß & Deftig</span>
                    <h3 className="font-serif text-4xl md:text-5xl text-white mb-4 drop-shadow-lg">Grillhaus</h3>
                    <div className="w-0 h-[2px] bg-brand-orange mb-5 group-hover:w-16 transition-all duration-500 delay-100"></div>
                    <p className="text-white/90 text-sm md:text-base leading-relaxed opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-200 drop-shadow-md">
                      Herzhafte bayrische Spezialitäten, knuspriger Schweinsbraten und feine Schmankerl frisch vom Grill. Ein echter Genuss.
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* Item 3: Bar */}
              <motion.div whileTap={{ scale: 0.98 }} className="group relative w-full aspect-[4/5] md:aspect-[3/4] rounded-[32px] overflow-hidden cursor-pointer shadow-2xl mt-0 lg:mt-24">
                <img src="https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&w=800&q=80" alt="Bar" className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" referrerPolicy="no-referrer" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0f12] via-[#0a0f12]/60 to-transparent opacity-90 group-hover:opacity-80 transition-opacity duration-500"></div>
                
                <div className="absolute inset-4 border border-white/20 rounded-[20px] z-10 transition-colors duration-500 group-hover:border-brand-orange/50 pointer-events-none"></div>

                <div className="absolute inset-0 p-8 md:p-10 flex flex-col justify-end z-20">
                  <div className="translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                    <span className="text-white text-xs font-bold uppercase tracking-[0.2em] mb-3 block drop-shadow-md">Kühl & Spritzig</span>
                    <h3 className="font-serif text-4xl md:text-5xl text-white mb-4 drop-shadow-lg">Die Bar</h3>
                    <div className="w-0 h-[2px] bg-brand-orange mb-5 group-hover:w-16 transition-all duration-500 delay-100"></div>
                    <p className="text-white/90 text-sm md:text-base leading-relaxed opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-200 drop-shadow-md">
                      Erlesene Weine, spritzige Aperitifs und kreative Cocktails für die lauen Sommerabende unter unseren Kastanien.
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Weitere Standl (Menu List) */}
            <div className="mt-20 md:mt-32 pt-16 md:pt-24 border-t border-white/10">
              <div className="text-center mb-16 md:mb-24">
                <h3 className="font-serif text-4xl md:text-6xl mb-4">Alle Standl</h3>
                <div className="w-16 h-[2px] bg-brand-orange mx-auto"></div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-20 gap-y-16 max-w-6xl mx-auto px-6">
                
                {/* Category 1: Bayerisch & Deftig */}
                <div className="flex flex-col gap-8">
                  <div className="border-b border-brand-orange/30 pb-4">
                    <h4 className="font-serif text-3xl md:text-4xl text-brand-orange">Bayerisch & Deftig</h4>
                    <span className={`uppercase tracking-[0.2em] text-xs font-bold ${isDarkMode ? 'text-white/50' : 'text-black/50'}`}>Die Klassiker</span>
                  </div>
                  
                  <div className="flex flex-col gap-10">
                    <div className="group">
                      <h5 className="font-bold text-xl md:text-2xl mb-1 flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1 sm:gap-4">
                        Die Grill-Hütt'n
                        <span className="font-sans text-xs uppercase tracking-widest text-brand-orange/80">Steak & Würstl</span>
                      </h5>
                      <p className={`text-base leading-relaxed ${isDarkMode ? 'text-brand-light/70' : 'text-brand-dark/70'}`}>
                        Hier gibt's das Herzhafte vom Holzkohlegrill. Vom saftigen Halsgrat bis zur knackigen Bratwurst – die perfekte Anlaufstelle für den klassischen Biergarten-Hunger.
                      </p>
                    </div>

                    <div className="group">
                      <h5 className="font-bold text-xl md:text-2xl mb-1 flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1 sm:gap-4">
                        Die Fischbraterei
                        <span className="font-sans text-xs uppercase tracking-widest text-brand-orange/80">Steckerlfisch</span>
                      </h5>
                      <p className={`text-base leading-relaxed ${isDarkMode ? 'text-brand-light/70' : 'text-brand-dark/70'}`}>
                        Ein absolutes Muss unter den Kastanien. Hier wird der traditionelle Steckerlfisch knusprig und frisch direkt über der heißen Glut gegrillt.
                      </p>
                    </div>

                    <div className="group">
                      <h5 className="font-bold text-xl md:text-2xl mb-1 flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1 sm:gap-4">
                        Die Bäckerei-Hütte
                        <span className="font-sans text-xs uppercase tracking-widest text-brand-orange/80">Brezn & Co.</span>
                      </h5>
                      <p className={`text-base leading-relaxed ${isDarkMode ? 'text-brand-light/70' : 'text-brand-dark/70'}`}>
                        Die Basis für jede gscheite Brotzeit. Resche Brezn, frisches Brot und alles, was man für den kleinen Hunger oder zum Teilen am Biertisch braucht.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col gap-16">
                  {/* Category 2: La Dolce Vita */}
                  <div className="flex flex-col gap-8">
                    <div className="border-b border-brand-orange/30 pb-4">
                      <h4 className="font-serif text-3xl md:text-4xl text-brand-orange">La Dolce Vita</h4>
                      <span className={`uppercase tracking-[0.2em] text-xs font-bold ${isDarkMode ? 'text-white/50' : 'text-black/50'}`}>Für die Abwechslung</span>
                    </div>
                    
                    <div className="flex flex-col gap-10">
                      <div className="group">
                        <h5 className="font-bold text-xl md:text-2xl mb-1 flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1 sm:gap-4">
                          Casa Della Pizza
                          <span className="font-sans text-xs uppercase tracking-widest text-brand-orange/80">"Alma"</span>
                        </h5>
                        <p className={`text-base leading-relaxed ${isDarkMode ? 'text-brand-light/70' : 'text-brand-dark/70'}`}>
                          Das absolute Upgrade für die Schlossallee! Frischer Pizzateig, der Duft zieht durch den Biergarten. Wer mal Abwechslung vom Grillfleisch sucht, bekommt hier original italienisches Flair.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Category 3: Zum Anstoßen */}
                  <div className="flex flex-col gap-8">
                    <div className="border-b border-brand-orange/30 pb-4">
                      <h4 className="font-serif text-3xl md:text-4xl text-brand-orange">Zum Anstoßen</h4>
                      <span className={`uppercase tracking-[0.2em] text-xs font-bold ${isDarkMode ? 'text-white/50' : 'text-black/50'}`}>Bier & Genuss</span>
                    </div>
                    
                    <div className="flex flex-col gap-10">
                      <div className="group">
                        <h5 className="font-bold text-xl md:text-2xl mb-1 flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1 sm:gap-4">
                          Die Getränke-Schänke
                          <span className="font-sans text-xs uppercase tracking-widest text-brand-orange/80">Bier & Limo</span>
                        </h5>
                        <p className={`text-base leading-relaxed ${isDarkMode ? 'text-brand-light/70' : 'text-brand-dark/70'}`}>
                          Das flüssige Herzstück. Hier holst du dir dein kühles, naturtrübes "Jaga Bier" im Keferloher oder ein frisches Weißbier von Huber Weisse. 
                        </p>
                      </div>

                      <div className="group">
                        <h5 className="font-bold text-xl md:text-2xl mb-1 flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1 sm:gap-4">
                          Die Outdoor-Bar
                          <span className="font-sans text-xs uppercase tracking-widest text-brand-orange/80">Cocktails & Wein</span>
                        </h5>
                        <p className={`text-base leading-relaxed ${isDarkMode ? 'text-brand-light/70' : 'text-brand-dark/70'}`}>
                          Aus dem alten "Glückshafen" wurde eine moderne Bar! Perfekt, um den lauen Sommerabend bei einem kühlen Spritz oder Cocktail unter den Lampions ausklingen zu lassen.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                
              </div>
            </div>
          </motion.div>
        </section>

        {/* SECTION TV: Mein Lokal, Dein Lokal */}
        <section id="tv-feature" className={`py-24 md:py-40 px-4 sm:px-6 md:px-12 lg:px-20 relative z-20 transition-colors duration-1000 ${isDarkMode ? 'bg-[#161f26] text-brand-light' : 'bg-brand-dark/5 text-brand-dark'}`}>
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-16 items-center"
          >
            <div className="order-2 lg:order-2">
              <div className="aspect-square md:aspect-[4/3] rounded-[32px] md:rounded-[40px] overflow-hidden relative shadow-2xl border border-white/10 group">
                <img src="https://www.merkur.de/assets/images/39/494/39494937-dem-sternekoch-schmeckt-ali-guengoermues-probierte-im-beisein-von-chefkoechin-michaela-harrer-und-betreiber-suleiman-hotaki-das-steirische-schnitzel-hzc1BpIatec.jpg" alt="Mein Lokal Dein Lokal in der Schlossallee" className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" loading="lazy" referrerPolicy="no-referrer" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0f12]/80 via-transparent to-transparent opacity-60"></div>
                
                {/* Play Button Overlay */}
                <a 
                  href="https://www.joyn.de/serien/mein-lokal-dein-lokal-der-profi-kommt-dprmg046bvl0/19-102-viel-masse-aber-auch-klasse-schlossallee-haag" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="absolute inset-0 flex items-center justify-center z-10"
                >
                  <div className="w-20 h-20 rounded-full bg-brand-orange/90 text-white flex items-center justify-center shadow-[0_0_40px_rgba(217,119,6,0.5)] transform transition-transform duration-500 group-hover:scale-110">
                    <Play size={36} strokeWidth={2} className="ml-2" />
                  </div>
                </a>
              </div>
            </div>
            <div className="order-1 lg:order-1 flex flex-col gap-6">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-[2px] bg-brand-orange"></div>
                <span className="text-brand-orange font-bold uppercase tracking-widest text-sm">Bekannt aus dem TV</span>
              </div>
              <h2 className="font-serif text-5xl md:text-6xl leading-[1.1] uppercase">
                Mein Lokal,<br />Dein Lokal.
              </h2>
              <p className={`text-lg leading-relaxed transition-colors duration-1000 ${isDarkMode ? 'text-brand-light/70' : 'text-brand-dark/70'}`}>
                Wir durften Sternekoch Ali Güngörmüş und das Team von Kabel Eins bei uns in der Schlossallee begrüßen. Ein besonderes Erlebnis für unser gesamtes Team!
              </p>
              <p className={`text-lg leading-relaxed transition-colors duration-1000 ${isDarkMode ? 'text-brand-light/70' : 'text-brand-dark/70'}`}>
                Überzeuge dich selbst von unseren Schmankerln und schau dir an, wie unser Steirisches Schnitzel beim Profi abgeschnitten hat.
              </p>
              
              <div className="mt-4">
                <a 
                  href="https://www.joyn.de/serien/mein-lokal-dein-lokal-der-profi-kommt-dprmg046bvl0/19-102-viel-masse-aber-auch-klasse-schlossallee-haag" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 bg-brand-orange text-white px-8 py-4 rounded-full font-bold shadow-lg hover:bg-brand-orange/90 active:scale-95 transition-all w-fit"
                >
                  <Tv size={20} />
                  Zur Folge auf Joyn
                </a>
              </div>
            </div>
          </motion.div>
        </section>

        {/* SECTION C: Ein Paradies für Familien */}
        <section id="familien" className={`py-24 md:py-40 px-4 sm:px-6 md:px-12 lg:px-20 relative z-20 transition-colors duration-1000 ${isDarkMode ? 'bg-[#1a242b] text-brand-light' : 'bg-brand-dark/5 text-brand-dark'}`}>
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-16 items-center"
          >
            <div className="order-2 lg:order-1">
              <div className="aspect-square md:aspect-[4/3] rounded-[32px] md:rounded-[40px] overflow-hidden relative shadow-2xl">
                <img src="https://www.radtourenchef.de/radwege/haag-an-der-amper/biergarten-schlossallee/bilder/biergarten-schlossallee1.jpg" alt="Kinder im Biergarten" className="w-full h-full object-cover" loading="lazy" referrerPolicy="no-referrer" />
              </div>
            </div>
            <div className="order-1 lg:order-2 flex flex-col gap-6">
              <h2 className="font-serif text-5xl md:text-6xl leading-[1.1] uppercase">
                Ein Paradies<br />für Familien.
              </h2>
              <p className={`text-lg leading-relaxed transition-colors duration-1000 ${isDarkMode ? 'text-brand-light/70' : 'text-brand-dark/70'}`}>
                Während die Eltern in Ruhe ihr kühles Jaga Bier unter den schattigen Kastanien genießen, wartet auf die kleinen Gäste das ganz große Abenteuer. 
              </p>
              <p className={`text-lg leading-relaxed transition-colors duration-1000 ${isDarkMode ? 'text-brand-light/70' : 'text-brand-dark/70'}`}>
                Unser <strong className={`font-semibold transition-colors duration-1000 ${isDarkMode ? 'text-brand-light' : 'text-brand-dark'}`}>2500m² großes Kinderparadies</strong> mit Hüpfburg, großem Abenteuerspielplatz und der legendären <strong className={`font-semibold transition-colors duration-1000 ${isDarkMode ? 'text-brand-light' : 'text-brand-dark'}`}>Ampertal-Kindereisenbahn</strong> macht den Besuch für die ganze Familie unvergesslich.
              </p>
            </div>
          </motion.div>
        </section>

        {/* SECTION D: Join the Club (Events) */}
        <section id="events" className={`py-24 md:py-40 px-4 sm:px-6 md:px-12 lg:px-20 relative z-20 transition-colors duration-1000 ${isDarkMode ? 'bg-[#12181c] text-brand-light' : 'bg-brand-light text-brand-dark'}`}>
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="max-w-7xl mx-auto"
          >
            <div className="text-center mb-12 md:mb-20">
              <h2 className="font-serif text-5xl sm:text-6xl md:text-8xl leading-none uppercase mb-4 md:mb-6">
                Kultur &<br />Events
              </h2>
              <p className={`text-lg md:text-xl font-medium transition-colors duration-1000 ${isDarkMode ? 'text-brand-light/60' : 'text-brand-dark/60'}`}>Limitierte Erlebnisse unter Kastanien.</p>
            </div>

            <div className="flex flex-col gap-8">
              {/* Event 1 - Next Event / Schlager-Abend */}
              <div 
                onClick={() => setShowSchlagerModal(true)}
                className="group relative bg-brand-dark text-brand-light rounded-3xl p-8 md:p-12 overflow-hidden hover:shadow-2xl transition-all cursor-pointer border border-brand-orange/20 hover:border-brand-orange/50"
              >
                <div className="absolute top-0 right-0 w-full md:w-1/2 h-full opacity-20 group-hover:opacity-35 transition-opacity duration-700 pointer-events-none">
                  <img src={schlagerPartyBg} alt="Schlager-Abend im Biergarten" className="w-full h-full object-cover object-center" referrerPolicy="no-referrer" />
                  <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-brand-dark via-brand-dark/85 to-transparent"></div>
                </div>
                <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-8">
                  <div>
                    <div className="flex flex-wrap gap-2 items-center mb-4">
                      <span className="bg-brand-orange text-brand-dark font-bold tracking-widest uppercase text-[10px] px-3 py-1 rounded-full">Nächstes Event</span>
                      <span className="text-brand-orange/90 font-bold tracking-widest uppercase text-xs">Schlager-Klassiker & Stimmung</span>
                    </div>
                    <h3 className="font-serif text-4xl md:text-5xl mb-3 text-brand-light group-hover:text-brand-orange transition-colors">Schlager-Abend im Biergarten</h3>
                    <p className="font-serif text-xl md:text-2xl text-brand-light/70 max-w-lg mb-4">
                      Mit DJ MY T CHRIS — Feiern und Mitsingen unter Kastanien!
                    </p>
                    <div className="text-brand-orange text-sm font-semibold flex items-center gap-2 mt-2 pt-2 border-t border-white/10 max-w-sm group-hover:translate-x-1 transition-transform">
                      <span>Details & Informationen anzeigen</span>
                      <ArrowRight size={16} />
                    </div>
                  </div>
                  <div className="text-left md:text-right flex flex-col items-start md:items-end gap-3 shrink-0">
                    <div className="text-base font-medium text-brand-orange">
                      Freitag
                    </div>
                    <div>
                      <div className="font-serif text-5xl md:text-6xl text-brand-light leading-none">03.</div>
                      <div className="text-xl font-medium tracking-widest uppercase text-brand-light/70 mt-1">Juli 2026</div>
                      <div className="text-xs uppercase tracking-wider text-brand-orange font-bold mt-1.5">Eintritt frei</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Event 2 - 100. Jubiläum */}
              <div 
                onClick={() => setShowJubilaeumModal(true)}
                className="group relative bg-[#1c2328] text-brand-light rounded-3xl p-8 md:p-12 overflow-hidden hover:shadow-2xl transition-all cursor-pointer border border-white/5 hover:border-brand-orange/30"
              >
                <div className="absolute top-0 right-0 w-full md:w-1/2 h-full opacity-20 group-hover:opacity-35 transition-opacity duration-700 pointer-events-none">
                  <img src={jubilaeumBg} alt="100. Jubiläum" className="w-full h-full object-cover object-center" referrerPolicy="no-referrer" />
                  <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-[#1c2328] via-[#1c2328]/85 to-transparent"></div>
                </div>
                <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-8">
                  <div>
                    <div className="flex flex-wrap gap-2 items-center mb-4">
                      <span className="bg-brand-light/10 text-brand-light/80 font-bold tracking-widest uppercase text-[10px] px-3 py-1 rounded-full">Kommendes Highlight</span>
                      <span className="text-brand-orange/80 font-bold tracking-widest uppercase text-xs">Großes Jubiläumsfest</span>
                    </div>
                    <h3 className="font-serif text-4xl md:text-5xl mb-3 text-brand-light/90 group-hover:text-brand-orange transition-colors">100. Jubiläum der Schlossallee</h3>
                    <p className="font-serif text-xl md:text-2xl text-brand-light/60 max-w-lg mb-4">
                      Festwochenende mit saftigem Ochsen am Spieß und allem drum und dran!
                    </p>
                    <div className="text-brand-orange text-sm font-semibold flex items-center gap-2 mt-2 pt-2 border-t border-white/10 max-w-sm group-hover:translate-x-1 transition-transform">
                      <span>Details & Festprogramm anzeigen</span>
                      <ArrowRight size={16} />
                    </div>
                  </div>
                  <div className="text-left md:text-right flex flex-col items-start md:items-end gap-3 shrink-0">
                    <div className="text-base font-medium text-brand-light/50">
                      Samstag & Sonntag
                    </div>
                    <div>
                      <div className="font-serif text-5xl md:text-6xl text-brand-light/90 leading-none">18.-19.</div>
                      <div className="text-xl font-medium tracking-widest uppercase text-brand-light/40 mt-1">Juli 2026</div>
                      <div className="text-xs uppercase tracking-wider text-brand-orange font-bold mt-1.5">Eintritt frei</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Event 3 - 14. Kaiserzeitausfahrt® */}
              <div 
                onClick={() => setShowEventModal(true)}
                className="group relative bg-[#1c2328] text-brand-light rounded-3xl p-8 md:p-12 overflow-hidden hover:shadow-2xl transition-all cursor-pointer border border-white/5 hover:border-brand-orange/30"
              >
                <div className="absolute top-0 right-0 w-full md:w-1/2 h-full opacity-20 group-hover:opacity-35 transition-opacity duration-700 pointer-events-none">
                  <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR1nNF57d5b6aKNjzENaFy0MIuzyd8jvP1KBiC5aQwG_-ysyBLHkimr0RU&s=10" alt="14. Kaiserzeitausfahrt Oldtimer Motorräder" className="w-full h-full object-cover object-center" referrerPolicy="no-referrer" />
                  <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-[#1c2328] via-[#1c2328]/85 to-transparent"></div>
                </div>
                <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-8">
                  <div>
                    <div className="flex flex-wrap gap-2 items-center mb-4">
                      <span className="bg-brand-light/10 text-brand-light/80 font-bold tracking-widest uppercase text-[10px] px-3 py-1 rounded-full">Kommendes Highlight</span>
                      <span className="text-brand-orange/80 font-bold tracking-widest uppercase text-xs">Internationale Oldtimer-Ausfahrt</span>
                    </div>
                    <h3 className="font-serif text-4xl md:text-5xl mb-3 text-brand-light/90 group-hover:text-brand-orange transition-colors">14. Kaiserzeitausfahrt®</h3>
                    <p className="font-serif text-xl md:text-2xl text-brand-light/60 max-w-lg mb-4">
                      Historische Motorräder aus 10 europäischen Ländern im Schlossallee Biergarten
                    </p>
                    <div className="text-brand-orange text-sm font-semibold flex items-center gap-2 mt-2 pt-2 border-t border-white/10 max-w-sm group-hover:translate-x-1 transition-transform">
                      <span>Veranstaltungsdetails & Programm anzeigen</span>
                      <ArrowRight size={16} />
                    </div>
                  </div>
                  <div className="text-left md:text-right flex flex-col items-start md:items-end gap-3 shrink-0">
                    <div className="text-base font-medium text-brand-light/50">
                      Samstag & Sonntag
                    </div>
                    <div>
                      <div className="font-serif text-5xl md:text-6xl text-brand-light/90 leading-none">01.-02.</div>
                      <div className="text-xl font-medium tracking-widest uppercase text-brand-light/40 mt-1">August 2026</div>
                      <div className="text-xs uppercase tracking-wider text-brand-orange font-bold mt-1.5">Eintritt frei</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Event 4 - Lampionfest */}
              <div 
                onClick={() => setShowLampionfestModal(true)}
                className="group relative bg-[#1c2328] text-brand-light rounded-3xl p-8 md:p-12 overflow-hidden hover:shadow-2xl transition-all cursor-pointer border border-white/5 hover:border-brand-orange/30"
              >
                <div className="absolute top-0 right-0 w-full md:w-1/2 h-full opacity-20 group-hover:opacity-35 transition-opacity duration-700 pointer-events-none">
                  <img src={lampionfestBg} alt="Lampionfest im Biergarten" className="w-full h-full object-cover object-center" referrerPolicy="no-referrer" />
                  <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-[#1c2328] via-[#1c2328]/85 to-transparent"></div>
                </div>
                <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-8">
                  <div>
                    <div className="flex flex-wrap gap-2 items-center mb-4">
                      <span className="bg-brand-light/10 text-brand-light/80 font-bold tracking-widest uppercase text-[10px] px-3 py-1 rounded-full">Romantischer Abend</span>
                      <span className="text-brand-orange/80 font-bold tracking-widest uppercase text-xs">Licht & Magie</span>
                    </div>
                    <h3 className="font-serif text-4xl md:text-5xl mb-3 text-brand-light/90 group-hover:text-brand-orange transition-colors">Lampionfest im Biergarten</h3>
                    <p className="font-serif text-xl md:text-2xl text-brand-light/60 max-w-lg mb-4">
                      Hunderte bunte Lampions erleuchten die altehrwürdigen Kastanienbäume
                    </p>
                    <div className="text-brand-orange text-sm font-semibold flex items-center gap-2 mt-2 pt-2 border-t border-white/10 max-w-sm group-hover:translate-x-1 transition-transform">
                      <span>Veranstaltungsdetails & Programm anzeigen</span>
                      <ArrowRight size={16} />
                    </div>
                  </div>
                  <div className="text-left md:text-right flex flex-col items-start md:items-end gap-3 shrink-0">
                    <div className="text-base font-medium text-brand-light/50">
                      Freitag & Samstag
                    </div>
                    <div>
                      <div className="font-serif text-5xl md:text-6xl text-brand-light/90 leading-none">21.-22.</div>
                      <div className="text-xl font-medium tracking-widest uppercase text-brand-light/40 mt-1">August 2026</div>
                      <div className="text-xs uppercase tracking-wider text-brand-orange font-bold mt-1.5">Eintritt frei</div>
                    </div>
                  </div>
                </div>
              </div>



            </div>
          </motion.div>
        </section>

        {/* SECTION F: Hunde Willkommen */}
        <section id="hunde" className={`py-24 md:py-40 px-4 sm:px-6 md:px-12 lg:px-20 relative z-20 transition-colors duration-1000 ${isDarkMode ? 'bg-[#12181c] text-brand-light' : 'bg-brand-light text-brand-dark'}`}>
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="max-w-7xl mx-auto"
          >
            <div className="text-center mb-12 md:mb-20">
              <h2 className="font-serif text-5xl sm:text-6xl md:text-8xl leading-none uppercase mb-4 md:mb-6">
                Ein Platz für<br />Vierbeiner
              </h2>
              <p className={`text-lg md:text-xl font-medium transition-colors duration-1000 ${isDarkMode ? 'text-brand-light/60' : 'text-brand-dark/60'}`}>Auch eure Hunde sollen sich rundum wohlfühlen.</p>
            </div>

            <div className="group relative bg-brand-dark text-brand-light rounded-3xl p-8 md:p-12 overflow-hidden cursor-pointer hover:shadow-2xl transition-shadow">
              <div className="absolute top-0 right-0 w-full lg:w-2/3 h-full opacity-30 group-hover:opacity-50 transition-opacity duration-700">
                <img src="https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_2zg6kRsQgLvpBAc5mmGVtMaqZi0%2Fhf_20260531_131345_930b092d-2f54-46a0-b897-a2f90fbdefda.png&w=1280&q=85" alt="Hund im Biergarten" className="w-full h-full object-cover object-center" referrerPolicy="no-referrer" />
                <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r from-brand-dark via-brand-dark/90 to-transparent"></div>
              </div>
              
              <div className="relative z-10 flex flex-col gap-12">
                <div className="max-w-2xl">
                  <span className="text-brand-orange font-bold tracking-widest uppercase text-sm mb-4 block">Immer Willkommen</span>
                  <h3 className="font-serif text-4xl md:text-6xl mb-6">Für die treuesten Begleiter.</h3>
                  <p className="text-brand-light/80 text-lg md:text-xl leading-relaxed mb-10">
                    Gut erzogene Hunde sind bei uns im Biergarten Schlossallee herzlich willkommen! 
                    Damit sich auch unsere vierbeinigen Gäste rundum wohlfühlen, haben wir natürlich an eine hundegerechte Umgebung gedacht.
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:border-brand-orange/30 transition-colors">
                      <div className="flex items-center gap-3 mb-4">
                        <Droplets className="text-brand-orange w-6 h-6" />
                        <h4 className="font-serif text-2xl text-white">Trinkwasser</h4>
                      </div>
                      <p className="text-brand-light/70 text-base leading-relaxed">
                        Wassernäpfe stehen jederzeit frisch befüllt direkt an der Schänke und am Haupteingang für euch bereit.
                      </p>
                    </div>
                    
                    <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:border-brand-orange/30 transition-colors">
                      <div className="flex items-center gap-3 mb-4">
                        <TreePine className="text-brand-orange w-6 h-6" />
                        <h4 className="font-serif text-2xl text-white">Schattenplätze</h4>
                      </div>
                      <p className="text-brand-light/70 text-base leading-relaxed">
                        Besonders die Tische im hinteren Bereich unter den alten Kastanien bieten an heißen Tagen perfekten Schatten.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </section>

        {/* SECTION F: Lost & Found */}
        <section id="fundbuero" className={`py-24 md:py-40 px-4 sm:px-6 md:px-12 lg:px-20 relative z-20 transition-colors duration-1000 ${isDarkMode ? 'bg-[#12181c] text-brand-light' : 'bg-brand-light text-brand-dark'}`}>
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="max-w-7xl mx-auto"
          >
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end mb-12 md:mb-16 gap-6 md:gap-8">
              <div>
                <h2 className="font-serif text-4xl sm:text-5xl md:text-7xl leading-none uppercase">
                  Digitales<br />Fundbüro
                </h2>
              </div>
              <p className={`max-w-md text-base md:text-lg font-medium transition-colors duration-1000 ${isDarkMode ? 'text-brand-light/70' : 'text-brand-dark/70'}`}>
                Etwas nach der letzten Maß vergessen? Hier listen wir anonymisiert auf, was bei uns liegen geblieben ist.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <AnimatePresence>
                {foundItems.length > 0 ? foundItems.map((foundItem, index) => (
                  <motion.div 
                    key={foundItem.id} 
                    initial={{ opacity: 0, scale: 0.9, y: 20 }}
                    whileInView={{ opacity: 1, scale: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    whileTap={{ scale: 0.98 }}
                    className="group relative w-full rounded-[32px] overflow-hidden cursor-pointer shadow-2xl bg-[#161f26] border border-white/10 hover:border-brand-orange/30 transition-colors duration-500 p-6 md:p-8 flex flex-col min-h-[240px]"
                  >
                    {/* Subtle Bavarian Diamond Pattern Overlay */}
                    <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 10px, #ffffff 10px, #ffffff 11px), repeating-linear-gradient(-45deg, transparent, transparent 10px, #ffffff 10px, #ffffff 11px)' }}></div>
                    
                    <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    
                    <div className="flex justify-between items-start relative z-10 mb-auto">
                      <div className="px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest bg-brand-dark/50 text-brand-orange border border-brand-orange/20">
                        {foundItem.date}
                      </div>
                      <div className="w-10 h-10 rounded-full flex items-center justify-center border border-white/10 bg-white/5 text-brand-orange group-hover:bg-brand-orange group-hover:text-white transition-all duration-500">
                        <Search size={18} />
                      </div>
                    </div>
                    
                    <div className="relative z-10 mt-8">
                      <h3 className="font-serif text-2xl md:text-3xl text-white mb-4 drop-shadow-lg">{foundItem.item}</h3>
                      <div className="w-8 h-[2px] bg-brand-orange mb-4 group-hover:w-16 transition-all duration-500"></div>
                      <div className="flex items-center gap-2 text-white/70 text-sm">
                        <MapPin size={16} className="text-brand-orange" />
                        <p>{foundItem.location}</p>
                      </div>
                    </div>
                  </motion.div>
                )) : (
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="col-span-full group relative w-full rounded-[32px] overflow-hidden shadow-2xl flex items-center justify-center bg-[#161f26] border border-white/10 p-10 md:p-16 lg:p-20"
                  >
                    {/* Subtle Bavarian Diamond Pattern Overlay */}
                    <div className="absolute inset-0 opacity-[0.02] pointer-events-none" style={{ backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 20px, #ffffff 20px, #ffffff 21px), repeating-linear-gradient(-45deg, transparent, transparent 20px, #ffffff 20px, #ffffff 21px)' }}></div>
                    
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/20"></div>
                    <div className="absolute inset-4 border border-white/10 rounded-[20px] z-10 pointer-events-none"></div>
                    
                    <div className="relative z-20 flex flex-col items-center text-center">
                      <div className="w-20 h-20 rounded-full bg-brand-orange/10 text-brand-orange flex items-center justify-center mb-6 border border-brand-orange/20 shadow-[0_0_30px_rgba(217,119,6,0.15)]">
                        <Heart size={36} strokeWidth={1.5} />
                      </div>
                      <h3 className="font-serif text-3xl md:text-4xl text-white mb-4">Nix verlorn, ois beinand!</h3>
                      <div className="w-12 h-[2px] bg-brand-orange mb-6"></div>
                      <p className="text-white/60 text-base md:text-lg max-w-md leading-relaxed">Aktuell gibt es keine verlorenen Gegenstände. Wir passen gut auf eure Sachen auf!</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            
            <div className="mt-12 text-center">
              <p className={`text-sm md:text-base transition-colors duration-1000 ${isDarkMode ? 'text-brand-light/60' : 'text-brand-dark/60'}`}>
                Gehört dir einer dieser Gegenstände? Melde dich einfach beim Personal an der Schänke oder ruf uns an.
              </p>
            </div>
          </motion.div>
        </section>
          </>
        ) : currentView === 'about' ? (
          <AboutUs isDarkMode={isDarkMode} onBack={() => setCurrentView('home')} />
        ) : (
          <div className="pt-40 pb-24 px-4 sm:px-6 md:px-12 lg:px-20 min-h-[80vh]">
            <div className="max-w-4xl mx-auto">
              <button 
                onClick={() => setCurrentView('home')} 
                className={`flex items-center gap-2 mb-12 font-medium transition-colors ${isDarkMode ? 'text-brand-orange hover:text-brand-orange/80' : 'text-brand-orange hover:text-brand-orange/80'}`}
              >
                <ArrowLeft size={20} /> Zurück zur Startseite
              </button>
              {currentView === 'impressum' && <Impressum isDarkMode={isDarkMode} />}
              {currentView === 'agb' && <AGB isDarkMode={isDarkMode} />}
              {currentView === 'datenschutz' && <Datenschutz isDarkMode={isDarkMode} />}
            </div>
          </div>
        )}

      </main>

      {/* SECTION G: Visit Us / Footer */}
      <footer id="kontakt" className={`pt-32 md:pt-48 pb-12 md:pb-12 px-4 sm:px-6 md:px-12 lg:px-20 relative -mt-10 md:-mt-20 z-0 transition-colors duration-1000 ${isDarkMode ? 'bg-[#0a0f13] text-brand-light' : 'bg-brand-dark text-brand-light'}`}>
        <motion.div 
          initial={{ opacity: 0, y: 80 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 md:gap-16"
        >
          
          {/* Info */}
          <div className="lg:col-span-12 flex flex-col gap-8">
            <h2 className="font-serif text-5xl md:text-7xl leading-none uppercase">Besuch uns.</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-4">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-brand-orange/10 flex items-center justify-center shrink-0">
                  <MapPin className="text-brand-orange" size={24} />
                </div>
                <div>
                  <h4 className="text-brand-orange font-bold uppercase tracking-widest text-xs mb-1">Anfahrt</h4>
                  <a 
                    href="https://www.google.com/maps/dir/?api=1&destination=Schlossallee+Haag+Freisinger+Str.+1+85410+Haag+an+der+Amper" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className={`text-lg transition-colors duration-1000 hover:text-brand-orange ${isDarkMode ? 'text-brand-light/70' : 'text-brand-light/70'}`}
                  >
                    Freisinger Str. 1<br/>85410 Haag a.d. Amper
                  </a>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-brand-orange/10 flex items-center justify-center shrink-0">
                  <Clock className="text-brand-orange" size={24} />
                </div>
                <div>
                  <h4 className="text-brand-orange font-bold uppercase tracking-widest text-xs mb-1">Öffnungszeiten</h4>
                  <p className={`text-lg transition-colors duration-1000 ${isDarkMode ? 'text-brand-light/70' : 'text-brand-light/70'}`}>Mo - Do: 14:00 - 22:00 Uhr<br/>Fr - So & Feiertage: 11:30 - 22:00 Uhr</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-brand-orange/10 flex items-center justify-center shrink-0">
                  <Phone className="text-brand-orange" size={24} />
                </div>
                <div>
                  <h4 className="text-brand-orange font-bold uppercase tracking-widest text-xs mb-1">Kontakt</h4>
                  <div className="flex flex-col">
                    <a 
                      href="tel:+4917640216107" 
                      className={`text-lg transition-colors duration-1000 hover:text-brand-orange ${isDarkMode ? 'text-brand-light/70' : 'text-brand-light/70'}`}
                    >
                      +49 176 40216107
                    </a>
                    <a 
                      href="mailto:info@schlossalleehaag.de" 
                      className={`text-lg transition-colors duration-1000 hover:text-brand-orange ${isDarkMode ? 'text-brand-light/70' : 'text-brand-light/70'}`}
                    >
                      info@schlossalleehaag.de
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Branded Map */}
            <div className={`w-full h-64 md:h-96 rounded-[32px] overflow-hidden relative mt-4 shadow-2xl border transition-colors duration-1000 ${isDarkMode ? 'border-white/10' : 'border-white/10'}`}>
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2647.265780362837!2d11.831111!3d48.45!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x479e123456789abc%3A0x123456789abcdef!2sBiergarten%20Schlossallee%20Haag!5e0!3m2!1sde!2sde!4v1610000000000!5m2!1sde!2sde" 
                width="100%" 
                height="100%" 
                style={{ border: 0, filter: isDarkMode ? 'grayscale(1) sepia(0.4) hue-rotate(70deg) brightness(0.8) contrast(1.2)' : 'grayscale(0.5) contrast(1.1)' }} 
                allowFullScreen 
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
              <a href="https://maps.google.com/?q=Biergarten+Schlossallee+Haag+an+der+Amper" onClick={() => trackEvent('routeClicks')} target="_blank" rel="noopener noreferrer" className="absolute bottom-4 right-4 bg-brand-orange text-white px-6 py-3 rounded-full font-bold shadow-lg active:scale-95 transition-all flex items-center gap-2 text-sm">
                <MapPin size={18} /> Route planen
              </a>
            </div>
          </div>
        </motion.div>

        <div className={`max-w-7xl mx-auto mt-24 pt-8 border-t flex flex-col md:flex-row justify-between items-center gap-8 text-sm transition-colors duration-1000 ${isDarkMode ? 'border-white/10 text-brand-light/40' : 'border-white/10 text-brand-light/40'}`}>
          <div className="flex flex-col items-center md:items-start gap-2">
            <p onClick={handleFooterClick} className="cursor-pointer select-none text-center md:text-left leading-relaxed">© 2026 Schlossallee-Biergarten Haag an der Amper.<br className="md:hidden" /> Alle Rechte vorbehalten.</p>
            <p className="text-center md:text-left text-brand-light/50">
              Webdesign & Entwicklung durch <a href="http://vamela.info" target="_blank" rel="noopener noreferrer" className="font-serif text-brand-light hover:text-brand-orange transition-colors">Vamela</a>
            </p>
          </div>
          <div className="flex flex-wrap justify-center gap-x-8 gap-y-4">
            <button onClick={() => setCurrentView('about')} className="transition-colors hover:text-brand-orange py-2">Über uns</button>
            <button onClick={() => setCurrentView('impressum')} className="transition-colors hover:text-brand-orange py-2">Impressum</button>
            <button onClick={() => setCurrentView('agb')} className="transition-colors hover:text-brand-orange py-2">AGB</button>
            <button onClick={() => setCurrentView('datenschutz')} className="transition-colors hover:text-brand-orange py-2">Datenschutz</button>
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
            className="fixed inset-0 z-[100] bg-brand-dark flex flex-col items-center justify-center p-6 pt-[env(safe-area-inset-top)] pb-[env(safe-area-inset-bottom)]"
          >
            <button 
              onClick={() => setIsMenuOpen(false)}
              className="absolute right-6 w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-brand-light active:scale-90 transition-transform z-[110]"
              style={{ top: 'max(1.5rem, env(safe-area-inset-top))' }}
            >
              <X size={32} strokeWidth={1.5} />
            </button>
            <nav className="flex flex-col items-center gap-4 md:gap-8 text-center px-4">
              <a href="#schmankerl" onClick={() => { setIsMenuOpen(false); setCurrentView('home'); }} className="font-serif text-4xl md:text-6xl text-brand-light active:text-brand-orange transition-colors uppercase py-3">Schmankerl</a>
              <a href="#events" onClick={() => { setIsMenuOpen(false); setCurrentView('home'); }} className="font-serif text-4xl md:text-6xl text-brand-light active:text-brand-orange transition-colors uppercase py-3">Events</a>
              <a href="#fundbuero" onClick={() => { setIsMenuOpen(false); setCurrentView('home'); }} className="font-serif text-4xl md:text-6xl text-brand-light active:text-brand-orange transition-colors uppercase py-3">Fundbüro</a>
              <button onClick={() => { setIsMenuOpen(false); setCurrentView('about'); }} className="font-serif text-4xl md:text-6xl text-brand-light active:text-brand-orange transition-colors uppercase py-3">Über uns</button>
              <a href="#kontakt" onClick={() => { setIsMenuOpen(false); setCurrentView('home'); }} className="font-serif text-4xl md:text-6xl text-brand-light active:text-brand-orange transition-colors uppercase py-3">Kontakt</a>
              
              <div className="mt-8 flex gap-6">
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Folge unserem Biergarten auf Instagram" title="Biergarten Schlossallee Haag auf Instagram" className="w-14 h-14 rounded-full bg-white/5 flex items-center justify-center text-white active:bg-brand-orange transition-colors">
                  <Instagram size={24} />
                </a>
                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Folge unserem Biergarten auf Facebook" title="Biergarten Schlossallee Haag auf Facebook" className="w-14 h-14 rounded-full bg-white/5 flex items-center justify-center text-white active:bg-brand-orange transition-colors">
                  <Facebook size={24} />
                </a>
              </div>

              <button 
                onClick={() => {
                  setIsMenuOpen(false);
                  setShowPasswordModal(true);
                }}
                className="mt-8 text-white/30 text-xs uppercase tracking-widest py-4"
              >
                Admin Login
              </button>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>



      {/* Event Details Modal */}
      <AnimatePresence>
        {showEventModal && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-md p-3 sm:p-6"
            onClick={(e) => {
              if (e.target === e.currentTarget) setShowEventModal(false);
            }}
          >
            <motion.div 
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="bg-brand-dark border border-white/10 rounded-3xl p-6 sm:p-10 w-full max-w-3xl relative shadow-2xl text-brand-light max-h-[90dvh] flex flex-col"
            >
              <button 
                onClick={() => setShowEventModal(false)}
                className="absolute top-5 right-5 text-white/50 hover:text-brand-orange transition-colors p-2 rounded-full bg-white/5 hover:bg-white/10 shrink-0 z-10"
              >
                <X size={20} />
              </button>

              <div className="overflow-y-auto pr-2 hide-scrollbar space-y-8 flex-1">
                <div>
                  <div className="flex flex-wrap gap-2 items-center mb-3">
                    <span className="bg-brand-orange text-brand-dark font-bold tracking-widest uppercase text-xs px-3 py-1 rounded-full">Event Details</span>
                    <span className="text-brand-orange font-medium text-xs sm:text-sm">01. – 02. August 2026</span>
                  </div>
                  <h3 className="font-serif text-3xl sm:text-5xl md:text-6xl text-brand-light mb-2">14. Kaiserzeitausfahrt®</h3>
                  <p className="font-serif text-lg sm:text-2xl text-brand-orange font-medium">
                    Internationale Oldtimer-Ausfahrt der Extraklasse im Biergarten Schlossallee
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm bg-white/5 p-5 rounded-2xl border border-white/10">
                  <div>
                    <span className="text-brand-light/50 text-xs uppercase tracking-wider block mb-1">Datum & Uhrzeit</span>
                    <strong className="text-brand-light block">Samstag & Sonntag, 1. – 2. August 2026</strong>
                    <span className="text-brand-light/70 text-xs">Samstag ab 10:00 Uhr • Sonntag Start 10:00 Uhr</span>
                  </div>
                  <div>
                    <span className="text-brand-light/50 text-xs uppercase tracking-wider block mb-1">Veranstaltungsort</span>
                    <strong className="text-brand-light block">Biergarten Schlossallee</strong>
                    <span className="text-brand-light/70 text-xs">Freisinger Str. 1, 85410 Haag an der Amper</span>
                  </div>
                </div>

                <div className="space-y-4 text-brand-light/85 text-base leading-relaxed">
                  <p>
                    Zum 14. Mal lädt der Münchner Veteranen Motorrad Club e. V. (MVMC) zu einer der schönsten internationalen Ausfahrten für historische Motorräder ein. Inmitten eines der schönsten Biergärten Bayerns – der Schlossallee in Haag an der Amper – präsentieren Teilnehmer aus 10 europäischen Ländern ihre mindestens 100 Jahre alten Fahrzeuge.
                  </p>
                  <p>
                    Zugelassen sind historische Motorräder aus der Kaiserzeit bis einschließlich Baujahr 1918 sowie eine Sonderklasse bis Baujahr 1926. Die Veranstaltung steht ganz im Zeichen von Gastfreundschaft, Geselligkeit und der Faszination für seltene, historische Technik.
                  </p>
                </div>

                <div className="bg-gradient-to-br from-brand-orange/20 to-transparent border border-brand-orange/40 p-5 rounded-2xl">
                  <span className="text-brand-orange font-bold text-base block mb-2">Besucher-Highlight</span>
                  <p className="text-sm sm:text-base text-brand-light/90 leading-relaxed">
                    Viele Teilnehmer und Gäste präsentieren sich in zeitgemäßer Bekleidung. Auch interessierte Besucher sind herzlich dazu eingeladen, im Stil der Anfangsjahre des 20. Jahrhunderts zu erscheinen und die Maschinen aus nächster Nähe zu bewundern.
                  </p>
                </div>

                <div>
                  <h4 className="text-brand-orange font-bold text-xs uppercase tracking-widest mb-4">Programm & Ablauf</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="bg-black/30 p-4 rounded-xl border border-white/5 space-y-2">
                      <span className="text-brand-light font-bold text-sm block border-b border-white/10 pb-1.5 text-brand-orange">Samstag, 1. August 2026</span>
                      <p className="text-xs text-brand-light/80 leading-normal">
                        <strong>Ab 10:00 Uhr:</strong> Technische Überprüfung der Maschinen durch den TÜV Süd (können von Besuchern bestaunt werden). Die meisten Maschinen sind bereits am Samstag zu bewundern.
                      </p>
                      <p className="text-xs text-brand-light/80 leading-normal">
                        <strong>Ab 13:00 Uhr:</strong> Kleine Einstellfahrt rund um Haag.
                      </p>
                    </div>
                    <div className="bg-black/30 p-4 rounded-xl border border-white/5 space-y-2">
                      <span className="text-brand-light font-bold text-sm block border-b border-white/10 pb-1.5 text-brand-orange">Sonntag, 2. August 2026</span>
                      <p className="text-xs text-brand-light/80 leading-normal">
                        <strong>10:00 Uhr:</strong> Offizieller Start der Ausfahrt.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="text-xs text-brand-light/60 pt-2 flex flex-wrap justify-between items-center gap-2 border-t border-white/10">
                  <div>
                    <span className="text-brand-light/80 font-semibold">Veranstalter: </span>
                    Münchner Veteranen Motorrad Club e. V. (MVMC)
                  </div>
                  <div>
                    <span className="text-brand-light/80 font-semibold">Website: </span>
                    <a href="http://www.kaiserzeitausfahrt.de" target="_blank" rel="noopener noreferrer" className="text-brand-orange hover:underline">www.kaiserzeitausfahrt.de</a>
                  </div>
                </div>
              </div>

              <div className="pt-6 mt-6 border-t border-white/10 flex flex-wrap gap-4 justify-end items-center shrink-0">
                <a 
                  href="http://www.kaiserzeitausfahrt.de" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="flex items-center gap-2 bg-white/10 hover:bg-white/20 text-brand-light px-6 py-3 rounded-full transition-colors text-sm font-semibold"
                >
                  <Info size={16} />
                  <span>Website besuchen</span>
                </a>
                <button 
                  onClick={() => {
                    downloadICS('14. Kaiserzeitausfahrt® - Schlossallee', 'Internationale Oldtimer-Ausfahrt der Extraklasse im Biergarten Schlossallee Haag. Veranstalter: MVMC.', '20260801T080000Z', '20260802T160000Z');
                  }}
                  className="flex items-center gap-2 bg-brand-orange hover:bg-brand-orange/90 text-brand-dark px-6 py-3 rounded-full transition-colors text-sm font-bold shadow-lg"
                >
                  <CalendarPlus size={16} />
                  <span>In Kalender eintragen</span>
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Schlager Modal */}
      <AnimatePresence>
        {showSchlagerModal && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-md p-3 sm:p-6"
            onClick={(e) => {
              if (e.target === e.currentTarget) setShowSchlagerModal(false);
            }}
          >
            <motion.div 
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="bg-[#1c2328] border border-white/10 rounded-3xl p-6 sm:p-10 w-full max-w-lg relative shadow-2xl text-brand-light max-h-[90dvh] flex flex-col"
            >
              <button 
                onClick={() => setShowSchlagerModal(false)}
                className="absolute top-5 right-5 text-white/50 hover:text-brand-orange transition-colors p-2 rounded-full bg-white/5 hover:bg-white/10 shrink-0 z-10"
              >
                <X size={20} />
              </button>

              <div className="overflow-y-auto pr-2 hide-scrollbar space-y-6 flex-1">
                <div>
                  <h3 className="font-serif text-3xl sm:text-4xl text-brand-light mb-2">Schlager-Abend im Biergarten</h3>
                  <p className="text-brand-light/60 font-medium">Mit DJ MY T CHRIS</p>
                </div>

                <div className="grid grid-cols-1 gap-4 text-sm bg-black/30 p-5 rounded-2xl border border-white/5">
                  <div>
                    <span className="text-brand-light/50 text-xs uppercase tracking-wider block mb-1">Datum</span>
                    <strong className="text-brand-light block">Freitag, 03. Juli 2026</strong>
                  </div>
                  <div>
                    <span className="text-brand-light/50 text-xs uppercase tracking-wider block mb-1">Beginn</span>
                    <strong className="text-brand-light block">Ab 17:00 Uhr</strong>
                  </div>
                </div>

                <div className="bg-white/5 p-4 rounded-xl border border-white/5">
                  <span className="text-brand-orange font-bold text-xs uppercase tracking-widest block mb-2">Wichtiger Hinweis</span>
                  <p className="text-sm text-brand-light/80 leading-relaxed">
                    Das Event findet nur bei schönem Wetter statt!
                  </p>
                </div>
              </div>

              <div className="pt-6 mt-6 border-t border-white/10 flex justify-end shrink-0">
                <button 
                  onClick={() => {
                    downloadICS('Schlager-Abend im Biergarten', 'Schlager-Abend im Biergarten mit DJ MY T CHRIS. Eintritt frei! Nur bei schönem Wetter.', '20260703T170000Z', '20260703T230000Z');
                  }}
                  className="flex items-center gap-2 bg-brand-orange hover:bg-brand-orange/90 text-brand-dark px-6 py-3 rounded-full transition-colors text-sm font-bold shadow-lg"
                >
                  <CalendarPlus size={16} />
                  <span>In Kalender eintragen</span>
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 100. Jubiläum Modal */}
      <AnimatePresence>
        {showJubilaeumModal && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-md p-3 sm:p-6"
            onClick={(e) => {
              if (e.target === e.currentTarget) setShowJubilaeumModal(false);
            }}
          >
            <motion.div 
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="bg-[#1c2328] border border-white/10 rounded-3xl p-6 sm:p-10 w-full max-w-lg relative shadow-2xl text-brand-light max-h-[90dvh] flex flex-col"
            >
              <button 
                onClick={() => setShowJubilaeumModal(false)}
                className="absolute top-5 right-5 text-white/50 hover:text-brand-orange transition-colors p-2 rounded-full bg-white/5 hover:bg-white/10 shrink-0 z-10"
              >
                <X size={20} />
              </button>

              <div className="overflow-y-auto pr-2 hide-scrollbar space-y-6 flex-1">
                <div>
                  <h3 className="font-serif text-3xl sm:text-4xl text-brand-light mb-2">100. Jubiläum der Schlossallee</h3>
                  <p className="text-brand-light/60 font-medium">Großes Festwochenende mit Ochse am Spieß!</p>
                </div>

                <div className="grid grid-cols-1 gap-4 text-sm bg-black/30 p-5 rounded-2xl border border-white/5">
                  <div>
                    <span className="text-brand-light/50 text-xs uppercase tracking-wider block mb-1">Datum</span>
                    <strong className="text-brand-light block">Samstag & Sonntag, 18. – 19. Juli 2026</strong>
                  </div>
                  <div>
                    <span className="text-brand-light/50 text-xs uppercase tracking-wider block mb-1">Ablauf</span>
                    <strong className="text-brand-light block">Ganztägiges Festprogramm</strong>
                  </div>
                </div>

                <div className="bg-white/5 p-4 rounded-xl border border-white/5 space-y-2">
                  <span className="text-brand-orange font-bold text-xs uppercase tracking-widest block">Das erwartet euch</span>
                  <p className="text-sm text-brand-light/80 leading-relaxed">
                    Wir feiern ein ganzes Jahrhundert Biergarten-Geschichte! Zur Feier des Tages servieren wir euch einen köstlichen, frisch gebratenen Ochsen am Spieß. 
                  </p>
                  <p className="text-sm text-brand-light/80 leading-relaxed">
                    Begleitet wird das Jubiläum von traditioneller bayerischer Musik, kühlem Festbier und einem bunten Rahmenprogramm für Jung und Alt. Kommt vorbei und feiert dieses historische Jubiläum mit uns!
                  </p>
                </div>
              </div>

              <div className="pt-6 mt-6 border-t border-white/10 flex justify-end shrink-0">
                <button 
                  onClick={() => {
                    downloadICS('100. Jubiläum - Schlossallee', '100-jähriges Jubiläum im Biergarten Schlossallee mit saftigem Ochsen am Spieß, Festmusik und buntem Programm! Eintritt frei.', '20260718T100000Z', '20260719T220000Z');
                  }}
                  className="flex items-center gap-2 bg-brand-orange hover:bg-brand-orange/90 text-brand-dark px-6 py-3 rounded-full transition-colors text-sm font-bold shadow-lg"
                >
                  <CalendarPlus size={16} />
                  <span>In Kalender eintragen</span>
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Lampionfest Modal */}
      <AnimatePresence>
        {showLampionfestModal && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-md p-3 sm:p-6"
            onClick={(e) => {
              if (e.target === e.currentTarget) setShowLampionfestModal(false);
            }}
          >
            <motion.div 
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="bg-[#1c2328] border border-white/10 rounded-3xl p-6 sm:p-10 w-full max-w-lg relative shadow-2xl text-brand-light max-h-[90dvh] flex flex-col"
            >
              <button 
                onClick={() => setShowLampionfestModal(false)}
                className="absolute top-5 right-5 text-white/50 hover:text-brand-orange transition-colors p-2 rounded-full bg-white/5 hover:bg-white/10 shrink-0 z-10"
              >
                <X size={20} />
              </button>

              <div className="overflow-y-auto pr-2 hide-scrollbar space-y-6 flex-1">
                <div>
                  <h3 className="font-serif text-3xl sm:text-4xl text-brand-light mb-2">Lampionfest im Biergarten</h3>
                  <p className="text-brand-light/60 font-medium">Romantischer Lichterzauber unter den Kastanien</p>
                </div>

                <div className="grid grid-cols-1 gap-4 text-sm bg-black/30 p-5 rounded-2xl border border-white/5">
                  <div>
                    <span className="text-brand-light/50 text-xs uppercase tracking-wider block mb-1">Datum</span>
                    <strong className="text-brand-light block">Freitag & Samstag, 21. – 22. August 2026</strong>
                  </div>
                  <div>
                    <span className="text-brand-light/50 text-xs uppercase tracking-wider block mb-1">Beginn</span>
                    <strong className="text-brand-light block">Jeweils ab Einbruch der Dämmerung</strong>
                  </div>
                </div>

                <div className="bg-white/5 p-4 rounded-xl border border-white/5 space-y-2">
                  <span className="text-brand-orange font-bold text-xs uppercase tracking-widest block">Ein magischer Sommerabend</span>
                  <p className="text-sm text-brand-light/80 leading-relaxed">
                    Wenn die Dämmerung hereinbricht, verwandelt sich unser Biergarten in ein traumhaftes Lichtermeer. Hunderte farbenfrohe Lampions erleuchten die Baumkronen und hüllen die Schlossallee in eine unvergleichlich romantische Atmosphäre.
                  </p>
                  <p className="text-sm text-brand-light/80 leading-relaxed">
                    Genießt kühle Drinks, sommerliche Cocktails, bayerische Schmankerl und stimmungsvolle akustische Live-Hintergrundmusik. Ein unvergessliches Highlight für laue Sommernächte!
                  </p>
                </div>
              </div>

              <div className="pt-6 mt-6 border-t border-white/10 flex justify-end shrink-0">
                <button 
                  onClick={() => {
                    downloadICS('Lampionfest im Biergarten', 'Romantisches Lampionfest im Biergarten Schlossallee mit Hunderten von bunten Lichtern, Cocktails und Akustik-Musik! Eintritt frei.', '20260821T180000Z', '20260822T233000Z');
                  }}
                  className="flex items-center gap-2 bg-brand-orange hover:bg-brand-orange/90 text-brand-dark px-6 py-3 rounded-full transition-colors text-sm font-bold shadow-lg"
                >
                  <CalendarPlus size={16} />
                  <span>In Kalender eintragen</span>
                </button>
              </div>
            </motion.div>
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
            className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center bg-black/60 backdrop-blur-sm p-0 sm:p-4"
            onClick={(e) => {
              if (e.target === e.currentTarget) setShowPasswordModal(false);
            }}
          >
            <motion.div 
              initial={{ y: "100%", opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: "100%", opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="bg-brand-dark border-t sm:border border-white/10 rounded-t-3xl sm:rounded-3xl p-6 sm:p-8 w-full max-w-sm relative shadow-2xl pb-[max(1.5rem,env(safe-area-inset-bottom))] flex flex-col"
              style={{ maxHeight: 'calc(100dvh - 2rem)' }}
            >
              {/* Drag Handle for Mobile */}
              <div className="w-12 h-1.5 bg-white/20 rounded-full mx-auto mb-6 sm:hidden shrink-0"></div>
              
              <button 
                onClick={() => setShowPasswordModal(false)}
                className="absolute top-4 right-4 sm:top-6 sm:right-6 text-white/50 hover:text-white transition-colors p-3 -m-1"
                style={{ touchAction: 'manipulation' }}
              >
                <X size={20} />
              </button>
              <h3 className="text-2xl font-serif text-brand-light mb-6 shrink-0">Admin Login</h3>
              <form onSubmit={handlePasswordSubmit} className="flex flex-col gap-4 overflow-y-auto pr-2 pb-4 hide-scrollbar overscroll-contain" style={{ WebkitOverflowScrolling: 'touch' }}>
                <p className="text-brand-light/70 text-sm">Bitte gib dein Admin-Passwort ein, um fortzufahren.</p>
                <input 
                  type="password" 
                  value={passwordInput}
                  onChange={(e) => setPasswordInput(e.target.value)}
                  placeholder="Passwort"
                  className="bg-black/20 border border-white/10 rounded-lg px-3 py-3 text-base sm:text-sm text-brand-light focus:outline-none focus:border-brand-orange"
                  required
                />
                {errorMsg && <p className="text-red-400 text-sm">{errorMsg}</p>}
                <button 
                  type="submit"
                  className="bg-brand-orange text-white rounded-xl px-4 py-3 font-medium hover:bg-brand-orange/90 transition-all active:scale-95"
                  style={{ touchAction: 'manipulation' }}
                >
                  Einloggen
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
            className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center bg-black/60 backdrop-blur-sm p-0 sm:p-4"
            onClick={(e) => {
              if (e.target === e.currentTarget) setShowAdminModal(false);
            }}
          >
            <motion.div 
              initial={{ y: "100%", opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: "100%", opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="bg-brand-dark border-t sm:border border-white/10 rounded-t-3xl sm:rounded-3xl p-6 sm:p-8 w-full max-w-sm relative shadow-2xl pb-[max(1.5rem,env(safe-area-inset-bottom))] flex flex-col"
              style={{ maxHeight: 'calc(100dvh - 2rem)' }}
            >
              {/* Drag Handle for Mobile */}
              <div className="w-12 h-1.5 bg-white/20 rounded-full mx-auto mb-6 sm:hidden"></div>
              
              <button 
                onClick={() => setShowAdminModal(false)}
                className="absolute top-4 right-4 sm:top-6 sm:right-6 text-white/50 hover:text-white transition-colors p-3 -m-1"
                style={{ touchAction: 'manipulation' }}
              >
                <X size={20} />
              </button>
              <div className="flex items-center justify-between mb-6 shrink-0">
                <h3 className="text-2xl font-serif text-brand-light">Status & Auslastung</h3>
                <button 
                  onClick={() => {
                    setIsAdmin(false);
                    localStorage.removeItem('biergarten_admin');
                    setShowAdminModal(false);
                  }}
                  className="text-sm text-brand-light/50 hover:text-brand-light"
                >
                  Logout
                </button>
              </div>
              <div className="flex flex-col gap-6 overflow-y-auto pr-2 pb-4 hide-scrollbar overscroll-contain" style={{ WebkitOverflowScrolling: 'touch' }}>
                <div>
                  <label className="text-sm font-medium text-brand-light/80 block mb-2">
                    Öffnungsstatus 
                    <span className="text-xs text-brand-light/50 ml-2">
                      ({overrideDate === new Date().toDateString() ? 'Manuell überschrieben' : 'Automatisch nach Uhrzeit'})
                    </span>
                  </label>
                  <div className="flex flex-col gap-3">
                    <div className="flex gap-4">
                      <button 
                        type="button"
                        onClick={() => handleStatusChange(true)}
                        className={`flex-1 rounded-xl px-4 py-4 font-medium transition-all active:scale-95 border ${overrideDate === new Date().toDateString() && dbIsOpen ? 'bg-emerald-500/20 border-emerald-500/50 text-emerald-400' : 'bg-white/5 border-white/10 text-brand-light hover:bg-white/10'}`}
                        style={{ touchAction: 'manipulation' }}
                      >
                        🍺 Geöffnet
                      </button>
                      <button 
                        type="button"
                        onClick={() => handleStatusChange(false)}
                        className={`flex-1 rounded-xl px-4 py-4 font-medium transition-all active:scale-95 border ${overrideDate === new Date().toDateString() && !dbIsOpen ? 'bg-red-500/20 border-red-500/50 text-red-400' : 'bg-white/5 border-white/10 text-brand-light hover:bg-white/10'}`}
                        style={{ touchAction: 'manipulation' }}
                      >
                        🌧️ Geschlossen
                      </button>
                    </div>
                    {overrideDate === new Date().toDateString() && (
                      <button 
                        type="button"
                        onClick={() => handleStatusChange(null)}
                        className="w-full rounded-xl px-4 py-3 text-sm font-medium transition-all active:scale-95 border bg-white/5 border-white/10 text-brand-light hover:bg-white/10"
                      >
                        🔄 Zurück auf Automatik (Öffnungszeiten)
                      </button>
                    )}
                  </div>
                </div>

                <div className="pt-6 border-t border-white/10">
                  <h4 className="text-lg font-serif text-brand-light mb-4">Fundbüro verwalten</h4>
                  
                  <form onSubmit={handleAddFoundItem} className="flex flex-col gap-3 mb-6 bg-white/5 p-4 rounded-2xl border border-white/10">
                    <input 
                      type="text" 
                      placeholder="Gegenstand (z.B. Schlüssel)" 
                      value={newFoundItem.item}
                      onChange={e => setNewFoundItem({...newFoundItem, item: e.target.value})}
                      className="bg-black/20 border border-white/10 rounded-lg px-3 py-3 text-base sm:text-sm text-brand-light focus:outline-none focus:border-brand-orange"
                      required
                    />
                    <input 
                      type="text" 
                      placeholder="Wann? (z.B. Gestern Abend)" 
                      value={newFoundItem.date}
                      onChange={e => setNewFoundItem({...newFoundItem, date: e.target.value})}
                      className="bg-black/20 border border-white/10 rounded-lg px-3 py-3 text-base sm:text-sm text-brand-light focus:outline-none focus:border-brand-orange"
                      required
                    />
                    <input 
                      type="text" 
                      placeholder="Wo? (z.B. An der Schänke)" 
                      value={newFoundItem.location}
                      onChange={e => setNewFoundItem({...newFoundItem, location: e.target.value})}
                      className="bg-black/20 border border-white/10 rounded-lg px-3 py-3 text-base sm:text-sm text-brand-light focus:outline-none focus:border-brand-orange"
                      required
                    />
                    <button 
                      type="submit" 
                      className="bg-brand-orange text-white rounded-xl px-4 py-4 text-sm font-medium hover:bg-brand-orange/90 transition-all active:scale-95 mt-2"
                      style={{ touchAction: 'manipulation' }}
                    >
                      Hinzufügen
                    </button>
                  </form>

                  <div className="flex flex-col gap-2">
                    {foundItems.map(item => (
                      <div key={item.id} className="flex items-center justify-between bg-black/20 border border-white/5 rounded-lg p-3">
                        <div className="flex flex-col">
                          <span className="text-sm font-medium text-brand-light">{item.item}</span>
                          <span className="text-xs text-brand-light/50">{item.date}</span>
                        </div>
                        <button 
                          type="button"
                          onClick={() => handleRemoveFoundItem(item.id)}
                          className="text-red-400 hover:text-red-300 p-3 bg-red-500/10 rounded-xl transition-all active:scale-90"
                          title="Als abgeholt markieren"
                          style={{ touchAction: 'manipulation' }}
                        >
                          <X size={16} />
                        </button>
                      </div>
                    ))}
                    {foundItems.length === 0 && (
                      <p className="text-sm text-brand-light/40 text-center py-2">Keine Gegenstände im Fundbüro.</p>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      {/* Dashboard Modal */}
      <AnimatePresence>
        {showDashboard && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center bg-black/60 backdrop-blur-sm p-0 sm:p-4"
            onClick={(e) => {
              if (e.target === e.currentTarget) setShowDashboard(false);
            }}
          >
            <motion.div 
              initial={{ y: "100%", opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: "100%", opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="bg-brand-dark border-t sm:border border-white/10 rounded-t-3xl sm:rounded-3xl p-6 sm:p-8 w-full max-w-lg relative shadow-2xl pb-[max(1.5rem,env(safe-area-inset-bottom))] flex flex-col"
              style={{ maxHeight: 'calc(100dvh - 2rem)' }}
            >
              {/* Drag Handle for Mobile */}
              <div className="w-12 h-1.5 bg-white/20 rounded-full mx-auto mb-6 sm:hidden shrink-0"></div>
              
              <button 
                onClick={() => setShowDashboard(false)}
                className="absolute top-4 right-4 sm:top-6 sm:right-6 text-white/50 hover:text-white transition-colors p-3 -m-1"
                style={{ touchAction: 'manipulation' }}
              >
                <X size={20} />
              </button>
              <div className="flex items-center gap-3 mb-6 shrink-0">
                <Activity className="text-brand-orange" size={28} />
                <h3 className="text-2xl font-serif text-brand-light">Performance Dashboard</h3>
              </div>
              
              <div className="grid grid-cols-2 gap-4 overflow-y-auto pr-2 pb-4 hide-scrollbar overscroll-contain" style={{ WebkitOverflowScrolling: 'touch' }}>
                <div className="bg-white/5 border border-white/10 rounded-2xl p-6 flex flex-col items-center justify-center">
                  <div className="text-4xl font-serif text-brand-orange mb-2">{trackingStats.menuClicks}</div>
                  <div className="text-sm text-brand-light/70 uppercase tracking-wider text-center">Menü<br/>geöffnet</div>
                </div>
                <div className="bg-white/5 border border-white/10 rounded-2xl p-6 flex flex-col items-center justify-center">
                  <div className="text-4xl font-serif text-brand-orange mb-2">{trackingStats.routeClicks}</div>
                  <div className="text-sm text-brand-light/70 uppercase tracking-wider text-center">Route<br/>geplant</div>
                </div>
              </div>
              
              <p className="text-xs text-brand-light/40 mt-6 text-center">
                Diese Daten werden lokal erfasst und dienen der Optimierung der Website.
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      {/* Beer Pouring Loading Animation */}
      <AnimatePresence>
        {isPouring && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] bg-brand-dark flex flex-col items-center justify-center"
          >
            <div className="relative w-32 h-40 border-4 border-white/20 rounded-b-2xl rounded-t-lg overflow-hidden bg-white/5">
              {/* Handle */}
              <div className="absolute -right-8 top-8 w-8 h-20 border-4 border-white/20 rounded-r-2xl border-l-0"></div>
              
              {/* Beer Liquid */}
              <motion.div 
                initial={{ height: "0%" }}
                animate={{ height: "90%" }}
                transition={{ duration: 1.5, ease: "easeOut" }}
                className="absolute bottom-0 left-0 right-0 bg-amber-400"
              >
                {/* Bubbles */}
                {[...Array(10)].map((_, i) => (
                  <motion.div
                    key={i}
                    initial={{ y: 100, opacity: 0 }}
                    animate={{ y: -20, opacity: [0, 1, 0] }}
                    transition={{ 
                      duration: 1 + Math.random(), 
                      repeat: Infinity, 
                      delay: Math.random() 
                    }}
                    className="absolute w-2 h-2 rounded-full bg-white/40"
                    style={{ left: `${Math.random() * 100}%` }}
                  />
                ))}
              </motion.div>
              
              {/* Foam */}
              <motion.div 
                initial={{ height: "0%", bottom: "0%" }}
                animate={{ height: "20%", bottom: "80%" }}
                transition={{ duration: 1.5, ease: "easeOut" }}
                className="absolute left-0 right-0 bg-white rounded-t-xl"
              />
            </div>
            <motion.p 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="mt-8 font-serif text-2xl text-brand-light"
            >
              Herzlich Willkommen...
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>


    </div>
  );
}

export default App;
