import { apiRequest } from './api';

export const getAdminStats = async () => {
  return await apiRequest('/api/admin/stats');
};

export const getAdminLeads = async ({ page = 1, limit = 10, status = '', service = '', q = '', sortBy = 'createdAt', order = 'desc' } = {}) => {
  const params = new URLSearchParams();
  if (page) params.append('page', page);
  if (limit) params.append('limit', limit);
  if (status) params.append('status', status);
  if (service) params.append('service', service);
  if (q) params.append('q', q);
  if (sortBy) params.append('sortBy', sortBy);
  if (order) params.append('order', order);

  return await apiRequest(`/api/admin/leads?${params.toString()}`);
};

export const getLeadDetails = async (id) => {
  return await apiRequest(`/api/admin/leads/${id}`);
};

export const updateLeadStatusAndNotes = async (id, { status, note }) => {
  return await apiRequest(`/api/admin/leads/${id}`, {
    method: 'PATCH',
    body: JSON.stringify({ status, note })
  });
};

export const deleteLeadRecord = async (id) => {
  return await apiRequest(`/api/admin/leads/${id}`, {
    method: 'DELETE'
  });
};
