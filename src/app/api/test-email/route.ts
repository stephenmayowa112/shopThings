import { NextRequest, NextResponse } from 'next/server';
import { sendWelcomeEmail, sendOrderConfirmationEmail, sendVendorApprovalEmail } from '@/lib/email';

export async function POST(request: NextRequest) {
  try {
    const { type, email } = await request.json();

    if (!email) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 });
    }

    let result;

    switch (type) {
      case 'welcome':
        result = await sendWelcomeEmail({
          name: 'Test User',
          email: email,
        });
        break;

      case 'order':
        result = await sendOrderConfirmationEmail({
          orderNumber: 'TEST-001',
          customerName: 'Test Customer',
          email: email,
          total: 99.99,
          currency: 'NGN',
          items: [
            {
              name: 'Test Product',
              quantity: 1,
              price: 99.99,
            },
          ],
          shippingAddress: {
            fullName: 'Test Customer',
            addressLine1: '123 Test Street',
            city: 'Lagos',
            state: 'Lagos',
            postalCode: '100001',
            country: 'Nigeria',
          },
        });
        break;

      case 'vendor-approval':
        result = await sendVendorApprovalEmail({
          vendorName: 'Test Vendor',
          storeName: 'Test Store',
          email: email,
          approved: true,
        });
        break;

      case 'vendor-rejection':
        result = await sendVendorApprovalEmail({
          vendorName: 'Test Vendor',
          storeName: 'Test Store',
          email: email,
          approved: false,
          reason: 'This is a test rejection for demonstration purposes.',
        });
        break;

      default:
        return NextResponse.json({ error: 'Invalid email type' }, { status: 400 });
    }

    if (result.success) {
      return NextResponse.json({ 
        success: true, 
        message: `${type} email sent successfully to ${email}` 
      });
    } else {
      return NextResponse.json({ 
        error: result.error || 'Failed to send email' 
      }, { status: 500 });
    }

  } catch (error) {
    console.error('Test email error:', error);
    return NextResponse.json({ 
      error: 'Internal server error' 
    }, { status: 500 });
  }
}