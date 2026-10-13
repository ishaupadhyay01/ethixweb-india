import React from 'react';

export default function SectionHeading({
  badge,
  title,
  subtitle,
  align = 'center',
  dark = false,
  className = ''
}) {
  const isCenter = align === 'center';

  return (
    <div className={`mb-12 md:mb-16 ${isCenter ? 'text-center max-w-3xl mx-auto' : 'max-w-2xl'} ${className}`}>
      {badge && (
        <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold tracking-wider uppercase mb-4 ${
          dark
            ? 'bg-white/10 text-brand-redLight border border-white/15'
            : 'bg-brand-redLight text-brand-red border border-red-100'
        }`}>
          <span className="w-1.5 h-1.5 rounded-full bg-brand-red animate-pulse" />
          {badge}
        </div>
      )}

      {title && (
        <h2 className={`text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight leading-tight ${
          dark ? 'text-white' : 'text-brand-black'
        }`}>
          {title}
        </h2>
      )}

      {subtitle && (
        <p className={`mt-4 text-base sm:text-lg leading-relaxed ${
          dark ? 'text-neutral-400' : 'text-neutral-600'
        }`}>
          {subtitle}
        </p>
      )}
    </div>
  );
}
