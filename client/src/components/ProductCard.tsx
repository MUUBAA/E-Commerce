// components/ProductCard.tsx
import { Star } from 'lucide-react';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, removeCartItem, getCartItems } from '../../redux/thunk/cart';
import type { AppDispatch, RootState } from '../../redux/stores';
import { toast } from 'react-toastify';
import { jwtDecode } from 'jwt-decode';
import { getDecryptedJwt } from '../../utils/auth';

interface ProductCardProps {
  id: number;               // original id from API            // <-- needed
  itemName: string;
  itemPrice: string;             // like "₹199" or "199.00"
  originalPrice?: string;
  itemUrl: string;
  discount?: string;
  rating?: number;
  reviews?: string;
  weight?: string;
}

const ProductCard: React.FC<ProductCardProps> = ({
  id,
  itemName,
  itemPrice,
  originalPrice,
  itemUrl,
  discount,
  rating,
  reviews,
  weight,
}) => {
  const dispatch = useDispatch<AppDispatch>();
  // Get quantity from Redux cart state
  const cartQuantity = useSelector((state: RootState) => {
    const item = state.cart.items.find((ci) => ci.productId === id);
    return item ? item.quantity : 0;
  });
  const [loading, setLoading] = React.useState(false);
  // Prefer userId from decrypted JWT; fallback to any stored profile if needed.
  const fallbackUserId = useSelector((state: RootState) => state.user.UserAccount?.id
    ?? state.user.userProfile?.Id
  );
  const handleIncrease = async () => {
    setLoading(true);
    if (!id || Number(id) <= 0) {
      return toast.error('Invalid product. Please try again.');
    }
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
    const UserId = userIdFromToken ?? fallbackUserId;
    if (!UserId) return toast.warn('Please sign in to add items to your cart');
    const numericPrice = Number(String(itemPrice).replace(/[^\d.]/g, ''));
    if (Number.isNaN(numericPrice)) {
      toast.error('Unable to parse item price');
      return;
    }
    try {
      await dispatch(
        addToCart({
          id: 0, // or some logic to generate a unique cart item id
          userId: UserId,
          productId: id,
          quantity: 1,
          price: numericPrice,
        })
      ).unwrap();
    } catch (err: unknown) {
      toast.error(typeof err === 'string' ? err : 'Failed to add to cart');
    } finally {
      setLoading(false);
    }
  };

  const handleDecrease = async () => {
    if (cartQuantity <= 0) return;
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
    const UserId = userIdFromToken ?? fallbackUserId;
    if (!UserId) return toast.warn('Please sign in to remove items from your cart');
    try {
      await dispatch(
        removeCartItem({ productId: id, userId: UserId })
      ).unwrap();
      await dispatch(getCartItems({ userId: UserId, id: 0, page: 0, pageSize: 20, productId: 0, quantity: 0, price: 0, itemDescription: '', itemName: '', itemUrl: '' }));
    } catch (err: unknown) {
      toast.error(typeof err === 'string' ? err : 'Failed to remove from cart');
    }
  };

  return (
    <div className="relative flex min-w-[160px] max-w-[180px] flex-col rounded-lg border border-gray-200 bg-white p-3 shadow-sm">
      <div className="relative mb-3">
        <img className="h-32 w-full rounded-md object-cover" src={itemUrl} alt={itemName} />
        {cartQuantity > 0 ? (
          <div className="absolute bottom-2 right-2 flex items-center rounded-md border border-pink-500 bg-white">
            <button
              className="px-2 py-1 text-pink-500 text-lg font-bold cursor-pointer"
              onClick={handleDecrease}
            >
              −
            </button>
            <span className="px-3 py-1 text-pink-500 font-semibold cursor-pointer">{cartQuantity}</span>
            <button
              className="px-2 py-1 text-pink-500 text-lg font-bold cursor-pointer"
              onClick={handleIncrease}
            >
              +
            </button>
          </div>
        ) : (
          <button
            className="absolute bottom-2 right-2 cursor-pointer rounded-md border border-pink-500 bg-white px-3 py-1 text-sm font-semibold text-pink-500 transition-colors hover:bg-pink-50 flex items-center justify-center min-w-[60px]"
            onClick={handleIncrease}
            disabled={loading}
          >
            {loading ? (
              <svg className="animate-spin h-4 w-4 text-pink-500" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
              </svg>
            ) : (
              'ADD'
            )}
          </button>
        )}
      </div>

      <div className="mb-2 flex items-baseline gap-2">
        <span className="rounded bg-green-600 px-2 py-1 text-sm font-bold text-white">{itemPrice}</span>
        {originalPrice && <span className="text-sm text-gray-500 line-through">{originalPrice}</span>}
      </div>

      {discount && <p className="mb-2 text-xs font-semibold text-green-700">{discount}</p>}
      <h3 className="mb-1 line-clamp-2 text-sm font-medium leading-tight text-gray-800">{itemName}</h3>
      {weight && <p className="mb-2 text-xs text-gray-500">{weight}</p>}
      {rating && (
        <div className="flex items-center gap-1 text-xs text-gray-600">
          <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
          <span className="font-semibold text-gray-800">{rating}</span>
          {reviews && <span>({reviews})</span>}
        </div>
      )}
    </div>
  );
};

export default ProductCard;
