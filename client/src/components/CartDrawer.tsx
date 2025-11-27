import React, {  useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { jwtDecode } from 'jwt-decode';
import { toast } from 'react-toastify';
import { X } from 'lucide-react';
import { loginUser, registerUser, forgotPassword } from '../../redux/thunk/jwtVerify';
import type { AppDispatch, RootState } from '../../redux/stores';
import { addToCart, getCartItems, removeCartItem, type GetAllCartPayload } from '../../redux/thunk/cart';
import type { CartItem } from '../../redux/slices/cartSlice';
import { getDecryptedJwt } from '../../utils/auth';
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
  const reduxCartItems = useSelector((state: RootState) => state.cart.items);
  const reduxTotalPrice = useSelector((state: RootState) => state.cart.totalPrice ?? 0);
  const [currentView, setCurrentView] = useState<ViewState>('empty');
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const hasItems = cartItems.length > 0;
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

  const handleSubmitLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await dispatch(loginUser({ email: formData.email, password: formData.password }));
      if (response.type === "loginUser/fulfilled") {
        toast.dismiss();
        toast.success("Login successful!");
        setFormData({ email: '', name: '', password: '', confirmPassword: '' });

        await FetchCartItems();
        setCurrentView("cart");
      } else {
        const errorMsg =
          typeof response.payload === "string" && response.payload
            ? response.payload
            : "Login failed";
        toast.error(errorMsg);
      }
    } catch (err) {
      console.error('Login catch error:', err);
      toast.error("Login failed");
    } finally {
      setLoading(false);
    }
  };
   
  const FetchCartItems = async () => {
    try {
      const preparePayload: GetAllCartPayload = {
        userId: userIdFromToken ?? 0,
        id: 0,
        page: 0,
        pageSize: 20,
        productId: 0,
        quantity: 0,
        price: 0,
        itemDescription: '',
        itemName: '',
        itemUrl: ''
      };
      const response = await dispatch(getCartItems(preparePayload));
      if(response.meta.requestStatus === 'fulfilled') {
        if (Array.isArray(response.payload)) {
          setCartItems(response.payload);
          setTotalPrice(0);
          setCurrentView('cart');
        } 
        else if(response.payload && typeof response.payload === 'object' ) {
          setCartItems(response?.payload?.items || []); 
          setTotalPrice(response?.payload?.totalPrice || 0);
          setCurrentView('cart');
        }
        else {
          setCartItems([]);
          setTotalPrice(0);
        }
      }
    } catch (error) {
      console.error('Error fetching cart items:', error);
      setCartItems([]); 
    }
  }
  useEffect(() => {
    const token = localStorage.getItem('jwtToken');
    if (token) {

      FetchCartItems();
      setCurrentView('cart');
    } else {
      setCartItems([]);
      setCurrentView('login');
    }

    // Listen for logout event to reset cart and show login view
    const handleUserLoggedOut = () => {
      setCartItems([]);
      setCurrentView('login');
    };
    window.addEventListener('user-logged-out', handleUserLoggedOut);
    return () => {
      window.removeEventListener('user-logged-out', handleUserLoggedOut);
    };
  }, [dispatch]);
      
 const handleSubmitRegister = async (e: React.FormEvent) => {
  e.preventDefault();

  if (formData.password !== formData.confirmPassword) {
    toast.error("Passwords do not match");
    return;
  }

  setLoading(true);
  try {
    const { token, message } = await dispatch(
      registerUser({
        name: formData.name,
        email: formData.email,
        password: formData.password,
      })
    ).unwrap(); // <-- throws if rejected

    toast.dismiss();
    toast.success(message || "Registration successful!");

    try {
      const decoded = jwtDecode<DecodedToken>(token);
      console.log("Registered user:", decoded);
    } catch (err) {
      console.warn("Failed to decode token from register:", err);
    }

    await FetchCartItems();
    setCurrentView("cart");

    setFormData({
      email: "",
      name: "",
      password: "",
      confirmPassword: "",
    });
  } catch (error) {
    console.error("Registration catch error:", error);
    toast.error(
      typeof error === "string" && error ? error : "Registration failed"
    );
  } finally {
    setLoading(false);
  }
};

useEffect(() => {
  setCartItems(reduxCartItems);
  setTotalPrice(reduxTotalPrice);
}, [reduxCartItems, reduxTotalPrice]);

  const handleSubmitForgot = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await dispatch(forgotPassword({ email: formData.email }));
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

  const handleIncrease = async (item: CartItem) => {
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
    const UserId = userIdFromToken ?? 0;
    if (!UserId) return toast.warn('Please sign in to add items to your cart');
    const numericPrice = Number(String(item.price));
    if (Number.isNaN(numericPrice)) {
      toast.error('Unable to parse item price');
      return;
    }
    try {
      await dispatch(
        addToCart({
          id: item.id,
          userId: UserId,
          productId: item.productId, // Use productId from getAllCart
          quantity: 1,
          price: numericPrice,
        })
      ).unwrap();
      toast.success('Added to cart');
      await FetchCartItems();
    } catch (err: unknown) {
      toast.error(typeof err === 'string' ? err : 'Failed to add to cart');
    }
  };

  const handleDecrease = async (item: CartItem) => {
    await dispatch(removeCartItem({ productId: item.productId, userId: item.userId }));
    FetchCartItems();
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
        <>
          <div className="space-y-4 mb-4">
            {cartItems.map((i, idx) => (
              <div
                key={`${i.productId}-${idx}`}
                className="flex items-center gap-3 rounded-xl border p-3"
              >
                {/* product image */}
                <img
                  src={i.itemUrl}
                  alt={i.itemName}
                  className="h-14 w-14 rounded-lg object-cover flex-shrink-0"
                />

                {/* title + subtitle */}
                <div className="flex-1">
                  <div className="text-sm font-semibold text-gray-900 line-clamp-2">
                    {i.itemName}
                  </div>
                  <div className="text-xs text-gray-500">
                    {i.itemDescription}
                  </div>
                </div>

                {/* qty controls + price */}
                <div className="flex flex-col items-end gap-1">
                  {i.quantity > 0 ? (
                    <div className="flex items-center rounded-full border px-3 py-1 text-sm font-medium">
                        <button
                          className="px-2 py-1 text-pink-500 text-lg font-bold hover:cursor-pointer"
                          onClick={() => handleDecrease(i)}
                        >
                          −
                        </button>
                        <span className="px-3 py-1 text-pink-500 font-semibold">{i.quantity}</span>
                        <button
                          className="px-2 py-1 text-pink-500 text-lg font-bold hover:cursor-pointer"
                          onClick={() => handleIncrease(i)}
                        >
                          +
                        </button>
                    </div>
                  ) : (
                    <button
                      className="px-4 py-1 rounded-full border text-sm font-medium text-green-600 border-green-600 hover:bg-green-50"
                      onClick={() => handleIncrease(i)}
                    >
                      ADD
                    </button>
                  )}
                  <div className="text-sm font-semibold text-gray-900">
                    ₹{i.price}
                  </div>
                </div>
              </div>
            ))}
          </div>
          {/* Bill summary */}
          <div className="rounded-xl border bg-white p-4 shadow-sm mb-4">
            <div className="font-semibold text-gray-800 mb-2 flex items-center gap-2">
              <span className="inline-block bg-gray-100 rounded-full px-2 py-1 text-xs font-medium text-gray-600 mr-2">
                <svg className="inline h-4 w-4 mr-1 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2a2 2 0 012-2h2a2 2 0 012 2v2m-6 4h6a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                Bill summary
              </span>
            </div>
            <div className="flex justify-between text-sm py-1">
              <span>Item Total</span>
              <span className="line-through text-gray-400 mr-2">₹333</span>
              <span className="font-semibold text-gray-900">₹{totalPrice}</span>
            </div>
            <div className="flex justify-between text-sm py-1">
              <span>Handling Fee</span>
              <span className="text-green-600 font-semibold">FREE</span>
            </div>
            <div className="flex justify-between text-sm py-1">
              <span>Delivery Fee</span>
              <span className="text-green-600 font-semibold">FREE</span>
            </div>
            <div className="flex justify-between text-base font-bold border-t pt-2 mt-2">
              <span>To Pay</span>
              <span className="text-gray-900">₹{totalPrice}</span>
            </div>
          </div>
        </>
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
      {/* Backdrop Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
          onClick={onClose}
        />
      )}

      {/* Cart Drawer */}
      <div
        className={`fixed right-0 top-0 h-full w-80 bg-white shadow-lg z-50 transition-transform duration-300 ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold">My Cart</h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Cart Content */}
          <div className="flex-1 overflow-y-auto p-4 relative">
            <div>
              {currentView === 'empty' && renderEmptyCart()}
              {currentView === 'login' && renderLoginForm()}
              {currentView === 'register' && renderRegisterForm()}
              {currentView === 'forgot' && renderForgotForm()}
              {currentView === 'cart' && renderCart()}
            </div>
          </div>

          {/* Footer */}
          {hasItems && (
            <div className="p-4 border-t border-gray-200">
              <button
                className="w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600"
              >
                Proceed to Checkout
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};
      

export default CartDrawer;