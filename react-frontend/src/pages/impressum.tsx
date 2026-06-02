export default function Impressum() {
  return (
    <main className="max-w-3xl mx-auto px-4 py-12 text-slate-800 antialiased">
      <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 mb-2">Impressum</h1>
      <p className="text-sm text-slate-500 mb-8 border-b border-slate-200 pb-4">
        Informationen und Offenlegungspflicht gemäß § 25 Mediengesetz (MedienG)
      </p>

      <section className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Vereinsdaten</h2>
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 bg-slate-50 p-4 rounded-xl border border-slate-100">
            <p><strong className="font-semibold text-slate-900">Vereinsname:</strong> Verein Faszination Tierwelt Linmezis</p>
            <p><strong className="font-semibold text-slate-900">ZVR-Zahl:</strong> 1226580500</p>
            <p className="sm:col-span-2"><strong className="font-semibold text-slate-900">Vereinssitz:</strong> Mottingeramt 8, 3532 Rastenfeld</p>
            <p className="sm:col-span-2"><strong className="font-semibold text-slate-900">Zuständige Vereinsbehörde:</strong> Bezirkshauptmannschaft Krems</p>
          </div>
        </div>

        <div className="space-y-3">
          <p><strong className="text-lg font-semibold text-slate-900 block border-b border-slate-100 pb-1">Vereinszweck:</strong></p>
          <p><strong className="font-semibold text-slate-900">Allgemein:</strong>Ethischer Tierschutz Verein</p>
          
          <div className="space-y-4 text-slate-600 leading-relaxed pl-1 border-l-2 border-indigo-500/30">
            <p>
              <strong className="text-slate-900 font-semibold">Detail:</strong><br />
              Die gemeinnützige Tätigkeit des Vereins ist nicht auf Gewinn ausgerichtet und hat folgenden ideellen Zweck:
            </p>

            <p>
              Im Mittelpunkt der Vereinsarbeit steht die Kommunikation mit Mensch, Fauna, Flora und der gesamten Mutter Erde.
            </p>

            <p>
              Ein wichtiger Vereinszweck ist die Erhaltung der Vitalität und Gesundheit aller Geschöpfe und der gesamten Mutter Erde.
            </p>

            <p>
              Feinstoffliche Energien sollen erforscht, wahrgenommen, gereinigt, gestärkt, harmonisiert, kommuniziert, gelöst und gebildet werden.
            </p>

            <p>
              Die Herzensverbindungen zwischen allen Lebewesen sollen erforscht, gefördert, gebildet, wiederhergestellt und erhalten werden.
            </p>

            <p>
              Eines der Vereinsziele ist auch, Blockaden im feststofflichen Körper zu erforschen, zu erfühlen, wahrzunehmen, zu kommunizieren, zu lösen, zu harmonisieren und Lebensenergie in Gruppen oder in Einzelunternehmungen zuzuführen.
            </p>

            <p>
              Unter anderem sollen auch alternative Genesungsformen erforscht, gefördert und gebildet werden.
            </p>

            <p>
              Der Verein fördert, erforscht und bildet auch die Symbiose zwischen Körper, Geist und Seele.
            </p>

            <p>
              Mitwirkung bei öffentlichen Anlässen, um die Interessen der Mitglieder zu vermitteln.
            </p>

            <p>
              Pflege freundschaftlicher Beziehungen unter den Mitgliedern, mit anderen Vereinen, Verbänden und Institutionen.
            </p>
          </div>
        </div>

        <div className="pt-2">
          <p><strong className="text-lg font-semibold text-slate-900 block border-b border-slate-100 pb-1 mb-2">Organschaftliche Vertreter:</strong></p>
          <ul className="list-disc list-inside space-y-1 text-slate-700 pl-1">
            <li>Eveline Höllerer, Vereinspräsidentin</li>
            <li>Josef Höllerer, Vereinsviezepräsident</li>
          </ul>
        </div>

        <div className="mt-8 p-6 bg-indigo-50/50 rounded-2xl border border-indigo-100/80 space-y-3">
          <h3 className="text-lg font-bold text-slate-900">Kontakt & Erreichbarkeit</h3>
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 text-sm text-slate-700">
            <p className="sm:col-span-2"><strong className="font-semibold text-slate-900">Postanschrift:</strong> Mottingeramt 8/2, 3532 Rastenfeld</p>
            <p>
              <strong className="font-semibold text-slate-900">E-Mail:</strong>{' '}
              <a href="mailto:verein.linmezis@gmx.at" className="text-indigo-600 hover:text-indigo-800 underline underline-offset-4 transition-colors">
                verein.linmezis@gmx.at
              </a>
            </p>
            <p><strong className="font-semibold text-slate-900">Telefon:</strong> <a href="tel:+436767484312" className="hover:text-slate-900 transition-colors">+43 676 7484312</a></p>
          </div>
        </div>
      </section>
    </main>
  );
}