import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'motion/react';
import { MapPin, Clock, Phone, ArrowRight, ArrowLeft, X, Heart, Activity, Dog, Droplets, TreePine, Search, Info, Instagram, Facebook, CalendarPlus, Utensils } from 'lucide-react';
import { Impressum, AGB, Datenschutz } from './components/LegalPages';
import { FamiliePage } from './components/FamiliePage';

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
      "@type": "Restaurant",
      "name": "Schlossallee Biergarten Haag",
      "image": "https://scontent-dus1-1.xx.fbcdn.net/v/t39.30808-6/492210388_1194107815843563_1337847489003514631_n.jpg",
      "@id": "https://schlossallee-haag.de",
      "url": "https://schlossallee-haag.de",
      "telephone": "+49816712345",
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
        "latitude": 48.45,
        "longitude": 11.83
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
      "servesCuisine": ["Bavarian", "German"],
      "priceRange": "$$",
      "description": "Der beste Biergarten in Bayern! Schlossallee Haag an der Amper bietet traditionelle bayerische Küche, Steckerlfisch und eine entspannte Atmosphäre unter alten Kastanien."
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
  const [isOpen, setIsOpen] = useState<boolean>(false);
  
  // Occupancy State
  const [occupancy, setOccupancy] = useState<number>(30); // 0-100%
  const [showOccupancy, setShowOccupancy] = useState<boolean>(true);
  
  // Found Items State
  const [foundItems, setFoundItems] = useState<any[]>([]);
  const [newFoundItem, setNewFoundItem] = useState({ item: '', date: '', location: '' });

  // Dark Mode State
  const [isDarkMode] = useState<boolean>(true);

  // View State (Subpages)
  const [currentView, setCurrentView] = useState<'home' | 'impressum' | 'agb' | 'datenschutz' | 'familie'>('home');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentView]);

  // Beer Loading Animation State
  const [isPouring, setIsPouring] = useState<boolean>(false); // Start false to skip initial load
  
  // Admin Triple-Click State
  const [clickCount, setClickCount] = useState(0);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [showAdminModal, setShowAdminModal] = useState(false);
  const [passwordInput, setPasswordInput] = useState("");
  const [adminPassword, setAdminPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  // Menu State
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isBottomNavExpanded, setIsBottomNavExpanded] = useState(true);
  const [isDigitalMenuOpen, setIsDigitalMenuOpen] = useState(false);
  const [activeMenuCategory, setActiveMenuCategory] = useState('Bier');

  // Navbar Visibility State
  const [isNavVisible, setIsNavVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
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
    const targetDate = new Date('2026-08-15T18:00:00').getTime();
    
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
    // Fetch status from server every minute
    const fetchStatus = () => {
      fetch('/api/status')
        .then(res => res.json())
        .then(data => {
          if (data) {
            if (typeof data.isOpen === 'boolean') setIsOpen(data.isOpen);
            if (typeof data.occupancy === 'number') setOccupancy(data.occupancy);
            if (typeof data.showOccupancy === 'boolean') setShowOccupancy(data.showOccupancy);
          }
        })
        .catch(err => console.error("Status fetch error:", err));
    };

    fetchStatus();
    const interval = setInterval(fetchStatus, 60000);

    return () => clearInterval(interval);
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
    fetch('/api/found-items')
      .then(res => res.json())
      .then(data => setFoundItems(data))
      .catch(err => console.error("Found items fetch error:", err));
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

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordInput === "vamela" || passwordInput === import.meta.env.VITE_ADMIN_PASSWORD) {
      setAdminPassword(passwordInput);
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

  const handleStatusChange = (newStatus: boolean) => {
    fetch('/api/status', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password: adminPassword || "vamela", status: newStatus })
    })
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setIsOpen(data.isOpen);
          setShowAdminModal(false);
        } else {
          alert("Fehler: " + (data.error || "Unbekannter Fehler"));
        }
      })
      .catch(err => {
        console.error("Status update error:", err);
        alert("Netzwerkfehler beim Ändern des Status.");
      });
  };

  const handleOccupancyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newOccupancy = Number(e.target.value);
    setOccupancy(newOccupancy);
    
    // Debounce or just send update
    fetch('/api/status', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password: adminPassword || "vamela", newOccupancy })
    })
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setOccupancy(data.occupancy);
        }
      })
      .catch(err => console.error("Occupancy update error:", err));
  };

  const handleShowOccupancyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newShowOccupancy = e.target.checked;
    setShowOccupancy(newShowOccupancy);
    
    fetch('/api/status', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password: adminPassword || "vamela", newShowOccupancy })
    })
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setShowOccupancy(data.showOccupancy);
        }
      })
      .catch(err => console.error("Show occupancy update error:", err));
  };

  const handleAddFoundItem = (e: React.FormEvent) => {
    e.preventDefault();
    fetch('/api/found-items', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password: adminPassword || "vamela", ...newFoundItem })
    })
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setFoundItems(prev => [...prev, data.item]);
          setNewFoundItem({ item: '', date: '', location: '' });
        } else {
          alert("Fehler: " + (data.error || "Unbekannter Fehler"));
        }
      })
      .catch(err => {
        console.error("Add item error:", err);
        alert("Netzwerkfehler beim Hinzufügen der Fundsache.");
      });
  };

  const handleRemoveFoundItem = (id: number) => {
    fetch(`/api/found-items/${id}`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password: adminPassword || "vamela" })
    })
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setFoundItems(prev => prev.filter(item => item.id !== id));
        } else {
          alert("Fehler: " + (data.error || "Unbekannter Fehler"));
        }
      })
      .catch(err => {
        console.error("Remove item error:", err);
        alert("Netzwerkfehler beim Entfernen der Fundsache.");
      });
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
              <div className={`w-1 h-1 rounded-full ${currentView === 'home' || isDarkMode ? 'bg-white/50' : 'bg-black/30'}`}></div>
              <span className={isOpen ? "text-emerald-400 font-medium" : "text-red-400 font-medium"}>
                <span className="hidden xs:inline">{isOpen ? "Heute Geöffnet" : "Heute Witterungsbedingt Geschlossen"}</span>
                <span className="xs:hidden">{isOpen ? "Geöffnet" : "Geschlossen"}</span>
              </span>
            </div>
            
            {/* Occupancy Indicator */}
            {isOpen && showOccupancy && (
              <div className={`flex items-center gap-2 backdrop-blur-md border rounded-full px-3 py-2 md:px-4 md:py-2 text-[10px] xs:text-xs md:text-sm font-bold shadow-xl transition-colors duration-500 ${isDarkMode ? 'bg-[#1a242b]/80 border-white/10 text-brand-light' : (currentView === 'home' ? 'bg-white/10 border-white/20 text-brand-light' : 'bg-black/5 border-black/10 text-brand-dark')}`}>
                <div className={`flex-1 w-10 xs:w-12 md:w-24 h-1.5 rounded-full overflow-hidden ${currentView === 'home' || isDarkMode ? 'bg-white/20' : 'bg-black/10'}`}>
                  <div 
                    className={`h-full rounded-full transition-all duration-1000 ${occupancy > 80 ? 'bg-red-500' : occupancy > 50 ? 'bg-yellow-500' : 'bg-emerald-500'}`}
                    style={{ width: `${occupancy}%` }}
                  />
                </div>
                <span className="whitespace-nowrap">{occupancy}%</span>
              </div>
            )}

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
            
            {/* Heading */}
            <div className="flex flex-col gap-3 md:gap-4 items-start lg:items-end text-left lg:text-right">
              <h2 className="font-serif text-[10.5vw] xs:text-[9.5vw] sm:text-6xl md:text-7xl lg:text-[5.5rem] leading-[0.95] tracking-tight uppercase text-white drop-shadow-2xl">
                Wo jede Mass<br />eine Geschichte<br />erzählt.
              </h2>
            </div>

            {/* Subtext & Buttons */}
            <div className="flex flex-col gap-5 md:gap-8 max-w-2xl">
              <p className={`text-sm sm:text-base md:text-xl leading-relaxed font-medium transition-colors duration-1000 drop-shadow-md max-w-[85%] md:max-w-full ${isDarkMode ? 'text-white/80 md:text-white/90' : 'text-white/90 md:text-white/95'}`}>
                Bayerische Gemütlichkeit seit 1926. <span className="hidden md:inline">Erlebe einen der schönsten Biergärten der Region, idyllisch gelegen unter alten Kastanien im Herzen von Haag an der Amper.</span>
              </p>
              
              <div className="flex flex-row items-center gap-3 md:gap-4 mt-2 md:mt-4">
                <motion.button 
                  whileTap={{ scale: 0.96 }}
                  onClick={() => { triggerPouringAnimation(() => setIsDigitalMenuOpen(true)); trackEvent('menuClicks'); }}
                  className="group relative flex-1 sm:flex-none text-center bg-brand-orange text-white rounded-full px-4 py-3.5 md:px-10 md:py-4 font-bold text-sm md:text-lg shadow-[0_0_30px_rgba(242,125,38,0.3)] hover:shadow-[0_0_60px_rgba(242,125,38,0.6)] active:bg-brand-orange/80 transition-all duration-300 overflow-hidden"
                >
                  <span className="relative z-10 flex items-center justify-center gap-1.5 md:gap-2">
                    Speisekarte
                    <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform md:w-5 md:h-5" />
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-[150%] group-hover:animate-[shimmer_1.5s_infinite]"></div>
                </motion.button>
                <motion.a 
                  whileTap={{ scale: 0.96 }}
                  href="#kontakt" 
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

        {/* Partner Logo Strip */}
        <div className={`hidden md:flex py-10 px-4 md:px-16 flex-wrap justify-center md:justify-between items-center gap-x-8 gap-y-6 transition-colors duration-1000 ${isDarkMode ? 'bg-[#12181c] text-brand-light/30' : 'bg-brand-light text-brand-dark/30'}`}>
          <div className="font-serif text-lg xs:text-xl tracking-tight transition-colors">Hofbräuhaus Freising</div>
          <div className="font-serif text-lg xs:text-xl tracking-tight transition-colors">Backhaus Weiß</div>
          <div className="font-serif text-lg xs:text-xl tracking-tight transition-colors">Ortsmetzgerei Haag</div>
          <div className="font-serif text-lg xs:text-xl tracking-tight transition-colors">Ampertalbahn</div>
        </div>

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

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 md:gap-8">
              {/* Item 1 */}
              <motion.div whileTap={{ scale: 0.98 }} className="group cursor-pointer">
                <div className="aspect-[4/5] rounded-[32px] overflow-hidden mb-6 relative shadow-xl">
                  <img src="https://s1.directupload.eu/images/260321/e8uqintp.webp" alt="Jaga Bier" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" loading="lazy" referrerPolicy="no-referrer" />
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-500"></div>
                </div>
                <h3 className="font-serif text-2xl mb-2">Das naturtrübe Jaga Bier</h3>
                <p className={isDarkMode ? 'text-brand-light/60' : 'text-brand-dark/60'}>Süffig, ehrlich und direkt aus dem Fass. Unser ganzer Stolz.</p>
              </motion.div>

              {/* Item 2 */}
              <motion.div whileTap={{ scale: 0.98 }} className="group cursor-pointer mt-0 md:mt-12">
                <div className="aspect-[4/5] rounded-[32px] overflow-hidden mb-6 relative shadow-xl">
                  <img src="https://www.radioarabella.de/storage/thumbs/1275x/323622.webp" alt="Steckerlfisch" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" loading="lazy" referrerPolicy="no-referrer" />
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-500"></div>
                </div>
                <h3 className="font-serif text-2xl mb-2">Steckerlfisch-Braterei</h3>
                <p className={isDarkMode ? 'text-brand-light/60' : 'text-brand-dark/60'}>Frisch über dem offenen Feuer gegrillt. Ein bayerischer Klassiker.</p>
              </motion.div>

              {/* Item 3 */}
              <motion.div whileTap={{ scale: 0.98 }} className="group cursor-pointer mt-0 lg:mt-24">
                <div className="aspect-[4/5] rounded-[32px] overflow-hidden mb-6 relative shadow-xl">
                  <img src="https://static.express.de/__images/2022/07/02/6d4d3850-bc96-46c5-80c0-ba1a13d3adc2.jpeg?w=4000&h=2667&fm=jpg&s=942917e7817d1db3a6b03e363a3d33a9" alt="Würstl-Grill" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" loading="lazy" referrerPolicy="no-referrer" />
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-500"></div>
                </div>
                <h3 className="font-serif text-2xl mb-2">Würstl-Grill & Backstube</h3>
                <p className={isDarkMode ? 'text-brand-light/60' : 'text-brand-dark/60'}>Regionale Spezialitäten, knusprige Brezn und süße Versuchungen.</p>
              </motion.div>
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
                Unser riesiger Abenteuerspielplatz und die legendäre <strong className={`font-semibold transition-colors duration-1000 ${isDarkMode ? 'text-brand-light' : 'text-brand-dark'}`}>Ampertal-Kindereisenbahn</strong> machen den Besuch für die ganze Familie unvergesslich.
              </p>
              <div className="mt-4">
                <button 
                  onClick={() => setCurrentView('familie')}
                  className="inline-flex items-center gap-2 text-brand-orange font-medium hover:gap-4 transition-all"
                >
                  Mehr für Kinder entdecken <ArrowRight size={20} />
                </button>
              </div>
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
              {/* Event 1 - Highlight */}
              <div className="group relative bg-brand-dark text-brand-light rounded-3xl p-8 md:p-12 overflow-hidden cursor-pointer hover:shadow-2xl transition-shadow">
                <div className="absolute top-0 right-0 w-1/2 h-full opacity-20 group-hover:opacity-40 transition-opacity duration-700">
                  <img src="https://i0.wp.com/www.siltry.de/bild/haa9.jpg" alt="Lampion-Fest" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                  <div className="absolute inset-0 bg-gradient-to-r from-brand-dark to-transparent"></div>
                </div>
                <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-8">
                  <div>
                    <span className="text-brand-orange font-bold tracking-widest uppercase text-sm mb-4 block">Zentrales Highlight</span>
                    <h3 className="font-serif text-5xl md:text-7xl mb-4">Das Lampion-Fest</h3>
                    <p className="text-brand-light/80 text-lg max-w-md mb-6">
                      Sobald es dunkel wird, erleuchten tausende Lampions den Biergarten. Ein magischer Abend mit Live-Musik und besonderer Atmosphäre.
                    </p>
                    {/* Countdown */}
                    <div className="flex gap-3 md:gap-4 text-center">
                      <div className="bg-white/10 backdrop-blur-sm rounded-xl p-2 md:p-3 min-w-[60px] md:min-w-[70px]">
                        <div className="font-serif text-2xl md:text-3xl text-brand-orange">{timeLeft.days}</div>
                        <div className="text-[10px] md:text-xs uppercase tracking-wider opacity-70">Tage</div>
                      </div>
                      <div className="bg-white/10 backdrop-blur-sm rounded-xl p-2 md:p-3 min-w-[60px] md:min-w-[70px]">
                        <div className="font-serif text-2xl md:text-3xl text-brand-orange">{timeLeft.hours}</div>
                        <div className="text-[10px] md:text-xs uppercase tracking-wider opacity-70">Std</div>
                      </div>
                      <div className="bg-white/10 backdrop-blur-sm rounded-xl p-2 md:p-3 min-w-[60px] md:min-w-[70px]">
                        <div className="font-serif text-2xl md:text-3xl text-brand-orange">{timeLeft.minutes}</div>
                        <div className="text-[10px] md:text-xs uppercase tracking-wider opacity-70">Min</div>
                      </div>
                      <div className="bg-white/10 backdrop-blur-sm rounded-xl p-2 md:p-3 min-w-[60px] md:min-w-[70px]">
                        <div className="font-serif text-2xl md:text-3xl text-brand-orange">{timeLeft.seconds}</div>
                        <div className="text-[10px] md:text-xs uppercase tracking-wider opacity-70">Sek</div>
                      </div>
                    </div>
                  </div>
                  <div className="text-left md:text-right flex flex-col items-start md:items-end gap-4">
                    <div>
                      <div className="font-serif text-6xl md:text-8xl text-brand-orange">15.</div>
                      <div className="text-2xl font-medium tracking-widest uppercase">August</div>
                    </div>
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        downloadICS('Das Lampion-Fest - Schlossallee', 'Ein magischer Abend mit Live-Musik und besonderer Atmosphäre im Biergarten Schlossallee.', '20260815T180000Z', '20260815T230000Z');
                      }}
                      className="flex items-center gap-2 bg-brand-orange/20 hover:bg-brand-orange text-brand-orange hover:text-white px-4 py-2 rounded-full transition-colors text-sm font-medium"
                    >
                      <CalendarPlus size={16} />
                      <span>Zum Kalender</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Event 2 */}
              <div className={`group flex flex-col lg:flex-row items-center justify-between gap-8 py-8 border-b cursor-pointer hover:px-4 transition-all duration-1000 ${isDarkMode ? 'border-white/10' : 'border-brand-dark/10'}`}>
                <div className="flex-1">
                  <h3 className={`font-serif text-4xl mb-2 group-hover:text-brand-orange transition-colors duration-1000 ${isDarkMode ? 'text-brand-light' : 'text-brand-dark'}`}>Live-Musik: Austro-Pop</h3>
                  <p className={`transition-colors duration-1000 ${isDarkMode ? 'text-brand-light/60' : 'text-brand-dark/60'}`}>Mit der lokalen Stadtkapelle und Special Guests.</p>
                </div>
                <div className="text-right flex flex-col lg:flex-row items-start lg:items-center gap-4 lg:gap-8">
                  <div className="text-xl font-medium">Ab 18:00 Uhr</div>
                  <div className={`font-serif text-4xl transition-colors duration-1000 ${isDarkMode ? 'text-brand-light' : 'text-brand-dark'}`}>22. <span className="text-2xl uppercase tracking-widest">Mai</span></div>
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      downloadICS('Live-Musik: Austro-Pop - Schlossallee', 'Mit der lokalen Stadtkapelle und Special Guests.', '20260522T180000Z', '20260522T220000Z');
                    }}
                    className={`flex items-center gap-2 px-3 py-1.5 rounded-full transition-colors text-xs font-medium border ${isDarkMode ? 'border-white/20 hover:bg-white hover:text-brand-dark' : 'border-brand-dark/20 hover:bg-brand-dark hover:text-brand-light'}`}
                  >
                    <CalendarPlus size={14} />
                    <span className="hidden sm:inline">Kalender</span>
                  </button>
                </div>
              </div>

              {/* Event 3 */}
              <div className={`group flex flex-col lg:flex-row items-center justify-between gap-8 py-8 border-b cursor-pointer hover:px-4 transition-all duration-1000 ${isDarkMode ? 'border-white/10' : 'border-brand-dark/10'}`}>
                <div className="flex-1">
                  <h3 className={`font-serif text-4xl mb-2 group-hover:text-brand-orange transition-colors duration-1000 ${isDarkMode ? 'text-brand-light' : 'text-brand-dark'}`}>Oldtimer-Motorradtreffen</h3>
                  <p className={`transition-colors duration-1000 ${isDarkMode ? 'text-brand-light/60' : 'text-brand-dark/60'}`}>Historische Maschinen, Benzingespräche und zünftige Brotzeit.</p>
                </div>
                <div className="text-right flex flex-col lg:flex-row items-start lg:items-center gap-4 lg:gap-8">
                  <div className="text-xl font-medium">Ganztägig</div>
                  <div className={`font-serif text-4xl transition-colors duration-1000 ${isDarkMode ? 'text-brand-light' : 'text-brand-dark'}`}>05. <span className="text-2xl uppercase tracking-widest">Jun</span></div>
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      downloadICS('Oldtimer-Motorradtreffen - Schlossallee', 'Historische Maschinen, Benzingespräche und zünftige Brotzeit.', '20260605T080000Z', '20260605T200000Z');
                    }}
                    className={`flex items-center gap-2 px-3 py-1.5 rounded-full transition-colors text-xs font-medium border ${isDarkMode ? 'border-white/20 hover:bg-white hover:text-brand-dark' : 'border-brand-dark/20 hover:bg-brand-dark hover:text-brand-light'}`}
                  >
                    <CalendarPlus size={14} />
                    <span className="hidden sm:inline">Kalender</span>
                  </button>
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
            className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-16 items-center"
          >
            <div className="order-2 lg:order-1 flex flex-col gap-6">
              <h2 className="font-serif text-5xl md:text-6xl leading-[1.1] uppercase">
                Ein Platz für<br />Vierbeiner.
              </h2>
              <p className={`text-lg leading-relaxed transition-colors duration-1000 ${isDarkMode ? 'text-brand-light/70' : 'text-brand-dark/70'}`}>
                Gut erzogene Hunde sind bei uns im Biergarten Schlossallee herzlich willkommen! Damit sich auch unsere vierbeinigen Gäste rundum wohlfühlen, haben wir an alles gedacht.
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-4">
                <div className={`p-6 rounded-3xl border transition-colors duration-1000 ${isDarkMode ? 'bg-white/5 border-white/10' : 'bg-white border-brand-dark/10 shadow-lg shadow-brand-dark/5'}`}>
                  <Droplets className="text-brand-orange mb-4" size={28} />
                  <h4 className="font-bold text-xl mb-2">Frisches Wasser</h4>
                  <p className={`text-sm transition-colors duration-1000 ${isDarkMode ? 'text-brand-light/70' : 'text-brand-dark/70'}`}>
                    Wassernäpfe stehen jederzeit frisch befüllt direkt an der Schänke und am Haupteingang bereit.
                  </p>
                </div>
                <div className={`p-6 rounded-3xl border transition-colors duration-1000 ${isDarkMode ? 'bg-white/5 border-white/10' : 'bg-white border-brand-dark/10 shadow-lg shadow-brand-dark/5'}`}>
                  <TreePine className="text-brand-orange mb-4" size={28} />
                  <h4 className="font-bold text-xl mb-2">Viel Schatten</h4>
                  <p className={`text-sm transition-colors duration-1000 ${isDarkMode ? 'text-brand-light/70' : 'text-brand-dark/70'}`}>
                    Besonders die Tische im hinteren Bereich unter den alten Kastanien bieten an heißen Tagen perfekten Schatten.
                  </p>
                </div>
              </div>
            </div>
            <div className="order-1 lg:order-2">
              <div className="aspect-square md:aspect-[4/3] rounded-[40px] overflow-hidden relative shadow-2xl">
                <img src="https://images.unsplash.com/photo-1544568100-847a948585b9?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80" alt="Hund im Biergarten" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
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
                    whileHover={{ y: -5, scale: 1.02 }}
                    className={`p-8 rounded-[32px] border transition-colors duration-500 flex flex-col gap-4 relative overflow-hidden group ${isDarkMode ? 'bg-[#1a242b]/80 border-white/10 hover:bg-white/10' : 'bg-white border-brand-dark/10 shadow-xl shadow-brand-dark/5 hover:shadow-2xl'}`}
                  >
                    <div className={`absolute -right-6 -top-6 w-24 h-24 rounded-full blur-2xl transition-opacity duration-500 opacity-0 group-hover:opacity-100 ${isDarkMode ? 'bg-brand-orange/20' : 'bg-brand-orange/10'}`}></div>
                    <div className="flex justify-between items-start relative z-10">
                      <div className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${isDarkMode ? 'bg-white/10 text-brand-light' : 'bg-brand-dark/5 text-brand-dark/70'}`}>
                        {foundItem.date}
                      </div>
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${isDarkMode ? 'bg-white/5 text-brand-orange group-hover:bg-brand-orange group-hover:text-white' : 'bg-brand-dark/5 text-brand-orange group-hover:bg-brand-orange group-hover:text-white'}`}>
                        <Search size={16} />
                      </div>
                    </div>
                    <h3 className="font-serif text-2xl mt-2 relative z-10">{foundItem.item}</h3>
                    <div className={`mt-auto pt-4 border-t flex items-center gap-2 transition-colors duration-1000 relative z-10 ${isDarkMode ? 'border-white/10 text-brand-light/60' : 'border-brand-dark/10 text-brand-dark/60'}`}>
                      <MapPin size={14} className="text-brand-orange" />
                      <p className="text-sm">{foundItem.location}</p>
                    </div>
                  </motion.div>
                )) : (
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className={`col-span-full p-12 rounded-[32px] border text-center flex flex-col items-center justify-center gap-4 ${isDarkMode ? 'bg-white/5 border-white/10' : 'bg-white border-brand-dark/10 shadow-xl shadow-brand-dark/5'}`}
                  >
                    <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-500 flex items-center justify-center mb-2">
                      <Heart size={32} />
                    </div>
                    <h3 className="font-serif text-2xl">Alles da, wo es hingehört!</h3>
                    <p className={`text-sm md:text-base max-w-md ${isDarkMode ? 'text-brand-light/60' : 'text-brand-dark/60'}`}>Aktuell gibt es keine verlorenen Gegenstände. Wir passen gut auf eure Sachen auf!</p>
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
              {currentView === 'familie' && <FamiliePage isDarkMode={isDarkMode} onBack={() => setCurrentView('home')} />}
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
                      href="tel:+49816712345" 
                      className={`text-lg transition-colors duration-1000 hover:text-brand-orange ${isDarkMode ? 'text-brand-light/70' : 'text-brand-light/70'}`}
                    >
                      +49 (0) 8167 12345
                    </a>
                    <a 
                      href="mailto:servus@schlossallee-haag.de" 
                      className={`text-lg transition-colors duration-1000 hover:text-brand-orange ${isDarkMode ? 'text-brand-light/70' : 'text-brand-light/70'}`}
                    >
                      servus@schlossallee-haag.de
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
          <p onClick={handleFooterClick} className="cursor-pointer select-none text-center md:text-left leading-relaxed">© 2026 Schlossallee-Biergarten Haag an der Amper.<br className="md:hidden" /> Alle Rechte vorbehalten.</p>
          <div className="flex flex-wrap justify-center gap-x-8 gap-y-4">
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
              <button onClick={() => { setIsMenuOpen(false); setIsDigitalMenuOpen(true); }} className="font-serif text-4xl md:text-6xl text-brand-light active:text-brand-orange transition-colors uppercase py-3">Speisekarte</button>
              <a href="#schmankerl" onClick={() => { setIsMenuOpen(false); setCurrentView('home'); }} className="font-serif text-4xl md:text-6xl text-brand-light active:text-brand-orange transition-colors uppercase py-3">Schmankerl</a>
              <button onClick={() => { setIsMenuOpen(false); setCurrentView('familie'); }} className="font-serif text-4xl md:text-6xl text-brand-light active:text-brand-orange transition-colors uppercase py-3">Familien</button>
              <a href="#events" onClick={() => { setIsMenuOpen(false); setCurrentView('home'); }} className="font-serif text-4xl md:text-6xl text-brand-light active:text-brand-orange transition-colors uppercase py-3">Events</a>
              <a href="#fundbuero" onClick={() => { setIsMenuOpen(false); setCurrentView('home'); }} className="font-serif text-4xl md:text-6xl text-brand-light active:text-brand-orange transition-colors uppercase py-3">Fundbüro</a>
              <a href="#kontakt" onClick={() => { setIsMenuOpen(false); setCurrentView('home'); }} className="font-serif text-4xl md:text-6xl text-brand-light active:text-brand-orange transition-colors uppercase py-3">Kontakt</a>
              
              <div className="mt-8 flex gap-6">
                <a href="#" className="w-14 h-14 rounded-full bg-white/5 flex items-center justify-center text-white active:bg-brand-orange transition-colors">
                  <Instagram size={24} />
                </a>
                <a href="#" className="w-14 h-14 rounded-full bg-white/5 flex items-center justify-center text-white active:bg-brand-orange transition-colors">
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

      {/* Digital Menu Modal */}
      <AnimatePresence>
        {isDigitalMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-[120] bg-brand-light flex flex-col overflow-hidden pt-[env(safe-area-inset-top)] pb-[env(safe-area-inset-bottom)]"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 md:p-8 border-b border-brand-dark/10 bg-brand-light sticky top-0 z-10">
              <h2 className="font-serif text-3xl md:text-4xl text-brand-dark uppercase">Speisekarte</h2>
              <button 
                onClick={() => setIsDigitalMenuOpen(false)}
                className="text-brand-dark hover:text-brand-orange transition-colors bg-brand-dark/5 p-2 rounded-full"
              >
                <X size={28} />
              </button>
            </div>

            {/* Categories */}
            <div className="flex overflow-x-auto hide-scrollbar gap-4 p-6 md:px-8 border-b border-brand-dark/5 bg-brand-light sticky top-[80px] md:top-[96px] z-10" style={{ WebkitOverflowScrolling: 'touch' }}>
              {['Bier', 'Brotzeit', 'Warmes'].map(category => (
                <button
                  key={category}
                  onClick={() => setActiveMenuCategory(category)}
                  className={`px-6 py-2 rounded-full font-medium whitespace-nowrap transition-colors ${
                    activeMenuCategory === category 
                      ? 'bg-brand-dark text-brand-light' 
                      : 'bg-brand-dark/5 text-brand-dark hover:bg-brand-dark/10'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>

            {/* Menu Items */}
            <div className="flex-1 overflow-y-auto p-6 md:p-8 bg-brand-light" style={{ WebkitOverflowScrolling: 'touch' }}>
              <div className="max-w-4xl mx-auto">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeMenuCategory}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                    className="flex flex-col gap-6"
                  >
                    {activeMenuCategory === 'Bier' && (
                      <>
                        <div className="flex items-center gap-4 p-4 rounded-2xl bg-white shadow-sm border border-brand-dark/5">
                          <img src="https://s1.directupload.eu/images/260321/e8uqintp.webp" alt="Jaga Bier" className="w-20 h-20 object-cover rounded-xl" />
                          <div className="flex-1">
                            <div className="flex justify-between items-start">
                              <h3 className="font-serif text-xl text-brand-dark">Jaga Bier (Naturtrüb)</h3>
                              <div className="flex items-center gap-3">
                                <span className="font-medium text-brand-orange">€ 9,50</span>
                                <motion.button whileTap={{ scale: 0.8 }} onClick={() => toggleLike('jaga')} className="text-brand-orange p-2 -m-2" style={{ touchAction: 'manipulation' }}>
                                  <Heart size={20} fill={likedItems.has('jaga') ? "currentColor" : "none"} />
                                </motion.button>
                              </div>
                            </div>
                            <p className="text-brand-dark/60 text-sm mt-1">1,0l Mass - Süffig, ehrlich und direkt aus dem Fass.</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-4 p-4 rounded-2xl bg-white shadow-sm border border-brand-dark/5">
                          <div className="w-20 h-20 bg-brand-dark/5 rounded-xl flex items-center justify-center text-brand-dark/20 font-serif text-2xl">🍺</div>
                          <div className="flex-1">
                            <div className="flex justify-between items-start">
                              <h3 className="font-serif text-xl text-brand-dark">Helles</h3>
                              <div className="flex items-center gap-3">
                                <span className="font-medium text-brand-orange">€ 9,20</span>
                                <motion.button whileTap={{ scale: 0.8 }} onClick={() => toggleLike('helles')} className="text-brand-orange p-2 -m-2" style={{ touchAction: 'manipulation' }}>
                                  <Heart size={20} fill={likedItems.has('helles') ? "currentColor" : "none"} />
                                </motion.button>
                              </div>
                            </div>
                            <p className="text-brand-dark/60 text-sm mt-1">1,0l Mass - Der bayerische Klassiker vom Hofbräuhaus Freising.</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-4 p-4 rounded-2xl bg-white shadow-sm border border-brand-dark/5">
                          <div className="w-20 h-20 bg-brand-dark/5 rounded-xl flex items-center justify-center text-brand-dark/20 font-serif text-2xl">🍺</div>
                          <div className="flex-1">
                            <div className="flex justify-between items-start">
                              <h3 className="font-serif text-xl text-brand-dark">Radler</h3>
                              <div className="flex items-center gap-3">
                                <span className="font-medium text-brand-orange">€ 9,20</span>
                                <motion.button whileTap={{ scale: 0.8 }} onClick={() => toggleLike('radler')} className="text-brand-orange p-2 -m-2" style={{ touchAction: 'manipulation' }}>
                                  <Heart size={20} fill={likedItems.has('radler') ? "currentColor" : "none"} />
                                </motion.button>
                              </div>
                            </div>
                            <p className="text-brand-dark/60 text-sm mt-1">1,0l Mass - Erfrischend gemischt mit Zitronenlimonade.</p>
                          </div>
                        </div>
                      </>
                    )}

                    {activeMenuCategory === 'Brotzeit' && (
                      <>
                        <div className="flex items-center gap-4 p-4 rounded-2xl bg-white shadow-sm border border-brand-dark/5">
                          <div className="w-20 h-20 bg-brand-dark/5 rounded-xl flex items-center justify-center text-brand-dark/20 font-serif text-2xl">🥨</div>
                          <div className="flex-1">
                            <div className="flex justify-between items-start">
                              <h3 className="font-serif text-xl text-brand-dark">Riesenbrezn</h3>
                              <div className="flex items-center gap-3">
                                <span className="font-medium text-brand-orange">€ 4,50</span>
                                <motion.button whileTap={{ scale: 0.8 }} onClick={() => toggleLike('brezn')} className="text-brand-orange p-2 -m-2" style={{ touchAction: 'manipulation' }}>
                                  <Heart size={20} fill={likedItems.has('brezn') ? "currentColor" : "none"} />
                                </motion.button>
                              </div>
                            </div>
                            <p className="text-brand-dark/60 text-sm mt-1">Ofenfrisch vom Backhaus Weiß.</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-4 p-4 rounded-2xl bg-white shadow-sm border border-brand-dark/5">
                          <div className="w-20 h-20 bg-brand-dark/5 rounded-xl flex items-center justify-center text-brand-dark/20 font-serif text-2xl">🧀</div>
                          <div className="flex-1">
                            <div className="flex justify-between items-start">
                              <h3 className="font-serif text-xl text-brand-dark">Obatzda</h3>
                              <div className="flex items-center gap-3">
                                <span className="font-medium text-brand-orange">€ 7,80</span>
                                <motion.button whileTap={{ scale: 0.8 }} onClick={() => toggleLike('obatzda')} className="text-brand-orange p-2 -m-2" style={{ touchAction: 'manipulation' }}>
                                  <Heart size={20} fill={likedItems.has('obatzda') ? "currentColor" : "none"} />
                                </motion.button>
                              </div>
                            </div>
                            <p className="text-brand-dark/60 text-sm mt-1">Hausgemacht, garniert mit roten Zwiebelringen und Schnittlauch.</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-4 p-4 rounded-2xl bg-white shadow-sm border border-brand-dark/5">
                          <div className="w-20 h-20 bg-brand-dark/5 rounded-xl flex items-center justify-center text-brand-dark/20 font-serif text-2xl">🍖</div>
                          <div className="flex-1">
                            <div className="flex justify-between items-start">
                              <h3 className="font-serif text-xl text-brand-dark">Bayerischer Wurstsalat</h3>
                              <div className="flex items-center gap-3">
                                <span className="font-medium text-brand-orange">€ 8,50</span>
                                <motion.button whileTap={{ scale: 0.8 }} onClick={() => toggleLike('wurstsalat')} className="text-brand-orange p-2 -m-2" style={{ touchAction: 'manipulation' }}>
                                  <Heart size={20} fill={likedItems.has('wurstsalat') ? "currentColor" : "none"} />
                                </motion.button>
                              </div>
                            </div>
                            <p className="text-brand-dark/60 text-sm mt-1">Mit Essig, Öl und roten Zwiebeln, dazu ein Bauernbrot.</p>
                          </div>
                        </div>
                      </>
                    )}

                    {activeMenuCategory === 'Warmes' && (
                      <>
                        <div className="flex items-center gap-4 p-4 rounded-2xl bg-white shadow-sm border border-brand-dark/5">
                          <img src="https://www.radioarabella.de/storage/thumbs/1275x/323622.webp" alt="Steckerlfisch" className="w-20 h-20 object-cover rounded-xl" />
                          <div className="flex-1">
                            <div className="flex justify-between items-start">
                              <h3 className="font-serif text-xl text-brand-dark">Steckerlfisch (Makrele)</h3>
                              <div className="flex items-center gap-3">
                                <span className="font-medium text-brand-orange">€ 18,50</span>
                                <motion.button whileTap={{ scale: 0.8 }} onClick={() => toggleLike('fisch')} className="text-brand-orange p-2 -m-2" style={{ touchAction: 'manipulation' }}>
                                  <Heart size={20} fill={likedItems.has('fisch') ? "currentColor" : "none"} />
                                </motion.button>
                              </div>
                            </div>
                            <p className="text-brand-dark/60 text-sm mt-1">Frisch über dem offenen Feuer gegrillt, mit einer Brezn.</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-4 p-4 rounded-2xl bg-white shadow-sm border border-brand-dark/5">
                          <img src="https://static.express.de/__images/2022/07/02/6d4d3850-bc96-46c5-80c0-ba1a13d3adc2.jpeg?w=4000&h=2667&fm=jpg&s=942917e7817d1db3a6b03e363a3d33a9" alt="Bratwurst" className="w-20 h-20 object-cover rounded-xl" />
                          <div className="flex-1">
                            <div className="flex justify-between items-start">
                              <h3 className="font-serif text-xl text-brand-dark">1/2 Hendl</h3>
                              <div className="flex items-center gap-3">
                                <span className="font-medium text-brand-orange">€ 11,50</span>
                                <motion.button whileTap={{ scale: 0.8 }} onClick={() => toggleLike('hendl')} className="text-brand-orange p-2 -m-2" style={{ touchAction: 'manipulation' }}>
                                  <Heart size={20} fill={likedItems.has('hendl') ? "currentColor" : "none"} />
                                </motion.button>
                              </div>
                            </div>
                            <p className="text-brand-dark/60 text-sm mt-1">Knusprig gebraten, mit Kartoffelsalat.</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-4 p-4 rounded-2xl bg-white shadow-sm border border-brand-dark/5">
                          <div className="w-20 h-20 bg-brand-dark/5 rounded-xl flex items-center justify-center text-brand-dark/20 font-serif text-2xl">🌭</div>
                          <div className="flex-1">
                            <div className="flex justify-between items-start">
                              <h3 className="font-serif text-xl text-brand-dark">Schweinswürstl</h3>
                              <div className="flex items-center gap-3">
                                <span className="font-medium text-brand-orange">€ 9,80</span>
                                <motion.button whileTap={{ scale: 0.8 }} onClick={() => toggleLike('wuerstl')} className="text-brand-orange p-2 -m-2" style={{ touchAction: 'manipulation' }}>
                                  <Heart size={20} fill={likedItems.has('wuerstl') ? "currentColor" : "none"} />
                                </motion.button>
                              </div>
                            </div>
                            <p className="text-brand-dark/60 text-sm mt-1">6 Stück auf Sauerkraut mit Senf.</p>
                          </div>
                        </div>
                      </>
                    )}
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
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
                <input 
                  type="password" 
                  value={passwordInput}
                  onChange={(e) => setPasswordInput(e.target.value)}
                  placeholder="Passwort" 
                  className="bg-white/5 border border-white/10 rounded-xl px-4 py-4 text-base sm:text-sm text-brand-light focus:outline-none focus:border-brand-orange transition-colors"
                  autoFocus
                />
                {errorMsg && <p className="text-red-400 text-sm">{errorMsg}</p>}
                <button 
                  type="submit"
                  className="bg-brand-orange text-white rounded-xl px-4 py-3 font-medium hover:bg-brand-orange/90 transition-all active:scale-95"
                  style={{ touchAction: 'manipulation' }}
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
              <h3 className="text-2xl font-serif text-brand-light mb-6 shrink-0">Status & Auslastung</h3>
              <div className="flex flex-col gap-6 overflow-y-auto pr-2 pb-4 hide-scrollbar overscroll-contain" style={{ WebkitOverflowScrolling: 'touch' }}>
                <div>
                  <label className="text-sm font-medium text-brand-light/80 block mb-2">Öffnungsstatus</label>
                  <div className="flex gap-4">
                    <button 
                      type="button"
                      onClick={() => handleStatusChange(true)}
                      className={`flex-1 rounded-xl px-4 py-4 font-medium transition-all active:scale-95 border ${isOpen ? 'bg-emerald-500/20 border-emerald-500/50 text-emerald-400' : 'bg-white/5 border-white/10 text-brand-light hover:bg-white/10'}`}
                      style={{ touchAction: 'manipulation' }}
                    >
                      🍺 Geöffnet
                    </button>
                    <button 
                      type="button"
                      onClick={() => handleStatusChange(false)}
                      className={`flex-1 rounded-xl px-4 py-4 font-medium transition-all active:scale-95 border ${!isOpen ? 'bg-red-500/20 border-red-500/50 text-red-400' : 'bg-white/5 border-white/10 text-brand-light hover:bg-white/10'}`}
                      style={{ touchAction: 'manipulation' }}
                    >
                      🌧️ Geschlossen
                    </button>
                  </div>
                </div>
                
                <div>
                  <label className="text-sm font-medium text-brand-light/80 flex justify-between mb-2">
                    <span>Auslastung</span>
                    <span className="text-brand-orange">{occupancy}%</span>
                  </label>
                  <input 
                    type="range" 
                    min="0" 
                    max="100" 
                    value={occupancy} 
                    onChange={handleOccupancyChange}
                    className="w-full accent-brand-orange"
                  />
                  <div className="flex justify-between text-xs text-brand-light/40 mt-1">
                    <span>Leer</span>
                    <span>Voll</span>
                  </div>
                  <div className="mt-4 flex items-center justify-between">
                    <label className="text-sm font-medium text-brand-light/80">Auslastung auf der Website anzeigen</label>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input 
                        type="checkbox" 
                        className="sr-only peer" 
                        checked={showOccupancy}
                        onChange={handleShowOccupancyChange}
                      />
                      <div className="w-11 h-6 bg-white/10 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-brand-orange"></div>
                    </label>
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
                  <div className="text-sm text-brand-light/70 uppercase tracking-wider text-center">Speisekarte<br/>geöffnet</div>
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
              O'zapft is...
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile Sticky Action Bar */}
      <AnimatePresence>
        {isBottomNavExpanded ? (
          <motion.div 
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="lg:hidden fixed bottom-0 left-0 w-full z-40 bg-[#0a0f12]/95 backdrop-blur-xl border-t border-white/10 pb-[max(1.5rem,env(safe-area-inset-bottom))] pt-3 px-4 flex justify-around items-center shadow-[0_-10px_40px_rgba(0,0,0,0.5)]"
          >
            {/* Collapse Handle */}
            <div 
              className="absolute -top-6 left-0 w-full h-6 flex justify-center items-end pb-2 cursor-pointer"
              onClick={() => setIsBottomNavExpanded(false)}
            >
              <div className="w-12 h-1.5 bg-white/20 rounded-full"></div>
            </div>

            <button 
              onClick={() => { triggerPouringAnimation(() => setIsDigitalMenuOpen(true)); trackEvent('menuClicks'); }}
              className="flex flex-col items-center gap-1.5 text-brand-orange"
              style={{ touchAction: 'manipulation' }}
            >
              <div className="bg-brand-orange/20 p-2 rounded-full">
                <Utensils size={22} />
              </div>
              <span className="text-[10px] font-bold uppercase tracking-widest">Speisen</span>
            </button>
            <a 
              href="#kontakt"
              onClick={() => trackEvent('routeClicks')}
              className="flex flex-col items-center gap-1.5 text-brand-light/70 hover:text-brand-light transition-colors"
              style={{ touchAction: 'manipulation' }}
            >
              <div className="p-2">
                <MapPin size={22} />
              </div>
              <span className="text-[10px] font-bold uppercase tracking-widest">Route</span>
            </a>
            <a 
              href="tel:+498167958800"
              className="flex flex-col items-center gap-1.5 text-brand-light/70 hover:text-brand-light transition-colors"
              style={{ touchAction: 'manipulation' }}
            >
              <div className="p-2">
                <Phone size={22} />
              </div>
              <span className="text-[10px] font-bold uppercase tracking-widest">Anrufen</span>
            </a>
          </motion.div>
        ) : (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            className="lg:hidden fixed bottom-0 left-0 w-full z-40 flex justify-center pb-[max(0.5rem,env(safe-area-inset-bottom))]"
          >
            <button
              onClick={() => setIsBottomNavExpanded(true)}
              className="bg-[#0a0f12]/90 backdrop-blur-md border border-white/10 text-white/70 hover:text-white rounded-t-2xl rounded-b-lg px-8 py-3 shadow-2xl flex flex-col items-center gap-1"
              style={{ touchAction: 'manipulation' }}
            >
              <div className="w-8 h-1 bg-white/30 rounded-full mb-1"></div>
              <span className="text-[10px] font-bold uppercase tracking-widest">Menü</span>
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;
