using Server.Data.Dto.Orders;
using Server.Data.Entities.CartItems;
using Server.Data.Entities.OrderItems;
using Server.Data.Entities.Orders;

namespace Server.Data.Repositories
{
    public interface IOrdersRepository
    {
        Orders CreateOrder(int userId);
        Orders? GetOrder(int orderId);
        void MarkOrderPaid(int orderId);
         List<UserOrderDto> GetUserOrdersWithItems(int userId);
    }

    public class OrdersRepository : IOrdersRepository
    {
        private readonly Repository _repository;
        public OrdersRepository(Repository repo)
        {
            _repository = repo;
        }

        public Orders CreateOrder(int userId)
        {
            var cartItems = _repository.CartItems
                .Where(c => c.UserId == userId && !c.IsDeleted)
                .ToList();

            if (!cartItems.Any())
                throw new Exception("Cart is empty");

            var totalPrice = cartItems.Sum(c => c.Price);

            var order = new Orders
            {
                UserId = userId,
                TotalPrice = totalPrice,
                Status = "pending",
                CreatedAt = DateTime.UtcNow
            };

            _repository.Orders.Add(order);
            _repository.SaveChanges();

               var orderItems = cartItems.Select(c => new OrderItems
            {
                OrderId = order.Id,
                ProductId = c.ProductId,
                Quantity = c.Quantity,
                Price = c.Price,          // this is line total; use ItemPrice if you want unit price
                CreatedAt = DateTime.UtcNow,
                CreatedBy = userId.ToString(),
                IsDeleted = false
            }).ToList();

            _repository.OrderItems.AddRange(orderItems);

            foreach (var item in cartItems)
            {
                item.IsDeleted = true;
                item.DeletedAt = DateTime.UtcNow;
                item.DeletedBy = userId.ToString();
            }

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

                public List<UserOrderDto> GetUserOrdersWithItems(int userId)
        {
            var orders = _repository.Orders
                .Where(o => !o.IsDeleted && o.UserId == userId)
                .OrderByDescending(o => o.CreatedAt)
                .ToList();

            if (!orders.Any())
                return new List<UserOrderDto>();

            var orderIds = orders.Select(o => o.Id).ToList();

            var itemsQuery =
                from oi in _repository.OrderItems
                join p in _repository.Products on oi.ProductId equals p.Id
                where orderIds.Contains(oi.OrderId) && !oi.IsDeleted
                select new
                {
                    oi.Id,
                    oi.OrderId,
                    oi.ProductId,
                    oi.Quantity,
                    LinePrice = oi.Price,
                    p.ItemName,
                    p.ItemDescription,
                    p.ItemUrl
                };

            var itemsGrouped = itemsQuery
                .ToList()
                .GroupBy(x => x.OrderId)
                .ToDictionary(
                    g => g.Key,
                    g => g.Select(x => new OrderItemListDto
                    {
                        OrderItemId = x.Id,
                        ProductId = x.ProductId,
                        Quantity = x.Quantity,
                        LinePrice = x.LinePrice,
                        ItemName = x.ItemName,
                        ItemDescription = x.ItemDescription,
                        ItemUrl = x.ItemUrl
                    }).ToList()
                );

            var result = new List<UserOrderDto>();

            foreach (var o in orders)
            {
                itemsGrouped.TryGetValue(o.Id, out var orderItems);
                result.Add(new UserOrderDto
                {
                    OrderId = o.Id,
                    TotalPrice = o.TotalPrice,
                    Status = o.Status,
                    CreatedAt = o.CreatedAt,
                    Items = orderItems ?? new List<OrderItemListDto>()
                });
            }
            return result;  
        }
    }

}