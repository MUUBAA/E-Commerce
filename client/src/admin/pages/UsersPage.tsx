import { useEffect, useState } from 'react';
import adminApi from '../services/api';
import DataTable from '../components/DataTable';
import type { AdminUser } from '../types';
import { 
  Users, 
  UserCheck, 
  UserX, 
  Shield, 
  Mail, 
  Crown,
  RefreshCw,
  AlertTriangle,
  CheckCircle,
  User
} from 'lucide-react';

const UsersPage = () => {
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [loading, setLoading] = useState(false);

  const load = async () => {
    setLoading(true);
    try {
      const { data } = await adminApi.get('/admin/users');
      setUsers(data);
    } catch (error) {
      console.error('Failed to load users:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const toggleBlock = async (user: AdminUser) => {
    try {
      await adminApi.patch(`/admin/users/${user.id}/block`, {
        block: !user.isBlocked,
      });
      load();
    } catch (error) {
      console.error('Failed to toggle user block status:', error);
    }
  };

  const getRoleColor = (role: string) => {
    switch (role.toLowerCase()) {
      case 'admin': return 'bg-purple-100 text-purple-800';
      case 'user': return 'bg-blue-100 text-blue-800';
      case 'moderator': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getRoleIcon = (role: string) => {
    switch (role.toLowerCase()) {
      case 'admin': return <Crown size={12} />;
      case 'user': return <User size={12} />;
      case 'moderator': return <Shield size={12} />;
      default: return <User size={12} />;
    }
  };

  return (
    <div className="space-y-6 sm:space-y-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-600 via-blue-600 to-purple-600 rounded-2xl lg:rounded-3xl p-4 sm:p-6 lg:p-8 text-white shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="min-w-0">
            <h1 className="text-2xl sm:text-3xl font-bold mb-2 flex items-center gap-3">
              <Users size={28} className="sm:w-9 sm:h-9 flex-shrink-0" />
              <span className="truncate">User Management</span>
            </h1>
            <p className="text-green-100 text-sm sm:text-base">Manage user accounts, roles, and permissions</p>
          </div>
          <div className="text-left sm:text-right flex-shrink-0">
            <p className="text-green-100 text-xs sm:text-sm">Total Users</p>
            <p className="text-xl sm:text-2xl font-bold">{users.length}</p>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-600 text-sm font-medium">Active Users</p>
              <p className="text-2xl font-bold text-green-600">
                {users.filter(u => !u.isBlocked).length}
              </p>
            </div>
            <div className="p-3 bg-green-100 rounded-xl">
              <UserCheck size={24} className="text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-600 text-sm font-medium">Blocked Users</p>
              <p className="text-2xl font-bold text-red-600">
                {users.filter(u => u.isBlocked).length}
              </p>
            </div>
            <div className="p-3 bg-red-100 rounded-xl">
              <UserX size={24} className="text-red-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-600 text-sm font-medium">Admins</p>
              <p className="text-2xl font-bold text-purple-600">
                {users.filter(u => u.role?.toLowerCase() === 'admin').length}
              </p>
            </div>
            <div className="p-3 bg-purple-100 rounded-xl">
              <Crown size={24} className="text-purple-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-600 text-sm font-medium">Regular Users</p>
              <p className="text-2xl font-bold text-blue-600">
                {users.filter(u => u.role?.toLowerCase() === 'user').length}
              </p>
            </div>
            <div className="p-3 bg-blue-100 rounded-xl">
              <User size={24} className="text-blue-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-white rounded-3xl shadow-xl border border-slate-100">
        <DataTable
          title="User Directory"
          searchable={true}
          actions={
            <button 
              onClick={() => load()}
              disabled={loading}
              className="flex items-center gap-2 px-4 py-2 bg-pink-50 text-pink-600 rounded-xl hover:bg-pink-100 transition-colors cursor-pointer disabled:opacity-60"
            >
              <RefreshCw size={16} className={loading ? 'animate-spin' : ''} />
              <span>Refresh</span>
            </button>
          }
          columns={[
            { 
              header: 'User Profile', 
              accessor: (u) => (
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                    <User size={20} className="text-white" />
                  </div>
                  <div>
                    <p className="font-semibold text-slate-800">{u.name || 'Unknown User'}</p>
                    <p className="text-sm text-slate-500 flex items-center gap-1">
                      <Mail size={12} />
                      {u.email}
                    </p>
                  </div>
                </div>
              ),
              sortable: true
            },
            { 
              header: 'Role', 
              accessor: (u) => (
                <span className={`px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1 w-fit ${getRoleColor(u.role || 'user')}`}>
                  {getRoleIcon(u.role || 'user')}
                  {u.role || 'User'}
                </span>
              ),
              sortable: true
            },
            { 
              header: 'Status', 
              accessor: (u) => (
                <span className={`px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1 w-fit ${
                  u.isBlocked 
                    ? 'bg-red-100 text-red-800' 
                    : 'bg-green-100 text-green-800'
                }`}>
                  {u.isBlocked ? <AlertTriangle size={12} /> : <CheckCircle size={12} />}
                  {u.isBlocked ? 'Blocked' : 'Active'}
                </span>
              )
            },
            {
              header: 'Actions',
              accessor: (u) => (
                <div className="flex gap-2">
                  <button
                    onClick={() => toggleBlock(u)}
                    className={`flex items-center gap-1 px-3 py-2 rounded-lg text-sm font-medium transition-all cursor-pointer ${
                      u.isBlocked
                        ? 'bg-green-50 text-green-600 hover:bg-green-100'
                        : 'bg-red-50 text-red-600 hover:bg-red-100'
                    }`}
                  >
                    {u.isBlocked ? <UserCheck size={14} /> : <UserX size={14} />}
                    {u.isBlocked ? 'Unblock' : 'Block'}
                  </button>
                  <button className="flex items-center gap-1 px-3 py-2 bg-blue-50 text-blue-600 rounded-lg text-sm font-medium hover:bg-blue-100 transition-all cursor-pointer">
                    <Mail size={14} />
                    Contact
                  </button>
                </div>
              ),
            },
          ]}
          data={users}
        />
      </div>
    </div>
  );
};

export default UsersPage;

