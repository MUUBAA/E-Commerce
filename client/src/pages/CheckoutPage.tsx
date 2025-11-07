import React from 'react';

const cartItems = [
  { name: 'Carrot', price: '₹50/kg', quantity: 1 },
  { name: 'Milk', price: '₹60/L', quantity: 2 },
  { name: 'Chips', price: '₹20', quantity: 3 },
];

const CheckoutPage: React.FC = () => {
  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => {
      const price = parseInt(item.price.replace(/[^0-9]/g, ''));
      return total + price * item.quantity;
    }, 0);
  };

  return (
    <div className="p-2 pb-8 md:p-4">
      <h2 className="mb-4 text-2xl font-bold">Checkout</h2>

      <div className="mb-4 divide-y divide-gray-200 rounded-lg border border-gray-200 bg-white shadow-sm">
        {cartItems.map((item, index) => (
          <div key={item.name} className="flex items-center justify-between p-4">
            <div>
              <p className="font-semibold">{item.name}</p>
              <p className="text-sm text-gray-500">{`Quantity: ${item.quantity}`}</p>
            </div>
            <p className="font-semibold">{`₹${parseInt(item.price.replace(/[^0-9]/g, '')) * item.quantity}`}</p>
          </div>
        ))}
      </div>

      <hr className="my-4" />

      <div className="mb-4 flex justify-between font-bold">
        <h3 className="text-lg">Total</h3>
        <p className="text-lg">{`₹${getTotalPrice()}`}</p>
      </div>

      <div className="space-y-4">
        <div>
          <label htmlFor="address" className="mb-1 block text-sm font-medium text-gray-700">Delivery Address</label>
          <input id="address" type="text" className="w-full rounded-lg border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500" />
        </div>
        <div>
          <label htmlFor="payment" className="mb-1 block text-sm font-medium text-gray-700">Payment Method</label>
          <input id="payment" type="text" className="w-full rounded-lg border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500" />
        </div>
      </div>

      <button className="mt-6 w-full cursor-pointer rounded-lg bg-purple-600 py-3 text-lg font-semibold text-white shadow-sm transition-transform hover:scale-105 hover:bg-purple-700">
        Place Order
      </button>
    </div>
  );
};

export default CheckoutPage;
