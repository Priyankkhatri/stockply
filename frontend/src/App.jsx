import React, { Suspense, lazy, useEffect } from "react";
import { motion } from "framer-motion";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { SupplierProvider } from "./context/SupplierContext";
import { ShopProvider } from "./context/ShopContext";
import DashboardLayout from "./layouts/DashboardLayout";
import { trackPageView, initGA } from './utils/analytics';
import { useAuth } from './hooks/useAuth';

// Lazy load pages for performance
const LandingPage = lazy(() => import("./pages/LandingPage"));
const LoginPage = lazy(() => import("./pages/LoginPage"));
const DashboardHome = lazy(() => import("./pages/DashboardHome"));
const InventoryPage = lazy(() => import("./pages/InventoryPage"));
const CompareSuppliersPage = lazy(() => import("./pages/CompareSuppliersPage"));
const OrdersPage = lazy(() => import("./pages/OrdersPage"));
const AnalyticsPage = lazy(() => import("./pages/AnalyticsPage"));
const AlertsPage = lazy(() => import("./pages/AlertsPage"));
const SettingsPage = lazy(() => import("./pages/SettingsPage"));
const SupportPage = lazy(() => import("./pages/SupportPage"));
const SupplierDashboardPage = lazy(() => import("./pages/SupplierDashboardPage"));
const SupplierShopsPage = lazy(() => import("./pages/SupplierShopsPage"));
const SupplierShopDetailsPage = lazy(() => import("./pages/SupplierShopDetailsPage"));
const SupplierOrdersPage = lazy(() => import("./pages/SupplierOrdersPage"));
const SupplierFulfillmentPage = lazy(() => import("./pages/SupplierFulfillmentPage"));
const SupplierInventoryPage = lazy(() => import("./pages/SupplierInventoryPage"));
const SupplierAnalyticsPage = lazy(() => import("./pages/SupplierAnalyticsPage"));
const SupplierSettingsPage = lazy(() => import("./pages/SupplierSettingsPage"));
const ShopOnboardingPage = lazy(() => import("./pages/ShopOnboardingPage"));
const SupplierOnboardingPage = lazy(() => import("./pages/SupplierOnboardingPage"));
const NotFoundPage = lazy(() => import("./pages/NotFoundPage"));

// Loading fallback component
const PageLoader = () => (
  <div className="min-h-screen bg-[#FDFCFB] flex flex-col items-center justify-center relative overflow-hidden">
    <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-[100px] -mr-48 -mt-48 animate-pulse" />
    <div className="absolute bottom-0 left-0 w-64 h-64 bg-text/5 rounded-full blur-[80px] -ml-32 -mb-32" />
    
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="relative flex flex-col items-center gap-8"
    >
      <div className="relative w-20 h-20 bg-text rounded-[32px] flex items-center justify-center text-white shadow-2xl shadow-text/20">
        <div className="absolute inset-0 rounded-[32px] border-[6px] border-primary/20 border-t-primary animate-spin" style={{ animationDuration: '0.8s' }} />
        <span className="text-2xl font-black tracking-tighter italic serif">S.</span>
      </div>
      
      <div className="space-y-4 text-center">
        <div className="space-y-1">
          <p className="text-[11px] font-black uppercase tracking-[0.5em] text-text">Stockply <span className="text-primary italic font-normal serif lowercase">v2.1</span></p>
          <p className="text-[9px] font-bold text-text/70 uppercase tracking-[0.3em]">Synchronizing Assets</p>
        </div>
        
        <div className="w-48 h-1 bg-text/5 rounded-full overflow-hidden relative">
          <motion.div 
            initial={{ left: "-100%" }}
            animate={{ left: "100%" }}
            transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-0 w-24 h-full bg-primary shadow-[0_0_15px_rgba(192,133,82,0.8)]"
          />
        </div>
      </div>
    </motion.div>
  </div>
);

const RequireSession = ({ role, children }) => {
  const { isLoggedIn, role: userRole } = useAuth();
  const getHomePath = (r) => (r === "supplier" ? "/supplier/dashboard" : "/dashboard");

  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  if (role && userRole !== role) {
    return <Navigate to={getHomePath(userRole)} replace />;
  }

  return children;
};

const HomeRoute = () => {
  const { isLoggedIn, role: userRole } = useAuth();
  const getHomePath = (r) => (r === "supplier" ? "/supplier/dashboard" : "/dashboard");

  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  return <Navigate to={getHomePath(userRole)} replace />;
};

function App() {
  const location = useLocation();

  useEffect(() => {
    initGA('G-STOCKPLY2026');
  }, []);

  useEffect(() => {
    trackPageView(location.pathname + location.search);
  }, [location]);

  return (
    <ShopProvider>
      <SupplierProvider>
        <Suspense fallback={<PageLoader />}>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/home" element={<HomeRoute />} />

            {/* ─── Onboarding Routes ─── */}
            <Route
              path="/onboarding/shop"
              element={
                <RequireSession role="shop">
                  <ShopOnboardingPage />
                </RequireSession>
              }
            />
            <Route
              path="/onboarding/supplier"
              element={
                <RequireSession role="supplier">
                  <SupplierOnboardingPage />
                </RequireSession>
              }
            />

            <Route
              path="/dashboard"
              element={
                <RequireSession role="shop">
                  <DashboardLayout role="shop">
                    <DashboardHome />
                  </DashboardLayout>
                </RequireSession>
              }
            />
            <Route
              path="/dashboard/inventory"
              element={
                <RequireSession role="shop">
                  <DashboardLayout role="shop">
                    <InventoryPage />
                  </DashboardLayout>
                </RequireSession>
              }
            />
            <Route
              path="/dashboard/inventory/compare"
              element={
                <RequireSession role="shop">
                  <DashboardLayout role="shop">
                    <CompareSuppliersPage />
                  </DashboardLayout>
                </RequireSession>
              }
            />
            <Route
              path="/dashboard/orders"
              element={
                <RequireSession role="shop">
                  <DashboardLayout role="shop">
                    <OrdersPage />
                  </DashboardLayout>
                </RequireSession>
              }
            />
            <Route
              path="/dashboard/analytics"
              element={
                <RequireSession role="shop">
                  <DashboardLayout role="shop">
                    <AnalyticsPage />
                  </DashboardLayout>
                </RequireSession>
              }
            />
            <Route
              path="/dashboard/alerts"
              element={
                <RequireSession role="shop">
                  <DashboardLayout role="shop">
                    <AlertsPage />
                  </DashboardLayout>
                </RequireSession>
              }
            />
            <Route
              path="/dashboard/settings"
              element={
                <RequireSession role="shop">
                  <DashboardLayout role="shop">
                    <SettingsPage />
                  </DashboardLayout>
                </RequireSession>
              }
            />
            <Route
              path="/support"
              element={
                <RequireSession>
                  <DashboardLayout role={localStorage.getItem('userRole')}>
                    <SupportPage />
                  </DashboardLayout>
                </RequireSession>
              }
            />

            <Route
              path="/supplier/dashboard"
              element={
                <RequireSession role="supplier">
                  <DashboardLayout role="supplier">
                    <SupplierDashboardPage />
                  </DashboardLayout>
                </RequireSession>
              }
            />
            <Route
              path="/supplier/shops"
              element={
                <RequireSession role="supplier">
                  <DashboardLayout role="supplier">
                    <SupplierShopsPage />
                  </DashboardLayout>
                </RequireSession>
              }
            />
            <Route
              path="/supplier/shops/:id"
              element={
                <RequireSession role="supplier">
                  <DashboardLayout role="supplier">
                    <SupplierShopDetailsPage />
                  </DashboardLayout>
                </RequireSession>
              }
            />
            <Route
              path="/supplier/orders"
              element={
                <RequireSession role="supplier">
                  <DashboardLayout role="supplier">
                    <SupplierOrdersPage />
                  </DashboardLayout>
                </RequireSession>
              }
            />
            <Route
              path="/supplier/fulfillment"
              element={
                <RequireSession role="supplier">
                  <DashboardLayout role="supplier">
                    <SupplierFulfillmentPage />
                  </DashboardLayout>
                </RequireSession>
              }
            />
            <Route
              path="/supplier/inventory"
              element={
                <RequireSession role="supplier">
                  <DashboardLayout role="supplier">
                    <SupplierInventoryPage />
                  </DashboardLayout>
                </RequireSession>
              }
            />
            <Route
              path="/supplier/analytics"
              element={
                <RequireSession role="supplier">
                  <DashboardLayout role="supplier">
                    <SupplierAnalyticsPage />
                  </DashboardLayout>
                </RequireSession>
              }
            />
            <Route
              path="/supplier/settings"
              element={
                <RequireSession role="supplier">
                  <DashboardLayout role="supplier">
                    <SupplierSettingsPage />
                  </DashboardLayout>
                </RequireSession>
              }
            />

            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Suspense>
      </SupplierProvider>
    </ShopProvider>
  );
}

export default App;
