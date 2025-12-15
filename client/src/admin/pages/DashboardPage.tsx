import { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import StatCard from '../components/StatCard';
import DataTable from '../components/DataTable';
import { fetchDashboardData } from '../redux/slices/adminDashboardSlice';
import type { AdminRootState } from '../redux/store';
import { 
  ShoppingBag, 
  DollarSign, 
  Users, 
  AlertTriangle,
  TrendingUp,
  RefreshCw
} from 'lucide-react';

const DashboardPage = () => {
  const dispatch = useDispatch();
  const { orders, users, products, lowStock, status } = useSelector(
    (state: AdminRootState) => state.adminDashboard
  );

  const normalizedOrders = useMemo(
    () =>
      orders.map((o) => ({
        ...o,
        orderStatus: (o as any).orderStatus ?? (o as any).status ?? 'Pending',
        paymentStatus: o.paymentStatus ?? 'Pending',
      })),
    [orders]
  );

  useEffect(() => {
    dispatch(fetchDashboardData() as any);
  }, [dispatch]);

  const totalRevenue = normalizedOrders.reduce((sum, o) => sum + o.totalPrice, 0);

  return (
    <div className="space-y-6 sm:space-y-8">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 rounded-2xl lg:rounded-3xl p-4 sm:p-6 lg:p-8 text-white shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="min-w-0">
            <h1 className="text-2xl sm:text-3xl font-bold mb-2">Dashboard Overview</h1>
            <p className="text-pink-100 text-sm sm:text-base">Monitor your business performance and key metrics</p>
          </div>
          <div className="text-left sm:text-right flex-shrink-0">
            <p className="text-pink-100 text-xs sm:text-sm">Today's Date</p>
            <p className="text-lg sm:text-xl font-semibold">{new Date().toLocaleDateString()}</p>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <StatCard 
          label="Total Orders" 
          value={normalizedOrders.length} 
          subtext="All time"
          icon={ShoppingBag}
          color="blue"
        />
        <StatCard 
          label="Total Revenue" 
          value={`₹${totalRevenue.toLocaleString()}`}
          subtext="All time"
          icon={DollarSign}
          color="green"
        />
        <StatCard 
          label="Total Users" 
          value={users.length}
          subtext="Active users"
          icon={Users}
          color="purple"
        />
        <StatCard 
          label="Low Stock Items" 
          value={lowStock.length}
          subtext="Requires attention"
          icon={AlertTriangle}
          color="orange"
        />
      </div>

      {/* Recent Orders */}
      <div className="bg-white rounded-3xl shadow-xl border border-slate-100">
        <DataTable
          title="Recent Orders"
          searchable={true}
          actions={
            <div className="flex gap-2">
              <button 
                className="flex items-center gap-2 px-4 py-2 bg-pink-50 text-pink-600 rounded-xl hover:bg-pink-100 transition-colors cursor-pointer"
                onClick={() => dispatch(fetchDashboardData() as any)}
                disabled={status === 'loading'}
              >
                <RefreshCw size={16} className={status === 'loading' ? 'animate-spin' : ''} />
                <span>Refresh</span>
              </button>
            </div>
          }
          columns={[
            { 
              header: 'Order ID', 
              accessor: 'id',
              sortable: true,
              width: '120px'
            },
            { 
              header: 'Customer', 
              accessor: 'userId',
              sortable: true
            },
            { 
              header: 'Amount', 
              accessor: (o) => (
                <span className="font-semibold text-green-600">₹{o.totalPrice.toLocaleString()}</span>
              ),
              sortable: true
            },
            { 
              header: 'Status', 
              accessor: (o) => (
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                  o.orderStatus === 'Delivered' 
                    ? 'bg-green-100 text-green-800'
                    : o.orderStatus === 'Pending'
                    ? 'bg-yellow-100 text-yellow-800'
                    : 'bg-red-100 text-red-800'
                }`}>
                  {o.orderStatus}
                </span>
              )
            },
            { 
              header: 'Payment', 
              accessor: (o) => (
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                  o.paymentStatus === 'Success' 
                    ? 'bg-green-100 text-green-800'
                    : 'bg-red-100 text-red-800'
                }`}>
                  {o.paymentStatus}
                </span>
              )
            },
          ]}
          data={normalizedOrders.slice(0, 10)}
        />
      </div>

      {/* Analytics Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
        {/* Low Stock Alerts */}
        <div className="bg-white rounded-3xl shadow-xl border border-slate-100">
          <DataTable
            title="Low Stock Alerts"
            searchable={true}
            actions={
              <button className="flex items-center gap-2 px-4 py-2 bg-orange-50 text-orange-600 rounded-xl hover:bg-orange-100 transition-colors cursor-pointer">
                <AlertTriangle size={16} />
                <span>Restock</span>
              </button>
            }
            columns={[
              { 
                header: 'Product', 
                accessor: 'productName',
                sortable: true
              },
              { 
                header: 'Current Stock', 
                accessor: (p) => (
                  <span className={`font-semibold ${
                    p.stockQuantity < 5 ? 'text-red-600' : 'text-orange-600'
                  }`}>
                    {p.stockQuantity}
                  </span>
                ),
                sortable: true
              },
              { 
                header: 'Status', 
                accessor: (p) => (
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    p.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                  }`}>
                    {p.isActive ? 'Active' : 'Inactive'}
                  </span>
                )
              },
            ]}
            data={lowStock}
          />
        </div>

        {/* Top Products */}
        <div className="bg-white rounded-3xl shadow-xl border border-slate-100">
          <DataTable
            title="Top Products"
            searchable={true}
            actions={
              <button className="flex items-center gap-2 px-4 py-2 bg-purple-50 text-purple-600 rounded-xl hover:bg-purple-100 transition-colors cursor-pointer">
                <TrendingUp size={16} />
                <span>Analytics</span>
              </button>
            }
            columns={[
              { 
                header: 'Product Name', 
                accessor: 'itemName',
                sortable: true
              },
              { 
                header: 'Price', 
                accessor: (p) => (
                  <span className="font-semibold text-blue-600">₹{p.itemPrice}</span>
                ),
                sortable: true
              },
              { 
                header: 'Stock', 
                accessor: (p) => (
                  <span className={`font-medium ${
                    p.stockQuantity > 50 ? 'text-green-600' : 'text-orange-600'
                  }`}>
                    {p.stockQuantity}
                  </span>
                ),
                sortable: true
              },
            ]}
            data={products.slice(0, 8)}
          />
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;

