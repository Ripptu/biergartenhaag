import React from 'react';

interface LegalPageProps {
  isDarkMode: boolean;
}

export const Impressum: React.FC<LegalPageProps> = ({ isDarkMode }) => (
  <div className={`flex flex-col gap-6 ${isDarkMode ? 'text-brand-light' : 'text-brand-dark'}`}>
    <h1 className="font-serif text-4xl md:text-5xl uppercase mb-4">Impressum</h1>
    
    <div className="flex flex-col gap-2">
      <h2 className="font-bold text-xl">Angaben gemäß § 5 TMG</h2>
      <p className="opacity-80">
        Biergarten Schlossallee Haag<br />
        Freisinger Str. 1<br />
        85410 Haag a.d. Amper
      </p>
    </div>

    <div className="flex flex-col gap-2">
      <h2 className="font-bold text-xl">Vertreten durch</h2>
      <p className="opacity-80">Max Mustermann (Geschäftsführer)</p>
    </div>

    <div className="flex flex-col gap-2">
      <h2 className="font-bold text-xl">Kontakt</h2>
      <p className="opacity-80">
        Telefon: +49 (0) 8167 12345<br />
        E-Mail: servus@schlossallee-haag.de
      </p>
    </div>

    <div className="flex flex-col gap-2">
      <h2 className="font-bold text-xl">Umsatzsteuer-ID</h2>
      <p className="opacity-80">
        Umsatzsteuer-Identifikationsnummer gemäß § 27 a Umsatzsteuergesetz:<br />
        DE 123 456 789
      </p>
    </div>

    <div className="flex flex-col gap-2">
      <h2 className="font-bold text-xl">Verbraucherstreitbeilegung/Universalschlichtungsstelle</h2>
      <p className="opacity-80">
        Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen.
      </p>
    </div>
  </div>
);

export const AGB: React.FC<LegalPageProps> = ({ isDarkMode }) => (
  <div className={`flex flex-col gap-6 ${isDarkMode ? 'text-brand-light' : 'text-brand-dark'}`}>
    <h1 className="font-serif text-4xl md:text-5xl uppercase mb-4">Allgemeine Geschäftsbedingungen</h1>
    
    <div className="flex flex-col gap-2">
      <h2 className="font-bold text-xl">1. Geltungsbereich</h2>
      <p className="opacity-80">
        Diese Allgemeinen Geschäftsbedingungen (AGB) gelten für alle Reservierungen und Dienstleistungen des Biergartens Schlossallee Haag.
      </p>
    </div>

    <div className="flex flex-col gap-2">
      <h2 className="font-bold text-xl">2. Reservierungen</h2>
      <p className="opacity-80">
        Reservierungen sind erst nach einer schriftlichen oder telefonischen Bestätigung durch uns verbindlich. Bei Verspätungen von mehr als 30 Minuten behalten wir uns vor, den Tisch anderweitig zu vergeben.
      </p>
    </div>

    <div className="flex flex-col gap-2">
      <h2 className="font-bold text-xl">3. Stornierungen</h2>
      <p className="opacity-80">
        Stornierungen sind bis zu 24 Stunden vor dem reservierten Termin kostenfrei möglich. Bei späteren Stornierungen oder Nichterscheinen behalten wir uns vor, eine Ausfallgebühr zu berechnen.
      </p>
    </div>

    <div className="flex flex-col gap-2">
      <h2 className="font-bold text-xl">4. Haftung</h2>
      <p className="opacity-80">
        Wir haften nicht für verlorene oder gestohlene Gegenstände. Die Nutzung des Spielplatzes und anderer Einrichtungen erfolgt auf eigene Gefahr. Eltern haften für ihre Kinder.
      </p>
    </div>

    <div className="flex flex-col gap-2">
      <h2 className="font-bold text-xl">5. Hausrecht</h2>
      <p className="opacity-80">
        Wir behalten uns das Recht vor, Personen, die den Frieden stören oder sich unangemessen verhalten, des Platzes zu verweisen.
      </p>
    </div>
  </div>
);

export const Datenschutz: React.FC<LegalPageProps> = ({ isDarkMode }) => (
  <div className={`flex flex-col gap-6 ${isDarkMode ? 'text-brand-light' : 'text-brand-dark'}`}>
    <h1 className="font-serif text-4xl md:text-5xl uppercase mb-4">Datenschutzerklärung</h1>
    
    <div className="flex flex-col gap-2">
      <h2 className="font-bold text-xl">1. Datenschutz auf einen Blick</h2>
      <p className="opacity-80">
        Die folgenden Hinweise geben einen einfachen Überblick darüber, was mit Ihren personenbezogenen Daten passiert, wenn Sie diese Website besuchen.
      </p>
    </div>

    <div className="flex flex-col gap-2">
      <h2 className="font-bold text-xl">2. Datenerfassung auf dieser Website</h2>
      <p className="opacity-80">
        Die Datenverarbeitung auf dieser Website erfolgt durch den Websitebetreiber. Dessen Kontaktdaten können Sie dem Impressum dieser Website entnehmen.
      </p>
    </div>

    <div className="flex flex-col gap-2">
      <h2 className="font-bold text-xl">3. Wofür nutzen wir Ihre Daten?</h2>
      <p className="opacity-80">
        Ein Teil der Daten wird erhoben, um eine fehlerfreie Bereitstellung der Website zu gewährleisten. Andere Daten können zur Analyse Ihres Nutzerverhaltens verwendet werden.
      </p>
    </div>

    <div className="flex flex-col gap-2">
      <h2 className="font-bold text-xl">4. Welche Rechte haben Sie bezüglich Ihrer Daten?</h2>
      <p className="opacity-80">
        Sie haben jederzeit das Recht, unentgeltlich Auskunft über Herkunft, Empfänger und Zweck Ihrer gespeicherten personenbezogenen Daten zu erhalten. Sie haben außerdem ein Recht, die Berichtigung oder Löschung dieser Daten zu verlangen.
      </p>
    </div>

    <div className="flex flex-col gap-2">
      <h2 className="font-bold text-xl">5. Analyse-Tools und Tools von Drittanbietern</h2>
      <p className="opacity-80">
        Beim Besuch dieser Website kann Ihr Surf-Verhalten statistisch ausgewertet werden. Das geschieht vor allem mit sogenannten Analyseprogrammen.
      </p>
    </div>
  </div>
);
