import React, { Suspense, lazy } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { SupplierProvider } from "./context/SupplierContext";
import DashboardLayout from "./layouts/DashboardLayout";

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
const NotFoundPage = lazy(() => import("./pages/NotFoundPage"));

// Loading fallback component
const PageLoader = () => (
  <div className="min-h-screen bg-background flex flex-col items-center justify-center">
    <motion.div 
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="relative flex flex-col items-center gap-6"
    >
      <div className="relative w-16 h-16 bg-text rounded-2xl flex items-center justify-center text-white shadow-2xl shadow-text/20">
        <div className="absolute inset-0 rounded-2xl border-4 border-primary/20 border-t-primary animate-spin" />
        <span className="text-lg font-black tracking-tighter italic serif">S.</span>
      </div>
      <div className="space-y-1.5 text-center">
        <p className="text-[10px] font-black uppercase tracking-[0.4em] text-text/60 animate-pulse">Initializing Systems</p>
        <div className="w-40 h-1 bg-text/5 rounded-full overflow-hidden">
          <motion.div 
            initial={{ x: "-100%" }}
            animate={{ x: "100%" }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
            className="w-full h-full bg-primary"
          />
        </div>
      </div>
    </motion.div>
  </div>
);

const getSession = () => ({
  isLoggedIn: localStorage.getItem("isLoggedIn") === "true",
  role: localStorage.getItem("userRole") === "supplier" ? "supplier" : "shop",
});

const getHomePath = (role) => (role === "supplier" ? "/supplier/dashboard" : "/dashboard");

const RequireSession = ({ role, children }) => {
  const session = getSession();

  if (!session.isLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  if (role && session.role !== role) {
    return <Navigate to={getHomePath(session.role)} replace />;
  }

  return children;
};

const HomeRoute = () => {
  const session = getSession();

  if (!session.isLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  return <Navigate to={getHomePath(session.role)} replace />;
};

function App() {
  const session = getSession();

  return (
    <SupplierProvider>
      <Router>
        <Suspense fallback={<PageLoader />}>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/home" element={<HomeRoute />} />

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
                  <DashboardLayout role={session.role}>
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
      </Router>
    </SupplierProvider>
  );
}


export default App;
