import React, { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { Menu, X, ArrowRight, ShieldCheck } from 'lucide-react';
import Button from './Button';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 15);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile drawer on route change
  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Services', path: '/services' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' }
  ];

  return (
    <header className={`sticky top-0 z-50 transition-all duration-200 ${
      isScrolled
        ? 'bg-white/90 backdrop-blur-md border-b border-brand-border/80 shadow-sm py-3'
        : 'bg-white/70 backdrop-blur-sm border-b border-brand-border/40 py-4'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Logo & Region Badge */}
          <Link to="/" className="flex items-center gap-2.5 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-red rounded-md">
            <img
              src="/ethixweb-logo-text.webp"
              alt="Ethixweb Logo"
              width="180"
              height="28"
              className="h-7 sm:h-8 w-auto object-contain transition-transform duration-200 group-hover:scale-[1.02]"
            />
            <span className="hidden sm:inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-bold tracking-widest uppercase bg-brand-redLight text-brand-red border border-red-200">
              India
            </span>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                className={({ isActive }) =>
                  `transition-colors duration-150 py-1 border-b-2 ${
                    isActive
                      ? 'border-brand-red text-brand-red font-semibold'
                      : 'border-transparent text-neutral-600 hover:text-brand-black hover:border-neutral-300'
                  }`
                }
              >
                {link.name}
              </NavLink>
            ))}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center gap-3">
            <Link
              to="/admin"
              className="inline-flex items-center gap-1.5 text-xs text-neutral-500 hover:text-brand-black px-2.5 py-1.5 rounded-md hover:bg-neutral-100 transition-colors"
              title="Admin Portal"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-neutral-400 group-hover:text-brand-red" />
              <span>Admin</span>
            </Link>
            
            <Button
              to="/contact"
              variant="primary"
              size="sm"
              icon={ArrowRight}
              iconPosition="right"
            >
              Start a Project
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-2 md:hidden">
            <button
              type="button"
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-lg text-neutral-700 hover:bg-neutral-100 hover:text-brand-red focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-red"
              aria-label="Toggle Navigation Menu"
              aria-expanded={isOpen}
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Dropdown Drawer */}
      {isOpen && (
        <div className="md:hidden fixed inset-x-0 top-[60px] bg-white border-b border-brand-border shadow-xl px-5 pt-4 pb-6 transition-all duration-200">
          <nav className="flex flex-col gap-3">
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                className={({ isActive }) =>
                  `text-base py-2.5 px-3 rounded-lg font-medium transition-colors ${
                    isActive
                      ? 'bg-brand-redLight text-brand-red font-semibold'
                      : 'text-neutral-700 hover:bg-neutral-50 hover:text-brand-black'
                  }`
                }
              >
                {link.name}
              </NavLink>
            ))}

            <div className="pt-3 border-t border-neutral-100 flex flex-col gap-2.5">
              <Button
                to="/contact"
                variant="primary"
                size="md"
                className="w-full justify-center"
                icon={ArrowRight}
                iconPosition="right"
              >
                Start a Project
              </Button>
              <Link
                to="/admin"
                className="inline-flex items-center justify-center gap-2 py-2 text-xs text-neutral-500 hover:text-neutral-900"
              >
                <ShieldCheck className="w-4 h-4 text-neutral-400" />
                <span>Admin Lead Portal</span>
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
