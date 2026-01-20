import { NextResponse } from 'next/server';
import { Resend } from 'resend';

export async function GET() {
  try {
    const apiKey = process.env.RESEND_API_KEY;
    
    if (!apiKey) {
      return NextResponse.json({ 
        error: 'RESEND_API_KEY not found in environment variables' 
      }, { status: 500 });
    }

    console.log('API Key found:', apiKey.substring(0, 10) + '...');

    const resend = new Resend(apiKey);
    
    // Test the API key by trying to get domains (this doesn't send an email)
    const { data, error } = await resend.domains.list();
    
    if (error) {
      console.error('Resend API error:', error);
      return NextResponse.json({ 
        error: 'API key validation failed',
        details: error 
      }, { status: 401 });
    }

    return NextResponse.json({ 
      success: true,
      message: 'API key is valid',
      keyPrefix: apiKey.substring(0, 10) + '...',
      domains: data
    });

  } catch (error) {
    console.error('Test error:', error);
    return NextResponse.json({ 
      error: 'Failed to test API key',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}