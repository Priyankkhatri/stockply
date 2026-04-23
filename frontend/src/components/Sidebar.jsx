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

const Sidebar = ({ role }) => {
    const location = useLocation();
    const navigate = useNavigate();
  
    const handleLogout = () => {
      // Clear session data if any (e.g., localStorage.clear())
      localStorage.removeItem('userRole');
      localStorage.removeItem('isLoggedIn');
      
      // Navigate to login page
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
      <aside className="w-80 h-screen bg-white/50 backdrop-blur-xl flex flex-col sticky top-0 border-r border-text/5 z-20">
        <div className="p-10">
          <div className="flex items-center gap-4">
            <motion.div 
              whileHover={{ rotate: 180 }}
              transition={{ duration: 0.5 }}
              className="w-14 h-14 bg-primary rounded-3xl flex items-center justify-center text-white font-bold text-2xl shadow-xl shadow-primary/20"
            >
              <Sparkles size={28} />
            </motion.div>
            <div className="flex flex-col">
              <span className="text-text font-display font-black text-xl leading-tight tracking-tighter uppercase">Stockply</span>
              <span className="text-[10px] font-black text-text/30 tracking-[0.3em] uppercase mt-0.5 opacity-60">Digital Atelier</span>
            </div>
          </div>
        </div>

        <nav className="flex-1 px-8 py-4 overflow-y-auto custom-scrollbar">
          <div className="space-y-2">
            {links.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <NavLink
                  key={link.name}
                  to={link.path}
                  end
                  className={`group relative flex items-center gap-4 px-6 py-4 rounded-2xl text-xs font-black uppercase tracking-widest transition-all ${
                    isActive
                       ? 'text-text'
                      : 'text-text-muted hover:text-text hover:bg-primary/5'
                  }`}
                >
                  {isActive && (
                    <motion.div 
                      layoutId="sidebarActive"
                      className="absolute inset-0 bg-white shadow-premium border border-text/5 rounded-2xl z-0"
                    />
                  )}
                  <div className="relative z-10 flex items-center gap-4">
                    <link.icon size={20} className={`${isActive ? 'text-primary' : 'text-text-muted group-hover:text-primary'} transition-colors`} />
                    <span className="mt-0.5">{link.name}</span>
                  </div>
                </NavLink>
              );
            })}
          </div>
        </nav>

        <div className="p-8 space-y-4">
          <motion.button 
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full py-4 bg-primary rounded-2xl text-white font-black text-xs uppercase tracking-widest flex items-center justify-center gap-3 shadow-xl shadow-primary/20 hover:bg-primary-dark transition-all"
          >
            <Plus size={20} />
            New Entry
          </motion.button>

          <div className="pt-6 mt-2 border-t border-text/5 space-y-1">
            <NavLink
              to="/support"
              className="flex items-center gap-4 px-6 py-4 rounded-xl text-xs font-black uppercase tracking-widest text-text-muted hover:text-text hover:bg-background transition-all"
            >
              <HelpCircle size={20} />
              Support
            </NavLink>
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-4 px-6 py-4 rounded-xl text-xs font-black uppercase tracking-widest text-accent-rose/60 hover:text-accent-rose hover:bg-accent-rose/5 transition-all text-left"
            >
              <LogOut size={20} />
              Log Out
            </button>
          </div>
        </div>
      </aside>
    );
};

export default Sidebar;
