import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { productAPI, alertAPI, partnerAPI, orderAPI } from '../services/api';

const ShopContext = createContext();

export const useShop = () => {
  const context = useContext(ShopContext);
  if (!context) throw new Error('useShop must be used within a ShopProvider');
  return context;
};

export const ShopProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [partners, setPartners] = useState([]);
  const [summary, setSummary] = useState(null);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchInitialData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const [prodRes, summaryRes, partnersRes, ordersRes, userRes] = await Promise.all([
        productAPI.getAll().catch(() => ({ data: { data: { products: [] } } })),
        alertAPI.getSummary().catch(() => ({ data: { data: { summary: {} } } })),
        partnerAPI.getAll().catch(() => ({ data: { data: { partners: [] } } })),
        orderAPI.getAll().catch(() => ({ data: { data: { orders: [] } } })),
        import('../services/api').then(m => m.authAPI.getMe()).catch(() => ({ data: { data: { user: null } } })),
      ]);

      const fetchedProducts = prodRes.data?.data?.products ?? [];
      const fetchedOrders = ordersRes.data?.data?.orders ?? [];

      const mockProducts = [
        { _id: 'sp1', name: 'Luxury Silk Scarf', sku: 'SILK-99', category: 'Accessories', supplier: 'Heritage Silks', stock: 45, price: 1200, status: 'In Stock' },
        { _id: 'sp2', name: 'Cotton Summer Dress', sku: 'DRS-04', category: 'Apparel', supplier: 'Atelier Mumbai', stock: 8, price: 3500, status: 'Low Stock' },
        { _id: 'sp3', name: 'Leather Satchel', sku: 'BAG-22', category: 'Bags', supplier: 'Genuine Crafts', stock: 15, price: 8500, status: 'In Stock' },
        { _id: 'sp4', name: 'Velvet Cushion Cover', sku: 'HOM-11', category: 'Home', supplier: 'Textile Hub', stock: 0, price: 450, status: 'Out of Stock' }
      ];

      const mockOrders = [
        { _id: 'so1', orderNumber: 'SO-1001', supplierName: 'Heritage Silks', totalAmount: 5400, status: 'Processing', createdAt: new Date().toISOString() },
        { _id: 'so2', orderNumber: 'SO-1002', supplierName: 'Atelier Mumbai', totalAmount: 12500, status: 'Shipped', createdAt: new Date().toISOString() }
      ];

      setProducts(fetchedProducts.length > 0 ? fetchedProducts : mockProducts);
      setSummary(summaryRes.data?.data?.summary ?? { lowStockCount: 1, outOfStockCount: 1, totalValue: 245000 });
      setPartners(partnersRes.data?.data?.partners ?? []);
      setOrders(fetchedOrders.length > 0 ? fetchedOrders : mockOrders);
      setUser(userRes.data?.data?.user ?? null);
    } catch (err) {
      console.error('Shop fetch error:', err);
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

  const addProduct = async (productData) => {
    const res = await productAPI.create(productData);
    const product = res.data?.data?.product;
    setProducts(prev => [product, ...prev]);
    // Refresh summary
    alertAPI.getSummary().then(r => setSummary(r.data?.data?.summary ?? {})).catch(() => {});
    return product;
  };

  const deleteProduct = async (id) => {
    await productAPI.delete(id);
    setProducts(prev => prev.filter(p => p._id !== id));
    // Refresh summary
    alertAPI.getSummary().then(r => setSummary(r.data?.data?.summary ?? {})).catch(() => {});
  };

  const updateProduct = async (id, data) => {
    const res = await productAPI.update(id, data);
    const product = res.data?.data?.product;
    setProducts(prev => prev.map(p => p._id === id ? product : p));
    return product;
  };

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
    products,
    orders,
    partners,
    summary,
    user,
    loading,
    error,
    addProduct,
    deleteProduct,
    updateProduct,
    addOrder,
    updateOrderStatus,
    removeOrder,
    refreshData: fetchInitialData
  };

  return (
    <ShopContext.Provider value={value}>
      {children}
    </ShopContext.Provider>
  );
};
