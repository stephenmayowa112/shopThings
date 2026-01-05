'use client';

import { useEffect } from 'react';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    // Add class to body to hide main footer on dashboard
    document.body.classList.add('dashboard-page');
    return () => {
      document.body.classList.remove('dashboard-page');
    };
  }, []);

  return (
    <div className="flex flex-col min-h-[calc(100vh-64px)]">
      {children}
    </div>
  );
}
