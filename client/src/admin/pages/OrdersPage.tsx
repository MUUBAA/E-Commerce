import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import type { AdminRootState, AdminDispatch } from '../redux/store';
import { fetchAdminOrders, updateAdminOrderStatus } from '../redux/thunk/adminOrders';
import DataTable from '../components/DataTable';
import type { AdminOrder, OrderStatus, PaymentStatus } from '../types';
import { 
  ShoppingCart, 
  User, 
  DollarSign, 
  Package, 
  CreditCard,
  Clock,
  CheckCircle,
  XCircle,
  Truck,
  RefreshCw
} from 'lucide-react';

const orderStatuses: OrderStatus[] = [
  "Pending",
  "Paid",
  "Packed",
  "Shipped",
  "Delivered",
  "Cancelled",
];
const paymentStatuses: PaymentStatus[] = ["Pending", "Success", "Failed"];

const OrdersPage = () => {
  const dispatch = useDispatch<AdminDispatch>();
  const { orders, loading } = useSelector((s: AdminRootState) => s.adminOrders);

  useEffect(() => {
    dispatch(fetchAdminOrders());
  }, [dispatch]);

  const updateStatus = async (order: AdminOrder, orderStatus: OrderStatus, paymentStatus: PaymentStatus) => {
    try {
      await dispatch(updateAdminOrderStatus({ orderId: order.id, orderStatus, paymentStatus })).unwrap();
      // refetch orders to update UI
      dispatch(fetchAdminOrders());
    } catch (error) {
      console.error('Failed to update order status:', error);
    }
  };

  const getOrderStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'paid': return 'bg-blue-100 text-blue-800';
      case 'packed': return 'bg-purple-100 text-purple-800';
      case 'shipped': return 'bg-orange-100 text-orange-800';
      case 'delivered': return 'bg-green-100 text-green-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPaymentStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'success': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'failed': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getOrderStatusIcon = (status: string) => {
    switch (status.toLowerCase()) {
      case 'pending': return <Clock size={12} />;
      case 'paid': return <CreditCard size={12} />;
      case 'packed': return <Package size={12} />;
      case 'shipped': return <Truck size={12} />;
      case 'delivered': return <CheckCircle size={12} />;
      case 'cancelled': return <XCircle size={12} />;
      default: return <Clock size={12} />;
    }
  };

  return (
    <div className="space-y-6 sm:space-y-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-500 rounded-2xl lg:rounded-3xl p-4 sm:p-6 lg:p-8 text-white shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="min-w-0">
            <h1 className="text-2xl sm:text-3xl font-bold mb-2 flex items-center gap-3">
              <ShoppingCart size={28} className="sm:w-9 sm:h-9 flex-shrink-0" />
              <span className="truncate">Order Management</span>
            </h1>
            <p className="text-blue-100 text-sm sm:text-base">Track and manage customer orders and payments</p>
          </div>
          <div className="text-left sm:text-right flex-shrink-0">
            <p className="text-blue-100 text-xs sm:text-sm">Total Orders</p>
            <p className="text-xl sm:text-2xl font-bold">{orders.length}</p>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <div className="bg-white rounded-2xl p-4 sm:p-6 shadow-lg border border-slate-100">
          <div className="flex items-center justify-between">
            <div className="min-w-0">
              <p className="text-slate-600 text-xs sm:text-sm font-medium truncate">Pending Orders</p>
              <p className="text-xl sm:text-2xl font-bold text-yellow-600">
                {orders.filter(o => o.orderStatus.toLowerCase() === 'pending').length}
              </p>
            </div>
            <div className="p-2 sm:p-3 bg-yellow-100 rounded-xl flex-shrink-0">
              <Clock size={20} className="sm:w-6 sm:h-6 text-yellow-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-600 text-sm font-medium">Shipped Orders</p>
              <p className="text-2xl font-bold text-orange-600">
                {orders.filter(o => o.orderStatus.toLowerCase() === 'shipped').length}
              </p>
            </div>
            <div className="p-3 bg-orange-100 rounded-xl">
              <Truck size={24} className="text-orange-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-600 text-sm font-medium">Delivered Orders</p>
              <p className="text-2xl font-bold text-green-600">
                {orders.filter(o => o.orderStatus.toLowerCase() === 'delivered').length}
              </p>
            </div>
            <div className="p-3 bg-green-100 rounded-xl">
              <CheckCircle size={24} className="text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-600 text-sm font-medium">Total Revenue</p>
              <p className="text-2xl font-bold text-blue-600">
                ₹{orders.reduce((sum, o) => sum + o.totalPrice, 0).toLocaleString()}
              </p>
            </div>
            <div className="p-3 bg-blue-100 rounded-xl">
              <DollarSign size={24} className="text-blue-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-white rounded-3xl shadow-xl border border-slate-100">
        <DataTable
          title="Order Management"
          searchable={true}
          actions={
            <button 
              onClick={() => dispatch(fetchAdminOrders())}
              disabled={loading}
              className="flex items-center gap-2 px-4 py-2 bg-pink-50 text-pink-600 rounded-xl hover:bg-pink-100 transition-colors cursor-pointer"
            >
              <RefreshCw size={16} className={loading ? 'animate-spin' : ''} />
              <span>Refresh</span>
            </button>
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
              accessor: (o) => (
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                    <User size={16} className="text-white" />
                  </div>
                  <span className="font-medium">User #{o.userId}</span>
                </div>
              ),
              sortable: true
            },
            { 
              header: 'Total Amount', 
              accessor: (o) => (
                <span className="font-bold text-green-600">₹{o.totalPrice?.toLocaleString() || 0}</span>
              ),
              sortable: true
            },
            { 
              header: 'Order Status', 
              accessor: (o) => (
                <span className={`px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1 w-fit ${getOrderStatusColor(o.orderStatus)}`}>
                  {getOrderStatusIcon(o.orderStatus)}
                  {o.orderStatus}
                </span>
              )
            },
            { 
              header: 'Payment Status', 
              accessor: (o) => (
                <span className={`px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1 w-fit ${getPaymentStatusColor(o.paymentStatus)}`}>
                  <CreditCard size={12} />
                  {o.paymentStatus}
                </span>
              )
            },
            {
              header: 'Quick Actions',
              accessor: (o) => (
                <div className="flex flex-col gap-2">
                  <select
                    className="border border-slate-300 rounded-lg px-3 py-1 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    value={o.orderStatus}
                    onChange={(e) =>
                      updateStatus(o, e.target.value as OrderStatus, o.paymentStatus)
                    }
                  >
                    {orderStatuses.map((s) => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                  <select
                    className="border border-slate-300 rounded-lg px-3 py-1 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    value={o.paymentStatus}
                    onChange={(e) =>
                      updateStatus(o, o.orderStatus, e.target.value as PaymentStatus)
                    }
                  >
                    {paymentStatuses.map((s) => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                </div>
              ),
            },
          ]}
          data={orders}
        />
      </div>
    </div>
  );
};

export default OrdersPage;

