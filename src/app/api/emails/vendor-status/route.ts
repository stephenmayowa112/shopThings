import { NextRequest, NextResponse } from 'next/server';
import { handleVendorStatusChange } from '@/lib/email-hooks';

export async function POST(request: NextRequest) {
  try {
    const { vendorId, approved, reason } = await request.json();

    if (!vendorId || typeof approved !== 'boolean') {
      return NextResponse.json({ error: 'Vendor ID and approval status are required' }, { status: 400 });
    }

    await handleVendorStatusChange(vendorId, approved, reason);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Vendor status email error:', error);
    return NextResponse.json({ error: 'Failed to send vendor status email' }, { status: 500 });
  }
}