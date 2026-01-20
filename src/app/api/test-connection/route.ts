import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export async function GET() {
  try {
    const supabase = await createClient();
    
    // Test database connection
    const { data, error } = await supabase
      .from('categories')
      .select('id')
      .limit(1);
    
    if (error) {
      return NextResponse.json({
        success: false,
        error: error.message,
        timestamp: new Date().toISOString(),
      }, { status: 500 });
    }
    
    // Test auth connection
    const { data: session, error: authError } = await supabase.auth.getSession();
    
    if (authError) {
      return NextResponse.json({
        success: false,
        error: `Auth error: ${authError.message}`,
        timestamp: new Date().toISOString(),
      }, { status: 500 });
    }
    
    return NextResponse.json({
      success: true,
      message: 'Supabase connection successful',
      database: data ? 'Connected' : 'No data',
      auth: 'Connected',
      timestamp: new Date().toISOString(),
    });
    
  } catch (err) {
    console.error('Connection test error:', err);
    
    return NextResponse.json({
      success: false,
      error: err instanceof Error ? err.message : 'Unknown error',
      timestamp: new Date().toISOString(),
    }, { status: 500 });
  }
}