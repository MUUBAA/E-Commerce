import { useEffect, useState } from "react";
import adminApi from "../services/api";
import DataTable from "../components/DataTable";
import type { AdminOrder, OrderStatus, PaymentStatus } from "../types";

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
  const [orders, setOrders] = useState<AdminOrder[]>([]);

  const load = async () => {
    const { data } = await adminApi.get("/admin/orders");
    setOrders(data);
  };

  useEffect(() => {
    load();
  }, []);

  const updateStatus = async (order: AdminOrder, orderStatus: OrderStatus, paymentStatus: PaymentStatus) => {
    await adminApi.patch(`/admin/orders/${order.id}/status`, {
      orderStatus,
      paymentStatus,
    });
    load();
  };

  return (
    <div className="space-y-4">
      <div className="bg-white rounded-2xl p-4 shadow-md">
        <h3 className="text-lg font-semibold text-slate-800 mb-3">Orders</h3>
        <DataTable
          columns={[
            { header: "ID", accessor: "id" },
            { header: "User", accessor: "userId" },
            { header: "Total", accessor: (o) => `₹${o.totalPrice}` },
            { header: "Order Status", accessor: "orderStatus" },
            { header: "Payment", accessor: "paymentStatus" },
            {
              header: "Update",
              accessor: (o) => (
                <div className="flex gap-2 items-center">
                  <select
                    className="border rounded-lg px-2 py-1 text-sm"
                    value={o.orderStatus}
                    onChange={(e) =>
                      updateStatus(o, e.target.value as OrderStatus, o.paymentStatus)
                    }
                  >
                    {orderStatuses.map((s) => (
                      <option key={s}>{s}</option>
                    ))}
                  </select>
                  <select
                    className="border rounded-lg px-2 py-1 text-sm"
                    value={o.paymentStatus}
                    onChange={(e) =>
                      updateStatus(o, o.orderStatus, e.target.value as PaymentStatus)
                    }
                  >
                    {paymentStatuses.map((s) => (
                      <option key={s}>{s}</option>
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

