import React, { useState, useEffect, lazy, Suspense } from 'react';
import { fetchCurrentAdmin, getStoredAdmin } from '../services/authService';
import { Loader2 } from 'lucide-react';

const AdminLogin = lazy(() => import('../pages/AdminLogin'));

export default function ProtectedRoute({ children }) {
  const [admin, setAdmin] = useState(getStoredAdmin());
  const [loading, setLoading] = useState(true);

  const checkAuth = async () => {
    try {
      const res = await fetchCurrentAdmin();
      if (res.success && res.admin) {
        setAdmin(res.admin);
        localStorage.setItem('ethixweb_admin_user', JSON.stringify(res.admin));
      } else {
        setAdmin(null);
        localStorage.removeItem('ethixweb_admin_user');
      }
    } catch {
      setAdmin(null);
      localStorage.removeItem('ethixweb_admin_user');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-brand-black flex flex-col items-center justify-center text-white">
        <Loader2 className="w-8 h-8 text-brand-red animate-spin mb-4" />
        <p className="text-sm font-mono text-neutral-400">Verifying administrator credentials...</p>
      </div>
    );
  }

  if (!admin) {
    return (
      <Suspense fallback={
        <div className="min-h-screen bg-brand-black flex items-center justify-center text-white">
          <Loader2 className="w-8 h-8 text-brand-red animate-spin" />
        </div>
      }>
        <AdminLogin onLoginSuccess={(adminUser) => setAdmin(adminUser)} />
      </Suspense>
    );
  }

  // Pass admin and refresh trigger to children if function or render directly
  return typeof children === 'function' ? children({ admin, onLogout: () => setAdmin(null) }) : children;
}
