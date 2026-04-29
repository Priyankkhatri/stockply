import React, { createContext, useContext, useState, useEffect } from 'react';
import { productAPI, transactionAPI, alertAPI, partnerAPI, orderAPI } from '../services/api';

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
      const [prodRes, summaryRes, partnersRes, ordersRes] = await Promise.all([
        productAPI.getAll(),
        alertAPI.getSummary(),
        partnerAPI.getAll(),
        orderAPI.getAll()
      ]);
      
      setProducts(prodRes.data.data.products);
      setSummary(summaryRes.data.data.summary);
      setPartners(partnersRes.data.data.partners);
      setOrders(ordersRes.data.data.orders);
    } catch (error) {
      console.error('Error fetching initial data:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchOrders = async () => {
    try {
      const res = await orderAPI.getAll();
      setOrders(res.data.data.orders);
    } catch (error) {
      console.error('Error fetching orders:', error);
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
  const addOrder = async (orderData) => {
    try {
      const res = await orderAPI.create(orderData);
      setOrders(prev => [res.data.data.order, ...prev]);
      return res.data.data.order;
    } catch (error) {
      console.error('Error adding order:', error);
      throw error;
    }
  };
  
  const updateOrderStatus = async (id, status) => {
    try {
      const res = await orderAPI.updateStatus(id, status);
      setOrders(prev => prev.map(o => (o._id === id ? res.data.data.order : o)));
    } catch (error) {
      console.error('Error updating order status:', error);
    }
  };

  const removeOrder = async (id) => {
    try {
      await orderAPI.delete(id);
      setOrders(prev => prev.filter(o => o._id !== id));
    } catch (error) {
      console.error('Error removing order:', error);
    }
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
