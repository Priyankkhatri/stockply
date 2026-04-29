import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Topbar from "./components/Topbar";
import LoginPage from "./pages/LoginPage";
import DashboardHome from "./pages/DashboardHome";
import InventoryPage from "./pages/InventoryPage";
import OrdersPage from "./pages/OrdersPage";
import AnalyticsPage from "./pages/AnalyticsPage";
import AlertsPage from "./pages/AlertsPage";
import SupplierDashboardPage from "./pages/SupplierDashboardPage";
import SupplierShopsPage from "./pages/SupplierShopsPage";
import SupplierShopDetailsPage from "./pages/SupplierShopDetailsPage";
import SupplierOrdersPage from "./pages/SupplierOrdersPage";
import SupplierInventoryPage from "./pages/SupplierInventoryPage";
import SectionPlaceholder from "./pages/SectionPlaceholder";

const getSession = () => ({
  isLoggedIn: localStorage.getItem("isLoggedIn") === "true",
  role: localStorage.getItem("userRole") === "supplier" ? "supplier" : "shop",
});

const getHomePath = (role) => (role === "supplier" ? "/supplier/dashboard" : "/dashboard");

const AppLayout = ({ role, children }) => (
  <div className="flex min-h-screen bg-background">
    <Sidebar role={role} />
    <div className="flex flex-1 min-w-0 flex-col">
      <Topbar role={role} />
      <main className="flex-1 overflow-y-auto">{children}</main>
    </div>
  </div>
);

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

const shopRoutes = [
  {
    path: "/dashboard/orders",
    title: "Order History",
    description: "Review purchase orders, status updates, and fulfillment timelines.",
  },
  {
    path: "/dashboard/analytics",
    title: "Analytics Overview",
    description: "Inspect inventory health, spend trends, and procurement performance.",
  },
  {
    path: "/dashboard/settings",
    title: "Workspace Settings",
    description: "Adjust notification preferences, account details, and portal defaults.",
  },
];

const supplierRoutes = [
  {
    path: "/supplier/analytics",
    title: "Analytics Overview",
    description: "Track demand, fulfillment speed, and revenue patterns.",
  },
  {
    path: "/supplier/settings",
    title: "Supplier Settings",
    description: "Update fulfillment preferences, channels, and account settings.",
  },
];

function App() {
  const session = getSession();

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/" element={<HomeRoute />} />

        <Route
          path="/dashboard"
          element={
            <RequireSession role="shop">
              <AppLayout role="shop">
                <DashboardHome />
              </AppLayout>
            </RequireSession>
          }
        />
        <Route
          path="/dashboard/inventory"
          element={
            <RequireSession role="shop">
              <AppLayout role="shop">
                <InventoryPage />
              </AppLayout>
            </RequireSession>
          }
        />
        <Route
          path="/dashboard/orders"
          element={
            <RequireSession role="shop">
              <AppLayout role="shop">
                <OrdersPage />
              </AppLayout>
            </RequireSession>
          }
        />
        <Route
          path="/dashboard/analytics"
          element={
            <RequireSession role="shop">
              <AppLayout role="shop">
                <AnalyticsPage />
              </AppLayout>
            </RequireSession>
          }
        />
        <Route
          path="/dashboard/alerts"
          element={
            <RequireSession role="shop">
              <AppLayout role="shop">
                <AlertsPage />
              </AppLayout>
            </RequireSession>
          }
        />
        {shopRoutes.map((route) => (
          <Route
            key={route.path}
            path={route.path}
            element={
              <RequireSession role="shop">
                <AppLayout role="shop">
                  <SectionPlaceholder {...route} />
                </AppLayout>
              </RequireSession>
            }
          />
        ))}

        <Route
          path="/supplier/dashboard"
          element={
            <RequireSession role="supplier">
              <AppLayout role="supplier">
                <SupplierDashboardPage />
              </AppLayout>
            </RequireSession>
          }
        />
        <Route
          path="/supplier/shops"
          element={
            <RequireSession role="supplier">
              <AppLayout role="supplier">
                <SupplierShopsPage />
              </AppLayout>
            </RequireSession>
          }
        />
        <Route
          path="/supplier/shops/:id"
          element={
            <RequireSession role="supplier">
              <AppLayout role="supplier">
                <SupplierShopDetailsPage />
              </AppLayout>
            </RequireSession>
          }
        />
        <Route
          path="/supplier/orders"
          element={
            <RequireSession role="supplier">
              <AppLayout role="supplier">
                <SupplierOrdersPage />
              </AppLayout>
            </RequireSession>
          }
        />
        <Route
          path="/supplier/inventory"
          element={
            <RequireSession role="supplier">
              <AppLayout role="supplier">
                <SupplierInventoryPage />
              </AppLayout>
            </RequireSession>
          }
        />
        {supplierRoutes.map((route) => (
          <Route
            key={route.path}
            path={route.path}
            element={
              <RequireSession role="supplier">
                <AppLayout role="supplier">
                  <SectionPlaceholder {...route} />
                </AppLayout>
              </RequireSession>
            }
          />
        ))}

        <Route path="*" element={<Navigate to={getHomePath(session.role)} replace />} />
      </Routes>
    </Router>
  );
}

export default App;
