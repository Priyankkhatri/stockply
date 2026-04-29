import React, { createContext, useContext, useState } from 'react';

const SupplierContext = createContext();

export const useSupplier = () => {
  const context = useContext(SupplierContext);
  if (!context) {
    throw new Error('useSupplier must be used within a SupplierProvider');
  }
  return context;
};

export const SupplierProvider = ({ children }) => {
  const [products, setProducts] = useState([
    {
      name: 'European Linen - Natural',
      sku: 'LNN-NAT-01',
      category: 'Fabric',
      stock: '340',
      unit: 'mtrs',
      price: '850.00',
      moq: '100',
      leadTime: '14 Days',
      status: 'In Stock',
      img: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=100&auto=format&fit=crop'
    },
    {
      name: 'Full Grain Leather - Cognac',
      sku: 'LTH-COG-05',
      category: 'Leather',
      stock: '45',
      unit: 'sqft',
      price: '1250.00',
      moq: '50',
      leadTime: '21 Days',
      status: 'Low Stock',
      img: 'https://images.unsplash.com/photo-1524292332709-b33366a7f139?q=80&w=100&auto=format&fit=crop'
    },
    {
      name: 'Corrugated Boxes (Medium)',
      sku: 'PKG-BOX-M',
      category: 'Packaging',
      stock: '1200',
      unit: 'pcs',
      price: '45.00',
      moq: '500',
      leadTime: '5 Days',
      status: 'In Stock',
      img: 'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?q=80&w=100&auto=format&fit=crop'
    }
  ]);

  const [orders, setOrders] = useState([
    {
      id: '#ORD-8920',
      date: 'Oct 24 • 14:30',
      shop: 'Artisan Goods Co.',
      itemsCount: 3,
      totalQty: 174,
      amount: 'Rs. 45,200',
      payment: 'Paid',
      status: 'Pending',
      items: [
        { name: 'Terracotta Vase', sku: 'TC-VS-001', qty: 24, price: '12,000' },
        { name: 'Jute Storage Basket', sku: 'JT-BS-092', qty: 50, price: '25,000' },
        { name: 'Carved Wood Coasters', sku: 'WD-CS-014', qty: 100, price: '8,200' },
      ]
    },
    {
      id: '#ORD-8919',
      date: 'Oct 23 • 09:10',
      shop: 'The Craft Boutique',
      itemsCount: 4,
      totalQty: 120,
      amount: 'Rs. 18,500',
      payment: 'Paid',
      status: 'Dispatched',
      items: [
        { name: 'Linen Napkins', sku: 'LN-NP-05', qty: 100, price: '15,000' },
        { name: 'Ceramic Plate', sku: 'CM-PL-02', qty: 20, price: '3,500' }
      ]
    },
    {
      id: '#ORD-8918',
      date: 'Oct 22 • 18:05',
      shop: 'Urban Nest Decor',
      itemsCount: 2,
      totalQty: 15,
      amount: 'Rs. 4,200',
      payment: 'Pending',
      status: 'Pending',
      items: [
        { name: 'Glass Candle Holder', sku: 'GL-CH-01', qty: 15, price: '4,200' }
      ]
    }
  ]);

  const [partners, setPartners] = useState([
    {
      name: 'Tech Emporium',
      initials: 'TE',
      initialsBg: 'bg-teal-50 text-teal-600',
      category: 'Electronics',
      location: 'Mumbai, IND',
      totalOrders: '1,245',
      revenue: 'Rs. 450,000',
      behavior: 'On-time',
      status: 'Active',
    },
    {
      name: 'Style Factory',
      initials: 'SF',
      initialsBg: 'bg-red-50 text-red-600',
      category: 'Clothing',
      location: 'Delhi, IND',
      totalOrders: '890',
      revenue: 'Rs. 215,500',
      behavior: 'Delayed',
      status: 'Active',
    },
    {
      name: 'Fresh Mart',
      initials: 'FM',
      initialsBg: 'bg-teal-50 text-teal-600',
      category: 'Food & Beverage',
      location: 'Bengaluru, IND',
      totalOrders: '3,450',
      revenue: 'Rs. 890,000',
      behavior: 'On-time',
      status: 'Active',
    },
    {
      name: 'City Grocers',
      initials: 'CG',
      initialsBg: 'bg-gray-100 text-gray-400',
      category: 'Food & Beverage',
      location: 'Pune, IND',
      totalOrders: '120',
      revenue: 'Rs. 45,000',
      behavior: 'N/A',
      status: 'Inactive',
    },
  ]);

  const addProduct = (product) => setProducts([product, ...products]);
  const addOrder = (order) => setOrders([order, ...orders]);
  const addPartner = (partner) => setPartners([partner, ...partners]);
  
  const updateOrderStatus = (id, status) => {
    setOrders(orders.map(o => o.id === id ? { ...o, status } : o));
  };

  const value = {
    products,
    setProducts,
    addProduct,
    orders,
    setOrders,
    addOrder,
    updateOrderStatus,
    partners,
    setPartners,
    addPartner
  };

  return (
    <SupplierContext.Provider value={value}>
      {children}
    </SupplierContext.Provider>
  );
};
