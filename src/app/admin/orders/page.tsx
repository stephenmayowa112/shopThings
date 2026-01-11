'use client';

import { useState, useEffect } from 'react';
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
  Search,
  Download,
  MoreVertical,
  Calendar,
  CreditCard,
  Truck,
  CheckCircle,
  XCircle,
  Clock,
  AlertCircle
} from 'lucide-react';
import { Button, Input } from '@/components/ui';
import { useCurrencyStore } from '@/stores';
import { getAdminOrdersList, getAdminDashboardStats, DashboardStats } from '../actions';

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

// Placeholder component for FileText as it was missing from lucide-react imports in previous file too, but works if imported?
// Actually FileText is in lucide-react.
import { FileText } from 'lucide-react';

const STATUS_CONFIG: Record<string, { label: string; bg: string; text: string; icon: any }> = {
  completed: { label: 'Paid', bg: 'bg-green-100', text: 'text-green-800', icon: CheckCircle },
  pending: { label: 'Pending', bg: 'bg-yellow-100', text: 'text-yellow-800', icon: Clock },
  failed: { label: 'Failed', bg: 'bg-red-100', text: 'text-red-800', icon: XCircle },
  refunded: { label: 'Refunded', bg: 'bg-gray-100', text: 'text-gray-800', icon: AlertCircle },
};

export default function AdminOrdersPage() {
  const { formatConvertedPrice } = useCurrencyStore();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [orders, setOrders] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [totalCount, setTotalCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [stats, setStats] = useState<DashboardStats | null>(null);

  const [selectedOrder, setSelectedOrder] = useState<string | null>(null);

  const fetchOrders = async () => {
      setIsLoading(true);
      try {
          const { orders: data, count } = await getAdminOrdersList(currentPage, 20, searchQuery, statusFilter);
          setOrders(data);
          setTotalCount(count);
      } catch (err) {
          console.error(err);
      } finally {
          setIsLoading(false);
      }
  };

  useEffect(() => {
    fetchOrders();
  }, [currentPage, searchQuery, statusFilter]);

  useEffect(() => {
    getAdminDashboardStats().then(setStats);
  }, []);

  const selectedOrderData = orders.find(o => o.id === selectedOrder);

  return (
    <div className='min-h-screen bg-gray-50'>
      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div
          className='fixed inset-0 bg-black/50 z-40 lg:hidden'
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
        <div className='flex items-center justify-between p-4 border-b border-white/10'>
            <Link href='/' className='flex items-center gap-2'>
            <Store className='w-8 h-8 text-secondary' />
            <span className='font-heading font-bold text-lg'>
                Shop<span className='text-secondary'>Things</span>
            </span>
            </Link>
            <button
            onClick={() => setSidebarOpen(false)}
            className='lg:hidden p-1 hover:bg-white/10 rounded'
            >
            <X className='w-5 h-5' />
            </button>
        </div>

        {/* Admin Badge */}
        <div className='p-4 border-b border-white/10'>
            <div className='flex items-center gap-3'>
            <div className='w-10 h-10 bg-red-500/20 rounded-full flex items-center justify-center'>
                <Shield className='w-5 h-5 text-red-400' />
            </div>
            <div className='flex-1 min-w-0'>
                <p className='font-medium'>Admin Panel</p>
                <p className='text-xs text-white/60'>Super Administrator</p>
            </div>
            </div>
        </div>

        {/* Navigation */}
        <nav className='p-4 space-y-1'>
            {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const isActive = item.href === '/admin/orders';
            return (
                <Link
                key={item.href}
                href={item.href}
                className={`
                    flex items-center gap-3 px-3 py-2 rounded-lg transition-colors
                    ${isActive ? 'bg-secondary text-white' : 'text-white/80 hover:bg-white/10'}
                `}
                >
                <Icon className='w-5 h-5' />
                <span>{item.label}</span>
                </Link>
            );
            })}
        </nav>

        {/* Bottom Actions */}
        <div className='absolute bottom-0 left-0 right-0 p-4 border-t border-white/10'>
            <Link
            href='/'
            className='flex items-center gap-3 px-3 py-2 text-white/80 hover:bg-white/10 rounded-lg transition-colors'
            >
            <Store className='w-5 h-5' />
            <span>View Store</span>
            </Link>
            <button className='flex items-center gap-3 px-3 py-2 text-white/80 hover:bg-white/10 rounded-lg transition-colors w-full'>
            <LogOut className='w-5 h-5' />
            <span>Log Out</span>
            </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className='lg:ml-64'>
        {/* Top Header */}
        <header className='bg-white border-b sticky top-0 z-30'>
          <div className='flex items-center justify-between px-4 lg:px-6 py-4'>
            <div className='flex items-center gap-4'>
              <button
                onClick={() => setSidebarOpen(true)}
                className='lg:hidden p-2 hover:bg-gray-100 rounded-lg'
              >
                <Menu className='w-5 h-5' />
              </button>
              <h1 className='text-xl font-heading font-bold text-primary'>Orders Management</h1>
            </div>

            <Button variant='outline'>
              <Download className='w-4 h-4 mr-2' />
              Export CSV
            </Button>
          </div>
        </header>

        {/* Content */}
        <main className='p-4 lg:p-6'>
          {/* Stats */}
            <div className='grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6'>
            <div className='bg-white rounded-xl p-4 shadow-sm'>
                <p className='text-sm text-muted-foreground'>Total Revenue</p>
                <p className='text-2xl font-bold text-primary mt-1'>
                    {formatConvertedPrice(stats?.financials?.revenue || 0)}
                </p>
            </div>
            <div className='bg-white rounded-xl p-4 shadow-sm'>
                <p className='text-sm text-muted-foreground'>Total Orders</p>
                <p className='text-2xl font-bold text-blue-600 mt-1'>
                    {totalCount}
                </p>
            </div>
             {/* More stats placeholder */}
            </div>

            <div className='grid grid-cols-1 lg:grid-cols-3 gap-6'>
                {/* Orders List */}
                <div className='lg:col-span-2 space-y-4'>
                    {/* Filters */}
                    <div className='bg-white rounded-xl shadow-sm p-4'>
                    <div className='flex flex-col sm:flex-row gap-4'>
                        <div className='flex-1 relative'>
                        <Search className='absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground' />
                        <Input
                            type='text'
                            placeholder='Search order #...'
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className='pl-10'
                        />
                        </div>
                        <select
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                        className='px-3 py-2 rounded-lg border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent'
                        >
                        <option value='all'>All Payments</option>
                        <option value='completed'>Paid</option>
                        <option value='pending'>Pending</option>
                        <option value='failed'>Failed</option>
                        </select>
                    </div>
                    </div>

                    {/* Order Cards */}
                    {isLoading ? (
                        <div className='text-center p-8'>Loading orders...</div>
                    ) : orders.length === 0 ? (
                        <div className='text-center p-8'>No orders found.</div>
                    ) : (
                        orders.map((order) => {
                        const statusConfig = STATUS_CONFIG[order.payment_status] || STATUS_CONFIG['pending'];
                        const StatusIcon = statusConfig.icon;

                        return (
                            <div
                            key={order.id}
                            className={`bg-white rounded-xl shadow-sm overflow-hidden cursor-pointer transition-shadow hover:shadow-md ${
                                selectedOrder === order.id ? 'ring-2 ring-secondary' : ''
                            }`}
                            onClick={() => setSelectedOrder(order.id)}
                            >
                            <div className='flex flex-col sm:flex-row gap-4 p-4 items-start sm:items-center justify-between'>
                                <div>
                                    <h3 className='font-bold text-gray-900'>Order #{order.order_number}</h3>
                                    <p className='text-sm text-gray-500'>{order.customer?.full_name || order.customer?.email}</p>
                                    <p className='text-xs text-gray-400 mt-1'>{new Date(order.created_at).toLocaleString()}</p>
                                </div>
                                <div className='flex items-center gap-4'>
                                    <span className='font-bold text-primary'>{formatConvertedPrice(order.total)}</span>
                                    <span className={`flex items-center gap-1 text-xs font-medium px-2 py-0.5 rounded-full ${statusConfig.bg} ${statusConfig.text}`}>
                                        <StatusIcon className='w-3 h-3' />
                                        <span>{statusConfig.label}</span>
                                    </span>
                                </div>
                            </div>
                            </div>
                        );
                        })
                    )}
                    <div className='flex justify-between items-center bg-white p-4 rounded-xl shadow-sm'>
                        <Button variant='outline' disabled={currentPage === 1} onClick={() => setCurrentPage(p => p - 1)}>Previous</Button>
                        <div className='text-sm text-gray-500'>Page {currentPage}</div>
                        <Button variant='outline' disabled={orders.length < 20} onClick={() => setCurrentPage(p => p + 1)}>Next</Button>
                    </div>
                </div>

                {/* Order Details Sidebar */}
                <div className='lg:col-span-1'>
                    {selectedOrder ? (
                         <div className='bg-white rounded-xl shadow-sm p-4 sticky top-24'>
                            <div className='flex items-start justify-between mb-4'>
                                <h2 className='font-bold text-lg'>Order Details</h2>
                                <button
                                onClick={() => setSelectedOrder(null)}
                                className='p-1 hover:bg-gray-100 rounded-full lg:hidden'
                                >
                                <X className='w-5 h-5' />
                                </button>
                            </div>

                            {selectedOrderData && (
                                <div className='space-y-4'>
                                    <div>
                                        <label className='text-xs text-gray-500 uppercase'>Customer</label>
                                        <p className='font-medium'>{selectedOrderData.customer?.full_name}</p>
                                        <p className='text-sm text-gray-600'>{selectedOrderData.customer?.email}</p>
                                    </div>
                                    <div>
                                        <label className='text-xs text-gray-500 uppercase'>Payment Status</label>
                                        <div className='mt-1'>
                                            <span className='capitalize px-2 py-1 bg-gray-100 rounded text-sm'>
                                                {selectedOrderData.payment_status}
                                            </span>
                                        </div>
                                    </div>
                                    <div>
                                        <label className='text-xs text-gray-500 uppercase'>Total Amount</label>
                                        <p className='font-bold text-xl text-primary'>{formatConvertedPrice(selectedOrderData.total)}</p>
                                    </div>

                                    {/* Note: Items would require another query or joined fetch. For now we show summary. */}
                                    <div className='pt-4 border-t'>
                                        <p className='text-sm text-gray-500 italic'>
                                            Order items details not loaded in this view.
                                        </p>
                                    </div>
                                </div>
                            )}

                        </div>
                    ) : (
                        <div className='bg-white rounded-xl shadow-sm p-8 text-center text-gray-500 sticky top-24'>
                            <ShoppingBag className='w-12 h-12 mx-auto mb-3 opacity-20' />
                            <p>Select an order to view details.</p>
                        </div>
                    )}
                </div>
            </div>
        </main>
      </div>
    </div>
  );
}
