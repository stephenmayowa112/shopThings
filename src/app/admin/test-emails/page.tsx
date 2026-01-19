'use client';

import { useState } from 'react';
import { Button, Input, Select } from '@/components/ui';
import { Mail, Send, CheckCircle, AlertCircle } from 'lucide-react';

export default function TestEmailsPage() {
  const [email, setEmail] = useState('');
  const [emailType, setEmailType] = useState('welcome');
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<{ success: boolean; message?: string; error?: string } | null>(null);

  const emailTypes = [
    { value: 'welcome', label: 'Welcome Email' },
    { value: 'order', label: 'Order Confirmation' },
    { value: 'vendor-approval', label: 'Vendor Approval' },
    { value: 'vendor-rejection', label: 'Vendor Rejection' },
  ];

  const handleSendTest = async () => {
    if (!email) {
      setResult({ success: false, error: 'Please enter an email address' });
      return;
    }

    setIsLoading(true);
    setResult(null);

    try {
      const response = await fetch('/api/test-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          type: emailType,
          email: email,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setResult({ success: true, message: data.message });
      } else {
        setResult({ success: false, error: data.error });
      }
    } catch (error) {
      setResult({ success: false, error: 'Failed to send test email' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="bg-white rounded-xl shadow-sm border border-border p-8">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Mail className="w-8 h-8 text-blue-600" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Email System Test
          </h1>
          <p className="text-gray-600">
            Test the email functionality with Resend integration
          </p>
        </div>

        <div className="space-y-6">
          <Input
            label="Test Email Address"
            type="email"
            placeholder="Enter email to send test to"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <Select
            label="Email Type"
            value={emailType}
            onChange={(e) => setEmailType(e.target.value)}
            options={emailTypes}
          />

          <Button
            onClick={handleSendTest}
            isLoading={isLoading}
            disabled={!email}
            fullWidth
            size="lg"
            variant="primary"
          >
            <Send className="w-5 h-5 mr-2" />
            Send Test Email
          </Button>

          {result && (
            <div className={`p-4 rounded-lg border ${
              result.success 
                ? 'bg-green-50 border-green-200 text-green-800' 
                : 'bg-red-50 border-red-200 text-red-800'
            }`}>
              <div className="flex items-center">
                {result.success ? (
                  <CheckCircle className="w-5 h-5 mr-2" />
                ) : (
                  <AlertCircle className="w-5 h-5 mr-2" />
                )}
                <span className="font-medium">
                  {result.success ? 'Success!' : 'Error'}
                </span>
              </div>
              <p className="mt-1">
                {result.message || result.error}
              </p>
            </div>
          )}
        </div>

        <div className="mt-8 p-4 bg-gray-50 rounded-lg">
          <h3 className="font-semibold text-gray-900 mb-2">Email Configuration</h3>
          <div className="text-sm text-gray-600 space-y-1">
            <p><strong>From:</strong> ShopThings Africa &lt;noreply@shopthingsafrica.work.gd&gt;</p>
            <p><strong>Reply To:</strong> support@shopthingsafrica.work.gd</p>
            <p><strong>Provider:</strong> Resend</p>
            <p><strong>Status:</strong> <span className="text-green-600 font-medium">Configured</span></p>
          </div>
        </div>
      </div>
    </div>
  );
}