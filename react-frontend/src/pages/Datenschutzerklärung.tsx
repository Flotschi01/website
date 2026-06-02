    export default function Datenschutz() {
  return (
    <main className="max-w-3xl mx-auto px-4 py-12 text-slate-800 antialiased">
      <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 mb-2">Datenschutzerklärung</h1>
      <p className="text-sm text-slate-500 mb-8 border-b border-slate-200 pb-4">
        Informationen zur Verarbeitung personenbezogener Daten gemäß DSGVO
      </p>

      <section className="space-y-8">
        {/* Allgemeine Hinweise */}
        <div className="space-y-3 text-slate-600 leading-relaxed">
          <p>
            Die Betreiber dieser Website nehmen den Schutz Ihrer persönlichen Daten sehr ernst. Wir behandeln Ihre 
            personenbezogenen Daten vertraulich und entsprechend den gesetzlichen Datenschutzvorschriften sowie 
            dieser Datenschutzerklärung.
          </p>
          <p>
            Wenn Sie diese Website benutzen, werden verschiedene personenbezogene Daten erhoben. Diese 
            Datenschutzerklärung erläutert, welche Daten wir erheben und wofür wir sie nutzen.
          </p>
        </div>

        {/* Verantwortliche Stelle */}
        <div>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Verantwortliche Stelle</h2>
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 bg-slate-50 p-4 rounded-xl border border-slate-100">
            <p className="sm:col-span-2"><strong className="font-semibold text-slate-900">Vereinsname:</strong> Verein Faszination Tierwelt Linmezis</p>
            <p className="sm:col-span-2"><strong className="font-semibold text-slate-900">Vertreten durch die Vereinspräsidentin:</strong> Eveline Höllerer</p>
            <p className="sm:col-span-2"><strong className="font-semibold text-slate-900">Vereinssitz:</strong> Mottingeramt 8, 3532 Rastenfeld</p>
          </div>
        </div>

        {/* Datenerfassung */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-slate-900 border-b border-slate-100 pb-1">Datenerfassung auf unserer Website</h2>
          
          <div className="space-y-3">
            <h3 className="text-lg font-semibold text-slate-900">Server-Log-Files</h3>
            <p className="text-slate-600 leading-relaxed">
              Der Provider der Seiten erhebt und speichert automatisch Informationen in sogenannten Server-Log-Files, 
              die Ihr Browser automatisch an uns übermittelt. Dies sind:
            </p>
            <ul className="list-disc list-inside space-y-1 text-slate-700 pl-1">
              <li>Browsertyp und Browserversion</li>
              <li>Verwendetes Betriebssystem</li>
              <li>Referrer URL (die zuvor besuchte Seite)</li>
              <li>Hostname des zugreifenden Rechners (IP-Adresse)</li>
              <li>Uhrzeit der Serveranfrage</li>
            </ul>
            <p className="text-slate-600 leading-relaxed text-sm italic">
              Grundlage für die Datenverarbeitung ist Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse an der technisch fehlerfreien Darstellung und Optimierung der Website).
            </p>
          </div>

          <div className="space-y-3 pt-2">
            <h3 className="text-lg font-semibold text-slate-900">Kontakt per E-Mail</h3>
            <p className="text-slate-600 leading-relaxed">
              Wenn Sie uns per E-Mail eine Anfrage zukommen lassen, werden Ihre Angaben inklusive der von Ihnen dort 
              angegebenen Kontaktdaten zwecks Bearbeitung der Anfrage und für den Fall von Anschlussfragen bei uns 
              gespeichert. Diese Daten geben wir nicht ohne Ihre Einwilligung weiter.
            </p>
            <p className="text-slate-600 leading-relaxed text-sm italic">
              Die Verarbeitung dieser Daten erfolgt auf Grundlage von Art. 6 Abs. 1 lit. b DSGVO, sofern Ihre Anfrage mit 
              der Erfüllung eines Vertrags zusammenhängt (z. B. Vereinsmitgliedschaft) oder zur Durchführung vorvertraglicher 
              Maßnahmen erforderlich ist. In allen übrigen Fällen beruht die Verarbeitung auf unserem berechtigten Interesse 
              an der effektiven Bearbeitung der Anfragen (Art. 6 Abs. 1 lit. f DSGVO).
            </p>
          </div>
        </div>

        {/* Ihre Rechte */}
        <div className="pt-2 space-y-3">
          <h2 className="text-2xl font-bold text-slate-900 border-b border-slate-100 pb-1">Ihre Rechte</h2>
          <p className="text-slate-600 leading-relaxed">
            Sie haben im Rahmen der geltenden gesetzlichen Bestimmungen jederzeit das Recht auf:
          </p>
          <ul className="list-disc list-outside space-y-2 text-slate-700 pl-5">
            <li><strong className="text-slate-900 font-semibold">Auskunft (Art. 15 DSGVO):</strong> Erhalt von Informationen über Ihre gespeicherten personenbezogenen Daten.</li>
            <li><strong className="text-slate-900 font-semibold">Berichtigung (Art. 16 DSGVO):</strong> Unverzügliche Korrektur unrichtiger Daten.</li>
            <li><strong className="text-slate-900 font-semibold">Löschung (Art. 17 DSGVO):</strong> Löschung Ihrer bei uns gespeicherten Daten, sofern keine gesetzlichen Pflichten entgegenstehen.</li>
            <li><strong className="text-slate-900 font-semibold">Widerspruch (Art. 21 DSGVO):</strong> Widerspruch gegen die Verarbeitung Ihrer Daten aus berechtigtem Interesse.</li>
            <li><strong className="text-slate-900 font-semibold">Beschwerderecht:</strong> Eine Beschwerde bei der zuständigen Datenschutz-Aufsichtsbehörde einzulegen.</li>
          </ul>
        </div>

        {/* Kontakt-Box */}
        <div className="mt-8 p-6 bg-indigo-50/50 rounded-2xl border border-indigo-100/80 space-y-3">
          <h3 className="text-lg font-bold text-slate-900">Fragen zum Datenschutz</h3>
          <p className="text-sm text-slate-600 mb-2">
            Bei Fragen zur Erhebung, Verarbeitung oder Nutzung Ihrer personenbezogenen Daten wenden Sie sich bitte direkt an uns:
          </p>
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