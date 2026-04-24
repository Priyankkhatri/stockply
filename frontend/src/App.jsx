import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Topbar from "./components/Topbar";

import LoginPage from "./pages/LoginPage";

// Placeholder for screens (to be implemented next)
const Placeholder = ({ title }) => (
  <div className="flex-1 flex items-center justify-center text-gray-400">
    <div className="text-center">
      <h2 className="text-2xl font-semibold mb-2">{title}</h2>
      <p>Implementation in progress...</p>
    </div>
  </div>
);

const Layout = ({ children }) => {
  return (
    <div className="flex min-h-screen bg-[#030712]">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Topbar />
        <main className="flex-1 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
};

function App() {
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
  const userRole = localStorage.getItem("userRole") || "shop";

  return (
    <Router>
      <Routes>
        {/* Auth Route */}
        <Route path="/login" element={<LoginPage />} />

        {/* Shop Routes */}
        <Route path="/" element={isLoggedIn && userRole === "shop" ? <Layout><Placeholder title="Shop Dashboard" /></Layout> : <Navigate to="/login" />} />
        <Route path="/dashboard" element={<Layout><Placeholder title="Shop Dashboard" /></Layout>} />
        <Route path="/inventory" element={<Layout><Placeholder title="Inventory Management" /></Layout>} />
        <Route path="/orders" element={<Layout><Placeholder title="Order History" /></Layout>} />
        <Route path="/analytics" element={<Layout><Placeholder title="Analytics Overview" /></Layout>} />

        {/* Supplier Routes */}
        <Route path="/supplier/dashboard" element={<Layout><Placeholder title="Supplier Dashboard" /></Layout>} />
        <Route path="/supplier/shops" element={<Layout><Placeholder title="Connected Shops" /></Layout>} />
        <Route path="/supplier/orders" element={<Layout><Placeholder title="Supplier Orders" /></Layout>} />
        <Route path="/supplier/inventory" element={<Layout><Placeholder title="Supplier Inventory" /></Layout>} />
        
        {/* Catch-all */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;
