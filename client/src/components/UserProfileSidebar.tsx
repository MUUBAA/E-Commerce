import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { X, Package, MapPin, User, ChevronRight } from "lucide-react";
import { getUserById } from "../../redux/thunk/user";
import { resetJwt } from "../../redux/slices/loginUser";
import { getDecryptedJwt } from '../../utils/auth';
import { jwtDecode } from 'jwt-decode';
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../redux/stores";

interface UserProfileSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

type SidebarView = "main" | "orders" | "address" | "profile";

const UserProfileSidebar: React.FC<UserProfileSidebarProps> = ({
  isOpen,
  onClose,
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const [currentView, setCurrentView] = useState<SidebarView>("main");
  const { UserAccount, loading } = useSelector(
    (state: RootState) => state.user
  );
  const isLoggedIn = Boolean(localStorage.getItem('jwtToken'));
  const [values, setValues] = useState({
    name: "",
    email: "",
    address: "",
  });

  const handleBackToMain = () => {
    setCurrentView("main");
  };

  const handleLogout = () => {
    dispatch(resetJwt());
    localStorage.removeItem("jwtToken");
    localStorage.clear();
    setValues({ name: "", email: "", address: "" });
    setCurrentView("main");
    // Dispatch a custom event to notify other components (like CartDrawer)
    window.dispatchEvent(new Event("user-logged-out"));
    navigate("/");
  };

  useEffect(() => {
    if (!isOpen) return;

    // Get userId from JWT
    const token = getDecryptedJwt();
    let userIdFromToken: number | undefined;
    if (token) {
      try {
        const decoded = jwtDecode<{ id?: number; sub?: string }>(token);
        userIdFromToken =
          typeof decoded.id === 'number'
            ? decoded.id
            : decoded.sub
              ? Number(decoded.sub)
              : undefined;
      } catch {
        // ignore; will fallback
      }
    }
    const userId = userIdFromToken;
    if (userId) {
      dispatch(getUserById({ id: userId }));
    }
  }, [isOpen, dispatch]);

  // 🔹 2) Sync local state when UserAccount changes
  useEffect(() => {
    if (UserAccount) {
      setValues({
        name: UserAccount.name,
        email: UserAccount.email,
        address: UserAccount.address || "",
      });
    }
  }, [UserAccount]);
  const renderMainView = () => (
    <div className="p-6">
      {/* User Profile Header */}
      <div className="flex items-center mb-8">
        <div className="w-16 h-16 bg-purple-500 rounded-full flex items-center justify-center">
          <User className="h-8 w-8 text-white" />
        </div>
        <div className="ml-4">
          <h3 className="text-lg font-semibold text-gray-900">
            {values.name || (!isLoggedIn ? "Guest" : "No details")}
          </h3>
          <p className="text-gray-600">{values.email || (!isLoggedIn ? "" : "No details")}</p>
        </div>
      </div>

      {/* Menu Items */}
      <div className="space-y-2">
        <button
          onClick={() => setCurrentView("orders")}
          className="w-full flex items-center justify-between p-4 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer"
        >
          <div className="flex items-center">
            <Package className="h-5 w-5 text-gray-600 mr-3" />
            <span className="text-gray-900 font-medium">Orders</span>
          </div>
          <ChevronRight className="h-5 w-5 text-gray-400" />
        </button>

        <button
          onClick={() => setCurrentView("address")}
          className="w-full flex items-center justify-between p-4 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer"
        >
          <div className="flex items-center">
            <MapPin className="h-5 w-5 text-gray-600 mr-3" />
            <span className="text-gray-900 font-medium">Address</span>
          </div>
          <ChevronRight className="h-5 w-5 text-gray-400" />
        </button>

        <button
          onClick={() => setCurrentView("profile")}
          className="w-full flex items-center justify-between p-4 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer"
        >
          <div className="flex items-center">
            <User className="h-5 w-5 text-gray-600 mr-3" />
            <span className="text-gray-900 font-medium">Profile</span>
          </div>
          <ChevronRight className="h-5 w-5 text-gray-400" />
        </button>
      </div>

      {/* Log Out Button (only if logged in) */}
      {isLoggedIn && (
        <div className="mt-8 pt-6 border-t border-gray-200">
          <button
            type="button"
            className="w-full p-4 rounded-lg hover:bg-gray-50 transition-colors text-left text-gray-900 font-medium cursor-pointer"
            onClick={handleLogout}
          >
            Log Out
          </button>
        </div>
      )}
    </div>
  );

  const renderOrdersView = () => (
    <div className="p-6">
      <div className="text-center py-16">
        <div className="w-20 h-20 bg-purple-500 rounded-full mx-auto mb-6 flex items-center justify-center">
          <div className="w-8 h-8 bg-pink-500 rounded-sm flex items-center justify-center">
            <span className="text-white font-bold text-sm">Z</span>
          </div>
          <div className="absolute w-4 h-4 bg-red-500 rounded-full -mt-2 -mr-2"></div>
        </div>
        <h3 className="text-xl font-semibold text-gray-900 mb-2">
          No orders yet
        </h3>
        <button className="mt-6 cursor-pointer px-6 py-2 border border-purple-500 text-purple-500 rounded-lg hover:bg-purple-50 transition-colors cursor-pointer">
          Browse products
        </button>
      </div>
    </div>
  );

  const renderAddressView = () => (
    <div className="p-6">
      {/* Saved Addresses Section */}
      <div className="mb-6">
        <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <MapPin className="h-6 w-6 text-pink-500" />
          Saved Address
        </h4>
      </div>

      {/* Address Card or No Address State */}
      <div className="flex justify-center items-center min-h-[180px]">
        {loading ? (
          <div className="flex flex-col items-center">
            <svg className="animate-spin h-8 w-8 text-pink-500 mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path>
            </svg>
            <span className="text-gray-500">Loading address...</span>
          </div>
        ) : values.address ? (
          <div className="bg-white shadow-md rounded-xl p-6 flex items-center gap-4 border border-pink-100 w-full max-w-md">
            <div className="flex-shrink-0 bg-pink-100 rounded-full p-3">
              <MapPin className="h-7 w-7 text-pink-500" />
            </div>
            <div>
              <div className="text-base font-semibold text-gray-900 mb-1 flex items-center gap-2">
                <span>Primary Address</span>
                <span className="inline-block bg-pink-100 text-pink-600 text-xs px-2 py-0.5 rounded-full">Default</span>
              </div>
              <div className="text-gray-700 text-sm whitespace-pre-line">{values.address}</div>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center text-gray-400">
            <MapPin className="h-12 w-12 mb-4 text-pink-200" />
            <span className="text-lg font-semibold mb-1">No address available</span>
            <span className="text-sm">You have not added any address yet.</span>
          </div>
        )}
      </div>
    </div>
  );

  const renderProfileView = () => (
    <div className="p-6">
      <form className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Name
          </label>
          <input
            type="text"
            value={values.name || (!isLoggedIn ? "Guest" : "No details")}
            disabled
            className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-100 text-gray-500 cursor-not-allowed"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Email
          </label>
          <input
            type="email"
            value={values.email || (!isLoggedIn ? "Guest" : "No details")}
            disabled
            className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-100 text-gray-500 cursor-not-allowed"
          />
        </div>
      </form>

      {/* Logout Account Section */}
      { isLoggedIn  && (
      <div className="mt-8 pt-6 border-t border-gray-200">
        <h4 className="text-pink-500 font-semibold mb-2">Log Out</h4>
        <p className="text-gray-600 text-sm mb-4">
          Logging out will end your current session. You can log in again anytime to access your account.
        </p>
        <button
          type="button"
          className="w-full p-3 rounded-lg bg-pink-500 text-white font-semibold hover:bg-pink-600 transition-colors cursor-pointer"
          onClick={handleLogout}
        >
          Log Out
        </button>
      </div>
      )}
    </div>
  );

  const getHeaderTitle = () => {
    switch (currentView) {
      case "orders":
        return "Orders";
      case "address":
        return "Address";
      case "profile":
        return "Profile";
      default:
        return "Settings";
    }
  };

  return (
    <>
      {/* Backdrop Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 transition-all duration-300"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full w-full max-w-sm bg-white shadow-2xl z-50 transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <button
            onClick={currentView !== "main" ? handleBackToMain : onClose}
            className="flex h-8 w-8 items-center justify-center rounded-full hover:bg-gray-100 transition-colors cursor-pointer"
          >
            <X className="h-5 w-5 text-gray-600" />
          </button>
          <h2 className="text-lg font-semibold text-gray-900">
            {getHeaderTitle()}
          </h2>
          <div className="w-8" />
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto">
          {currentView === "main" && renderMainView()}
          {currentView === "orders" && renderOrdersView()}
          {currentView === "address" && renderAddressView()}
          {currentView === "profile" && renderProfileView()}
        </div>
      </div>
    </>
  );
};

export default UserProfileSidebar;
