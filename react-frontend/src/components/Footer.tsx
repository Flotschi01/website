import React from 'react';
import { Facebook, Instagram, Phone, Mail, MapPin } from 'lucide-react';

interface FooterProps {
  className?: string;
}

const Footer: React.FC<FooterProps> = ({ className = "" }) => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={`border-t border-fg/10 py-12 ${className} bg-[var(--color-nav)]`} >
      <div className="max-w-5xl mx-auto px-4 flex flex-col md:flex-row justify-between items-start gap-8">

        {/* Brand & Version */}
        <div className="text-center md:text-left w-full md:w-auto">
          <h2 className="text-xl font-bold text-primary mb-1">Verein Linmezis</h2>
          <p className="text-fg/60 text-sm">
            &copy; {currentYear} Florian Lehmerhofer  
          </p>
        </div>

        {/* Social Links (Facebook & Instagram) */}
        <div className="flex flex-col gap-4 text-sm text-fg/80 w-full md:w-auto">
          <h3 className="font-semibold text-xs uppercase tracking-wider text-fg/50">Soziale Medien</h3>
          
          {/* Facebook Link 1 */}
          <a href="https://www.facebook.com/profile.php?id=61556539628586" className="flex items-start gap-3 hover:text-secondary transition-colors group">
            <Facebook className="w-5 h-5 shrink-0 text-fg/60 group-hover:text-secondary" />
            <div>
              <p className="font-medium">Vereinspräsidentin</p>
            </div>
          </a>

          {/* Facebook Link 2 */}
          <a href="https://www.facebook.com/profile.php?id=61581485908254" className="flex items-start gap-3 hover:text-secondary transition-colors group">
            <Facebook className="w-5 h-5 shrink-0 text-fg/60 group-hover:text-secondary" />
            <div>
              <p className="font-medium">Vereinsseite</p>
            </div>
          </a>

          {/* Instagram (Icon only, no description) */}
          <a href="https://www.instagram.com/evelinehollerer/" className="flex items-center gap-3 hover:text-secondary transition-colors group pt-1" aria-label="Instagram">
            <Instagram className="w-5 h-5 text-fg/60 group-hover:text-secondary" />
            <span className="font-medium md:hidden">Instagram</span> {/* Visible on mobile for better touch targets */}
            <div>
              <p className="font-medium">Vereinspräsidentin</p>
            </div>
          </a>
        </div>

        {/* Contact Info */}
        <div className="flex flex-col gap-3 text-sm text-fg/80 w-full md:w-auto">
          <h3 className="font-semibold text-xs uppercase tracking-wider text-fg/50">Kontakt</h3>
          
          <a href="tel:+436767484312" className="flex items-center gap-3 hover:text-secondary transition-colors">
            <Phone className="w-4 h-4 text-fg/60" />
            <span>+43 676 7484312</span>
          </a>

          <a href="mailto:verein.linmezis@gmx.at" className="flex items-center gap-3 hover:text-secondary transition-colors">
            <Mail className="w-4 h-4 text-fg/60" />
            <span>verein.linmezis@gmx.at
</span>
          </a>

          <div className="flex items-start gap-3">
            <MapPin className="w-4 h-4 text-fg/60 mt-0.5 shrink-0" />
            <span>Mottingeramt 8,<br />3532 Rastenfeld</span>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;