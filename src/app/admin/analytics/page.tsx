'use client';

import { useState } from 'react';
import {
  BarChart3,
  TrendingUp,
  DollarSign,
  Calendar,
} from 'lucide-react';
import { AdminLayout } from '@/components/admin';

export default function AdminAnalyticsPage() {
  return (
    <AdminLayout title="Analytics">
      <div className="bg-white rounded-xl shadow-sm p-8 text-center">
        <BarChart3 className="w-16 h-16 text-gray-300 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Analytics Dashboard</h2>
        <p className="text-gray-600 mb-6">Advanced analytics and reporting features coming soon.</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
          <div className="p-6 bg-blue-50 rounded-lg">
            <TrendingUp className="w-8 h-8 text-blue-600 mx-auto mb-2" />
            <h3 className="font-semibold text-gray-900">Sales Trends</h3>
            <p className="text-sm text-gray-600 mt-1">Track sales performance over time</p>
          </div>
          <div className="p-6 bg-green-50 rounded-lg">
            <DollarSign className="w-8 h-8 text-green-600 mx-auto mb-2" />
            <h3 className="font-semibold text-gray-900">Revenue Analysis</h3>
            <p className="text-sm text-gray-600 mt-1">Detailed revenue breakdowns</p>
          </div>
          <div className="p-6 bg-purple-50 rounded-lg">
            <Calendar className="w-8 h-8 text-purple-600 mx-auto mb-2" />
            <h3 className="font-semibold text-gray-900">Custom Reports</h3>
            <p className="text-sm text-gray-600 mt-1">Generate custom date range reports</p>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
