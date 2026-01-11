import { getVendorDashboardStats } from '@/app/vendor/actions';
import DashboardClient from './DashboardClient';
import { redirect } from 'next/navigation';

export default async function VendorDashboardPage() {
  const stats = await getVendorDashboardStats();

  if (!stats) {
    redirect('/vendor/apply');
  }

  return <DashboardClient data={stats} />;
}
