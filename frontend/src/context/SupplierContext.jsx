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

      // Fetch core data first
      const [prodRes, summaryRes, partnersRes, ordersRes] = await Promise.all([
        productAPI.getAll().catch(e => ({ data: { data: { products: [] } } })),
        alertAPI.getSummary().catch(e => ({ data: { data: { summary: {} } } })),
        partnerAPI.getAll().catch(e => ({ data: { data: { partners: [] } } })),
        orderAPI.getAll().catch(e => ({ data: { data: { orders: [] } } })),
      ]);

      const fetchedProducts = prodRes.data?.data?.products ?? [];
      const fetchedOrders = ordersRes.data?.data?.orders ?? [];
      
      // FALLBACK MOCK DATA FOR DEMO PURPOSES
      const mockProducts = [
        { _id: 'm1', name: 'Premium Cotton Fabric', sku: 'COT-001', category: 'Fabric', stock: 450, unit: 'mtrs', price: 120, status: 'In Stock', img: 'https://images.unsplash.com/photo-1584184924103-e310d9dc85fc?q=80&w=200&auto=format&fit=crop' },
        { _id: 'm2', name: 'Genuine Leather Hide', sku: 'LTH-042', category: 'Leather', stock: 12, unit: 'sqft', price: 850, status: 'Low Stock', img: 'https://images.unsplash.com/photo-1524234107056-1c1f48f64ab8?q=80&w=200&auto=format&fit=crop' },
        { _id: 'm3', name: 'Industrial Brass Zippers', sku: 'ZIP-202', category: 'Hardware', stock: 0, unit: 'pcs', price: 45, status: 'Out of Stock', img: 'https://images.unsplash.com/photo-1544531586-fde5298cdd40?q=80&w=200&auto=format&fit=crop' }
      ];

      const mockOrders = [
        { _id: 'o1', shopName: 'Atelier Mumbai', orderNumber: 'ORD-8821', totalAmount: 45000, status: 'Pending', items: 12, createdAt: new Date().toISOString() },
        { _id: 'o2', shopName: 'Heritage Silks', orderNumber: 'ORD-8822', totalAmount: 12800, status: 'Processing', items: 5, createdAt: new Date().toISOString() },
        { _id: 'o3', shopName: 'The Fabric Store', orderNumber: 'ORD-8823', totalAmount: 8900, status: 'Shipped', items: 3, createdAt: new Date().toISOString() }
      ];

      setProducts(fetchedProducts.length > 0 ? fetchedProducts : mockProducts);
      setSummary(summaryRes.data?.data?.summary ?? { totalRevenue: 1250000, activeOrders: 24, totalProducts: 156 });
      setPartners(partnersRes.data?.data?.partners ?? []);
      setOrders(fetchedOrders.length > 0 ? fetchedOrders : mockOrders);

      // Fetch analytics separately as it might be slow
      analyticsAPI.getSupplierOverview()
        .then(res => setAnalytics(res.data?.data ?? {
          trends: [
            { day: 'Mon', count: 12 }, { day: 'Tue', count: 18 }, { day: 'Wed', count: 15 },
            { day: 'Thu', count: 25 }, { day: 'Fri', count: 22 }, { day: 'Sat', count: 30 }, { day: 'Sun', count: 10 }
          ],
          growth: { revenue: '+12.5%', orders: '+8.2%', stock: '-4.1%', partners: '+2.0%' }
        }))
        .catch(err => {
          console.warn('Analytics fetch failed:', err);
          setAnalytics({
            trends: [
              { day: 'Mon', count: 12 }, { day: 'Tue', count: 18 }, { day: 'Wed', count: 15 },
              { day: 'Thu', count: 25 }, { day: 'Fri', count: 22 }, { day: 'Sat', count: 30 }, { day: 'Sun', count: 10 }
            ],
            growth: { revenue: '+12.5%', orders: '+8.2%', stock: '-4.1%', partners: '+2.0%' }
          });
        });

    } catch (err) {
      console.error('Error fetching core initial data:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const handleStorageChange = () => {
      const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
      if (isLoggedIn) {
        fetchInitialData();
      }
    };

    handleStorageChange();

    window.addEventListener('auth-change', handleStorageChange);
    return () => window.removeEventListener('auth-change', handleStorageChange);
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
