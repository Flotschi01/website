
//import { useEffect, useState, useRef } from "react";
import Hero from '../components/Hero';


export default function Home() {
  return (
    <div className="bg-bg text-fg min-h-screen">
      <Hero />
      {/* --- SECTION 2: FEATURES (Visualizing primary/secondary grid) --- */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {[1, 2, 3].map((i) => (
            <div key={i} className="group p-8 rounded-3xl bg-fg/5 border border-fg/10 hover:border-primary/50 transition">
              <div className={`w-12 h-12 rounded-lg mb-6 flex items-center justify-center ${i === 2 ? 'bg-secondary' : 'bg-primary'}`}>
                <div className="w-6 h-6 bg-bg rounded-sm" />
              </div>
              <h3 className="text-2xl font-bold mb-4">Feature Segment {i}</h3>
              <p className="text-fg/60 leading-relaxed">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut aliquid scire se gaudeant? 
                Hoc est non modo cor non habere, sed ne palatum quidem.
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* --- SECTION 3: BENTO BOX DISPLAY --- */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold mb-12 text-center">Platform Showcase</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 auto-rows-[300px]">
          <div className="md:col-span-2 bg-primary/20 rounded-3xl border border-primary/30 p-8 flex flex-col justify-end">
            <h4 className="text-primary text-2xl font-bold">Integrated Logic</h4>
            <p className="text-fg/80">Lorem ipsum dolor sit amet consectetur.</p>
          </div>
          <div className="bg-secondary/20 rounded-3xl border border-secondary/30 p-8">
            <div className="h-full w-full bg-secondary/20 animate-pulse rounded-xl" />
          </div>
          <div className="bg-fg/5 rounded-3xl border border-fg/10 p-8">
             <span className="text-4xl font-black text-fg/20">01</span>
          </div>
          <div className="bg-fg/5 rounded-3xl border border-fg/10 p-8">
             <span className="text-4xl font-black text-fg/20">02</span>
          </div>
          <div className="md:col-span-3 bg-gradient-to-r from-primary to-secondary rounded-3xl p-1 flex items-center">
            <div className="bg-bg w-full h-full rounded-[22px] p-8 flex items-center justify-between">
               <h3 className="text-3xl font-bold">The Hybrid Experience</h3>
               <button className="bg-fg text-bg px-6 py-2 rounded-lg font-bold">Explore</button>
            </div>
          </div>
        </div>
      </section>

      {/* --- SECTION 4: STATS (The "Big Number" Showcase) --- */}
      <section className="bg-primary py-20 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div>
            <div className="text-5xl font-black text-bg">99%</div>
            <div className="text-bg/70 uppercase tracking-widest text-xs font-bold mt-2">Uptime</div>
          </div>
          <div>
            <div className="text-5xl font-black text-bg">250k</div>
            <div className="text-bg/70 uppercase tracking-widest text-xs font-bold mt-2">Users</div>
          </div>
          <div>
            <div className="text-5xl font-black text-bg">12ms</div>
            <div className="text-bg/70 uppercase tracking-widest text-xs font-bold mt-2">Latency</div>
          </div>
          <div>
            <div className="text-5xl font-black text-bg">Free</div>
            <div className="text-bg/70 uppercase tracking-widest text-xs font-bold mt-2">Open Source</div>
          </div>
        </div>
      </section>

      {/* --- SECTION 5: CONTENT HEAVY LOREM --- */}
      <section className="py-24 px-6 max-w-4xl mx-auto">
        <h2 className="text-4xl font-bold mb-8">Detailed Philosophy</h2>
        <div className="space-y-6 text-lg text-fg/70 leading-loose">
          <p>
            <span className="text-primary font-bold">Lorem ipsum dolor sit amet</span>, consectetur adipiscing elit. 
            Primum Theophrasti, Strato, physicum se voluit; in quo etsi est 
            multum admodum fortunae, tamen est velit.
          </p>
          <blockquote className="border-l-4 border-secondary pl-6 py-2 italic text-fg">
            "Hoc est non modo cor non habere, sed ne palatum quidem. Non enim hanc 
            solitudinem intellegere possumus."
          </blockquote>
          <p>
            Quid ad utilitatem tantae pecuniae? Videsne, ut quibus summa est in 
            voluptate, hi cum solitudine aliquid etiam velle videantur? 
            An vero displicuit ea, quae secundum naturam sunt?
          </p>
        </div>
      </section>
    </div>
  );
};
