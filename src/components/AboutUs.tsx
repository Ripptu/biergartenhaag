import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, History, TreePine, Beer } from 'lucide-react';

interface AboutUsProps {
  isDarkMode: boolean;
  onBack: () => void;
}

export const AboutUs: React.FC<AboutUsProps> = ({ isDarkMode, onBack }) => {
  return (
    <div className={`min-h-screen pt-24 md:pt-28 pb-16 px-4 sm:px-6 md:px-12 lg:px-20 transition-colors duration-1000 ${isDarkMode ? 'bg-[#0a0f12] text-brand-light' : 'bg-brand-light text-brand-dark'}`}>
      <div className="max-w-4xl mx-auto">
        <button 
          onClick={onBack}
          className={`flex items-center gap-2 mb-10 transition-colors hover:text-brand-orange ${isDarkMode ? 'text-brand-light/70' : 'text-brand-dark/70'}`}
        >
          <ArrowLeft size={20} />
          <span>Zurück zur Startseite</span>
        </button>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="flex items-center gap-3 mb-3">
            <div className="w-12 h-[2px] bg-brand-orange"></div>
            <span className="text-brand-orange font-bold uppercase tracking-widest text-xs md:text-sm">Über uns</span>
          </div>
          <h1 className="font-sans font-extrabold text-3xl sm:text-4xl md:text-5xl lg:text-6xl mb-8 leading-tight tracking-tight">
            Die Geschichte der <br className="hidden sm:inline" />Schlossallee.
          </h1>

          <div className="space-y-16">
            {/* Section 1: Ursprung */}
            <div className="flex flex-col md:flex-row gap-8 md:gap-12">
              <div className="md:w-1/3">
                <div className="sticky top-32 flex items-center gap-4 text-brand-orange">
                  <TreePine size={24} className="md:w-8 md:h-8" />
                  <h2 className="font-sans font-bold text-2xl md:text-3xl tracking-tight">Der Ursprung</h2>
                </div>
              </div>
              <div className={`md:w-2/3 space-y-6 text-base md:text-lg leading-relaxed ${isDarkMode ? 'text-brand-light/80' : 'text-brand-dark/80'}`}>
                <p>
                  Die riesigen, uralten Kastanienbäume, die heute unseren Gästen an heißen Sommertagen Schatten spenden, bildeten einst eine prachtvolle Allee zum Schloss. Dieses historische Schloss existiert heute leider nicht mehr – die letzten Überreste der Ruine wurden im Jahr 1998 beseitigt.
                </p>
                <p>
                  Doch der Geist der Vergangenheit lebt weiter. Neben einer Vielzahl seltener Pflanzen und kleiner Teiche liegt direkt nebenan das im Jahr 1784 erbaute Brauhaus. In diesen altehrwürdigen Mauern wurde jahrhundertelang das für die Schlossallee bekannte Jägerbier gebraut.
                </p>
              </div>
            </div>

            {/* Section 2: Entwicklung */}
            <div className="flex flex-col md:flex-row gap-8 md:gap-12">
              <div className="md:w-1/3">
                <div className="sticky top-32 flex items-center gap-4 text-brand-orange">
                  <History size={24} className="md:w-8 md:h-8" />
                  <h2 className="font-sans font-bold text-2xl md:text-3xl tracking-tight">Die Entwicklung</h2>
                </div>
              </div>
              <div className={`md:w-2/3 space-y-6 text-base md:text-lg leading-relaxed ${isDarkMode ? 'text-brand-light/80' : 'text-brand-dark/80'}`}>
                <p>
                  Schriftlich wurde der Biergarten erstmals im Jahr 1926 erwähnt. Über die Jahrzehnte hinweg erlebte die Schlossallee zahlreiche Pächterwechsel, die alle ihre eigenen Spuren hinterließen.
                </p>
                <p>
                  Ein bedeutendes Kapitel begann, als Biergarten, Schlossgarten und Brauhaus an den Grafen Guy von Moy verkauft wurden. Später erwarb die Familie Hofmaier die Schlossallee und eröffnete diese nach einer umfangreichen und liebevollen Renovierung neu, um den historischen Charme mit moderner Gastlichkeit zu verbinden.
                </p>
              </div>
            </div>

            {/* Section 3: Heute */}
            <div className="flex flex-col md:flex-row gap-8 md:gap-12">
              <div className="md:w-1/3">
                <div className="sticky top-32 flex items-center gap-4 text-brand-orange">
                  <Beer size={24} className="md:w-8 md:h-8" />
                  <h2 className="font-sans font-bold text-2xl md:text-3xl tracking-tight">Heute</h2>
                </div>
              </div>
              <div className={`md:w-2/3 space-y-6 text-base md:text-lg leading-relaxed ${isDarkMode ? 'text-brand-light/80' : 'text-brand-dark/80'}`}>
                <p>
                  Heute wird die Schlossallee von Suleiman Hotaki und seinem engagierten Team geführt. Mit circa 3.200 Sitzplätzen und einer beeindruckenden Fläche von 17.000m² ist die Schlossallee einer der größten und schönsten Biergärten in ganz Bayern.
                </p>
                <p>
                  Ob Radler auf der Durchreise, Familien, die unser 2.500m² großes Kinderparadies schätzen, oder Genießer, die bei Live-Musik und einem frischen Steckerlfisch den Abend ausklingen lassen – die Schlossallee Haag an der Amper ist ein Ort der Zusammenkunft, der Tradition und der bayerischen Lebensfreude.
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};
