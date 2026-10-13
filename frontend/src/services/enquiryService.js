import { apiRequest } from './api';

export const submitEnquiry = async (formData) => {
  return await apiRequest('/api/enquiries', {
    method: 'POST',
    body: JSON.stringify(formData)
  });
};
