import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const errorReport = await request.json();
    
    // Log error to server console
    console.error('Client Error Report:', {
      message: errorReport.message,
      stack: errorReport.stack,
      context: errorReport.context,
      timestamp: errorReport.timestamp,
      severity: errorReport.severity,
    });

    // In production, you would send this to your error tracking service
    // Example: Sentry, LogRocket, DataDog, etc.
    
    // For now, we'll just acknowledge receipt
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Failed to process error report:', error);
    return NextResponse.json({ error: 'Failed to process error report' }, { status: 500 });
  }
}