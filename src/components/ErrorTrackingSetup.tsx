'use client';

import { useEffect } from 'react';
import { setupGlobalErrorHandling } from '@/lib/error-tracking';

export function ErrorTrackingSetup() {
  useEffect(() => {
    setupGlobalErrorHandling();
  }, []);
  
  return null;
}