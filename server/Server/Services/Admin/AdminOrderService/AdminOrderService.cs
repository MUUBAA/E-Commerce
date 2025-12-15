using Microsoft.EntityFrameworkCore;
using Server.Data.Dto.Admin;
using Server.Data.Contract;
using Server.Data.Entities.OrderItems;
using Server.Data.Entities.Orders;
using Server.Data.Repositories;

namespace Server.Services.Admin.AdminOrderService
{
    public interface IAdminOrderService
    {
        PagedResult<Orders> GetAll(PaginationContract pagination);
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

        public PagedResult<Orders> GetAll(PaginationContract pagination)
        {
            var page = pagination != null && pagination.Page > 0 ? pagination.Page : 1;
            var pageSize = pagination != null && pagination.PageSize > 0 ? pagination.PageSize : 20;

            var search = pagination?.Search?.Trim();

            var query = _db.Orders
                .AsNoTracking()
                .Where(o => !o.IsDeleted);

            if (!string.IsNullOrEmpty(search))
            {
                // try numeric id match
                if (int.TryParse(search, out var idSearch) && idSearch > 0)
                {
                    query = query.Where(o => o.Id == idSearch);
                }
                else
                {
                    // match status or user name/email
                    query = query.Where(o => o.Status != null && o.Status.Contains(search)
                        || _db.Users.Any(u => u.Id == o.UserId && ((u.Name != null && u.Name.Contains(search)) || (u.Email != null && u.Email.Contains(search)))));
                }
            }

            var total = query.Count();

            var items = query
                .OrderByDescending(o => o.CreatedAt)
                .Skip((page - 1) * pageSize)
                .Take(pageSize)
                .ToList();

            return new PagedResult<Orders>
            {
                Items = items,
                Total = total
            };
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
