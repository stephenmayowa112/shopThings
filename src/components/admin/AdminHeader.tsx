'use client';

import { Menu, Search, Bell } from 'lucide-react';
import { Button } from '@/components/ui';

interface AdminHeaderProps {
  title: string;
  onMenuClick: () => void;
  actions?: React.ReactNode;
  showSearch?: boolean;
}

export default function AdminHeader({ 
  title, 
  onMenuClick, 
  actions,
  showSearch = false 
}: AdminHeaderProps) {
  return (
    <header className="bg-white border-b sticky top-0 z-30">
      <div className="flex items-center justify-between px-4 lg:px-6 py-4">
        <div className="flex items-center gap-4">
          <button
            onClick={onMenuClick}
            className="lg:hidden p-2 hover:bg-gray-100 rounded-lg"
          >
            <Menu className="w-5 h-5" />
          </button>
          <h1 className="text-xl font-heading font-bold text-primary">{title}</h1>
        </div>

        {/* Global Search Bar */}
        {showSearch && (
          <div className="flex-1 max-w-xl mx-4 hidden md:block">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input 
                type="text"
                placeholder="Search orders, users, products..." 
                className="w-full pl-10 pr-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-primary/20"
              />
            </div>
          </div>
        )}

        {/* Actions */}
        <div className="flex items-center gap-2">
          {actions}
          {/* Notification Bell (commented out for now) */}
          {/* 
          <button className="relative p-2 hover:bg-gray-100 rounded-lg">
            <Bell className="w-5 h-5 text-gray-500" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
          </button>
          */}
        </div>
      </div>
    </header>
  );
}