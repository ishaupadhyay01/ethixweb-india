import React from 'react';
import { Link } from 'react-router-dom';
import { Home, ArrowLeft } from 'lucide-react';
import Button from '../components/Button';

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 py-20 text-center">
      <div className="max-w-md mx-auto">
        <span className="text-6xl sm:text-7xl font-black text-brand-red font-mono block mb-4">
          404
        </span>
        <h1 className="text-2xl sm:text-3xl font-black text-brand-black mb-3">
          Page Not Found
        </h1>
        <p className="text-sm text-neutral-600 leading-relaxed mb-8">
          The requested route or resource does not exist or may have been repositioned. Please return to our home page or explore our services catalog.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Button to="/" variant="primary" size="md" icon={Home}>
            Return Home
          </Button>
          <Button to="/services" variant="outline" size="md">
            View Services
          </Button>
        </div>
      </div>
    </div>
  );
}
