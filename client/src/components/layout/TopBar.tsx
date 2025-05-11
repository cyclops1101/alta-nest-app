// src/components/layout/TopBar.tsx
import { Bell, Cog, Menu, Moon, Sun } from 'lucide-react';
import { useDarkMode } from '@/hooks/useDarkMode.ts';

export default function TopBar({ toggleSidebar }: { toggleSidebar: () => void }) {
  const [isDark, setIsDark] = useDarkMode();

  return (
    <header className="w-full h-16 px-4 pl-16 flex items-center justify-between bg-white dark:bg-gray-950 shadow">
      <div className="flex items-center gap-3">
        <button onClick={toggleSidebar} className="text-gray-700 dark:text-gray-200 cursor-pointer">
          <Menu size={24} />
        </button>
        <nav className="text-sm text-gray-600 dark:text-gray-400">
          <span className="font-medium text-gray-900 dark:text-white">Home</span> / Invoices
        </nav>
      </div>

      <div className="flex items-center gap-4">
        <input
          type="text"
          placeholder="Search..."
          className="px-3 py-1 text-sm rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <Bell size={20} className="text-gray-700 dark:text-gray-200" />
        <Cog size={20} className="text-gray-700 dark:text-gray-200" />
        <button
          onClick={() => setIsDark(!isDark)}
          className="cursor-pointer text-gray-700 dark:text-gray-200"
        >
          {isDark ? <Sun size={20} /> : <Moon size={20} />}
        </button>
        <div className="bg-gray-200 dark:bg-gray-800 rounded-full w-10 h-10 flex items-center justify-center" />
      </div>
    </header>
  );
}
