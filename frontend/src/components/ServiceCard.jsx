import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle2 } from 'lucide-react';

export default function ServiceCard({
  icon: Icon,
  title,
  category,
  description,
  deliverables = [],
  link = '/services',
  highlight = false
}) {
  return (
    <div className={`premium-card rounded-2xl p-6 sm:p-8 flex flex-col justify-between group relative overflow-hidden transition-all duration-300 ${
      highlight ? 'ring-2 ring-brand-red/20 shadow-md' : ''
    }`}>
      {/* Top Accent Strip on hover */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-brand-red to-brand-redDark opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      <div>
        <div className="flex items-center justify-between mb-6">
          <div className="w-12 h-12 rounded-xl bg-brand-redLight flex items-center justify-center text-brand-red group-hover:scale-105 transition-transform duration-200">
            {Icon && <Icon className="w-6 h-6" />}
          </div>
          {category && (
            <span className="text-[11px] font-bold uppercase tracking-wider text-neutral-400 bg-neutral-100 px-2.5 py-1 rounded-full">
              {category}
            </span>
          )}
        </div>

        <h3 className="text-xl font-bold text-brand-black mb-3 group-hover:text-brand-red transition-colors">
          {title}
        </h3>

        <p className="text-sm text-neutral-600 leading-relaxed mb-6">
          {description}
        </p>

        {deliverables.length > 0 && (
          <div className="pt-4 border-t border-neutral-100 mb-6">
            <p className="text-xs font-semibold uppercase tracking-wider text-neutral-400 mb-3">
              Key Deliverables
            </p>
            <ul className="space-y-2">
              {deliverables.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2 text-xs text-neutral-600">
                  <CheckCircle2 className="w-3.5 h-3.5 text-brand-red shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      <div className="pt-4 mt-auto">
        <Link
          to={link}
          className="inline-flex items-center gap-2 text-xs font-semibold text-brand-black group-hover:text-brand-red transition-colors"
        >
          <span>Explore Service Details</span>
          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
    </div>
  );
}
