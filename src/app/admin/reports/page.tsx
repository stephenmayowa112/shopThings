'use client';

import { useState } from 'react';
import {
  Store,
  Package,
  BarChart3,
  Users,
  ShoppingBag,
  FileText,
  Download,
  Filter,
} from 'lucide-react';
import { Button } from '@/components/ui';
import { AdminLayout } from '@/components/admin';

export default function AdminReportsPage() {
  const reportTypes = [
    { name: 'Sales Report', description: 'Detailed sales data and trends', icon: BarChart3, color: 'blue' },
    { name: 'User Activity', description: 'User engagement and behavior', icon: Users, color: 'green' },
    { name: 'Vendor Performance', description: 'Vendor sales and metrics', icon: Store, color: 'purple' },
    { name: 'Product Analytics', description: 'Product views and conversions', icon: Package, color: 'orange' },
    { name: 'Financial Summary', description: 'Revenue and commission breakdown', icon: ShoppingBag, color: 'red' },
    { name: 'Custom Report', description: 'Build your own custom report', icon: Filter, color: 'gray' },
  ];

  const headerActions = (
    <Button variant="primary" className="flex items-center gap-2">
      <Download className="w-4 h-4" />
      Export All
    </Button>
  );

  return (
    <AdminLayout title="Reports" headerActions={headerActions}>
      <div className="space-y-6">
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-lg font-bold text-gray-900 mb-4">Generate Reports</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {reportTypes.map((report) => {
              const Icon = report.icon;
              return (
                <button
                  key={report.name}
                  type="button"
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
      </div>
    </AdminLayout>
  );
}
