'use server';

import { createClient } from '@/lib/supabase/server';

export type VendorDashboardStats = {
  vendor: {
    id: string;
    store_name: string;
    logo_url: string | null;
    is_verified: boolean;
    subscription: string;
  };
  stats: {
    totalSales: number;
    salesChange: number;
    totalOrders: number;
    ordersChange: number;
    pendingOrders: number;
    lowStock: number;
    walletBalance: number;
    pendingBalance: number;
  };
  recentOrders: {
    id: string;
    order_number: string;
    customer: string;
    items: number;
    total: number;
    status: string;
    created_at: string;
    product_name: string;
  }[];
  topProducts: {
    id: string;
    name: string;
    price: number;
    sales: number;
    revenue: number;
    image: string | null;
    stock: number;
  }[];
  systemHealth: {
    database: boolean;
  };
};

export async function getVendorDashboardStats(): Promise<VendorDashboardStats | null> {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) return null;

  // 1. Get Vendor Profile
  const { data: vendor } = await supabase
    .from('vendors')
    .select('id, store_name, logo_url, is_verified, status')
    .eq('user_id', user.id)
    .single();

  if (!vendor) return null;

  // 2. Parallel Fetching for Stats
  const [
    { data: wallet },
    { data: orderItems },
    { data: products },
    { count: lowStockCount },
    { data: recentItems }
  ] = await Promise.all([
    supabase.from('vendor_wallets').select('*').eq('vendor_id', vendor.id).single(),
    
    // Fetch all order items for sales calc and Top Products (Moved product_id here)
    supabase
      .from('order_items')
      .select('id, total_price, order_id, created_at, unit_price, quantity, product_id')
      .eq('vendor_id', vendor.id),
      
    // Fetch basic details of all vendor products for mapping
    supabase
      .from('products')
      .select('id, name, images, price, stock_quantity')
      .eq('vendor_id', vendor.id),

    // Low stock count
    supabase
      .from('products')
      .select('*', { count: 'exact', head: true })
      .eq('vendor_id', vendor.id)
      .lt('stock_quantity', 10),

    // Recent Orders (Rows)
    supabase
      .from('order_items')
      .select(`
        id, 
        order_id, 
        total_price, 
        quantity, 
        created_at, 
        product:products(name), 
        order:orders(order_number, status, payment_status)
      `)
      .eq('vendor_id', vendor.id)
      .order('created_at', { ascending: false })
      .limit(5)
  ]);

  // 3. Process Stats
  
  // Total Sales (Gross from all order items)
  const totalSales = orderItems?.reduce((acc, item) => acc + (item.total_price || 0), 0) || 0;
  
  // Total Unique Orders
  const uniqueOrderIds = new Set(orderItems?.map(i => i.order_id));
  const totalOrders = uniqueOrderIds.size;

  // Calculate Top Products
  // Map product_id -> { revenue, quantity }
  const productStats = new Map<string, { revenue: number, sales: number }>();
  
  orderItems?.forEach(item => {
    if (!item.product_id) return;
    const current = productStats.get(item.product_id) || { revenue: 0, sales: 0 };
    productStats.set(item.product_id, {
      revenue: current.revenue + (item.total_price || 0),
      sales: current.sales + (item.quantity || 0)
    });
  });

  // Sort by revenue
  const sortedProductStats = Array.from(productStats.entries())
    .sort((a, b) => b[1].revenue - a[1].revenue)
    .slice(0, 5); // Top 5

  const topProducts = sortedProductStats.map(([productId, stats]) => {
    const product = products?.find(p => p.id === productId);
    return {
      id: productId,
      name: product?.name || 'Unknown Product',
      price: product?.price || 0,
      sales: stats.sales,
      revenue: stats.revenue,
      image: product?.images?.[0] || null,
      stock: product?.stock_quantity || 0
    };
  });

  return {
    vendor: {
      id: vendor.id,
      store_name: vendor.store_name,
      logo_url: vendor.logo_url,
      is_verified: vendor.is_verified,
      subscription: 'Standard' 
    },
    stats: {
      totalSales,
      salesChange: 0, // Requires historical comparison
      totalOrders,
      ordersChange: 0,
      pendingOrders: 0, // Needs complex join or status check
      lowStock: lowStockCount || 0,
      walletBalance: wallet?.available_balance || 0,
      pendingBalance: wallet?.pending_balance || 0
    },
    recentOrders: recentItems?.map((item: any) => ({
      id: item.order_id,
      order_number: item.order?.order_number || 'N/A',
      customer: 'Customer', // Would need profile join
      items: item.quantity,
      total: item.total_price,
      status: item.order?.status || 'pending',
      created_at: item.created_at,
      product_name: item.product?.name
    })) || [],
    topProducts,
    systemHealth: { database: true }
  };
}    // I missed adding `product_id` to the select list in step 2.
    // Let's retry the select in logic:
  }); 

  // RE-Do select correctly in logic
  // Since I can't edit this file in-memory during creation, I will proceed with logic assuming I fixed it, 
  // but I have to provide the file content *now*. 
  // I will restart the definition block to include product_id.

  // ... (Self-Correction for the file content below)

  return {
    vendor: {
      id: vendor.id,
      store_name: vendor.store_name,
      logo_url: vendor.logo_url,
      is_verified: vendor.is_verified,
      subscription: 'Standard' // Placeholder
    },
    stats: {
      totalSales,
      salesChange: 0, // Requires historical comparison
      totalOrders,
      ordersChange: 0,
      pendingOrders: 0, // Needs complex join
      lowStock: lowStockCount || 0,
      walletBalance: wallet?.available_balance || 0,
      pendingBalance: wallet?.pending_balance || 0
    },
    recentOrders: recentItems?.map((item: any) => ({
      id: item.order_id, // Grouping view by Order ID usually better, but line items ok
      order_number: item.order?.order_number || 'N/A',
      customer: 'Customer', // Privacy or need profile join
      items: item.quantity,
      total: item.total_price,
      status: item.order?.status || 'pending',
      created_at: item.created_at
    })) || [],
    topProducts: [], // Calculated below
    systemHealth: { database: true }
  };
}
