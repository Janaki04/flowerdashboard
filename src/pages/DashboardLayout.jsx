import React, { useState } from 'react';
import Sidebar from '../components/Sidebar'; 
import Header from '../components/Header'; 

const DashboardLayout = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen w-full bg-[#f8fafc] overflow-hidden font-sans antialiased">
      
      <Sidebar isOpen={isSidebarOpen} setIsOpen={isSidebarOpen} />

      <div className="flex flex-col flex-1 min-w-0 h-screen lg:pl-[260px]">
        
        <Header onMenuClick={() => setIsSidebarOpen(true)} />

        <main className="flex-1 overflow-y-auto overflow-x-hidden bg-[#f8fafc]">
          <div className="p-4 sm:p-6 lg:pt-2 lg:p-8 max-w-[1600px] mx-auto w-full">
            {children}
          </div>
        </main>

      </div>
    </div>
  );
};

export default DashboardLayout;