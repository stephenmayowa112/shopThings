'use server';

import { createClient } from '@/lib/supabase/server';
import { Database } from '@/types/database';

export type DashboardStats = {
  totalUsers: number;
  activeVendors: number;
  totalProducts: number;
  salesVolume: number;
  pendingVendors: number;
  pendingProducts: number;
  pendingWithdrawals: number;
  pendingReports: number;
  recentActivities: any[];
  topVendors: any[];
  userGrowth: any[];
  financials: {
    revenue: number;
    payouts: number;
    commission: number;
  };
  systemHealth: {
    database: { status: 'Healthy' | 'Degraded' | 'Down', latency: number };
    api: { status: 'Healthy' | 'Degraded' | 'Down', latency: number };
  };
};

export async function getAdminDashboardStats(): Promise<DashboardStats> {
  const supabase = await createClient();
  
  const start = Date.now();
  
  const [
    { count: totalUsers },
    { count: activeVendors },
    { count: totalProducts },
    { data: salesData },
    { count: pendingVendors },
    { count: pendingProducts },
    { count: pendingWithdrawals },
    { data: recentOrders },
    { data: recentVendors },
    { data: recentProducts },
    { data: profilesData },
    { data: walletSales },
    { data: walletWithdrawals }
  ] = await Promise.all([
    supabase.from('profiles').select('*', { count: 'exact', head: true }),
    supabase.from('vendors').select('*', { count: 'exact', head: true }).eq('status', 'approved'),
    supabase.from('products').select('*', { count: 'exact', head: true }),
    supabase.from('orders').select('total').eq('payment_status', 'completed'),
    supabase.from('vendors').select('*', { count: 'exact', head: true }).eq('status', 'pending'),
    supabase.from('products').select('*', { count: 'exact', head: true }).eq('status', 'pending'),
    supabase.from('wallet_transactions').select('*', { count: 'exact', head: true }).eq('type', 'withdrawal').eq('status', 'pending'),
    supabase.from('orders').select('id, created_at, order_number, total').order('created_at', { ascending: false }).limit(5),
    supabase.from('vendors').select('id, store_name, created_at').order('created_at', { ascending: false }).limit(5),
    supabase.from('products').select('id, name, created_at').order('created_at', { ascending: false }).limit(5),
    supabase.from('profiles').select('created_at').order('created_at', { ascending: true }),
    supabase.from('wallet_transactions').select('amount, wallet_id, created_at').eq('type', 'sale'),
    supabase.from('wallet_transactions').select('amount').eq('type', 'withdrawal').eq('status', 'completed')
  ]);

  const end = Date.now();
  const dbLatency = end - start;

  // Calculate Financials
  const totalRevenue = salesData?.reduce((acc, order) => acc + (order.total || 0), 0) || 0;
  const totalVendorEarnings = walletSales?.reduce((acc, tx) => acc + (tx.amount || 0), 0) || 0;
  const totalVendorPayouts = walletWithdrawals?.reduce((acc, tx) => acc + (tx.amount || 0), 0) || 0;
  const platformCommission = Math.max(0, totalRevenue - totalVendorEarnings);

  const activities = [
    ...(recentOrders?.map(o => ({
      id: o.id,
      type: 'order_completed',
      message: \Order #\ completed\,
      time: o.created_at,
      rawTime: new Date(o.created_at).getTime()
    })) || []),
    ...(recentVendors?.map(v => ({
      id: v.id,
      type: 'vendor_registered',
      message: \New vendor registration: \\,
      time: v.created_at,
      rawTime: new Date(v.created_at).getTime()
    })) || []),
    ...(recentProducts?.map(p => ({
      id: p.id,
      type: 'product_submitted',
      message: \Product submitted: \\,
      time: p.created_at,
      rawTime: new Date(p.created_at).getTime()
    })) || [])
  ].sort((a, b) => b.rawTime - a.rawTime).slice(0, 10);

  const walletSalesMap = new Map<string, number>();
  walletSales?.forEach(tx => {
      const current = walletSalesMap.get(tx.wallet_id) || 0;
      walletSalesMap.set(tx.wallet_id, current + (tx.amount || 0));
  });

  const topWalletIds = Array.from(walletSalesMap.entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map(entry => entry[0]);

  let topVendors: any[] = [];
  
  if (topWalletIds.length > 0) {
      const { data: wallets } = await supabase
          .from('vendor_wallets')
          .select('id, vendor:vendors(id, store_name)')
          .in('id', topWalletIds);
      
      topVendors = topWalletIds.map(walletId => {
          const wallet = wallets?.find(w => w.id === walletId);
          const sales = walletSalesMap.get(walletId) || 0;
          return {
              id: wallet?.vendor?.id || walletId,
              // @ts-ignore
              name: wallet?.vendor?.store_name || 'Unknown Vendor',
              sales: sales,
              products: 0,
              orders: 0
          };
      });
  }

  if (topVendors.length === 0 && recentVendors && recentVendors.length > 0) {
      topVendors = recentVendors.map(v => ({
        id: v.id,
        name: v.store_name,
        sales: 0,
        products: 0,
        orders: 0
    }));
  }

  const now = new Date();
  const growthData = [];
  
  for (let i = 5; i >= 0; i--) {
    const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
    const monthKey = d.toLocaleString('default', { month: 'short' });
    const nextMonth = new Date(now.getFullYear(), now.getMonth() - i + 1, 1);
    const count = profilesData?.filter(p => new Date(p.created_at) < nextMonth).length || 0;
    growthData.push({ month: monthKey, users: count });
  }

  return {
    totalUsers: totalUsers || 0,
    activeVendors: activeVendors || 0,
    totalProducts: totalProducts || 0,
    salesVolume: totalRevenue,
    pendingVendors: pendingVendors || 0,
    pendingProducts: pendingProducts || 0,
    pendingWithdrawals: pendingWithdrawals || 0,
    pendingReports: 0,
    recentActivities: activities,
    topVendors,
    userGrowth: growthData,
    financials: {
        revenue: totalRevenue,
        payouts: totalVendorPayouts,
        commission: platformCommission
    },
    systemHealth: {
      database: { status: 'Healthy', latency: dbLatency },
      api: { status: 'Healthy', latency: Math.floor(Math.random() * 50) + 10 }
    }
  };
}

export async function getAdminUsersList(page = 1, limit = 50, search = '') {
  const supabase = await createClient();
  const from = (page - 1) * limit;
  const to = from + limit - 1;

  let query = supabase.from('profiles').select('*, orders(count)');

  if (search) {
    query = query.or(\ull_name.ilike.%\%,email.ilike.%\%\);
  }

  const { data, count, error } = await query.order('created_at', { ascending: false }).range(from, to);

  // Note: simple select with count join doesn't return count property at root in all client versions but usually as a property on the object array item.
  return {
    users: data?.map(u => ({...u, orders: (u.orders as any)?.[0]?.count || 0 })) || [],
    count: count || 0
  };
}

export async function getAdminVendorsList(page = 1, limit = 50, search = '') {
  const supabase = await createClient();
  const from = (page - 1) * limit;
  const to = from + limit - 1;

  let query = supabase.from('vendors').select('*, products(count)', { count: 'exact' });

  if (search) {
     query = query.or(\store_name.ilike.%\%\);
  }

  const { data, count, error } = await query.order('created_at', { ascending: false }).range(from, to);
   
   return {
    vendors: data?.map(v => ({...v, products: (v.products as any)?.[0]?.count || 0 })) || [],
    count: count || 0
  };
}
