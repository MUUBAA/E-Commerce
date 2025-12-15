using Microsoft.EntityFrameworkCore;
using Server.Data.Dto.Admin;
using Server.Data.Entities.OrderItems;
using Server.Data.Entities.Orders;
using Server.Data.Repositories;

namespace Server.Services.Admin.AdminOrderService
{
    public interface IAdminOrderService
    {
        List<Orders> GetAll();
        Orders UpdateStatus(OrderStatusUpdateDto dto, string performedBy);
        Orders? GetById(int orderId);
        List<OrderItems> GetOrderItems(int orderId);
    }
    public class AdminOrderService : IAdminOrderService
    {
        private readonly Repository _db;
        private readonly ILogger<AdminOrderService> _logger;

        public AdminOrderService(Repository db, ILogger<AdminOrderService> logger)
        {
            _db = db;
            _logger = logger;
        }

        public List<Orders> GetAll()
        {
            return _db.Orders.AsNoTracking().OrderByDescending(o => o.CreatedAt).ToList();
        }

        public Orders UpdateStatus(OrderStatusUpdateDto dto, string performedBy)
        {
            var order = _db.Orders.FirstOrDefault(o => o.Id == dto.OrderId) ?? throw new Exception("Order not found");
            order.Status = dto.OrderStatus;
            order.UpdatedAt = DateTime.UtcNow;
            order.UpdatedBy = performedBy;
            _db.SaveChanges();
            return order;
        }

        public Orders? GetById(int orderId)
        {
            return _db.Orders.AsNoTracking().FirstOrDefault(o => o.Id == orderId);
        }

        public List<OrderItems> GetOrderItems(int orderId)
        {
            return _db.OrderItems.AsNoTracking().Where(oi => oi.OrderId == orderId && !oi.IsDeleted).ToList();
        }
    }

}
