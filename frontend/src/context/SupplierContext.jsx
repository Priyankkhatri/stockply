import React, { createContext, useContext, useState, useEffect } from 'react';
import { productAPI, transactionAPI, alertAPI, partnerAPI } from '../services/api';

const SupplierContext = createContext();

export const useSupplier = () => {
  const context = useContext(SupplierContext);
  if (!context) {
    throw new Error('useSupplier must be used within a SupplierProvider');
  }
  return context;
};

export const SupplierProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [partners, setPartners] = useState([]);
  const [loading, setLoading] = useState(true);
  const [summary, setSummary] = useState(null);

  useEffect(() => {
    fetchInitialData();
  }, []);

  const fetchInitialData = async () => {
    try {
      setLoading(true);
      const [prodRes, summaryRes, partnersRes] = await Promise.all([
        productAPI.getAll(),
        alertAPI.getSummary(),
        partnerAPI.getAll()
      ]);
      
      setProducts(prodRes.data.data.products);
      setSummary(summaryRes.data.data.summary);
      setPartners(partnersRes.data.data.partners);
    } catch (error) {
      console.error('Error fetching initial data:', error);
    } finally {
      setLoading(false);
    }
  };

  const addPartner = async (partnerData) => {
    try {
      const res = await partnerAPI.create(partnerData);
      setPartners(prev => [res.data.data.partner, ...prev]);
    } catch (error) {
      console.error('Error adding partner:', error);
    }
  };

  const updatePartner = async (id, partnerData) => {
    try {
      const res = await partnerAPI.update(id, partnerData);
      setPartners(prev => prev.map(p => (p._id === id ? res.data.data.partner : p)));
    } catch (error) {
      console.error('Error updating partner:', error);
    }
  };

  const addProduct = async (productData) => {
    try {
      const res = await productAPI.create(productData);
      setProducts(prev => [res.data.data.product, ...prev]);
      return res.data.data.product;
    } catch (error) {
      console.error('Error adding product:', error);
      throw error;
    }
  };

  const updateStock = async (id, adjustment) => {
    try {
      const res = await productAPI.updateStock(id, adjustment);
      setProducts(prev => prev.map(p => p._id === id ? res.data.data.product : p));
      
      // Refresh summary
      const summaryRes = await alertAPI.getSummary();
      setSummary(summaryRes.data.data.summary);
    } catch (error) {
      console.error('Error updating stock:', error);
    }
  };
  const addOrder = (order) => setOrders([order, ...orders]);
  
  const updateOrderStatus = (id, status) => {
    setOrders(orders.map(o => o.id === id ? { ...o, status } : o));
  };

  const value = {
    products,
    setProducts,
    addProduct,
    updateStock,
    orders,
    setOrders,
    addOrder,
    updateOrderStatus,
    partners,
    setPartners,
    addPartner,
    loading,
    summary,
    fetchInitialData
  };

  return (
    <SupplierContext.Provider value={value}>
      {children}
    </SupplierContext.Provider>
  );
};
