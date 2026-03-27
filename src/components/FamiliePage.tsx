import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Baby, Gamepad2, IceCream, Trees } from 'lucide-react';

interface FamiliePageProps {
  isDarkMode: boolean;
  onBack: () => void;
}

export const FamiliePage: React.FC<FamiliePageProps> = ({ isDarkMode, onBack }) => {
  return (
    <div className={`min-h-screen py-24 px-4 sm:px-6 md:px-12 lg:px-20 transition-colors duration-1000 ${isDarkMode ? 'bg-[#12181c] text-brand-light' : 'bg-brand-light text-brand-dark'}`}>
      <div className="max-w-4xl mx-auto">
        <button 
          onClick={onBack}
          className={`flex items-center gap-2 mb-12 hover:text-brand-orange transition-colors ${isDarkMode ? 'text-brand-light/70' : 'text-brand-dark/70'}`}
        >
          <ArrowLeft size={20} />
          <span>Zurück zur Startseite</span>
        </button>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="font-serif text-5xl md:text-7xl mb-6 uppercase">Familie &<br />Kinder</h1>
          <p className={`text-xl md:text-2xl mb-16 leading-relaxed ${isDarkMode ? 'text-brand-light/80' : 'text-brand-dark/80'}`}>
            Ein entspannter Tag im Biergarten für die Großen, ein großes Abenteuer für die Kleinen. 
            Bei uns in der Schlossallee sind Familien herzlich willkommen!
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            <div className={`p-8 rounded-3xl border transition-colors duration-1000 ${isDarkMode ? 'bg-white/5 border-white/10' : 'bg-white border-brand-dark/10 shadow-lg shadow-brand-dark/5'}`}>
              <Gamepad2 className="text-brand-orange mb-6" size={40} />
              <h3 className="font-serif text-3xl mb-4">Großer Abenteuerspielplatz</h3>
              <p className={`leading-relaxed ${isDarkMode ? 'text-brand-light/70' : 'text-brand-dark/70'}`}>
                Direkt in Sichtweite der Tische befindet sich unser weitläufiger Spielplatz mit Klettergerüst, 
                Rutsche, Schaukeln und einem großen Sandkasten. Die Kinder können sicher spielen, während 
                die Eltern entspannt ihr Bier genießen.
              </p>
            </div>

            <div className={`p-8 rounded-3xl border transition-colors duration-1000 ${isDarkMode ? 'bg-white/5 border-white/10' : 'bg-white border-brand-dark/10 shadow-lg shadow-brand-dark/5'}`}>
              <IceCream className="text-brand-orange mb-6" size={40} />
              <h3 className="font-serif text-3xl mb-4">Kinder-Speisekarte</h3>
              <p className={`leading-relaxed ${isDarkMode ? 'text-brand-light/70' : 'text-brand-dark/70'}`}>
                Kleine Portionen für kleine Räuber! Von den klassischen Pommes über kleine Schnitzel bis hin 
                zum Kaiserschmarrn – unsere Kindergerichte sind bei den Kleinsten besonders beliebt. 
                Natürlich gibt es auch Eis als Nachtisch.
              </p>
            </div>

            <div className={`p-8 rounded-3xl border transition-colors duration-1000 ${isDarkMode ? 'bg-white/5 border-white/10' : 'bg-white border-brand-dark/10 shadow-lg shadow-brand-dark/5'}`}>
              <Trees className="text-brand-orange mb-6" size={40} />
              <h3 className="font-serif text-3xl mb-4">Natur erkunden</h3>
              <p className={`leading-relaxed ${isDarkMode ? 'text-brand-light/70' : 'text-brand-dark/70'}`}>
                Unser Biergarten liegt direkt an der Schlossallee. Ein kleiner Spaziergang durch die 
                angrenzenden Wälder oder zum nahegelegenen Bach ist das perfekte kleine Abenteuer 
                vor oder nach dem Essen.
              </p>
            </div>

            <div className={`p-8 rounded-3xl border transition-colors duration-1000 ${isDarkMode ? 'bg-white/5 border-white/10' : 'bg-white border-brand-dark/10 shadow-lg shadow-brand-dark/5'}`}>
              <Baby className="text-brand-orange mb-6" size={40} />
              <h3 className="font-serif text-3xl mb-4">Familienfreundliche Ausstattung</h3>
              <p className={`leading-relaxed ${isDarkMode ? 'text-brand-light/70' : 'text-brand-dark/70'}`}>
                Wir bieten ausreichend Hochstühle, einen sauberen und geräumigen Wickelraum sowie 
                genügend Platz an den Tischen, um auch mit dem Kinderwagen problemlos sitzen zu können.
              </p>
            </div>
          </div>

          <div className="aspect-video rounded-[40px] overflow-hidden relative shadow-2xl">
            <img 
              src="https://images.unsplash.com/photo-1511895426328-dc8714191300?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80" 
              alt="Kinder spielen" 
              className="w-full h-full object-cover" 
              referrerPolicy="no-referrer" 
            />
          </div>
        </motion.div>
      </div>
    </div>
  );
};
