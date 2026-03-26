import React from 'react';

interface FooterProps {
  className?: string;
}

const Footer: React.FC<FooterProps> = ({ className = "" }) => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={`mt-20 border-t border-fg/10 py-12 ${className}`}>
      <div className="max-w-5xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-6">
        
        {/* Brand & Version */}
        <div className="text-center md:text-left">
          <h2 className="text-xl font-bold text-primary mb-1">Verein Linmezis</h2>
          <p className="text-fg/60 text-sm">
            &copy; {currentYear} Eveline Höllerer • <span className="font-mono">V1.1</span>
          </p>
        </div>

        {/* Navigation Links */}
        <nav className="flex flex-wrap justify-center gap-x-8 gap-y-2 text-sm font-medium text-fg/80">
          <a href="#" className="hover:text-secondary transition-colors">Facebook</a>
          <a href="#" className="hover:text-secondary transition-colors">Telephon: +43 660 123 4567</a>
          <a href="/cv" className="hover:text-secondary transition-colors">About</a>
        </nav>

      </div>
    </footer>
  );
};

export default Footer;