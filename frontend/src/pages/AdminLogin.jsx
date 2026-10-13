import React, { useState } from 'react';
import { ShieldCheck, Lock, Mail, AlertCircle, Loader2, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import Button from '../components/Button';
import { adminLogin } from '../services/authService';

export default function AdminLogin({ onLoginSuccess }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');

    if (!email.trim() || !password) {
      setErrorMessage('Please provide both admin email and password.');
      return;
    }

    setIsSubmitting(true);

    try {
      const res = await adminLogin(email.trim(), password);
      if (res.success && res.admin) {
        if (onLoginSuccess) {
          onLoginSuccess(res.admin);
        } else {
          window.location.reload();
        }
      } else {
        setErrorMessage(res.message || 'Authentication failed. Please verify credentials.');
      }
    } catch (err) {
      setErrorMessage(err.message || 'Unable to connect to the authentication service.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleFillDemoCredentials = () => {
    setEmail('admin@ethixweb.in');
    setPassword('EthixwebIndia@2026');
    setErrorMessage('');
  };

  return (
    <div className="min-h-screen bg-brand-black flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8 text-white relative">
      {/* Spiderweb overlay */}
      <div 
        className="pointer-events-none absolute inset-0 opacity-[0.03] select-none"
        style={{ backgroundImage: 'url(/spiderweb.svg)', backgroundPosition: 'center', backgroundSize: 'cover' }}
      />

      <div className="sm:mx-auto sm:w-full sm:max-w-md relative z-10">
        
        {/* Back Link */}
        <div className="mb-6">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-xs text-neutral-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Return to Public Website</span>
          </Link>
        </div>

        {/* Brand Icon & Heading */}
        <div className="text-center">
          <div className="w-14 h-14 bg-neutral-900 border border-neutral-800 rounded-2xl flex items-center justify-center mx-auto mb-4 text-brand-red shadow-red-sm">
            <ShieldCheck className="w-7 h-7" />
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            Admin Lead Portal
          </h2>
          <p className="mt-2 text-xs text-neutral-400">
            Authorized Ethixweb staff access only &bull; Encrypted session
          </p>
        </div>

        {/* Login Box */}
        <div className="mt-8 bg-neutral-900/90 border border-neutral-800 rounded-2xl p-6 sm:p-8 shadow-2xl backdrop-blur-md">
          
          {errorMessage && (
            <div className="mb-6 p-3.5 rounded-xl bg-red-950/60 border border-red-800/80 text-red-200 text-xs flex items-start gap-2.5">
              <AlertCircle className="w-4 h-4 text-brand-red shrink-0 mt-0.5" />
              <span>{errorMessage}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-neutral-400 mb-1.5">
                Staff Email
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-neutral-500">
                  <Mail className="w-4 h-4" />
                </div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@ethixweb.in"
                  className="w-full pl-10 pr-4 py-2.5 bg-neutral-950 border border-neutral-800 rounded-lg text-sm text-white placeholder-neutral-600 focus:outline-none focus:border-brand-red focus:ring-1 focus:ring-brand-red"
                  disabled={isSubmitting}
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-neutral-400 mb-1.5">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-neutral-500">
                  <Lock className="w-4 h-4" />
                </div>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full pl-10 pr-4 py-2.5 bg-neutral-950 border border-neutral-800 rounded-lg text-sm text-white placeholder-neutral-600 focus:outline-none focus:border-brand-red focus:ring-1 focus:ring-brand-red"
                  disabled={isSubmitting}
                  required
                />
              </div>
            </div>

            <Button
              type="submit"
              variant="primary"
              size="md"
              className="w-full justify-center"
              isLoading={isSubmitting}
              disabled={isSubmitting}
            >
              Sign In to Dashboard
            </Button>
          </form>

          {/* Assessment Demo Helper Box */}
          <div className="mt-6 pt-6 border-t border-neutral-800/80 text-center">
            <div className="bg-neutral-950 p-3.5 rounded-xl border border-neutral-800 text-left">
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-[10px] font-mono uppercase font-bold text-neutral-400">
                  Candidate Assessment Demo Account
                </span>
                <button
                  type="button"
                  onClick={handleFillDemoCredentials}
                  className="text-[11px] font-semibold text-brand-red hover:underline"
                >
                  Auto-fill &rarr;
                </button>
              </div>
              <p className="text-xs font-mono text-neutral-300">
                User: <span className="text-white">admin@ethixweb.in</span>
              </p>
              <p className="text-xs font-mono text-neutral-300">
                Pass: <span className="text-white">EthixwebIndia@2026</span>
              </p>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
