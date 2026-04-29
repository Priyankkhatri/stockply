import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { SupplierProvider } from "./context/SupplierContext";
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import DashboardHome from "./pages/DashboardHome";
import InventoryPage from "./pages/InventoryPage";
import CompareSuppliersPage from "./pages/CompareSuppliersPage";
import OrdersPage from "./pages/OrdersPage";
import AnalyticsPage from "./pages/AnalyticsPage";
import AlertsPage from "./pages/AlertsPage";
import SettingsPage from "./pages/SettingsPage";
import SupportPage from "./pages/SupportPage";
import SupplierDashboardPage from "./pages/SupplierDashboardPage";
import SupplierShopsPage from "./pages/SupplierShopsPage";
import SupplierShopDetailsPage from "./pages/SupplierShopDetailsPage";
import SupplierOrdersPage from "./pages/SupplierOrdersPage";
import SupplierFulfillmentPage from "./pages/SupplierFulfillmentPage";
import SupplierInventoryPage from "./pages/SupplierInventoryPage";
import SupplierAnalyticsPage from "./pages/SupplierAnalyticsPage";
import SupplierSettingsPage from "./pages/SupplierSettingsPage";
import DashboardLayout from "./layouts/DashboardLayout";

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

        <Route path="*" element={<Navigate to={getHomePath(session.role)} replace />} />
      </Routes>
    </Router>
    </SupplierProvider>
  );
}


export default App;
