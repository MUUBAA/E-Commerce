import { useDispatch } from 'react-redux';
import { adminLogout } from '../redux/slices/adminAuthSlice';
import { 
  Bell, 
  Search, 
  User, 
  Settings, 
  LogOut,
  ChevronDown,
  MessageSquare,
  Sun,
  Moon
} from 'lucide-react';
import { useState } from 'react';

const Topbar = () => {
  const dispatch = useDispatch();
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  return (
    <header className="bg-white shadow-lg rounded-2xl px-6 py-4 border border-slate-100">
      <div className="flex items-center justify-between">
        {/* Left Section */}
        <div className="flex items-center gap-6">
          <div>
            <h1 className="text-xl font-bold text-slate-800">Good Morning! 👋</h1>
            <p className="text-sm text-slate-600">Welcome back to your admin dashboard</p>
          </div>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-4">
          {/* Search Bar */}
          <div className="relative hidden md:block">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" size={18} />
            <input
              type="text"
              placeholder="Search anything..."
              className="pl-10 pr-4 py-2 w-80 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all duration-200 text-sm"
            />
          </div>

          {/* Theme Toggle */}
          <button className="p-2 text-slate-600 hover:text-pink-600 hover:bg-pink-50 rounded-xl transition-colors">
            <Sun size={20} />
          </button>

          {/* Messages */}
          <button className="p-2 text-slate-600 hover:text-pink-600 hover:bg-pink-50 rounded-xl transition-colors relative cursor-pointer">
            <MessageSquare size={20} />
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-blue-500 text-white text-xs rounded-full flex items-center justify-center">
              3
            </span>
          </button>

          {/* Notifications */}
          <div className="relative">
            <button 
              className="p-2 text-slate-600 hover:text-pink-600 hover:bg-pink-50 rounded-xl transition-colors relative cursor-pointer"
              onClick={() => setShowNotifications(!showNotifications)}
            >
              <Bell size={20} />
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                5
              </span>
            </button>
            
            {/* Notifications Dropdown */}
            {showNotifications && (
              <div className="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-lg border border-slate-200 z-50">
                <div className="p-4 border-b border-slate-100">
                  <h3 className="font-semibold text-slate-800">Notifications</h3>
                </div>
                <div className="max-h-96 overflow-y-auto">
                  <div className="p-3 hover:bg-slate-50 border-b border-slate-100 cursor-pointer">
                    <p className="text-sm font-medium text-slate-800">New order received</p>
                    <p className="text-xs text-slate-600">Order #12345 • 2 minutes ago</p>
                  </div>
                  <div className="p-3 hover:bg-slate-50 border-b border-slate-100 cursor-pointer">
                    <p className="text-sm font-medium text-slate-800">Low stock alert</p>
                    <p className="text-xs text-slate-600">Product XYZ • 5 minutes ago</p>
                  </div>
                </div>
                <div className="p-3 text-center">
                  <button className="text-sm text-pink-600 hover:text-pink-700 cursor-pointer">View all notifications</button>
                </div>
              </div>
            )}
          </div>

          {/* Profile Dropdown */}
          <div className="relative">
            <button 
              className="flex items-center gap-3 p-2 hover:bg-slate-50 rounded-xl transition-colors cursor-pointer"
              onClick={() => setShowProfileMenu(!showProfileMenu)}
            >
              <div className="w-8 h-8 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full flex items-center justify-center">
                <User className="text-white" size={16} />
              </div>
              <div className="hidden md:block text-left">
                <div className="text-sm font-medium text-slate-800">Admin User</div>
                <div className="text-xs text-slate-600">admin@nest.com</div>
              </div>
              <ChevronDown size={16} className="text-slate-600" />
            </button>

            {/* Profile Dropdown Menu */}
            {showProfileMenu && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-slate-200 z-50">
                <div className="p-2">
                  <button className="w-full flex items-center gap-3 px-3 py-2 text-slate-700 hover:bg-slate-50 rounded-lg transition-colors cursor-pointer">
                    <User size={16} />
                    <span>Profile</span>
                  </button>
                  <button className="w-full flex items-center gap-3 px-3 py-2 text-slate-700 hover:bg-slate-50 rounded-lg transition-colors cursor-pointer">
                    <Settings size={16} />
                    <span>Settings</span>
                  </button>
                  <hr className="my-2 border-slate-200" />
                  <button 
                    className="w-full flex items-center gap-3 px-3 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
                    onClick={() => dispatch(adminLogout())}
                  >
                    <LogOut size={16} />
                    <span>Logout</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Topbar;

