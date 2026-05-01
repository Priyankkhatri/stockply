import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api/v1';

const api = axios.create({
  baseURL: API_URL,
  headers: { 'Content-Type': 'application/json' },
  timeout: 15000,
});

// Request interceptor - add auth token if present
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('authToken');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// Response interceptor - handle 401 globally
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token expired or invalid — clear session
      localStorage.removeItem('authToken');
      localStorage.removeItem('isLoggedIn');
      localStorage.removeItem('userRole');
      // Redirect to login (if not already there)
      if (window.location.pathname !== '/login') {
        window.location.href = '/login';
      }
    }
    console.error('API Error:', error.response?.data?.message || error.message);
    return Promise.reject(error);
  }
);

export const authAPI = {
  signup: (data) => api.post('/auth/signup', data),
  login: (data) => api.post('/auth/login', data),
  getMe: () => api.get('/auth/me'),
};

export const onboardingAPI = {
  completeShop: (data) => api.post('/onboarding/shop', data),
  completeSupplier: (data) => api.post('/onboarding/supplier', data),
  skip: () => api.post('/onboarding/skip'),
};

export const productAPI = {
  getAll: () => api.get('/products'),
  create: (data) => api.post('/products', data),
  updateStock: (id, adjustment) => api.patch(`/products/${id}/stock`, { adjustment }),
  scan: (barcode) => api.patch(`/products/scan/${barcode}`),
};

export const transactionAPI = {
  getAll: () => api.get('/transactions'),
  getByProduct: (productId) => api.get(`/transactions/product/${productId}`),
};

export const alertAPI = {
  getLowStock: () => api.get('/alerts/low-stock'),
  getSummary: () => api.get('/alerts/summary'),
};

export const partnerAPI = {
  getAll: () => api.get('/partners'),
  create: (data) => api.post('/partners', data),
  update: (id, data) => api.patch(`/partners/${id}`, data),
  delete: (id) => api.delete(`/partners/${id}`),
};

export const orderAPI = {
  getAll: () => api.get('/orders'),
  create: (data) => api.post('/orders', data),
  updateStatus: (id, status) => api.patch(`/orders/${id}/status`, { status }),
  delete: (id) => api.delete(`/orders/${id}`),
};

export const analyticsAPI = {
  getSupplierOverview: () => api.get('/analytics/supplier-overview'),
};

export const userAPI = {
  getSuppliers: () => api.get('/users/suppliers'),
};

export const notificationAPI = {
  getAll: () => api.get('/notifications'),
  markAllRead: () => api.patch('/notifications/mark-as-read'),
};

export default api;
