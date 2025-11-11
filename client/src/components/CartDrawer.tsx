import React, { useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { jwtDecode } from 'jwt-decode';
import { toast } from 'react-toastify';
import { X } from 'lucide-react';
import { loginUser, registerUser, forgotPassword } from '../../redux/thunk/jwtVerify';
import type { AppDispatch, RootState } from '../../redux/stores';
import { getCartItems } from '../../redux/thunk/cart';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

interface DecodedToken {
  Email: string;
  Name: string;
  CreatedAt: string;
  exp: number;
}

type ViewState = 'empty' | 'login' | 'register' | 'cart' | 'forgot';

const CartDrawer: React.FC<CartDrawerProps> = ({ isOpen, onClose }) => {
  const dispatch = useDispatch<AppDispatch>();
  const [currentView, setCurrentView] = useState<ViewState>('empty');
  const [loading, setLoading] = useState(false);
  const cart = useSelector((s: RootState) => s.cart);
  const hasItems = useMemo(() => (cart.items?.length ?? 0) > 0, [cart.items]);
  const [formData, setFormData] = useState({
    email: '',
    name: '',
    password: '',
    confirmPassword: ''
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleLogin = () => {
    setCurrentView('login');
  };

  const handleCreateAccount = () => {
    setCurrentView('register');
  };

  const handleForgotOpen = () => {
    setCurrentView('forgot');
  };

  const handleBackToEmpty = () => {
    setCurrentView('empty');
    setFormData({ email: '', name: '', password: '', confirmPassword: '' });
  };

  const handleSubmitLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('handleSubmitLogin called with:', formData);
    setLoading(true);
    try {
      const response = await dispatch(loginUser({ email: formData.email, password: formData.password }));
      console.log('Login dispatch response:', response);
      if (response.type === "loginUser/fulfilled") {
        toast.dismiss();
        toast.success("Login successful!");
        setFormData({ email: '', name: '', password: '', confirmPassword: '' });

        const jwt = response.payload as string;
        const decodedToken = jwtDecode<DecodedToken>(jwt);

        console.log('Logged in user:', decodedToken);
        
        // Load items then switch to cart view
        try { await dispatch(getCartItems({})).unwrap(); } catch {}
        setCurrentView('cart');
      } else {
        const errorMsg =
          typeof response.payload === "string" && response.payload
            ? response.payload === "User not found"
              ? "User not registered"
              : response.payload === "Invalid password"
              ? "Invalid password"
              : response.payload
            : "Login failed";
        toast.error(errorMsg);
      }
    } catch (error) {
      console.error('Login catch error:', error);
      toast.error("Login failed");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmitRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('handleSubmitRegister called with:', formData);
    
    // Validate password match
    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    setLoading(true);
    try {
      const response = await dispatch(registerUser({ 
        name: formData.name, 
        email: formData.email, 
        password: formData.password 
      }));
      console.log('Register dispatch response:', response);
      
      if (response.type === "registerUser/fulfilled") {
        toast.dismiss();
        toast.success("Registration successful! Please login.");
        setFormData({ email: '', name: '', password: '', confirmPassword: '' });
        
        // Switch to login view
        setCurrentView('login');
      } else {
        const errorMsg =
          typeof response.payload === "string" && response.payload
            ? response.payload
            : "Registration failed";
        toast.error(errorMsg);
      }
    } catch (error) {
      console.error('Registration catch error:', error);
      toast.error("Registration failed");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmitForgot = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await dispatch(forgotPassword({ email: formData.email }));
      console.log('Forgot dispatch response:', response);
      if (response.type === 'forgotPassword/fulfilled') {
        toast.dismiss();
        toast.success('If an account exists for this email, you will receive reset instructions');
        setFormData({ email: '', name: '', password: '', confirmPassword: '' });
        setCurrentView('login');
      } else {
        const errorMsg = typeof response.payload === 'string' && response.payload ? response.payload : 'Request failed';
        toast.error(errorMsg);
      }
    } catch (err) {
      console.error('Forgot catch error:', err);
      toast.error('Request failed');
    } finally {
      setLoading(false);
    }
  };

  const renderEmptyCart = () => (
    <div className="flex flex-col items-center justify-center text-center py-8">
      <div className="mb-6">
        <div className="mx-auto h-20 w-20 rounded-full bg-gray-50 flex items-center justify-center">
          <svg 
            className="h-10 w-10 text-gray-400" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={1.5} 
              d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5M17 17a2 2 0 11-4 0 2 2 0 014 0zM9 17a2 2 0 11-4 0 2 2 0 014 0z"
            />
          </svg>
        </div>
      </div>
      
      <h3 className="mb-2 text-xl font-semibold text-gray-900">Please Login</h3>
      <p className="mb-8 text-gray-600 text-sm">Please login to access the cart.</p>
      
      <button 
        onClick={handleLogin}
        className="w-full rounded-xl bg-pink-500 px-6 py-3.5 font-semibold text-white transition-all duration-200 hover:bg-pink-600 hover:shadow-lg transform hover:scale-[1.02] cursor-pointer"
      >
        Login
      </button>
    </div>
  );

  const renderLoginForm = () => (
    <div className="py-6">
      <div className="text-center mb-8">
        <h3 className="text-xl font-semibold text-gray-900 mb-2">Welcome Back</h3>
        <p className="text-gray-600 text-sm">Login to access your cart</p>
      </div>

      <form onSubmit={handleSubmitLogin} className="space-y-4">
        <div>
          <input
            type="email"
            placeholder="Email / Username"
            value={formData.email}
            onChange={(e) => handleInputChange('email', e.target.value)}
            className="w-full px-4 py-3.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all"
            required
          />
        </div>

        <div>
          <input
            type="password"
            placeholder="Password"
            value={formData.password}
            onChange={(e) => handleInputChange('password', e.target.value)}
            className="w-full px-4 py-3.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all"
            required
          />
        </div>

        <div className="text-right">
          <button
            type="button"
            onClick={handleForgotOpen}
            className="text-pink-500 text-sm hover:text-pink-600 transition-colors cursor-pointer"
          >
            Forgot Password?
          </button>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-xl bg-pink-500 px-6 py-3.5 font-semibold text-white transition-all duration-200 hover:bg-pink-600 hover:shadow-lg transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
        >
          {loading ? 'Logging in...' : 'Continue'}
        </button>

        <div className="text-center pt-4">
          <span className="text-gray-600 text-sm">Don't have an account? </span>
          <button
            type="button"
            onClick={handleCreateAccount}
            className="text-pink-500 text-sm font-medium hover:text-pink-600 transition-colors cursor-pointer"
          >
            Create Account
          </button>
        </div>
      </form>
    </div>
  );

  const renderRegisterForm = () => (
    <div className="py-6">
      <div className="text-center mb-8">
        <h3 className="text-xl font-semibold text-gray-900 mb-2">Create Account</h3>
        <p className="text-gray-600 text-sm">Join us to start shopping</p>
      </div>

      <form onSubmit={handleSubmitRegister} className="space-y-4">
        <div>
          <input
            type="text"
            placeholder="Name"
            value={formData.name}
            onChange={(e) => handleInputChange('name', e.target.value)}
            className="w-full px-4 py-3.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all"
            required
          />
        </div>

        <div>
          <input
            type="email"
            placeholder="Email"
            value={formData.email}
            onChange={(e) => handleInputChange('email', e.target.value)}
            className="w-full px-4 py-3.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all"
            required
          />
        </div>

        <div>
          <input
            type="password"
            placeholder="Password"
            value={formData.password}
            onChange={(e) => handleInputChange('password', e.target.value)}
            className="w-full px-4 py-3.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all"
            required
          />
        </div>

        <div>
          <input
            type="password"
            placeholder="Re-enter Password"
            value={formData.confirmPassword}
            onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
            className="w-full px-4 py-3.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all"
            required
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-xl bg-pink-500 px-6 py-3.5 font-semibold text-white transition-all duration-200 hover:bg-pink-600 hover:shadow-lg transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
        >
          {loading ? 'Creating Account...' : 'Create Account'}
        </button>

        <div className="text-center pt-4">
          <span className="text-gray-600 text-sm">Already have an account? </span>
          <button
            type="button"
            onClick={() => setCurrentView('login')}
            className="text-pink-500 text-sm font-medium hover:text-pink-600 transition-colors cursor-pointer"
          >
            Login
          </button>
        </div>

        <div className="text-center text-xs text-gray-500 mt-4">
          By continuing, you agree to our{' '}
          <span className="text-pink-500">Terms of Service</span> &{' '}
          <span className="text-pink-500">Privacy Policy</span>
        </div>
      </form>
    </div>
  );

  const renderCart = () => (
    <div className="py-6">
      {!hasItems ? (
      <div className="flex flex-col items-center justify-center text-center py-12">
        <div className="mb-6">
          <div className="mx-auto h-24 w-24 rounded-full bg-gray-50 flex items-center justify-center">
            <svg 
              className="h-12 w-12 text-gray-400" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={1.5} 
                d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
              />
            </svg>
          </div>
        </div>
        
        <h3 className="mb-2 text-xl font-semibold text-gray-900">Your cart is empty</h3>
        <p className="mb-8 text-gray-500 text-sm max-w-xs">
          Start adding items to your cart and they will appear here.
        </p>
        
        <button 
          onClick={onClose}
          className="w-full max-w-xs rounded-xl bg-gray-900 px-6 py-3.5 font-semibold text-white transition-all duration-200 hover:bg-gray-800 hover:shadow-lg transform hover:scale-[1.02] cursor-pointer"
        >
          Browse Products
        </button>
      </div>
      ) : (
        <div className="space-y-4">
          {cart.items.map((i, idx) => (
            <div key={`${i.productId}-${idx}`} className="flex items-center justify-between rounded-lg border p-3">
              <div className="flex flex-col">
                <span className="text-sm font-medium text-gray-800">Product #{i.productId}</span>
                <span className="text-xs text-gray-500">Qty: {i.quantity}</span>
              </div>
              <div className="text-sm font-semibold text-gray-900">₹{i.price}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );

  const renderForgotForm = () => (
    <div className="py-6">
      <div className="text-center mb-8">
        <h3 className="text-xl font-semibold text-gray-900 mb-2">Reset Password</h3>
        <p className="text-gray-600 text-sm">Enter your email and we'll send reset instructions.</p>
      </div>

      <form onSubmit={handleSubmitForgot} className="space-y-4">
        <div>
          <input
            type="email"
            placeholder="Email"
            value={formData.email}
            onChange={(e) => handleInputChange('email', e.target.value)}
            className="w-full px-4 py-3.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all"
            required
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-xl bg-pink-500 px-6 py-3.5 font-semibold text-white transition-all duration-200 hover:bg-pink-600 hover:shadow-lg transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
        >
          {loading ? 'Sending...' : 'Send reset link'}
        </button>

        <div className="text-center pt-4">
          <button
            type="button"
            onClick={() => setCurrentView('login')}
            className="text-pink-500 text-sm font-medium hover:text-pink-600 transition-colors cursor-pointer"
          >
            Back to Login
          </button>
        </div>
      </form>
    </div>
  );

  return (
    <>
      {/* Backdrop Overlay with Blur Effect */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 transition-all duration-300"
          onClick={onClose}
        />
      )}
      
      {/* Cart Modal - Centered Overlay */}
      <div 
        className={`fixed inset-0 z-50 flex items-center justify-center p-4 transition-all duration-300 ${
          isOpen ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'
        }`}
      >
        <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-sm mx-auto overflow-hidden">
          {/* Header */}
          <div className="relative flex items-center justify-between p-6 border-b border-gray-100">
            <button 
              onClick={currentView === 'cart' ? onClose : currentView !== 'empty' ? handleBackToEmpty : onClose}
              className="absolute top-4 left-4 flex h-8 w-8 items-center justify-center rounded-full hover:bg-gray-100 transition-colors cursor-pointer"
            >
              <X className="h-5 w-5 text-gray-600" />
            </button>
            <h2 className="text-lg font-semibold text-gray-900 w-full text-center">Cart</h2>
          </div>

          {/* Cart Content */}
          <div className="px-6 pb-6">
            {currentView === 'empty' && renderEmptyCart()}
            {currentView === 'login' && renderLoginForm()}
            {currentView === 'register' && renderRegisterForm()}
            {currentView === 'forgot' && renderForgotForm()}
            {currentView === 'cart' && renderCart()}
          </div>
        </div>
      </div>
    </>
  );
};

export default CartDrawer;