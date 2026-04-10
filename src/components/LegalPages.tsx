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
        Biergarten Schlossallee von Lodron GmbH<br />
        Freisinger Str. 1<br />
        85410 Haag an der Amper
      </p>
    </div>

    <div className="flex flex-col gap-2">
      <h2 className="font-bold text-xl">Vertreten durch</h2>
      <p className="opacity-80">Geschäftsführer: Suleiman Hotaki</p>
    </div>

    <div className="flex flex-col gap-2">
      <h2 className="font-bold text-xl">Kontakt</h2>
      <p className="opacity-80">
        Telefon: 0176/40216107<br />
        E-Mail: info@schlossalleehaag.de<br />
        Website: www.schlossalleehaag.de
      </p>
    </div>

    <div className="flex flex-col gap-2">
      <h2 className="font-bold text-xl">Aufsichtsbehörde</h2>
      <p className="opacity-80">
        Landratsamt München<br />
        Mariahilfplatz 17<br />
        81541 München
      </p>
    </div>

    <div className="flex flex-col gap-2">
      <h2 className="font-bold text-xl">Registereintrag</h2>
      <p className="opacity-80">
        Eintragung im Handelsregister.<br />
        Registergericht: folgt<br />
        Registernummer: folgt
      </p>
    </div>

    <div className="flex flex-col gap-2">
      <h2 className="font-bold text-xl">Umsatzsteuer-ID</h2>
      <p className="opacity-80">
        Umsatzsteuer-Identifikationsnummer gemäß § 27 a Umsatzsteuergesetz:<br />
        folgt
      </p>
    </div>

    <div className="flex flex-col gap-2">
      <h2 className="font-bold text-xl">Wirtschafts-Identifikationsnummer</h2>
      <p className="opacity-80">
        in Eintragung
      </p>
    </div>

    <div className="flex flex-col gap-2">
      <h2 className="font-bold text-xl">EU-Streitschlichtung</h2>
      <p className="opacity-80">
        Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit: <a href="https://ec.europa.eu/consumers/odr/" target="_blank" rel="noopener noreferrer" className="underline hover:text-brand-orange">https://ec.europa.eu/consumers/odr/</a>.<br />
        Unsere E-Mail-Adresse finden Sie oben im Impressum.
      </p>
    </div>

    <div className="flex flex-col gap-2">
      <h2 className="font-bold text-xl">Verbraucherstreitbeilegung/Universalschlichtungsstelle</h2>
      <p className="opacity-80">
        Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen.
      </p>
    </div>

    <div className="flex flex-col gap-2 mt-4">
      <h2 className="font-bold text-xl">Haftung für Inhalte</h2>
      <p className="opacity-80">
        Als Diensteanbieter sind wir gemäß § 7 Abs.1 TMG für eigene Inhalte auf diesen Seiten nach den allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10 TMG sind wir als Diensteanbieter jedoch nicht verpflichtet, übermittelte oder gespeicherte fremde Informationen zu überwachen oder nach Umständen zu forschen, die auf eine rechtswidrige Tätigkeit hinweisen.
      </p>
      <p className="opacity-80 mt-2">
        Verpflichtungen zur Entfernung oder Sperrung der Nutzung von Informationen nach den allgemeinen Gesetzen bleiben hiervon unberührt. Eine diesbezügliche Haftung ist jedoch erst ab dem Zeitpunkt der Kenntnis einer konkreten Rechtsverletzung möglich. Bei Bekanntwerden von entsprechenden Rechtsverletzungen werden wir diese Inhalte umgehend entfernen.
      </p>
    </div>

    <div className="flex flex-col gap-2 mt-4">
      <h2 className="font-bold text-xl">Haftung für Links</h2>
      <p className="opacity-80">
        Unser Angebot enthält Links zu externen Websites Dritter, auf deren Inhalte wir keinen Einfluss haben. Deshalb können wir für diese fremden Inhalte auch keine Gewähr übernehmen. Für die Inhalte der verlinkten Seiten ist stets der jeweilige Anbieter oder Betreiber der Seiten verantwortlich. Die verlinkten Seiten wurden zum Zeitpunkt der Verlinkung auf mögliche Rechtsverstöße überprüft. Rechtswidrige Inhalte waren zum Zeitpunkt der Verlinkung nicht erkennbar.
      </p>
      <p className="opacity-80 mt-2">
        Eine permanente inhaltliche Kontrolle der verlinkten Seiten ist jedoch ohne konkrete Anhaltspunkte einer Rechtsverletzung nicht zumutbar. Bei Bekanntwerden von Rechtsverletzungen werden wir derartige Links umgehend entfernen.
      </p>
    </div>

    <div className="flex flex-col gap-2 mt-4">
      <h2 className="font-bold text-xl">Urheberrecht</h2>
      <p className="opacity-80">
        Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen dem deutschen Urheberrecht. Die Vervielfältigung, Bearbeitung, Verbreitung und jede Art der Verwertung außerhalb der Grenzen des Urheberrechtes bedürfen der schriftlichen Zustimmung des jeweiligen Autors bzw. Erstellers. Downloads und Kopien dieser Seite sind nur für den privaten, nicht kommerziellen Gebrauch gestattet.
      </p>
      <p className="opacity-80 mt-2">
        Soweit die Inhalte auf dieser Seite nicht vom Betreiber erstellt wurden, werden die Urheberrechte Dritter beachtet. Insbesondere werden Inhalte Dritter als solche gekennzeichnet. Sollten Sie trotzdem auf eine Urheberrechtsverletzung aufmerksam werden, bitten wir um einen entsprechenden Hinweis. Bei Bekanntwerden von Rechtsverletzungen werden wir derartige Inhalte umgehend entfernen.
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
