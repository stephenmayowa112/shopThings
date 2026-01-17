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
  Save,
  Globe,
  CreditCard,
  Mail,
  Bell,
  Lock,
  Palette,
  FileText,
  Truck,
  DollarSign,
  Percent,
  AlertCircle,
} from 'lucide-react';
import { Button, Input, Textarea } from '@/components/ui';

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

export default function AdminSettingsPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('general');
  const [isSaving, setIsSaving] = useState(false);

  // Settings state
  const [settings, setSettings] = useState({
    siteName: 'ShopThings Africa',
    siteDescription: 'Discover authentic African products from verified vendors',
    supportEmail: 'support@shopthings.africa',
    commissionRate: '10',
    currency: 'NGN',
    taxRate: '7.5',
    minWithdrawal: '5000',
    enableVendorRegistration: true,
    requireVendorApproval: true,
    enableProductModeration: true,
    maintenanceMode: false,
  });

  const handleSave = async () => {
    setIsSaving(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsSaving(false);
    alert('Settings saved successfully!');
  };

  const tabs = [
    { id: 'general', label: 'General', icon: Globe },
    { id: 'payments', label: 'Payments', icon: CreditCard },
    { id: 'email', label: 'Email', icon: Mail },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'security', label: 'Security', icon: Lock },
  ];

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

        {/* Admin Badge */}
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

        {/* Navigation */}
        <nav className="p-4 space-y-1">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const isActive = item.href === '/admin/settings';
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
            href="/"
            className="flex items-center gap-3 px-3 py-2 text-white/80 hover:bg-white/10 rounded-lg transition-colors"
          >
            <Store className="w-5 h-5" />
            <span>View Store</span>
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
              <h1 className="text-xl font-heading font-bold text-primary">Platform Settings</h1>
            </div>

            <Button onClick={handleSave} disabled={isSaving}>
              <Save className="w-4 h-4 mr-2" />
              {isSaving ? 'Saving...' : 'Save Changes'}
            </Button>
          </div>
        </header>

        {/* Content */}
        <main className="p-4 lg:p-6">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Tabs Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-xl shadow-sm p-2">
                {tabs.map((tab) => {
                  const Icon = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`
                        w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors text-left
                        ${activeTab === tab.id ? 'bg-primary text-white' : 'text-gray-700 hover:bg-gray-50'}
                      `}
                    >
                      <Icon className="w-5 h-5" />
                      <span className="font-medium">{tab.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Settings Content */}
            <div className="lg:col-span-3">
              <div className="bg-white rounded-xl shadow-sm p-6">
                {activeTab === 'general' && (
                  <div className="space-y-6">
                    <div>
                      <h2 className="text-lg font-bold text-primary mb-4">General Settings</h2>
                      <p className="text-sm text-muted-foreground mb-6">
                        Configure basic platform information and behavior
                      </p>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Site Name
                      </label>
                      <Input
                        value={settings.siteName}
                        onChange={(e) => setSettings({ ...settings, siteName: e.target.value })}
                        placeholder="ShopThings Africa"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Site Description
                      </label>
                      <Textarea
                        value={settings.siteDescription}
                        onChange={(e) => setSettings({ ...settings, siteDescription: e.target.value })}
                        placeholder="Describe your marketplace..."
                        rows={3}
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Support Email
                      </label>
                      <Input
                        type="email"
                        value={settings.supportEmail}
                        onChange={(e) => setSettings({ ...settings, supportEmail: e.target.value })}
                        placeholder="support@shopthings.africa"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Default Currency
                      </label>
                      <select
                        value={settings.currency}
                        onChange={(e) => setSettings({ ...settings, currency: e.target.value })}
                        className="w-full px-3 py-2 rounded-lg border border-input bg-background focus:outline-none focus:ring-2 focus:ring-ring"
                      >
                        <option value="NGN">Nigerian Naira (NGN)</option>
                        <option value="USD">US Dollar (USD)</option>
                        <option value="GHS">Ghanaian Cedi (GHS)</option>
                        <option value="KES">Kenyan Shilling (KES)</option>
                        <option value="ZAR">South African Rand (ZAR)</option>
                      </select>
                    </div>

                    <div className="pt-4 border-t">
                      <label className="flex items-center gap-3">
                        <input
                          type="checkbox"
                          checked={settings.maintenanceMode}
                          onChange={(e) => setSettings({ ...settings, maintenanceMode: e.target.checked })}
                          className="w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary"
                        />
                        <div>
                          <span className="font-medium text-gray-700">Maintenance Mode</span>
                          <p className="text-sm text-muted-foreground">
                            Temporarily disable the site for maintenance
                          </p>
                        </div>
                      </label>
                    </div>
                  </div>
                )}

                {activeTab === 'payments' && (
                  <div className="space-y-6">
                    <div>
                      <h2 className="text-lg font-bold text-primary mb-4">Payment Settings</h2>
                      <p className="text-sm text-muted-foreground mb-6">
                        Configure payment processing and commission rates
                      </p>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Platform Commission Rate (%)
                      </label>
                      <div className="relative">
                        <Input
                          type="number"
                          value={settings.commissionRate}
                          onChange={(e) => setSettings({ ...settings, commissionRate: e.target.value })}
                          placeholder="10"
                          min="0"
                          max="100"
                          step="0.1"
                        />
                        <Percent className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">
                        Percentage taken from each sale
                      </p>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Tax Rate (%)
                      </label>
                      <div className="relative">
                        <Input
                          type="number"
                          value={settings.taxRate}
                          onChange={(e) => setSettings({ ...settings, taxRate: e.target.value })}
                          placeholder="7.5"
                          min="0"
                          max="100"
                          step="0.1"
                        />
                        <Percent className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Minimum Withdrawal Amount
                      </label>
                      <div className="relative">
                        <Input
                          type="number"
                          value={settings.minWithdrawal}
                          onChange={(e) => setSettings({ ...settings, minWithdrawal: e.target.value })}
                          placeholder="5000"
                          min="0"
                        />
                        <DollarSign className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">
                        Minimum amount vendors can withdraw
                      </p>
                    </div>

                    <div className="p-4 bg-blue-50 border border-blue-100 rounded-lg">
                      <div className="flex gap-3">
                        <AlertCircle className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                        <div>
                          <p className="text-sm font-medium text-blue-900">Payment Gateway Configuration</p>
                          <p className="text-sm text-blue-700 mt-1">
                            Payment gateway settings (Paystack, Flutterwave) should be configured via environment variables.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'email' && (
                  <div className="space-y-6">
                    <div>
                      <h2 className="text-lg font-bold text-primary mb-4">Email Settings</h2>
                      <p className="text-sm text-muted-foreground mb-6">
                        Configure email service and templates
                      </p>
                    </div>

                    <div className="p-4 bg-yellow-50 border border-yellow-100 rounded-lg">
                      <div className="flex gap-3">
                        <AlertCircle className="w-5 h-5 text-yellow-600 shrink-0 mt-0.5" />
                        <div>
                          <p className="text-sm font-medium text-yellow-900">Email Service Not Configured</p>
                          <p className="text-sm text-yellow-700 mt-1">
                            Configure your email service provider (SendGrid, Mailgun, etc.) via environment variables.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'notifications' && (
                  <div className="space-y-6">
                    <div>
                      <h2 className="text-lg font-bold text-primary mb-4">Notification Settings</h2>
                      <p className="text-sm text-muted-foreground mb-6">
                        Configure system notifications and alerts
                      </p>
                    </div>

                    <div className="space-y-4">
                      <label className="flex items-center gap-3 p-4 border rounded-lg hover:bg-gray-50">
                        <input
                          type="checkbox"
                          defaultChecked
                          className="w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary"
                        />
                        <div className="flex-1">
                          <span className="font-medium text-gray-700">New Order Notifications</span>
                          <p className="text-sm text-muted-foreground">
                            Notify admins when new orders are placed
                          </p>
                        </div>
                      </label>

                      <label className="flex items-center gap-3 p-4 border rounded-lg hover:bg-gray-50">
                        <input
                          type="checkbox"
                          defaultChecked
                          className="w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary"
                        />
                        <div className="flex-1">
                          <span className="font-medium text-gray-700">Vendor Application Alerts</span>
                          <p className="text-sm text-muted-foreground">
                            Alert when new vendors apply
                          </p>
                        </div>
                      </label>

                      <label className="flex items-center gap-3 p-4 border rounded-lg hover:bg-gray-50">
                        <input
                          type="checkbox"
                          defaultChecked
                          className="w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary"
                        />
                        <div className="flex-1">
                          <span className="font-medium text-gray-700">Product Review Notifications</span>
                          <p className="text-sm text-muted-foreground">
                            Notify when products need review
                          </p>
                        </div>
                      </label>
                    </div>
                  </div>
                )}

                {activeTab === 'security' && (
                  <div className="space-y-6">
                    <div>
                      <h2 className="text-lg font-bold text-primary mb-4">Security Settings</h2>
                      <p className="text-sm text-muted-foreground mb-6">
                        Configure security and access control
                      </p>
                    </div>

                    <div className="space-y-4">
                      <label className="flex items-center gap-3 p-4 border rounded-lg hover:bg-gray-50">
                        <input
                          type="checkbox"
                          checked={settings.enableVendorRegistration}
                          onChange={(e) => setSettings({ ...settings, enableVendorRegistration: e.target.checked })}
                          className="w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary"
                        />
                        <div className="flex-1">
                          <span className="font-medium text-gray-700">Enable Vendor Registration</span>
                          <p className="text-sm text-muted-foreground">
                            Allow new vendors to register
                          </p>
                        </div>
                      </label>

                      <label className="flex items-center gap-3 p-4 border rounded-lg hover:bg-gray-50">
                        <input
                          type="checkbox"
                          checked={settings.requireVendorApproval}
                          onChange={(e) => setSettings({ ...settings, requireVendorApproval: e.target.checked })}
                          className="w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary"
                        />
                        <div className="flex-1">
                          <span className="font-medium text-gray-700">Require Vendor Approval</span>
                          <p className="text-sm text-muted-foreground">
                            Manually approve vendor applications
                          </p>
                        </div>
                      </label>

                      <label className="flex items-center gap-3 p-4 border rounded-lg hover:bg-gray-50">
                        <input
                          type="checkbox"
                          checked={settings.enableProductModeration}
                          onChange={(e) => setSettings({ ...settings, enableProductModeration: e.target.checked })}
                          className="w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary"
                        />
                        <div className="flex-1">
                          <span className="font-medium text-gray-700">Enable Product Moderation</span>
                          <p className="text-sm text-muted-foreground">
                            Review products before they go live
                          </p>
                        </div>
                      </label>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
