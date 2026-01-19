/**
 * Error tracking and monitoring utilities
 * Integrates with Sentry for production error tracking
 */

interface ErrorContext {
  userId?: string;
  userRole?: string;
  page?: string;
  action?: string;
  metadata?: Record<string, any>;
}

interface ErrorReport {
  message: string;
  stack?: string;
  context?: ErrorContext;
  timestamp: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
}

/**
 * Initialize error tracking
 */
export function initErrorTracking() {
  if (typeof window === 'undefined') return;

  // Global error handler
  window.addEventListener('error', (event) => {
    trackError(event.error, {
      page: window.location.pathname,
      action: 'global_error',
    }, 'high');
  });

  // Unhandled promise rejection handler
  window.addEventListener('unhandledrejection', (event) => {
    trackError(new Error(event.reason), {
      page: window.location.pathname,
      action: 'unhandled_promise',
    }, 'high');
  });

  console.log('Error tracking initialized');
}

/**
 * Track an error
 */
export function trackError(
  error: Error | string,
  context?: ErrorContext,
  severity: ErrorReport['severity'] = 'medium'
) {
  const errorReport: ErrorReport = {
    message: typeof error === 'string' ? error : error.message,
    stack: typeof error === 'object' ? error.stack : undefined,
    context,
    timestamp: new Date().toISOString(),
    severity,
  };

  // Log to console in development
  if (process.env.NODE_ENV === 'development') {
    console.error('Error tracked:', errorReport);
  }

  // Send to error tracking service in production
  if (process.env.NODE_ENV === 'production') {
    sendToErrorService(errorReport);
  }

  // Store locally for debugging
  storeErrorLocally(errorReport);
}

/**
 * Track user action for debugging
 */
export function trackUserAction(action: string, metadata?: Record<string, any>) {
  if (process.env.NODE_ENV === 'development') {
    console.log('User action:', action, metadata);
  }

  // Store action for error context
  if (typeof window !== 'undefined') {
    const actions = JSON.parse(localStorage.getItem('user_actions') || '[]');
    actions.push({
      action,
      metadata,
      timestamp: new Date().toISOString(),
    });

    // Keep only last 50 actions
    if (actions.length > 50) {
      actions.splice(0, actions.length - 50);
    }

    localStorage.setItem('user_actions', JSON.stringify(actions));
  }
}

/**
 * Send error to external service (Sentry, LogRocket, etc.)
 */
async function sendToErrorService(errorReport: ErrorReport) {
  try {
    // Example: Send to Sentry
    if (process.env.NEXT_PUBLIC_SENTRY_DSN) {
      // Sentry integration would go here
      console.log('Would send to Sentry:', errorReport);
    }

    // Example: Send to custom endpoint
    await fetch('/api/errors', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(errorReport),
    });
  } catch (err) {
    console.error('Failed to send error to tracking service:', err);
  }
}

/**
 * Store error locally for debugging
 */
function storeErrorLocally(errorReport: ErrorReport) {
  if (typeof window === 'undefined') return;

  try {
    const errors = JSON.parse(localStorage.getItem('error_reports') || '[]');
    errors.push(errorReport);

    // Keep only last 100 errors
    if (errors.length > 100) {
      errors.splice(0, errors.length - 100);
    }

    localStorage.setItem('error_reports', JSON.stringify(errors));
  } catch (err) {
    console.error('Failed to store error locally:', err);
  }
}

/**
 * Get stored errors for debugging
 */
export function getStoredErrors(): ErrorReport[] {
  if (typeof window === 'undefined') return [];

  try {
    return JSON.parse(localStorage.getItem('error_reports') || '[]');
  } catch {
    return [];
  }
}

/**
 * Clear stored errors
 */
export function clearStoredErrors() {
  if (typeof window === 'undefined') return;
  localStorage.removeItem('error_reports');
  localStorage.removeItem('user_actions');
}

/**
 * Performance monitoring
 */
export function trackPerformance(name: string, startTime: number) {
  const duration = Date.now() - startTime;
  
  if (process.env.NODE_ENV === 'development') {
    console.log(`Performance: ${name} took ${duration}ms`);
  }

  // Track slow operations
  if (duration > 2000) {
    trackError(`Slow operation: ${name} took ${duration}ms`, {
      action: 'performance_issue',
      metadata: { duration, operation: name },
    }, 'medium');
  }
}

/**
 * API error handler
 */
export function handleApiError(error: any, endpoint: string, context?: ErrorContext) {
  const errorMessage = error?.message || 'API request failed';
  
  trackError(errorMessage, {
    ...context,
    action: 'api_error',
    metadata: {
      endpoint,
      status: error?.status,
      response: error?.response,
    },
  }, 'high');
}

/**
 * Database error handler
 */
export function handleDatabaseError(error: any, operation: string, context?: ErrorContext) {
  const errorMessage = error?.message || 'Database operation failed';
  
  trackError(errorMessage, {
    ...context,
    action: 'database_error',
    metadata: {
      operation,
      code: error?.code,
      details: error?.details,
    },
  }, 'critical');
}

/**
 * Authentication error handler
 */
export function handleAuthError(error: any, context?: ErrorContext) {
  const errorMessage = error?.message || 'Authentication failed';
  
  trackError(errorMessage, {
    ...context,
    action: 'auth_error',
    metadata: {
      code: error?.code,
      status: error?.status,
    },
  }, 'high');
}

/**
 * File upload error handler
 */
export function handleUploadError(error: any, fileName: string, context?: ErrorContext) {
  const errorMessage = error?.message || 'File upload failed';
  
  trackError(errorMessage, {
    ...context,
    action: 'upload_error',
    metadata: {
      fileName,
      fileSize: error?.fileSize,
      fileType: error?.fileType,
    },
  }, 'medium');
}

/**
 * Payment error handler
 */
export function handlePaymentError(error: any, amount: number, context?: ErrorContext) {
  const errorMessage = error?.message || 'Payment failed';
  
  trackError(errorMessage, {
    ...context,
    action: 'payment_error',
    metadata: {
      amount,
      paymentMethod: error?.paymentMethod,
      code: error?.code,
    },
  }, 'critical');
}

/**
 * Get error statistics
 */
export function getErrorStats(): {
  total: number;
  bySeverity: Record<string, number>;
  byAction: Record<string, number>;
  recent: ErrorReport[];
} {
  const errors = getStoredErrors();
  
  const bySeverity: Record<string, number> = {};
  const byAction: Record<string, number> = {};
  
  errors.forEach(error => {
    bySeverity[error.severity] = (bySeverity[error.severity] || 0) + 1;
    const action = error.context?.action || 'unknown';
    byAction[action] = (byAction[action] || 0) + 1;
  });
  
  // Get recent errors (last 24 hours)
  const oneDayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);
  const recent = errors.filter(error => 
    new Date(error.timestamp) > oneDayAgo
  );
  
  return {
    total: errors.length,
    bySeverity,
    byAction,
    recent,
  };
}