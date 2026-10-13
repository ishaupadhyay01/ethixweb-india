import { apiRequest } from './api';

export const adminLogin = async (email, password) => {
  const result = await apiRequest('/api/auth/login', {
    method: 'POST',
    body: JSON.stringify({ email, password })
  });

  if (result.token) {
    localStorage.setItem('ethixweb_admin_token', result.token);
  }
  if (result.admin) {
    localStorage.setItem('ethixweb_admin_user', JSON.stringify(result.admin));
  }

  return result;
};

export const adminLogout = async () => {
  try {
    await apiRequest('/api/auth/logout', { method: 'POST' });
  } finally {
    localStorage.removeItem('ethixweb_admin_token');
    localStorage.removeItem('ethixweb_admin_user');
  }
};

export const fetchCurrentAdmin = async () => {
  return await apiRequest('/api/auth/me', { method: 'GET' });
};

export const getStoredAdmin = () => {
  try {
    const raw = localStorage.getItem('ethixweb_admin_user');
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
};
