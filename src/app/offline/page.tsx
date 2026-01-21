'use client';

import { Wifi, RefreshCw } from 'lucide-react';

export default function OfflinePage() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        <div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center mx-auto mb-6">
          <Wifi className="w-12 h-12 text-muted-foreground" />
        </div>
        
        <h1 className="text-3xl font-heading font-bold text-primary mb-4">
          You're Offline
        </h1>
        
        <p className="text-muted-foreground mb-8 leading-relaxed">
          It looks like you're not connected to the internet. Some features may not be available 
          until you reconnect.
        </p>
        
        <div className="space-y-4">
          <button
            type="button"
            onClick={() => window.location.reload()}
            className="inline-flex items-center justify-center gap-2 w-full px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors font-medium"
          >
            <RefreshCw className="w-4 h-4" />
            Try Again
          </button>
          
          <button
            type="button"
            onClick={() => window.history.back()}
            className="inline-flex items-center justify-center w-full px-6 py-3 border border-border text-foreground rounded-lg hover:bg-muted transition-colors font-medium"
          >
            Go Back
          </button>
        </div>
        
        <div className="mt-8 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <p className="text-sm text-blue-800">
            <strong>Tip:</strong> Some content may still be available from your previous visits 
            while offline.
          </p>
        </div>
      </div>
    </div>
  );
}