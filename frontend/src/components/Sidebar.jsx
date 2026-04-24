import React from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  LayoutDashboard, 
  Package, 
  Users, 
  ShoppingCart, 
  BarChart3, 
  Settings,
  Plus,
  HelpCircle,
  LogOut,
  Sparkles
} from 'lucide-react';
import './Sidebar.css';

const Sidebar = ({ role }) => {
    const location = useLocation();
    const navigate = useNavigate();
  
    const handleLogout = () => {
      localStorage.removeItem('userRole');
      localStorage.removeItem('isLoggedIn');
      navigate('/login');
    };

    const links = role === 'supplier' 
      ? [
          { name: 'Dashboard', icon: LayoutDashboard, path: '/supplier/dashboard' },
          { name: 'Shops', icon: Users, path: '/supplier/shops' },
          { name: 'Orders', icon: ShoppingCart, path: '/supplier/orders' },
          { name: 'Inventory', icon: Package, path: '/supplier/inventory' },
          { name: 'Analytics', icon: BarChart3, path: '/supplier/analytics' },
          { name: 'Settings', icon: Settings, path: '/supplier/settings' },
        ]
      : [
          { name: 'Dashboard', icon: LayoutDashboard, path: '/dashboard' },
          { name: 'Inventory', icon: Package, path: '/dashboard/inventory' },
          { name: 'Orders', icon: ShoppingCart, path: '/dashboard/orders' },
          { name: 'Alerts', icon: Users, path: '/dashboard/alerts' },
          { name: 'Analytics', icon: BarChart3, path: '/dashboard/analytics' },
          { name: 'Settings', icon: Settings, path: '/dashboard/settings' },
        ];
  
    return (
      <aside className="sidebar-container">
        <div className="sidebar-header">
          <div className="sidebar-brand">
            <motion.div 
              whileHover={{ rotate: 180 }}
              transition={{ duration: 0.5 }}
              className="brand-logo-container"
            >
              <Sparkles size={28} />
            </motion.div>
            <div className="brand-text-container">
              <span className="brand-name">Stockply</span>
              <span className="brand-tagline">Digital Atelier</span>
            </div>
          </div>
        </div>

        <nav className="sidebar-nav">
          <div className="nav-group">
            {links.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <NavLink
                  key={link.name}
                  to={link.path}
                  end
                  className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
                >
                  {location.pathname === link.path && (
                    <motion.div 
                      layoutId="sidebarActive"
                      className="nav-link-active-bg"
                    />
                  )}
                  <div className="nav-link-content">
                    <link.icon size={20} className="nav-icon" />
                    <span>{link.name}</span>
                  </div>
                </NavLink>
              );
            })}
          </div>
        </nav>

        <div className="sidebar-footer">
          <motion.button 
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="new-entry-btn"
          >
            <Plus size={20} />
            New Entry
          </motion.button>

          <div className="footer-actions">
            <NavLink to="/support" className="footer-link">
              <HelpCircle size={20} />
              Support
            </NavLink>
            <button onClick={handleLogout} className="logout-btn">
              <LogOut size={20} />
              Log Out
            </button>
          </div>
        </div>
      </aside>
    );
};

export default Sidebar;
