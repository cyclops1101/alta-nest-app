// src/components/layout/Sidebar.tsx
// import { useState } from 'react';
// import { Menu, X } from 'lucide-react';

import NavItem from '@/components/layout/NavItem.tsx';

export default function Sidebar({ isOpen }: { isOpen: boolean }) {
  return (
    <aside
      className={`${
        isOpen ? 'w-60' : 'w-0'
      } transition-all duration-300 bg-slate-200 dark:bg-gray-900 h-screen pr-5`}
    >
      <div className="m-3 mr-5 text-center px-4 py-5 rounded-xl text-xl font-bold dark:border-gray-700 text-gray-800 dark:text-gray-400 background-gray-100 dark:bg-gray-800">
        LOGO
      </div>
      <nav className="p-4 space-y-4 text-gray-700 dark:text-gray-200">
        <NavItem href="/" label="Home" />
        <NavItem href="/invoices" label="Invoices" />
        <NavItem href="#" label="Bills" />
        <NavItem href="#" label="Expenses" />
        <NavItem href="#" label="Reports" />
      </nav>
    </aside>
  );
}
