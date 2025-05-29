import { useState } from 'react';
import { Sidebar } from './sidebar';
import { Button } from '../ui/button';
import { Menu, X } from 'lucide-react';
import { Outlet } from 'react-router-dom';

export function MainLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen bg-slate-50">
      {/* Mobile sidebar backdrop */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black bg-opacity-50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-50 w-64 transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <Sidebar />
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Mobile header */}
        <div className="lg:hidden bg-white border-b border-slate-200 px-4 py-3 flex items-center justify-between">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setSidebarOpen(true)}
            className="text-slate-600"
          >
            <Menu className="h-5 w-5" />
          </Button>
          {sidebarOpen && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setSidebarOpen(false)}
              className="text-slate-600"
            >
              <X className="h-5 w-5" />
            </Button>
          )}
        </div>

        {/* Page content */}
        <main className="overflow-x-hidden overflow-y-auto bg-slate-50 max-w-[90%]">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
