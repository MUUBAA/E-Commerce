using Microsoft.AspNetCore.Http;

namespace Server.Data.Dto.Admin
{
    public class AdminLoginRequestDto
    {
        public string Email { get; set; } = string.Empty;
        public string Password { get; set; } = string.Empty;
    }

    public class AdminLoginResponseDto
    {
        public string Token { get; set; } = string.Empty;
        public DateTime ExpiresAt { get; set; }
        public string Role { get; set; } = "Admin";
    }

    public class AdminProductCreateDto
    {
        public string Name { get; set; } = string.Empty;
        public string? Description { get; set; }
        public decimal Price { get; set; }
        public int CategoryId { get; set; }
        public string CategoryName { get; set; } = string.Empty;
        public int StockQuantity { get; set; }
        public decimal DiscountPercent { get; set; }
        public string? ImageUrl { get; set; }
    }

    public class AdminProductUpdateDto : AdminProductCreateDto
    {
        public int Id { get; set; }
        public bool IsActive { get; set; } = true;
    }

    public class ProductStatusUpdateDto
    {
        public int ProductId { get; set; }
        public bool IsActive { get; set; }
    }

    public class ProductPriceStockDto
    {
        public int ProductId { get; set; }
        public decimal Price { get; set; }
        public decimal DiscountPercent { get; set; }
        public int StockQuantity { get; set; }
    }

    public class AdminCategoryDto
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public string? Description { get; set; }
        public bool IsActive { get; set; } = true;
    }

    public class OrderStatusUpdateDto
    {
        public int OrderId { get; set; }
        public string OrderStatus { get; set; } = "Pending";
        public string PaymentStatus { get; set; } = "Pending";
    }

    public class UserBlockDto
    {
        public int UserId { get; set; }
        public bool Block { get; set; }
    }

    public class InventoryAlertDto
    {
        public int ProductId { get; set; }
        public string ProductName { get; set; } = string.Empty;
        public int StockQuantity { get; set; }
        public bool IsActive { get; set; }
    }

    public class PaymentMonitoringFilterDto
    {
        public string? Status { get; set; }
        public DateTime? From { get; set; }
        public DateTime? To { get; set; }
    }
}

