'use client';

import { useState } from 'react';
import {
  Save,
  Globe,
  CreditCard,
  Mail,
  Bell,
  Lock,
  Percent,
  DollarSign,
  AlertCircle,
} from 'lucide-react';
import { Button, Input, Textarea } from '@/components/ui';
import { AdminLayout } from '@/components/admin';

export default function AdminSettingsPage() {
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

  const headerActions = (
    <Button onClick={handleSave} disabled={isSaving}>
      <Save className="w-4 h-4 mr-2" />
      {isSaving ? 'Saving...' : 'Save Changes'}
    </Button>
  );

  return (
    <AdminLayout title="Platform Settings" headerActions={headerActions}>
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
                  type="button"
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
                    aria-label="Select default currency"
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
    </AdminLayout>
  );
}
