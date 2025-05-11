// src/components/layout/Layout.tsx
import { useState } from 'react';
import Sidebar from './Sidebar';
import TopBar from './TopBar';

export default function Layout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="flex">
      <Sidebar isOpen={sidebarOpen} />
      <div
        className={`flex-1 transition-all -ml-8 duration-300 ease-in-out transform ${
          sidebarOpen ? 'rounded-l-4xl' : ''
        } bg-gray-50 dark:bg-gray-950 shadow-lg relative z-10 overflow-hidden`}
      >
        <TopBar toggleSidebar={() => setSidebarOpen((prev) => !prev)} />
        <main className="flex-1 pt-20 px-6 bg-gray-50 dark:bg-gray-950">{children}</main>
      </div>
    </div>
  );
}
