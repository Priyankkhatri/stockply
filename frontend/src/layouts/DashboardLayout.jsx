import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import Topbar from '../components/Topbar';

const DashboardLayout = ({ children, role }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  return (
    <div className="flex min-h-screen bg-background w-full overflow-x-hidden">
      {/* Overlay for mobile sidebar */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-text/20 backdrop-blur-sm z-40 lg:hidden transition-opacity"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      <Sidebar role={role} isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
      
      <div className="flex-1 flex flex-col min-w-0">
        <Topbar role={role} onMenuClick={toggleSidebar} />
        <main className="flex-1 overflow-y-auto px-4 md:px-10 py-6">
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
