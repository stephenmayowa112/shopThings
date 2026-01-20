'use client';

import { useState, useEffect } from 'react';
import {
  Store,
  Search,
  Download,
  MoreVertical,
  BadgeCheck,
  XCircle,
  CheckCircle,
  Clock,
  MapPin,
  AlertTriangle,
} from 'lucide-react';
import { Button, Input } from '@/components/ui';
import { AdminLayout } from '@/components/admin';
import { useCurrencyStore } from '@/stores';
import { getAdminVendorsList } from '../actions';

const STATUS_COLORS: Record<string, { bg: string; text: string; icon: any }> = {
  pending: { bg: 'bg-yellow-100', text: 'text-yellow-800', icon: Clock },
  approved: { bg: 'bg-green-100', text: 'text-green-800', icon: CheckCircle },
  rejected: { bg: 'bg-red-100', text: 'text-red-800', icon: XCircle },
  suspended: { bg: 'bg-gray-100', text: 'text-gray-800', icon: AlertTriangle },
};

export default function AdminVendorsPage() {
  const { formatConvertedPrice } = useCurrencyStore();
  const [searchQuery, setSearchQuery] = useState('');
  const [vendors, setVendors] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);

  useEffect(() => {
    let active = true;
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const { vendors: fetchedVendors, count } = await getAdminVendorsList(currentPage, 20, searchQuery);
        if (active) {
          setVendors(fetchedVendors);
          setTotalCount(count);
        }
      } catch (error) {
        console.error('Failed to fetch vendors', error);
      } finally {
        if (active) setIsLoading(false);
      }
    };
    fetchData();
    return () => { active = false; };
  }, [currentPage, searchQuery]);

  const headerActions = (
    <Button variant='outline'>
      <Download className='w-4 h-4 mr-2' />
      Export
    </Button>
  );

  return (
    <AdminLayout title="Vendor Management" headerActions={headerActions}>
      {/* Filters */}
      <div className='bg-white rounded-xl shadow-sm p-4 mb-6'>
        <div className='flex flex-col md:flex-row items-center gap-4 justify-between'>
          <div className='relative w-full md:w-96'>
            <Search className='absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400' />
            <Input
              placeholder='Search by store name...'
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className='pl-10'
            />
          </div>
        </div>
      </div>

      {/* Vendors Table */}
      <div className='bg-white rounded-xl shadow-sm overflow-hidden'>
        <div className='overflow-x-auto'>
          <table className='w-full'>
            <thead className='bg-gray-50 border-b'>
              <tr>
                <th className='px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                  Store
                </th>
                <th className='px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                  Status
                </th>
                <th className='px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                  Location
                </th>
                <th className='px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                  Products
                </th>
                <th className='px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                  Joined
                </th>
                <th className='px-6 py-4 text-right text-xs font-medium text-gray-500 uppercase tracking-wider'>
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className='divide-y divide-gray-200'>
              {isLoading ? (
                <tr><td colSpan={6} className='p-8 text-center'>Loading vendors...</td></tr>
              ) : vendors.length === 0 ? (
                <tr><td colSpan={6} className='p-8 text-center'>No vendors found.</td></tr>
              ) : (
                vendors.map((vendor) => {
                  const status = STATUS_COLORS[vendor.status] || STATUS_COLORS['pending'];
                  const StatusIcon = status.icon;
                  return (
                    <tr key={vendor.id} className='hover:bg-gray-50'>
                      <td className='px-6 py-4'>
                        <div className='flex items-center gap-3'>
                          <div className='w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center overflow-hidden'>
                            {vendor.logo_url ? (
                              // eslint-disable-next-line @next/next/no-img-element
                              <img src={vendor.logo_url} alt={vendor.store_name} className='w-full h-full object-cover' />
                            ) : (
                              <Store className='w-5 h-5 text-gray-500' />
                            )}
                          </div>
                          <div>
                            <div className='font-medium text-gray-900'>{vendor.store_name}</div>
                            <div className='text-sm text-gray-500 flex items-center gap-1'>
                              {vendor.owner_name ? vendor.owner_name : 'No Owner Name'}
                              {vendor.is_verified && (
                                <BadgeCheck className='w-3 h-3 text-blue-500' />
                              )}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className='px-6 py-4'>
                        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-semibold rounded-full capitalize ${status.bg} ${status.text}`}>
                          <StatusIcon className='w-3.5 h-3.5' />
                          {vendor.status}
                        </span>
                      </td>
                      <td className='px-6 py-4 text-sm text-gray-500'>
                         <div className='flex items-center gap-1'>
                            <MapPin className='w-3 h-3' />
                            {vendor.location || 'N/A'}
                         </div>
                      </td>
                      <td className='px-6 py-4 text-sm text-gray-500'>
                        {vendor.products || 0}
                      </td>
                      <td className='px-6 py-4 text-sm text-gray-500'>
                        {new Date(vendor.created_at).toLocaleDateString()}
                      </td>
                      <td className='px-6 py-4 text-right'>
                        <Button variant='ghost' size='sm' aria-label="More actions">
                          <MoreVertical className='w-4 h-4' />
                        </Button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
        {/* Pagination Controls */}
        <div className='px-6 py-4 border-t flex items-center justify-between'>
            <div className='text-sm text-gray-500'>Page {currentPage}</div>
            <div className='flex gap-2'>
                <Button variant='outline' size='sm' onClick={() => setCurrentPage(p => Math.max(1, p - 1))} disabled={currentPage === 1}>Previous</Button>
                <Button variant='outline' size='sm' onClick={() => setCurrentPage(p => p + 1)} disabled={vendors.length < 20}>Next</Button>
            </div>
        </div>
      </div>
    </AdminLayout>
  );
}
