using Server.Data.Contract.CartItems;
using Server.Data.Entities.Orders;
using Server.Data.Repositories;

namespace Server.Services.OrderService
{
   public interface IOrderService
    {
        Orders CreateOrder(int userId);
    }
    public class OrderService : IOrderService
    {
        private readonly IOrdersRepository _ordersRepo;
        private readonly ICartRepository _cartRepo;

        public OrderService(IOrdersRepository ordersRepo, ICartRepository cartRepo)
        {
            _ordersRepo = ordersRepo;
            _cartRepo = cartRepo;
        }

        public Orders CreateOrder(int userId)
        {
            // 1) Build contract for cart repo
            var cartContract = new CartItemContract
            {
                UserId = userId,
                Page = 0,
                PageSize = 100,   
            };

            var (totalItems, totalPages, totalPrice, cartItems) = _cartRepo.GetCartItems(cartContract);

            if (totalItems == 0 || cartItems == null || !cartItems.Any())
            {
                throw new Exception("Cart is empty");
            }

            decimal total = cartItems.Sum(x => x.Price * x.Quantity);

            var order = _ordersRepo.CreateOrder(userId, total);

            return order;
        }
    }
}
