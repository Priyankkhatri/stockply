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
  const [partners, setPartners] = useState([]);
  const [summary, setSummary] = useState(null);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchInitialData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const [prodRes, summaryRes, partnersRes, userRes] = await Promise.all([
        productAPI.getAll().catch(() => ({ data: { data: { products: [] } } })),
        alertAPI.getSummary().catch(() => ({ data: { data: { summary: {} } } })),
        partnerAPI.getAll().catch(() => ({ data: { data: { partners: [] } } })),
        import('../services/api').then(m => m.authAPI.me()).catch(() => ({ data: { data: { user: null } } })),
      ]);

      setProducts(prodRes.data?.data?.products ?? []);
      setSummary(summaryRes.data?.data?.summary ?? {});
      setPartners(partnersRes.data?.data?.partners ?? []);
      setUser(userRes.data?.data?.user ?? null);
    } catch (err) {
      console.error('Shop fetch error:', err);
      setError(err.message);
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

  const value = {
    products,
    partners,
    summary,
    user,
    loading,
    error,
    addProduct,
    deleteProduct,
    updateProduct,
    refreshData: fetchInitialData
  };

  return (
    <ShopContext.Provider value={value}>
      {children}
    </ShopContext.Provider>
  );
};
