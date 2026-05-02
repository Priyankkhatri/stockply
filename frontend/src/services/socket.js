/**
 * Mock Socket.io Service for Real-time Demonstration
 * In a real app, this would use 'socket.io-client'
 */

class MockSocket {
  constructor() {
    this.callbacks = {};
    this.connected = false;
  }

  connect() {
    this.connected = true;
    console.log('[Socket] Connected to real-time sync server');
    
    // Simulate incoming events
    setInterval(() => {
      if (this.callbacks['order:new']) {
        const mockOrder = {
          _id: `ord_${Math.random().toString(36).substr(2, 9)}`,
          customerName: 'Quick Mart',
          amount: Math.floor(Math.random() * 10000) + 500,
          status: 'Pending',
          createdAt: new Date().toISOString()
        };
        this.callbacks['order:new'].forEach(cb => cb(mockOrder));
      }
    }, 45000); // New order every 45s

    setInterval(() => {
      if (this.callbacks['stock:alert']) {
        const mockAlert = {
          productName: 'Paracetamol 500mg',
          currentStock: Math.floor(Math.random() * 5) + 1,
          type: 'Low Stock'
        };
        this.callbacks['stock:alert'].forEach(cb => cb(mockAlert));
      }
    }, 60000);
  }

  on(event, callback) {
    if (!this.callbacks[event]) this.callbacks[event] = [];
    this.callbacks[event].push(callback);
  }

  emit(event, data) {
    console.log(`[Socket] Emitting ${event}:`, data);
  }

  disconnect() {
    this.connected = false;
    console.log('[Socket] Disconnected');
  }
}

export const socket = new MockSocket();
export default socket;
