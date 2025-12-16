import { useDispatch } from 'react-redux';
import { adminLogout } from '../redux/slices/adminAuthSlice';
import { 
  User,   LogOut,
  ChevronDown,
} from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Topbar = () => {
  const dispatch = useDispatch();
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(adminLogout());
    navigate('/admin/login');
  }

  return (
    <header className="bg-white shadow-lg rounded-2xl px-6 py-4 border border-slate-100">
      <div className="flex items-center justify-between">
        {/* Left Section */}
        <div className="flex items-center gap-6">
          <div>
            <h1 className="text-xl font-bold text-slate-800">Here’s what’s happening </h1>
            <p className="text-sm text-slate-600">Welcome back to your admin dashboard</p>
          </div>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-4">
       

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
                  <button 
                    className="w-full flex items-center gap-3 px-3 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
                    onClick={handleLogout}
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

