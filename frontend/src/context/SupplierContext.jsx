import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { productAPI, transactionAPI, alertAPI, partnerAPI, orderAPI, analyticsAPI } from '../services/api';

const SupplierContext = createContext();

export const useSupplier = () => {
  const context = useContext(SupplierContext);
  if (!context) throw new Error('useSupplier must be used within a SupplierProvider');
  return context;
};

export const SupplierProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [partners, setPartners] = useState([]);
  const [summary, setSummary] = useState(null);
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchInitialData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const [prodRes, summaryRes, partnersRes, ordersRes, analyticsRes] = await Promise.all([
        productAPI.getAll(),
        alertAPI.getSummary(),
        partnerAPI.getAll(),
        orderAPI.getAll(),
        analyticsAPI.getSupplierOverview()
      ]);

      // Products: { data: { products: [...] } }
      setProducts(prodRes.data?.data?.products ?? []);
      // Summary: { data: { summary: {...} } }
      setSummary(summaryRes.data?.data?.summary ?? {});
      // Partners: { data: { partners: [...] } }
      setPartners(partnersRes.data?.data?.partners ?? []);
      // Orders: { data: { orders: [...] } }
      setOrders(ordersRes.data?.data?.orders ?? []);
      // Analytics: { data: { summary, trends, growth } }
      setAnalytics(analyticsRes.data?.data ?? {});
    } catch (err) {
      console.error('Error fetching initial data:', err);
      setError(err.message);
      // Ensure we don't stay in loading state if one of the secondary endpoints fails
      if (!analytics) setAnalytics({});
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    if (isLoggedIn) {
      fetchInitialData();
    }
  }, [fetchInitialData]);

  // ─── Products ────────────────────────────────────────────────
  const addProduct = async (productData) => {
    const res = await productAPI.create(productData);
    const product = res.data?.data?.product;
    setProducts(prev => [product, ...prev]);
    return product;
  };

  const updateStock = async (id, adjustment, type = 'IN') => {
    const value = type === 'OUT' ? -Math.abs(adjustment) : Math.abs(adjustment);
    const res = await productAPI.updateStock(id, value);
    const product = res.data?.data?.product;
    setProducts(prev => prev.map(p => p._id === id ? product : p));
    // Refresh summary after stock change
    const summaryRes = await alertAPI.getSummary();
    setSummary(summaryRes.data?.data?.summary ?? {});
  };

  // ─── Partners ────────────────────────────────────────────────
  const addPartner = async (partnerData) => {
    const res = await partnerAPI.create(partnerData);
    const partner = res.data?.data?.partner;
    setPartners(prev => [partner, ...prev]);
    return partner;
  };

  const updatePartner = async (id, partnerData) => {
    const res = await partnerAPI.update(id, partnerData);
    const partner = res.data?.data?.partner;
    setPartners(prev => prev.map(p => p._id === id ? partner : p));
    return partner;
  };

  const removePartner = async (id) => {
    await partnerAPI.delete(id);
    setPartners(prev => prev.filter(p => p._id !== id));
  };

  // ─── Orders ──────────────────────────────────────────────────
  const addOrder = async (orderData) => {
    const res = await orderAPI.create(orderData);
    const order = res.data?.data?.order;
    setOrders(prev => [order, ...prev]);
    return order;
  };

  const updateOrderStatus = async (id, status) => {
    const res = await orderAPI.updateStatus(id, status);
    const order = res.data?.data?.order;
    setOrders(prev => prev.map(o => o._id === id ? order : o));
    return order;
  };

  const removeOrder = async (id) => {
    await orderAPI.delete(id);
    setOrders(prev => prev.filter(o => o._id !== id));
  };

  const value = {
    // State
    products,
    orders,
    partners,
    summary,
    analytics,
    loading,
    error,
    // Products
    addProduct,
    updateStock,
    setProducts,
    // Partners
    addPartner,
    updatePartner,
    removePartner,
    setPartners,
    // Orders
    addOrder,
    updateOrderStatus,
    removeOrder,
    setOrders,
    // Refresh
    fetchInitialData,
  };

  return (
    <SupplierContext.Provider value={value}>
      {children}
    </SupplierContext.Provider>
  );
};
