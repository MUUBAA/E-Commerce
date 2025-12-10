import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Package, 
  List, 
  ShoppingBag, 
  Users, 
  ShieldCheck,
  ChevronRight,
  Settings,
  BarChart3
} from 'lucide-react';

const navClasses = ({ isActive }: { isActive: boolean }) =>
  `group flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 relative overflow-hidden cursor-pointer ${
    isActive 
      ? 'bg-gradient-to-r from-pink-500 to-purple-600 text-white shadow-lg transform scale-[1.02]' 
      : 'text-slate-700 hover:bg-gradient-to-r hover:from-pink-50 hover:to-purple-50 hover:text-pink-600'
  }`;

const menuItems = [
  { to: '/admin', label: 'Dashboard', icon: LayoutDashboard, end: true },
  { to: '/admin/products', label: 'Products', icon: Package },
  { to: '/admin/categories', label: 'Categories', icon: List },
  { to: '/admin/orders', label: 'Orders', icon: ShoppingBag },
  { to: '/admin/users', label: 'Users', icon: Users },
  { to: '/admin/inventory', label: 'Inventory', icon: ShieldCheck },
];

const Sidebar = () => {
  return (
    <aside className="w-64 bg-white h-full shadow-xl rounded-2xl p-6 flex flex-col border border-slate-100">
      {/* Logo Section */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 bg-gradient-to-r from-pink-500 to-purple-600 rounded-xl flex items-center justify-center">
            <BarChart3 className="text-white" size={20} />
          </div>
          <div>
            <div className="text-xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
              Nest Admin
            </div>
            <div className="text-xs text-slate-500">Management Portal</div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-2">
        <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-4 px-2">
          Main Menu
        </div>
        {menuItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink 
              key={item.to} 
              to={item.to} 
              end={item.end}
              className={navClasses}
            >
              <Icon size={20} className="flex-shrink-0" />
              <span className="font-medium">{item.label}</span>
              <ChevronRight 
                size={16} 
                className="ml-auto opacity-0 group-hover:opacity-100 transform group-hover:translate-x-1 transition-all duration-200" 
              />
              {/* Active indicator */}
              <div className="absolute inset-0 bg-gradient-to-r from-pink-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-200 rounded-xl" />
            </NavLink>
          );
        })}
      </nav>

      {/* Settings Section */}
      <div className="border-t border-slate-200 pt-4 mt-4">
        <NavLink 
          to="/admin/settings" 
          className={navClasses}
        >
          <Settings size={20} className="flex-shrink-0" />
          <span className="font-medium">Settings</span>
          <ChevronRight 
            size={16} 
            className="ml-auto opacity-0 group-hover:opacity-100 transform group-hover:translate-x-1 transition-all duration-200" 
          />
        </NavLink>
      </div>

      {/* Footer */}
      <div className="mt-4 p-3 bg-gradient-to-r from-slate-50 to-slate-100 rounded-xl">
        <div className="text-xs text-slate-600 text-center">
          v2.1.0 • Admin Panel
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;

