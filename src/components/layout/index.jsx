import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Header from './Header';
export function MainLayout() {
  return (
    <div className="flex flex-col h-screen">
      <Header className="sticky top-0 z-10" />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar className="sticky left-0 top-0 h-screen z-10" />
        <div className="flex-1 p-6 overflow-auto">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
