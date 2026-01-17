'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  Store,
  Package,
  ShoppingBag,
  BarChart3,
  Users,
  Settings,
  Home,
  Menu,
  X,
  LogOut,
  Shield,
  FileText,
  Download,
  Calendar,
  Filter,
} from 'lucide-react';
import { Button } from '@/components/ui';

const NAV_ITEMS = [
  { label: 'Dashboard', href: '/admin/dashboard', icon: Home },
  { label: 'Users', href: '/admin/users', icon: Users },
  { label: 'Vendors', href: '/admin/vendors', icon: Store },
  { label: 'Products', href: '/admin/products', icon: Package },
  { label: 'Orders', href: '/admin/orders', icon: ShoppingBag },
  { label: 'Analytics', href: '/admin/analytics', icon: BarChart3 },
  { label: 'Reports', href: '/admin/reports', icon: FileText },
  { label: 'Settings', href: '/admin/settings', icon: Settings },
];

export default function AdminReportsPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const reportTypes = [
    { name: 'Sales Report', description: 'Detailed sales data and trends', icon: BarChart3, color: 'blue' },
    { name: 'User Activity', description: 'User engagement and behavior', icon: Users, color: 'green' },
    { name: 'Vendor Performance', description: 'Vendor sales and metrics', icon: Store, color: 'purple' },
    { name: 'Product Analytics', description: 'Product views and conversions', icon: Package, color: 'orange' },
    { name: 'Financial Summary', description: 'Revenue and commission breakdown', icon: ShoppingBag, color: 'red' },
    { name: 'Custom Report', description: 'Build your own custom report', icon: Filter, color: 'gray' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {sidebarOpen && (
        <div className="fixed inset-0 bg-black/50 z-40 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      <aside className={`fixed top-0 left-0 z-50 h-full w-64 bg-primary text-white transform transition-transform duration-200 ease-in-out lg:translate-x-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="flex items-center justify-between p-4 border-b border-white/10">
          <Link href="/" className="flex items-center gap-2">
            <Store className="w-8 h-8 text-secondary" />
            <span className="font-heading font-bold text-lg">Shop<span className="text-secondary">Things</span></span>
          </Link>
          <button onClick={() => setSidebarOpen(false)} className="lg:hidden p-1 hover:bg-white/10 rounded">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-4 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-red-500/20 rounded-full flex items-center justify-center">
              <Shield className="w-5 h-5 text-red-400" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-medium">Admin Panel</p>
              <p className="text-xs text-white/60">Super Administrator</p>
            </div>
          </div>
        </div>

        <nav className="p-4 space-y-1">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const isActive = item.href === '/admin/reports';
            return (
              <Link key={item.href} href={item.href} className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${isActive ? 'bg-secondary text-white' : 'text-white/80 hover:bg-white/10'}`}>
                <Icon className="w-5 h-5" />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-white/10">
          <Link href="/" className="flex items-center gap-3 px-3 py-2 text-white/80 hover:bg-white/10 rounded-lg transition-colors">
            <Store className="w-5 h-5" />
            <span>View Store</span>
          </Link>
          <button className="flex items-center gap-3 px-3 py-2 text-white/80 hover:bg-white/10 rounded-lg transition-colors w-full">
            <LogOut className="w-5 h-5" />
            <span>Log Out</span>
          </button>
        </div>
      </aside>

      <div className="lg:ml-64">
        <header className="bg-white border-b sticky top-0 z-30">
          <div className="flex items-center justify-between px-4 lg:px-6 py-4">
            <div className="flex items-center gap-4">
              <button onClick={() => setSidebarOpen(true)} className="lg:hidden p-2 hover:bg-gray-100 rounded-lg">
                <Menu className="w-5 h-5" />
              </button>
              <h1 className="text-xl font-heading font-bold text-primary">Reports</h1>
            </div>
            <Button variant="primary" className="flex items-center gap-2">
              <Download className="w-4 h-4" />
              Export All
            </Button>
          </div>
        </header>

        <main className="p-4 lg:p-6 space-y-6">
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-lg font-bold text-gray-900 mb-4">Generate Reports</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {reportTypes.map((report) => {
                const Icon = report.icon;
                return (
                  <button
                    key={report.name}
                    className="p-6 border-2 border-gray-200 rounded-lg hover:border-primary hover:bg-primary/5 transition-all text-left"
                  >
                    <Icon className={`w-10 h-10 text-${report.color}-600 mb-3`} />
                    <h3 className="font-semibold text-gray-900 mb-1">{report.name}</h3>
                    <p className="text-sm text-gray-600">{report.description}</p>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-lg font-bold text-gray-900 mb-4">Recent Reports</h2>
            <div className="text-center py-12 text-gray-500">
              <FileText className="w-12 h-12 text-gray-300 mx-auto mb-3" />
              <p>No reports generated yet</p>
              <p className="text-sm mt-1">Generate your first report above</p>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
