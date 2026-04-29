import axios from 'axios';

const API_URL = 'http://localhost:5000/api/v1';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

export const productAPI = {
  getAll: () => api.get('/products'),
  create: (data) => api.post('/products', data),
  updateStock: (id, adjustment) => api.patch(`/products/${id}/stock`, { adjustment }),
  scan: (barcode) => api.patch(`/products/scan/${barcode}`)
};

export const transactionAPI = {
  getAll: () => api.get('/transactions'),
  getByProduct: (productId) => api.get(`/transactions/product/${productId}`)
};

export const alertAPI = {
  getLowStock: () => api.get('/alerts/low-stock'),
  getSummary: () => api.get('/alerts/summary')
};

export const partnerAPI = {
  getAll: () => api.get('/partners'),
  create: (data) => api.post('/partners', data),
  update: (id, data) => api.patch(`/partners/${id}`, data)
};

export default api;
