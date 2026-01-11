'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  Store,
  Package,
  ShoppingBag,
  DollarSign,
  Eye,
  TrendingUp,
  TrendingDown,
  Plus,
  ExternalLink,
  Clock,
  ChevronRight,
  Bell,
  Settings,
  Menu,
  X,
  Home,
  BarChart3,
  Wallet,
  Users,
  LogOut,
  BadgeCheck,
} from 'lucide-react';
import { Button } from '@/components/ui';
import { useCurrencyStore } from '@/stores';
import { VendorDashboardStats } from '@/app/vendor/actions';

// Import Types or define interface for props
interface DashboardClientProps {
  data: VendorDashboardStats;
}

const NAV_ITEMS = [
  { label: 'Dashboard', href: '/vendor/dashboard', icon: Home },
  { label: 'Products', href: '/vendor/products', icon: Package },
  { label: 'Orders', href: '/vendor/orders', icon: ShoppingBag },
  { label: 'Analytics', href: '/vendor/analytics', icon: BarChart3 },
  { label: 'Wallet', href: '/vendor/wallet', icon: Wallet },
  { label: 'Customers', href: '/vendor/customers', icon: Users },
  { label: 'Settings', href: '/vendor/settings', icon: Settings },
];

const STATUS_COLORS: Record<string, string> = {
  pending: 'bg-yellow-100 text-yellow-800',
  processing: 'bg-blue-100 text-blue-800',
  shipped: 'bg-purple-100 text-purple-800',
  delivered: 'bg-green-100 text-green-800',
  cancelled: 'bg-red-100 text-red-800',
};

export default function DashboardClient({ data }: DashboardClientProps) {
  const { formatConvertedPrice } = useCurrencyStore();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const { vendor, stats, recentOrders, topProducts } = data;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed top-0 left-0 z-50 h-full w-64 bg-primary text-white transform transition-transform duration-200 ease-in-out
          lg:translate-x-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
        `}
      >
        <div className="flex items-center justify-between p-4 border-b border-white/10">
          <Link href="/" className="flex items-center gap-2">
            <Store className="w-8 h-8 text-secondary" />
            <span className="font-heading font-bold text-lg">
              Shop<span className="text-secondary">Things</span>
            </span>
          </Link>
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden p-1 hover:bg-white/10 rounded"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Vendor Info */}
        <div className="p-4 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-secondary/20 rounded-full flex items-center justify-center overflow-hidden">
              {vendor.logo_url ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={vendor.logo_url} alt={vendor.store_name} className="w-full h-full object-cover" />
              ) : (
                <span className="text-white font-bold">
                  {vendor.store_name.charAt(0)}
                </span>
              )}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-1">
                <p className="font-medium truncate text-sm">{vendor.store_name}</p>
                {vendor.is_verified && (
                  <BadgeCheck className="w-4 h-4 text-secondary flex-shrink-0" />
                )}
              </div>
              <p className="text-xs text-white/60 capitalize">{vendor.subscription} Plan</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="p-4 space-y-1">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const isActive = item.href === '/vendor/dashboard';
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`
                  flex items-center gap-3 px-3 py-2 rounded-lg transition-colors
                  ${isActive ? 'bg-secondary text-white' : 'text-white/80 hover:bg-white/10'}
                `}
              >
                <Icon className="w-5 h-5" />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Bottom Actions */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-white/10">
          <Link
            href={`/vendors/${vendor.id}`}
            className="flex items-center gap-3 px-3 py-2 text-white/80 hover:bg-white/10 rounded-lg transition-colors"
          >
            <ExternalLink className="w-5 h-5" />
            <span>View Public Store</span>
          </Link>
          <button className="flex items-center gap-3 px-3 py-2 text-white/80 hover:bg-white/10 rounded-lg transition-colors w-full">
            <LogOut className="w-5 h-5" />
            <span>Log Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="lg:ml-64">
        {/* Top Header */}
        <header className="bg-white border-b sticky top-0 z-30">
          <div className="flex items-center justify-between px-4 lg:px-6 py-4">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden p-2 hover:bg-gray-100 rounded-lg"
              >
                <Menu className="w-5 h-5" />
              </button>
              <h1 className="text-xl font-heading font-bold text-primary">Dashboard</h1>
            </div>
            
            <div className="flex items-center gap-3">
              <button className="relative p-2 hover:bg-gray-100 rounded-lg">
                <Bell className="w-5 h-5 text-gray-600" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
              </button>
              <Link href="/vendor/products/new">
                <Button size="sm">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Product
                </Button>
              </Link>
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <main className="p-4 lg:p-6">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            {/* Total Sales */}
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Sales</p>
                  <p className="text-2xl font-bold text-primary mt-1">
                    {formatConvertedPrice(stats.totalSales)}
                  </p>
                </div>
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <DollarSign className="w-6 h-6 text-green-600" />
                </div>
              </div>
              <div className="flex items-center gap-1 mt-3">
                {stats.salesChange > 0 ? (
                  <TrendingUp className="w-4 h-4 text-green-500" />
                ) : (
                  <TrendingDown className="w-4 h-4 text-gray-400" />
                )}
                <span className={`text-sm font-medium ${
                  stats.salesChange > 0 ? 'text-green-500' : 'text-gray-500'
                }`}>
                  {stats.salesChange > 0 ? `+${Math.abs(stats.salesChange)}%` : '--'}
                </span>
                <span className="text-sm text-muted-foreground">vs last month</span>
              </div>
            </div>

             {/* Total Orders */}
             <div className="bg-white rounded-xl p-6 shadow-sm">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Orders</p>
                  <p className="text-2xl font-bold text-primary mt-1">
                    {stats.totalOrders}
                  </p>
                </div>
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <ShoppingBag className="w-6 h-6 text-blue-600" />
                </div>
              </div>
              <div className="flex items-center gap-1 mt-3">
                <span className="text-sm text-muted-foreground">Lifetime orders</span>
              </div>
            </div>

            {/* Profile Views - We don't have this data actually, maybe swap for System Status or placeholder */}
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Active Listings</p>
                  <p className="text-2xl font-bold text-primary mt-1">
                   --
                  </p>
                </div>
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                  <Eye className="w-6 h-6 text-purple-600" />
                </div>
              </div>
              <div className="flex items-center gap-1 mt-3">
                <span className="text-sm text-muted-foreground">Products visible in store</span>
              </div>
            </div>

            {/* Wallet Balance */}
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Wallet Balance</p>
                  <p className="text-2xl font-bold text-primary mt-1">
                    {formatConvertedPrice(stats.walletBalance)}
                  </p>
                </div>
                <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                  <Wallet className="w-6 h-6 text-orange-600" />
                </div>
              </div>
              <p className="text-sm text-muted-foreground mt-3">
                Pending: {formatConvertedPrice(stats.pendingBalance)}
              </p>
            </div>
          </div>

          {/* Alert Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
            <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center">
                  <Clock className="w-5 h-5 text-yellow-600" />
                </div>
                <div>
                  <p className="font-medium text-yellow-800">Pending Orders</p>
                  <p className="text-sm text-yellow-600">{stats.pendingOrders} orders awaiting action</p>
                </div>
              </div>
              <Link href="/vendor/orders?status=pending">
                <Button variant="outline" size="sm" className="border-yellow-300 text-yellow-700 hover:bg-yellow-100">
                  View
                </Button>
              </Link>
            </div>

            <div className="bg-red-50 border border-red-200 rounded-xl p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                  <Package className="w-5 h-5 text-red-600" />
                </div>
                <div>
                  <p className="font-medium text-red-800">Low Stock Items</p>
                  <p className="text-sm text-red-600">{stats.lowStock} products need restocking</p>
                </div>
              </div>
              <Link href="/vendor/products?stock=low">
                <Button variant="outline" size="sm" className="border-red-300 text-red-700 hover:bg-red-100">
                  View
                </Button>
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Recent Orders */}
            <div className="lg:col-span-2 bg-white rounded-xl shadow-sm">
              <div className="flex items-center justify-between p-4 border-b">
                <h2 className="font-heading font-bold text-primary">Recent Orders</h2>
                <Link
                  href="/vendor/orders"
                  className="text-sm text-secondary hover:underline flex items-center gap-1"
                >
                  View All
                  <ChevronRight className="w-4 h-4" />
                </Link>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase">
                        Order
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase">
                        Product
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase">
                        Items
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase">
                        Total
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase">
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    {recentOrders.length === 0 ? (
                        <tr>
                            <td colSpan={5} className="px-4 py-8 text-center text-muted-foreground">
                                No recent orders found.
                            </td>
                        </tr>
                    ) : recentOrders.map((order) => (
                      <tr key={order.id} className="hover:bg-gray-50">
                        <td className="px-4 py-3">
                          <Link
                            href={`/vendor/orders/${order.id}`}
                            className="text-sm font-medium text-secondary hover:underline"
                          >
                            {order.order_number}
                          </Link>
                          <p className="text-xs text-muted-foreground">
                            {new Date(order.created_at).toLocaleDateString()}
                          </p>
                        </td>
                        <td className="px-4 py-3 text-sm truncate max-w-[150px]">{order.product_name}</td>
                        <td className="px-4 py-3 text-sm">{order.items}</td>
                        <td className="px-4 py-3 text-sm font-medium">
                          {formatConvertedPrice(order.total)}
                        </td>
                        <td className="px-4 py-3">
                          <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full capitalize ${
                            STATUS_COLORS[order.status] || 'bg-gray-100 text-gray-800'
                          }`}>
                            {order.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Top Products */}
            <div className="bg-white rounded-xl shadow-sm h-fit">
              <div className="flex items-center justify-between p-4 border-b">
                <h2 className="font-heading font-bold text-primary">Top Products</h2>
                <Link
                  href="/vendor/products"
                  className="text-sm text-secondary hover:underline flex items-center gap-1"
                >
                  View All
                  <ChevronRight className="w-4 h-4" />
                </Link>
              </div>
              <div className="p-4 space-y-4">
                {topProducts.length === 0 ? (
                    <div className="text-center text-muted-foreground py-4">No sales data yet.</div>
                ) : topProducts.map((product, index) => (
                  <div key={product.id} className="flex items-center gap-3">
                    <span className="w-6 h-6 bg-gray-100 rounded-full flex items-center justify-center text-xs font-medium text-muted-foreground">
                      {index + 1}
                    </span>
                    <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center overflow-hidden">
                      {product.image ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                      ) : (
                         <Package className="w-5 h-5 text-gray-400" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">{product.name}</p>
                      <p className="text-xs text-muted-foreground">{product.sales} sales</p>
                    </div>
                    <p className="text-sm font-medium text-primary">
                      {formatConvertedPrice(product.revenue)}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sales Chart Placeholder - Kept static for now as requested or future task */}
          <div className="mt-6 bg-white rounded-xl shadow-sm p-6">
            <h2 className="font-heading font-bold text-primary mb-4">Sales Overview</h2>
            <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
              <div className="text-center">
                <BarChart3 className="w-12 h-12 text-gray-300 mx-auto mb-2" />
                <p className="text-muted-foreground">Real-time charts coming soon</p>
                <p className="text-sm text-muted-foreground">Data collection in progress</p>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
