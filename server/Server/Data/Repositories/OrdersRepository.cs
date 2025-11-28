using Server.Data.Entities.Orders;

namespace Server.Data.Repositories
{
    public interface IOrdersRepository
    {
        Orders CreateOrder(int userId, decimal totalPrice);
        Orders? GetOrder(int orderId);
        void MarkOrderPaid(int orderId);
    }

    public class OrdersRepository : IOrdersRepository
    {
        private readonly Repository _repository;
            public OrdersRepository(Repository repo)
            {
                _repository = repo;
            }

            public Orders CreateOrder(int userId, decimal totalPrice)
            {
                var order = new Orders
                {
                    UserId = userId,
                    TotalPrice = totalPrice,
                    Status = "pending",  // unpaid
                    CreatedAt = DateTime.UtcNow,
                };

                _repository.Add(order);
                _repository.SaveChanges();

                return order;
            }

            public Orders? GetOrder(int orderId)
            {
                return _repository.Orders
                    .FirstOrDefault(o => o.Id == orderId && !o.IsDeleted);
            }

            public void MarkOrderPaid(int orderId)
            {
                var order = GetOrder(orderId)
                    ?? throw new Exception("Order not found");

                order.Status = "paid"; // paid
                order.UpdatedAt = DateTime.UtcNow;

                _repository.Update(order);
                _repository.SaveChanges();
            }
        }

    }

