/**
 * Error tracking and monitoring system
 * Provides centralized error handling, logging, and reporting
 */

import React from 'react';

export interface ErrorContext {
  userId?: string;
  userEmail?: string;
  userRole?: string;
  url?: string;
  userAgent?: string;
  timestamp?: string;
  sessionId?: string;
  additionalData?: Record<string, any>;
}

export interface ErrorReport {
  id: string;
  message: string;
  stack?: string;
  level: 'error' | 'warning' | 'info';
  context: ErrorContext;
  fingerprint: string;
  count: number;
  firstSeen: string;
  lastSeen: string;
}

class ErrorTracker {
  private errors: Map<string, ErrorReport> = new Map();
  private isProduction = process.env.NODE_ENV === 'production';
  private apiEndpoint = '/api/errors';

  /**
   * Generate fingerprint for error deduplication
   */
  private generateFingerprint(error: Error, context: ErrorContext): string {
    const key = `${error.name}:${error.message}:${context.url || 'unknown'}`;
    return btoa(key).replace(/[^a-zA-Z0-9]/g, '').substring(0, 32);
  }

  /**
   * Capture and track error
   */
  async captureError(
    error: Error | string,
    level: 'error' | 'warning' | 'info' = 'error',
    context: ErrorContext = {}
  ): Promise<void> {
    try {
      const errorObj = typeof error === 'string' ? new Error(error) : error;
      const timestamp = new Date().toISOString();
      
      // Enhance context with browser info
      const enhancedContext: ErrorContext = {
        ...context,
        url: context.url || (typeof window !== 'undefined' ? window.location.href : undefined),
        userAgent: context.userAgent || (typeof navigator !== 'undefined' ? navigator.userAgent : undefined),
        timestamp,
        sessionId: context.sessionId || this.getSessionId(),
      };

      const fingerprint = this.generateFingerprint(errorObj, enhancedContext);
      
      // Check if error already exists
      const existingError = this.errors.get(fingerprint);
      
      if (existingError) {
        // Update existing error
        existingError.count++;
        existingError.lastSeen = timestamp;
        existingError.context = { ...existingError.context, ...enhancedContext };
      } else {
        // Create new error report
        const errorReport: ErrorReport = {
          id: this.generateId(),
          message: errorObj.message,
          stack: errorObj.stack,
          level,
          context: enhancedContext,
          fingerprint,
          count: 1,
          firstSeen: timestamp,
          lastSeen: timestamp,
        };
        
        this.errors.set(fingerprint, errorReport);
      }

      // Log to console in development
      if (!this.isProduction) {
        console.group(`🚨 Error Tracked (${level.toUpperCase()})`);
        console.error('Message:', errorObj.message);
        console.error('Stack:', errorObj.stack);
        console.error('Context:', enhancedContext);
        console.groupEnd();
      }

      // Send to server in production
      if (this.isProduction) {
        await this.sendToServer(this.errors.get(fingerprint)!);
      }

    } catch (trackingError) {
      console.error('Error tracking failed:', trackingError);
    }
  }

  /**
   * Capture exception with automatic context
   */
  async captureException(error: Error, additionalContext?: Record<string, any>): Promise<void> {
    const context: ErrorContext = {
      ...additionalContext,
      url: typeof window !== 'undefined' ? window.location.href : undefined,
    };

    await this.captureError(error, 'error', context);
  }

  /**
   * Capture message
   */
  async captureMessage(
    message: string, 
    level: 'error' | 'warning' | 'info' = 'info',
    context?: ErrorContext
  ): Promise<void> {
    await this.captureError(new Error(message), level, context);
  }

  /**
   * Send error to server
   */
  private async sendToServer(errorReport: ErrorReport): Promise<void> {
    try {
      await fetch(this.apiEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(errorReport),
      });
    } catch (error) {
      console.error('Failed to send error to server:', error);
    }
  }

  /**
   * Get or create session ID
   */
  private getSessionId(): string {
    if (typeof window === 'undefined') return 'server';
    
    let sessionId = sessionStorage.getItem('error-session-id');
    if (!sessionId) {
      sessionId = this.generateId();
      sessionStorage.setItem('error-session-id', sessionId);
    }
    return sessionId;
  }

  /**
   * Generate unique ID
   */
  private generateId(): string {
    return Date.now().toString(36) + Math.random().toString(36).substring(2);
  }

  /**
   * Get all tracked errors
   */
  getErrors(): ErrorReport[] {
    return Array.from(this.errors.values()).sort((a, b) => 
      new Date(b.lastSeen).getTime() - new Date(a.lastSeen).getTime()
    );
  }

  /**
   * Clear all errors
   */
  clearErrors(): void {
    this.errors.clear();
  }

  /**
   * Set user context for all future errors
   */
  setUserContext(context: Partial<ErrorContext>): void {
    this.userContext = { ...this.userContext, ...context };
  }

  private userContext: Partial<ErrorContext> = {};

  /**
   * Add breadcrumb for debugging
   */
  addBreadcrumb(message: string, category?: string, data?: Record<string, any>): void {
    if (!this.isProduction) {
      console.log(`🍞 Breadcrumb [${category || 'general'}]:`, message, data);
    }
  }
}

// Global error tracker instance
export const errorTracker = new ErrorTracker();

/**
 * React Error Boundary HOC
 */
export function withErrorBoundary<P extends object>(
  Component: React.ComponentType<P>,
  fallback?: React.ComponentType<{ error: Error; resetError: () => void }>
) {
  return function ErrorBoundaryWrapper(props: P) {
    return (
      <ErrorBoundary fallback={fallback}>
        <Component {...props} />
      </ErrorBoundary>
    );
  };
}

/**
 * Error Boundary Component
 */
interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
}

interface ErrorBoundaryProps {
  children: React.ReactNode;
  fallback?: React.ComponentType<{ error: Error; resetError: () => void }>;
}

export class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    errorTracker.captureError(error, 'error', {
      additionalData: {
        componentStack: errorInfo.componentStack,
        errorBoundary: true,
      },
    });
  }

  resetError = () => {
    this.setState({ hasError: false, error: undefined });
  };

  render() {
    if (this.state.hasError && this.state.error) {
      if (this.props.fallback) {
        const FallbackComponent = this.props.fallback;
        return <FallbackComponent error={this.state.error} resetError={this.resetError} />;
      }

      return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
          <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-6 text-center">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
            </div>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">Something went wrong</h2>
            <p className="text-gray-600 mb-4">
              We're sorry, but something unexpected happened. Please try refreshing the page.
            </p>
            <button
              onClick={this.resetError}
              className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors"
            >
              Try Again
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

/**
 * Global error handler setup
 */
export function setupGlobalErrorHandling(): void {
  if (typeof window === 'undefined') return;

  // Handle unhandled promise rejections
  window.addEventListener('unhandledrejection', (event) => {
    errorTracker.captureError(
      new Error(`Unhandled Promise Rejection: ${event.reason}`),
      'error',
      { additionalData: { type: 'unhandledrejection' } }
    );
  });

  // Handle global errors
  window.addEventListener('error', (event) => {
    errorTracker.captureError(
      event.error || new Error(event.message),
      'error',
      {
        url: event.filename,
        additionalData: {
          type: 'global',
          lineno: event.lineno,
          colno: event.colno,
        },
      }
    );
  });
}

/**
 * Performance monitoring
 */
export function trackPerformance(name: string, fn: () => Promise<any> | any): Promise<any> {
  const start = performance.now();
  
  try {
    const result = fn();
    
    if (result instanceof Promise) {
      return result.finally(() => {
        const duration = performance.now() - start;
        if (duration > 1000) { // Log slow operations
          errorTracker.captureMessage(
            `Slow operation: ${name} took ${duration.toFixed(2)}ms`,
            'warning',
            { additionalData: { performance: true, duration, operation: name } }
          );
        }
      });
    } else {
      const duration = performance.now() - start;
      if (duration > 100) { // Log slow sync operations
        errorTracker.captureMessage(
          `Slow sync operation: ${name} took ${duration.toFixed(2)}ms`,
          'warning',
          { additionalData: { performance: true, duration, operation: name } }
        );
      }
      return result;
    }
  } catch (error) {
    const duration = performance.now() - start;
    errorTracker.captureError(
      error instanceof Error ? error : new Error(String(error)),
      'error',
      { additionalData: { performance: true, duration, operation: name } }
    );
    throw error;
  }
}

// Export convenience functions
export const captureError = errorTracker.captureError.bind(errorTracker);
export const captureException = errorTracker.captureException.bind(errorTracker);
export const captureMessage = errorTracker.captureMessage.bind(errorTracker);
export const setUserContext = errorTracker.setUserContext.bind(errorTracker);
export const addBreadcrumb = errorTracker.addBreadcrumb.bind(errorTracker);