import React from 'react';
import { Link } from 'react-router-dom';
import { Loader2 } from 'lucide-react';

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  to,
  href,
  onClick,
  disabled = false,
  isLoading = false,
  className = '',
  type = 'button',
  icon: Icon,
  iconPosition = 'left'
}) {
  const baseClasses = 'inline-flex items-center justify-center font-medium rounded-lg transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed select-none';

  const variantClasses = {
    primary: 'bg-brand-red text-white hover:bg-brand-redHover focus-visible:ring-brand-red shadow-sm hover:shadow-red-sm active:translate-y-[1px]',
    secondary: 'bg-brand-black text-white hover:bg-black/85 focus-visible:ring-brand-black shadow-sm active:translate-y-[1px]',
    outline: 'border border-brand-border bg-white text-brand-black hover:border-brand-red hover:text-brand-red focus-visible:ring-brand-red',
    ghost: 'text-brand-black hover:bg-neutral-100 hover:text-brand-red focus-visible:ring-brand-red',
    white: 'bg-white text-brand-black hover:bg-neutral-100 focus-visible:ring-brand-red shadow-sm'
  };

  const sizeClasses = {
    sm: 'text-xs px-3.5 py-1.5 gap-1.5',
    md: 'text-sm px-5 py-2.5 gap-2',
    lg: 'text-base px-6 py-3 gap-2.5'
  };

  const combinedClasses = `${baseClasses} ${variantClasses[variant] || variantClasses.primary} ${sizeClasses[size] || sizeClasses.md} ${className}`;

  const content = (
    <>
      {isLoading ? (
        <Loader2 className="w-4 h-4 animate-spin" />
      ) : Icon && iconPosition === 'left' ? (
        <Icon className="w-4 h-4" />
      ) : null}
      <span>{children}</span>
      {!isLoading && Icon && iconPosition === 'right' ? (
        <Icon className="w-4 h-4" />
      ) : null}
    </>
  );

  if (to) {
    return (
      <Link to={to} className={combinedClasses}>
        {content}
      </Link>
    );
  }

  if (href) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={combinedClasses}>
        {content}
      </a>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || isLoading}
      className={combinedClasses}
    >
      {content}
    </button>
  );
}
