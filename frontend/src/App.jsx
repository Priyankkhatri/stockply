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
  <div className="min-h-screen bg-background flex items-center justify-center">
    <div className="w-10 h-10 border-4 border-primary/20 border-t-primary rounded-full animate-spin"></div>
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
