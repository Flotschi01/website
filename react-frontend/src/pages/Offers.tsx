
export default function Offers() {
  return (
    <div className="bg-bg text-fg min-h-screen flex flex-col justify-between">
      {/* --- HERO / INTRO SECTION --- */}
      <header className="pt-24 pb-12 px-6 max-w-7xl mx-auto text-center">
        <span className="text-primary uppercase tracking-widest text-xs font-bold bg-primary/10 px-3 py-1 rounded-full">
          Möglichkeiten & Angebote
        </span>
        <h1 className="text-4xl md:text-6xl font-black mt-4 tracking-tight max-w-3xl mx-auto">
          Das bieten wir:
        </h1>
      </header>

      {/* --- MAIN BENTO CONTENT SECTION --- */}
      <main className="flex-grow px-6 max-w-6xl mx-auto w-full mb-24">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          
          {/* Große Fokus-Karte: Möglichkeiten & Forschung */}
          <div className="md:col-span-8 rounded-3xl bg-fg/5 border border-fg/10 p-8 md:p-12 flex flex-col justify-between group hover:border-primary/30 transition duration-300">
            <div>
              <h2 className="text-xs uppercase tracking-widest font-black text-primary mb-6">
                Möglichkeiten:
              </h2>
              <div className="space-y-6 text-lg md:text-xl font-medium leading-relaxed">
                <div className="flex items-start gap-4">
                  <span className="text-primary font-bold text-2xl leading-none mt-[-2px]">◦</span>
                  <p className="text-fg/90">
                    Forschungsprojekt Tiergespräch (Sterbebegleitung, Regenbogen-Tiere, vermisste Tiere)
                  </p>
                </div>
                <div className="flex items-start gap-4">
                  <span className="text-primary font-bold text-2xl leading-none mt-[-2px]">•</span>
                  <p className="text-fg/90">
                    Forschungsprojekt feinstoffliche und feststoffliche Energien
                  </p>
                </div>
                <div className="flex items-start gap-4">
                  <span className="text-primary font-bold text-2xl leading-none mt-[-2px]">◦</span>
                  <p className="text-fg/90">
                    Forschungsprojekt alternative Genesungstormen Workshops
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Kompakte Highlight-Karte: Fördermitgliedschaft */}
          <div className="md:col-span-4 rounded-3xl bg-primary/5 border border-primary/20 p-8 md:p-10 flex flex-col justify-between hover:bg-primary/10 transition duration-300">
            <div>
              <span className="text-xs uppercase tracking-widest font-bold text-primary block mb-4">
                Gemeinschaft
              </span>
              <h3 className="text-xl font-bold tracking-tight text-fg leading-snug">
                Fördermitgliedschaft: Jeder ist herzlich eingeladen, Fördermitglied zu werden !
              </h3>
            </div>
            
            <div className="mt-12 pt-6 border-t border-primary/10">
              <span className="text-xs uppercase tracking-wider text-fg/50 block mb-1">
                Beitrag
              </span>
              <div className="text-2xl font-black text-primary tracking-tight">
                Fördermitgliedsbeitrag 15€/Jahr
              </div>
            </div>
          </div>

          {/* Breite Call-to-Action-Karte: Einladung & Kontakt */}
          <div className="md:col-span-12 rounded-3xl bg-fg text-bg p-8 md:p-12 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8 mt-2">
            <div className="max-w-2xl">
              <p className="text-xl md:text-2xl font-bold leading-relaxed tracking-tight">
                Wir freuen uns, dich bald im Verein Faszination Tierwelt Linmezi s begrüßen zu dürfen!
              </p>
            </div>
            
            <div className="w-full lg:w-auto shrink-0 bg-bg/10 p-6 rounded-2xl border border-bg/10 space-y-3 min-w-[280px]">
              <div className="text-xs uppercase tracking-widest font-mono text-bg/50 font-bold mb-2">
                Direkter Kontakt
              </div>
              <div>
                <span className="block text-[10px] uppercase tracking-wider opacity-60">E-Mail</span>
                <a href="mailto:verein.linmezis@gmx.at" className="font-bold text-base underline hover:text-primary transition duration-200">
                  verein.linmezis@gmx.at
                </a>
              </div>
              <div className="pt-1">
                <span className="block text-[10px] uppercase tracking-wider opacity-60">Telefon</span>
                <a href="tel:06767484312" className="font-bold text-base underline hover:text-primary transition duration-200">
                  0676/7484312
                </a>
              </div>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}