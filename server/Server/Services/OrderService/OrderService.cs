using Server.Data.Dto.Orders;
using Server.Data.Entities.Orders;
using Server.Data.Repositories;

namespace Server.Services.OrderService
{
    public interface IOrderService
    {
        Orders CreateOrder(int userId);
        List<UserOrderDto> GetUserOrders(int userId); 
        void MarkOrderPaid(int orderId);
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
            return _ordersRepo.CreateOrder(userId);
        }

        public List<UserOrderDto> GetUserOrders(int userId)
        {
            return _ordersRepo.GetUserOrdersWithItems(userId);
        }

        public void MarkOrderPaid(int orderId)
        {
            _ordersRepo.MarkOrderPaid(orderId);
        }
    }
}
