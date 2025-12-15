using Microsoft.EntityFrameworkCore;
using Server.Data.Dto.Admin;
using Server.Data.Repositories;

namespace Server.Services.Admin.InventoryService
{
    public interface IInventoryService
    {
        void ReduceStockForOrder(int orderId);
        void DisableInactiveProducts();
        List<InventoryAlertDto> GetLowStockAlerts(int threshold = 5);
    }
    public class InventoryService : IInventoryService
    {
        private readonly Repository _db;
        private readonly ILogger<InventoryService> _logger;

        public InventoryService(Repository db, ILogger<InventoryService> logger)
        {
            _db = db;
            _logger = logger;
        }

        public void ReduceStockForOrder(int orderId)
        {
            var items = _db.OrderItems.Where(oi => oi.OrderId == orderId).ToList();
            foreach (var item in items)
            {
                var product = _db.Products.FirstOrDefault(p => p.Id == item.ProductId);
                if (product == null) continue;
                product.StockQuantity -= item.Quantity;
                if (product.StockQuantity <= 0)
                {
                    product.StockQuantity = 0;
                    product.IsActive = false;
                }
                product.UpdatedAt = DateTime.UtcNow;
            }
            _db.SaveChanges();
        }

        public void DisableInactiveProducts()
        {
            var products = _db.Products.Where(p => p.StockQuantity <= 0 && p.IsActive).ToList();
            foreach (var product in products)
            {
                product.IsActive = false;
                product.UpdatedAt = DateTime.UtcNow;
            }
            _db.SaveChanges();
        }

        public List<InventoryAlertDto> GetLowStockAlerts(int threshold = 5)
        {
            return _db.Products.AsNoTracking()
                .Where(p => p.StockQuantity <= threshold && !p.IsDeleted)
                .OrderBy(p => p.StockQuantity)
                .Select(p => new InventoryAlertDto
                {
                    ProductId = p.Id,
                    ProductName = p.ItemName ?? string.Empty,
                    StockQuantity = p.StockQuantity,
                    IsActive = p.IsActive
                }).ToList();
        }
    }
}
