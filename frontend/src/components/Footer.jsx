import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Clock, Shield, Star, ExternalLink, ArrowUpRight } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-brand-black text-white pt-16 pb-12 border-t border-neutral-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8 pb-12 border-b border-neutral-800">
          
          {/* Brand Info */}
          <div className="lg:col-span-2">
            <Link to="/" className="inline-block group mb-4">
              <div className="flex items-center gap-2">
                <img
                  src="/ethixweb-logo-text.webp"
                  alt="Ethixweb"
                  width="190"
                  height="30"
                  className="h-8 w-auto brightness-0 invert object-contain"
                />
                <span className="text-[10px] uppercase font-bold tracking-widest px-1.5 py-0.5 rounded bg-brand-red text-white">
                  IN
                </span>
              </div>
            </Link>

            <p className="text-neutral-400 text-sm max-w-sm leading-relaxed mb-6">
              A high-precision digital engineering and growth studio reimagined for ambitious Indian businesses, high-growth D2C brands, and modern enterprises.
            </p>

            {/* Trustpilot Proof Badge */}
            <a
              href="https://www.trustpilot.com/review/ethixweb.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 bg-neutral-900 border border-neutral-800 rounded-lg px-3.5 py-2 hover:border-neutral-700 transition-colors group"
            >
              <div className="flex items-center text-emerald-400 gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-emerald-400" />
                ))}
              </div>
              <span className="text-xs text-neutral-300 group-hover:text-white">
                Verified Client Reviews on Trustpilot
              </span>
              <ArrowUpRight className="w-3.5 h-3.5 text-neutral-500 group-hover:text-neutral-300" />
            </a>
          </div>

          {/* Capabilities */}
          <div>
            <h3 className="text-xs font-semibold tracking-wider uppercase text-neutral-400 mb-4">
              Core Capabilities
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/services" className="text-neutral-300 hover:text-brand-red transition-colors">
                  Web Development
                </Link>
              </li>
              <li>
                <Link to="/services" className="text-neutral-300 hover:text-brand-red transition-colors">
                  E-commerce & D2C
                </Link>
              </li>
              <li>
                <Link to="/services" className="text-neutral-300 hover:text-brand-red transition-colors">
                  AI Agents & Workflows
                </Link>
              </li>
              <li>
                <Link to="/services" className="text-neutral-300 hover:text-brand-red transition-colors">
                  SEO & Search Authority
                </Link>
              </li>
              <li>
                <Link to="/services" className="text-neutral-300 hover:text-brand-red transition-colors">
                  Performance Ads
                </Link>
              </li>
              <li>
                <Link to="/services" className="text-neutral-300 hover:text-brand-red transition-colors">
                  Ops & SLA Maintenance
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-xs font-semibold tracking-wider uppercase text-neutral-400 mb-4">
              Navigation
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/about" className="text-neutral-300 hover:text-brand-red transition-colors">
                  About Ethixweb
                </Link>
              </li>
              <li>
                <Link to="/services" className="text-neutral-300 hover:text-brand-red transition-colors">
                  All Services
                </Link>
              </li>
              <li>
                <Link to="/#work" className="text-neutral-300 hover:text-brand-red transition-colors">
                  Featured Work
                </Link>
              </li>
              <li>
                <Link to="/#process" className="text-neutral-300 hover:text-brand-red transition-colors">
                  Engineering Process
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-neutral-300 hover:text-brand-red transition-colors">
                  Start a Project
                </Link>
              </li>
              <li>
                <Link to="/admin" className="text-neutral-400 hover:text-white transition-colors inline-flex items-center gap-1.5 text-xs">
                  <Shield className="w-3 h-3 text-brand-red" />
                  <span>Admin Portal</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* India Operations Contact */}
          <div>
            <h3 className="text-xs font-semibold tracking-wider uppercase text-neutral-400 mb-4">
              Direct Contact
            </h3>
            <div className="space-y-3 text-sm text-neutral-300">
              <a
                href="mailto:info@ethixweb.com"
                className="flex items-center gap-2 hover:text-brand-red transition-colors group"
              >
                <Mail className="w-4 h-4 text-brand-red" />
                <span className="font-mono text-xs">info@ethixweb.com</span>
              </a>

              <div className="flex items-start gap-2 text-xs text-neutral-400">
                <Clock className="w-4 h-4 text-neutral-500 mt-0.5" />
                <div>
                  <p className="font-medium text-neutral-300">Mon – Fri IST</p>
                  <p>9:00 AM – 6:00 PM</p>
                </div>
              </div>

              <div className="pt-2 text-xs text-neutral-400 border-t border-neutral-800/80">
                <p className="font-medium text-neutral-300">Global Hubs</p>
                <p>Bengaluru &bull; Seattle &bull; London</p>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-500">
          <p>© {new Date().getFullYear()} Ethixweb. Redesigned for Indian Businesses. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <span className="text-neutral-400">Production-Ready Full Stack Architecture</span>
            <Link to="/admin" className="hover:text-neutral-300 transition-colors">
              Staff Portal
            </Link>
          </div>
        </div>

      </div>
    </footer>
  );
}
