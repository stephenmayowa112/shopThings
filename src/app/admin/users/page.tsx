'use client';

import { useState, useEffect } from 'react';
import {
  Search,
  Download,
  MoreVertical,
  UserCog,
  Users,
} from 'lucide-react';
import { Button, Input } from '@/components/ui';
import { AdminLayout } from '@/components/admin';
import { getAdminUsersList } from '../actions';

const ROLE_COLORS: Record<string, { bg: string; text: string }> = {
  buyer: { bg: 'bg-blue-100', text: 'text-blue-800' },
  vendor: { bg: 'bg-purple-100', text: 'text-purple-800' },
  admin: { bg: 'bg-red-100', text: 'text-red-800' },
};

export default function AdminUsersPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [users, setUsers] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);

  useEffect(() => {
    let active = true;
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const { users: fetchedUsers, count } = await getAdminUsersList(currentPage, 20, searchQuery);
        if (active) {
          setUsers(fetchedUsers);
          setTotalCount(count);
        }
      } catch (error) {
        console.error('Failed to fetch users', error);
      } finally {
        if (active) setIsLoading(false);
      }
    };
    fetchData();
    return () => { active = false; };
  }, [currentPage, searchQuery]);

  const headerActions = (
    <div className='flex items-center gap-2'>
      <Button variant='outline'>
        <Download className='w-4 h-4 mr-2' />
        Export
      </Button>
      <Button>
        <UserCog className='w-4 h-4 mr-2' />
        Add User
      </Button>
    </div>
  );

  return (
    <AdminLayout title="User Management" headerActions={headerActions}>
      {/* Filters and Search */}
      <div className='bg-white rounded-xl shadow-sm p-4 mb-6'>
        <div className='flex flex-col md:flex-row items-center gap-4 justify-between'>
          <div className='relative w-full md:w-96'>
            <Search className='absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400' />
            <Input
              placeholder='Search by name, email...'
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className='pl-10'
            />
          </div>
        </div>
      </div>

      {/* Users Table */}
      <div className='bg-white rounded-xl shadow-sm overflow-hidden'>
        <div className='overflow-x-auto'>
          <table className='w-full'>
            <thead className='bg-gray-50 border-b'>
              <tr>
                <th className='px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                  User
                </th>
                <th className='px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                  Role
                </th>
                <th className='px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                  Status
                </th>
                <th className='px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                  Joined
                </th>
                <th className='px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                  Orders
                </th>
                <th className='px-6 py-4 text-right text-xs font-medium text-gray-500 uppercase tracking-wider'>
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className='divide-y divide-gray-200'>
              {isLoading ? (
                <tr><td colSpan={6} className='p-8 text-center'>Loading users...</td></tr>
              ) : users.length === 0 ? (
                <tr><td colSpan={6} className='p-8 text-center'>No users found.</td></tr>
              ) : (
                users.map((user) => (
                  <tr key={user.id} className='hover:bg-gray-50'>
                    <td className='px-6 py-4'>
                      <div className='flex items-center gap-3'>
                        <div className='w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center'>
                           <Users className='w-5 h-5 text-gray-500' />
                        </div>
                        <div>
                          <div className='font-medium text-gray-900'>{user.full_name || 'No Name'}</div>
                          <div className='text-sm text-gray-500'>{user.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className='px-6 py-4'>
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full capitalize ${
                        user.role === 'admin' ? 'bg-purple-100 text-purple-800' : 'bg-blue-100 text-blue-800'
                      }`}>
                        {user.role}
                      </span>
                    </td>
                    <td className='px-6 py-4'>
                      <span className='inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800'>
                        Active
                      </span>
                    </td>
                    <td className='px-6 py-4 text-sm text-gray-500'>
                      {new Date(user.created_at).toLocaleDateString()}
                    </td>
                    <td className='px-6 py-4 text-sm text-gray-500'>
                      {user.orders}
                    </td>
                    <td className='px-6 py-4 text-right'>
                      <Button variant='ghost' size='sm' aria-label="More actions">
                        <MoreVertical className='w-4 h-4' />
                      </Button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        {/* Pagination Controls */}
        <div className='px-6 py-4 border-t flex items-center justify-between'>
            <div className='text-sm text-gray-500'>Page {currentPage}</div>
            <div className='flex gap-2'>
                <Button variant='outline' size='sm' onClick={() => setCurrentPage(p => Math.max(1, p - 1))} disabled={currentPage === 1}>Previous</Button>
                <Button variant='outline' size='sm' onClick={() => setCurrentPage(p => p + 1)} disabled={users.length < 20}>Next</Button>
            </div>
        </div>
      </div>
    </AdminLayout>
  );
}
