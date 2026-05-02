import { useEffect } from 'react';
import socket from '../services/socket';
import toast from 'react-hot-toast';

/**
 * Custom hook for real-time socket events
 */
export const useSocket = () => {
  useEffect(() => {
    socket.connect();

    socket.on('order:new', (order) => {
      toast(`New Order: ${order.customerName} - Rs. ${order.amount}`, {
        icon: '🛒',
        duration: 5000,
      });
    });

    socket.on('stock:alert', (alert) => {
      toast.error(`Critical Stock: ${alert.productName} (${alert.currentStock} left)`, {
        duration: 6000,
      });
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  return socket;
};
