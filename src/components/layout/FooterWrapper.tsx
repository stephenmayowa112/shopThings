'use client';

import { usePathname } from 'next/navigation';
import Footer from './Footer';

export default function FooterWrapper() {
  const pathname = usePathname();
  
  // Don't show footer on dashboard, admin, or vendor pages
  const isDashboardPage = pathname?.startsWith('/dashboard') || 
                          pathname?.startsWith('/vendor') || 
                          pathname?.startsWith('/admin');
  
  if (isDashboardPage) {
    return null; // No footer for dashboard pages
  }
  
  return <Footer />;
}
