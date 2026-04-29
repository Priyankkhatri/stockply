import React from 'react';
import Sidebar from '../components/Sidebar';
import Topbar from '../components/Topbar';

const DashboardLayout = ({ children, role }) => {
  return (
    <div className="flex min-h-screen bg-background w-full">
      <Sidebar role={role} />
      <div className="flex-1 flex flex-col min-w-0">
        <Topbar role={role} />
        <main className="flex-1 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
