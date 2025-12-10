using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using Server.Data.Dto;
using Server.Data.Dto.Admin;
using Server.Data.Entities.Categories;
using Server.Data.Entities.OrderItems;
using Server.Data.Entities.Orders;
using Server.Data.Entities.Products;
using Server.Data.Entities.Users;
using Server.Data.Repositories;
using Server.Utils;
using Server.Data.Contract.Products;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace Server.Services.Admin
{
    #region Interfaces
    public interface IAdminAuthService
    {
        AdminLoginResponseDto Login(AdminLoginRequestDto request);
        ClaimsPrincipal? ValidateToken(string token);
    }

    public interface IAdminProductService
    {
        int AddProduct(AdminProductCreateDto dto, string performedBy);
        void UpdateProduct(AdminProductUpdateDto dto, string performedBy);
        void DeleteProduct(int productId, string performedBy);
        void UpdateStatus(ProductStatusUpdateDto dto, string performedBy);
        void UpdatePricing(ProductPriceStockDto dto, string performedBy);
        void UpdateImage(int productId, string imageUrl, string performedBy);
        List<Product> GetAll();
    }

    public interface IAdminCategoryService
    {
        int Add(AdminCategoryDto dto, string performedBy);
        void Update(AdminCategoryDto dto, string performedBy);
        void Delete(int id, string performedBy);
        List<Category> GetAll();
    }

    public interface IAdminOrderService
    {
        List<Orders> GetAll();
        Orders UpdateStatus(OrderStatusUpdateDto dto, string performedBy);
        Orders? GetById(int orderId);
        List<OrderItems> GetOrderItems(int orderId);
    }

    public interface IAdminUserService
    {
        List<User> GetAll();
        void BlockUser(UserBlockDto dto, string performedBy);
    }

    public interface IInventoryService
    {
        void ReduceStockForOrder(int orderId);
        void DisableInactiveProducts();
        List<InventoryAlertDto> GetLowStockAlerts(int threshold = 5);
    }

    public interface IPaymentMonitoringService
    {
        List<Data.Entities.Payments.Payments> GetPayments(PaymentMonitoringFilterDto filter);
    }
    #endregion

    #region Implementations
    public class AdminAuthService : IAdminAuthService
    {
        private readonly IConfiguration _configuration;
        private readonly IUserRepository _userRepository;
        private readonly ILogger<AdminAuthService> _logger;

        public AdminAuthService(IConfiguration configuration, IUserRepository userRepository, ILogger<AdminAuthService> logger)
        {
            _configuration = configuration;
            _userRepository = userRepository;
            _logger = logger;
        }

        public AdminLoginResponseDto Login(AdminLoginRequestDto request)
        {
            var user = _userRepository.GetUserByEmail(request.Email) ?? throw new Exception("User not found");
            if (!string.Equals(user.Role, "Admin", StringComparison.OrdinalIgnoreCase))
            {
                throw new UnauthorizedAccessException("Admin access required");
            }

            if (user.IsBlocked)
            {
                throw new UnauthorizedAccessException("Account is blocked");
            }

            var passwordHasher = new PasswordHasher<User>();
            var passwordVerificationResult = passwordHasher.VerifyHashedPassword(null, user.PasswordHash, request.Password);
            if (passwordVerificationResult == PasswordVerificationResult.Failed)
            {
                throw new UnauthorizedAccessException("Invalid credentials");
            }

            var token = BuildToken(user);
            return new AdminLoginResponseDto
            {
                Token = token,
                ExpiresAt = DateTime.UtcNow.AddHours(6),
                Role = user.Role
            };
        }

        private string BuildToken(UserDto user)
        {
            var secret = _configuration.GetValue<string>("JWTSecret") ?? throw new InvalidOperationException("Missing JWT secret");
            var key = new Microsoft.IdentityModel.Tokens.SymmetricSecurityKey(Encoding.ASCII.GetBytes(secret));
            var creds = new Microsoft.IdentityModel.Tokens.SigningCredentials(key, Microsoft.IdentityModel.Tokens.SecurityAlgorithms.HmacSha256);

            var claims = new List<Claim>
            {
                new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
                new Claim(ClaimTypes.Email, user.Email),
                new Claim(ClaimTypes.Name, user.Name),
                new Claim(ClaimTypes.Role, user.Role ?? "Admin"),
                new Claim("isAdmin", "true")
            };

            var jwt = new JwtSecurityToken(
                claims: claims,
                expires: DateTime.UtcNow.AddHours(6),
                signingCredentials: creds);

            return new JwtSecurityTokenHandler().WriteToken(jwt);
        }

        public ClaimsPrincipal? ValidateToken(string token)
        {
            try
            {
                var secret = _configuration.GetValue<string>("JWTSecret") ?? string.Empty;
                var validationParameters = new Microsoft.IdentityModel.Tokens.TokenValidationParameters
                {
                    ValidateIssuerSigningKey = true,
                    IssuerSigningKey = new Microsoft.IdentityModel.Tokens.SymmetricSecurityKey(Encoding.ASCII.GetBytes(secret)),
                    ValidateIssuer = false,
                    ValidateAudience = false,
                    ClockSkew = TimeSpan.Zero
                };
                var handler = new JwtSecurityTokenHandler();
                var principal = handler.ValidateToken(token, validationParameters, out _);
                return principal;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Token validation failed");
                return null;
            }
        }
    }

    public class AdminProductService : IAdminProductService
    {
        private readonly IProductsRepository _productsRepository;
        private readonly Repository _db;
        private readonly ILogger<AdminProductService> _logger;

        public AdminProductService(IProductsRepository productsRepository, Repository db, ILogger<AdminProductService> logger)
        {
            _productsRepository = productsRepository;
            _db = db;
            _logger = logger;
        }

        public int AddProduct(AdminProductCreateDto dto, string performedBy)
        {
            var product = new Product
            {
                ItemName = dto.Name,
                ItemDescription = dto.Description,
                ItemPrice = dto.Price,
                CategoryId = dto.CategoryId,
                CategoryName = dto.CategoryName,
                StockQuantity = dto.StockQuantity,
                DiscountPercent = dto.DiscountPercent,
                ImageUrl = dto.ImageUrl,
                CreatedBy = performedBy,
                UpdatedBy = performedBy,
                IsActive = true
            };
            return _productsRepository.CreateProduct(product);
        }

        public void UpdateProduct(AdminProductUpdateDto dto, string performedBy)
        {
            var update = new ProductUpdate
            {
                Id = dto.Id,
                ItemName = dto.Name,
                ItemDescription = dto.Description,
                ItemPrice = dto.Price,
                CategoryId = dto.CategoryId,
                CategoryName = dto.CategoryName,
                StockQuantity = dto.StockQuantity,
                UpdatedBy = performedBy
            };
            _productsRepository.UpdateProduct(update);
            var dbProduct = _productsRepository.GetProductById(dto.Id);
            if (dbProduct != null)
            {
                dbProduct.DiscountPercent = dto.DiscountPercent;
                dbProduct.ImageUrl = dto.ImageUrl;
                dbProduct.IsActive = dto.IsActive;
                dbProduct.UpdatedAt = DateTime.UtcNow;
                dbProduct.UpdatedBy = performedBy;
                _db.SaveChanges();
            }
        }

        public void DeleteProduct(int productId, string performedBy)
        {
            var product = _productsRepository.GetProductById(productId) ?? throw new Exception("Product not found");
            product.IsDeleted = true;
            product.DeletedAt = DateTime.UtcNow;
            product.DeletedBy = performedBy;
            _db.SaveChanges();
        }

        public void UpdateStatus(ProductStatusUpdateDto dto, string performedBy)
        {
            var product = _productsRepository.GetProductById(dto.ProductId) ?? throw new Exception("Product not found");
            product.IsActive = dto.IsActive;
            product.UpdatedAt = DateTime.UtcNow;
            product.UpdatedBy = performedBy;
            _db.SaveChanges();
        }

        public void UpdatePricing(ProductPriceStockDto dto, string performedBy)
        {
            var product = _productsRepository.GetProductById(dto.ProductId) ?? throw new Exception("Product not found");
            product.ItemPrice = dto.Price;
            product.DiscountPercent = dto.DiscountPercent;
            product.StockQuantity = dto.StockQuantity;
            product.UpdatedAt = DateTime.UtcNow;
            product.UpdatedBy = performedBy;
            if (product.StockQuantity <= 0)
            {
                product.IsActive = false;
            }
            _db.SaveChanges();
        }

        public void UpdateImage(int productId, string imageUrl, string performedBy)
        {
            var product = _productsRepository.GetProductById(productId) ?? throw new Exception("Product not found");
            product.ImageUrl = imageUrl;
            product.UpdatedAt = DateTime.UtcNow;
            product.UpdatedBy = performedBy;
            _db.SaveChanges();
        }

        public List<Product> GetAll()
        {
            return _db.Products.AsNoTracking().OrderByDescending(p => p.CreatedAt).ToList();
        }
    }

    public class AdminCategoryService : IAdminCategoryService
    {
        private readonly Repository _db;
        private readonly ILogger<AdminCategoryService> _logger;

        public AdminCategoryService(Repository db, ILogger<AdminCategoryService> logger)
        {
            _db = db;
            _logger = logger;
        }

        public int Add(AdminCategoryDto dto, string performedBy)
        {
            var category = new Category
            {
                Name = dto.Name,
                Description = dto.Description,
                IsActive = dto.IsActive,
                CreatedBy = performedBy
            };
            _db.Categories.Add(category);
            _db.SaveChanges();
            return category.Id;
        }

        public void Update(AdminCategoryDto dto, string performedBy)
        {
            var existing = _db.Categories.FirstOrDefault(c => c.Id == dto.Id) ?? throw new Exception("Category not found");
            existing.Name = dto.Name;
            existing.Description = dto.Description;
            existing.IsActive = dto.IsActive;
            existing.UpdatedAt = DateTime.UtcNow;
            existing.UpdatedBy = performedBy;
            _db.SaveChanges();
        }

        public void Delete(int id, string performedBy)
        {
            var existing = _db.Categories.FirstOrDefault(c => c.Id == id) ?? throw new Exception("Category not found");
            existing.IsDeleted = true;
            existing.IsActive = false;
            existing.DeletedAt = DateTime.UtcNow;
            existing.DeletedBy = performedBy;
            _db.SaveChanges();
        }

        public List<Category> GetAll()
        {
            return _db.Categories.AsNoTracking().Where(c => !c.IsDeleted).OrderBy(c => c.Name).ToList();
        }
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
            order.OrderStatus = dto.OrderStatus;
            order.PaymentStatus = dto.PaymentStatus;
            order.Status = dto.OrderStatus.ToLower();
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

    public class AdminUserService : IAdminUserService
    {
        private readonly Repository _db;
        private readonly ILogger<AdminUserService> _logger;

        public AdminUserService(Repository db, ILogger<AdminUserService> logger)
        {
            _db = db;
            _logger = logger;
        }

        public List<User> GetAll()
        {
            return _db.Users.AsNoTracking().Where(u => !u.IsDeleted).OrderByDescending(u => u.CreatedAt).ToList();
        }

        public void BlockUser(UserBlockDto dto, string performedBy)
        {
            var user = _db.Users.FirstOrDefault(u => u.Id == dto.UserId) ?? throw new Exception("User not found");
            user.IsBlocked = dto.Block;
            user.UpdatedAt = DateTime.UtcNow;
            user.UpdatedBy = performedBy;
            _db.SaveChanges();
        }
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

    public class PaymentMonitoringService : IPaymentMonitoringService
    {
        private readonly Repository _db;
        public PaymentMonitoringService(Repository db)
        {
            _db = db;
        }

        public List<Data.Entities.Payments.Payments> GetPayments(PaymentMonitoringFilterDto filter)
        {
            var query = _db.Payments.AsNoTracking().AsQueryable();
            if (!string.IsNullOrWhiteSpace(filter.Status))
            {
                query = query.Where(p => p.Status.ToLower() == filter.Status.ToLower());
            }
            if (filter.From.HasValue)
            {
                query = query.Where(p => p.CreatedAt >= filter.From.Value);
            }
            if (filter.To.HasValue)
            {
                query = query.Where(p => p.CreatedAt <= filter.To.Value);
            }
            return query.OrderByDescending(p => p.CreatedAt).ToList();
        }
    }
    #endregion
}

