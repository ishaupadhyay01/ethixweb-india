const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

/**
 * Universal fetch wrapper supporting HTTP-only cookies and Authorization header fallback
 */
export async function apiRequest(endpoint, options = {}) {
  const url = `${API_BASE_URL}${endpoint}`;
  
  const headers = {
    'Content-Type': 'application/json',
    ...(options.headers || {})
  };

  // Optional token fallback from localStorage if present
  const storedToken = localStorage.getItem('ethixweb_admin_token');
  if (storedToken && !headers['Authorization']) {
    headers['Authorization'] = `Bearer ${storedToken}`;
  }

  const config = {
    ...options,
    headers,
    credentials: 'include' // Sends HTTP-only cookies cross-origin when configured
  };

  try {
    const response = await fetch(url, config);
    const data = await response.json().catch(() => ({}));

    if (!response.ok) {
      const error = new Error(data.message || `Request failed with status ${response.status}`);
      error.status = response.status;
      error.data = data;
      throw error;
    }

    return data;
  } catch (error) {
    // Distinguish network failures
    if (!error.status) {
      error.message = 'Unable to connect to the Ethixweb server. Please verify your connection or try again shortly.';
    }
    throw error;
  }
}

export default {
  apiRequest,
  API_BASE_URL
};
