import { NavLink } from "react-router-dom";
import { LayoutDashboard, Package, List, ShoppingBag, Users, ShieldCheck } from "lucide-react";

const navClasses = ({ isActive }: { isActive: boolean }) =>
  `flex items-center gap-3 px-4 py-3 rounded-xl transition ${
    isActive ? "bg-[#ff2f92] text-white shadow-md" : "text-slate-700 hover:bg-pink-50"
  }`;

const Sidebar = () => {
  return (
    <aside className="w-64 bg-white h-full shadow-lg rounded-2xl p-4 flex flex-col gap-2">
      <div className="text-2xl font-semibold text-[#ff2f92] mb-4">Nest Admin</div>
      <NavLink to="/admin" end className={navClasses}>
        <LayoutDashboard size={18} />
        Dashboard
      </NavLink>
      <NavLink to="/admin/products" className={navClasses}>
        <Package size={18} />
        Products
      </NavLink>
      <NavLink to="/admin/categories" className={navClasses}>
        <List size={18} />
        Categories
      </NavLink>
      <NavLink to="/admin/orders" className={navClasses}>
        <ShoppingBag size={18} />
        Orders
      </NavLink>
      <NavLink to="/admin/users" className={navClasses}>
        <Users size={18} />
        Users
      </NavLink>
      <NavLink to="/admin/inventory" className={navClasses}>
        <ShieldCheck size={18} />
        Inventory
      </NavLink>
    </aside>
  );
};

export default Sidebar;

