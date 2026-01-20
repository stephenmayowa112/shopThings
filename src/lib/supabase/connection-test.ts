/**
 * Supabase connection testing utilities
 */

import { createClient } from './client';

export interface ConnectionTestResult {
  success: boolean;
  error?: string;
  latency?: number;
  details?: {
    url: string;
    timestamp: string;
    userAgent: string;
  };
}

/**
 * Test basic Supabase connection
 */
export async function testSupabaseConnection(): Promise<ConnectionTestResult> {
  const startTime = Date.now();
  
  try {
    const supabase = createClient();
    
    // Simple query to test connection
    const { data, error } = await supabase
      .from('categories')
      .select('id')
      .limit(1);
    
    const latency = Date.now() - startTime;
    
    if (error) {
      return {
        success: false,
        error: error.message,
        latency,
        details: {
          url: process.env.NEXT_PUBLIC_SUPABASE_URL || 'unknown',
          timestamp: new Date().toISOString(),
          userAgent: typeof navigator !== 'undefined' ? navigator.userAgent : 'server',
        },
      };
    }
    
    return {
      success: true,
      latency,
      details: {
        url: process.env.NEXT_PUBLIC_SUPABASE_URL || 'unknown',
        timestamp: new Date().toISOString(),
        userAgent: typeof navigator !== 'undefined' ? navigator.userAgent : 'server',
      },
    };
  } catch (err) {
    const latency = Date.now() - startTime;
    
    return {
      success: false,
      error: err instanceof Error ? err.message : 'Unknown error',
      latency,
      details: {
        url: process.env.NEXT_PUBLIC_SUPABASE_URL || 'unknown',
        timestamp: new Date().toISOString(),
        userAgent: typeof navigator !== 'undefined' ? navigator.userAgent : 'server',
      },
    };
  }
}

/**
 * Test authentication endpoint specifically
 */
export async function testAuthConnection(): Promise<ConnectionTestResult> {
  const startTime = Date.now();
  
  try {
    const supabase = createClient();
    
    // Test auth endpoint by getting current session
    const { data, error } = await supabase.auth.getSession();
    
    const latency = Date.now() - startTime;
    
    if (error) {
      return {
        success: false,
        error: error.message,
        latency,
        details: {
          url: process.env.NEXT_PUBLIC_SUPABASE_URL || 'unknown',
          timestamp: new Date().toISOString(),
          userAgent: typeof navigator !== 'undefined' ? navigator.userAgent : 'server',
        },
      };
    }
    
    return {
      success: true,
      latency,
      details: {
        url: process.env.NEXT_PUBLIC_SUPABASE_URL || 'unknown',
        timestamp: new Date().toISOString(),
        userAgent: typeof navigator !== 'undefined' ? navigator.userAgent : 'server',
      },
    };
  } catch (err) {
    const latency = Date.now() - startTime;
    
    return {
      success: false,
      error: err instanceof Error ? err.message : 'Unknown error',
      latency,
      details: {
        url: process.env.NEXT_PUBLIC_SUPABASE_URL || 'unknown',
        timestamp: new Date().toISOString(),
        userAgent: typeof navigator !== 'undefined' ? navigator.userAgent : 'server',
      },
    };
  }
}

/**
 * Run comprehensive connection tests
 */
export async function runConnectionTests(): Promise<{
  database: ConnectionTestResult;
  auth: ConnectionTestResult;
  overall: boolean;
}> {
  const [databaseTest, authTest] = await Promise.all([
    testSupabaseConnection(),
    testAuthConnection(),
  ]);
  
  return {
    database: databaseTest,
    auth: authTest,
    overall: databaseTest.success && authTest.success,
  };
}