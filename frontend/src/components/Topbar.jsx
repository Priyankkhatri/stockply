import React from 'react';
import { Bell, Search, User, HelpCircle, ChevronDown } from 'lucide-react';
import { motion } from 'framer-motion';
import './Topbar.css';

const Topbar = ({ role }) => {
  return (
    <header className="topbar-container">
      <div className="search-wrapper">
        <div className="search-group">
          <Search className="search-icon" size={20} />
          <input 
            type="text" 
            placeholder="Search SKU, Product name or shop..." 
            className="search-input"
          />
          <div className="search-shortcut">
            <span className="shortcut-key">⌘</span>
            <span className="shortcut-key">K</span>
          </div>
        </div>
      </div>

      <div className="topbar-actions">
        <div className="utility-btns">
          <button className="utility-btn">
            <HelpCircle size={22} />
          </button>
          <button className="utility-btn notification-btn">
            <Bell size={22} />
            <span className="notification-dot"></span>
          </button>
        </div>
        
        <motion.div 
          whileHover={{ x: -5 }}
          className="user-profile"
        >
          <div className="user-info">
            <span className="user-name">Master Artisan</span>
            <span className="user-role">
              {role === 'supplier' ? 'Premium Supplier' : 'Store Manager'}
            </span>
          </div>
          <div className="user-avatar-container">
            <img 
              src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?q=80&w=100&auto=format&fit=crop" 
              alt="Profile" 
              className="user-avatar" 
            />
            <div className="online-dot"></div>
          </div>
          <ChevronDown size={16} className="chevron-icon" />
        </motion.div>
      </div>
    </header>
  );
};

export default Topbar;
