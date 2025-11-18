using Microsoft.EntityFrameworkCore;
using Server.Data.Contract.CartItems;
using Server.Data.Dto;
using Server.Data.Entities.CartItems;
using Server.Utils;

namespace Server.Data.Repositories
{
    public interface ICartRepository
    {
        void AddToCart(CartItemAdd contract);
        void RemoveFromCart(int id);
        CartItems GetCartItem(int id);
        (long totalItems, int totalPages, decimal totalPrice, List<CartItemDto>) GetCartItems(CartItemContract contract);

    }
    public class CartRepository(Repository repository, IUserContext userContext) : ICartRepository
    {
        private readonly IUserContext userContext = userContext;

        public void AddToCart(CartItemAdd contract)
        {
            var existingItem = repository.CartItems
                 .FirstOrDefault(ci => ci.UserId == contract.UserId && ci.ProductId == contract.ProductId);
            if (existingItem != null)
            {
                existingItem.Quantity += contract.Quantity;
                existingItem.Price += contract.Price;
                repository.Update(existingItem);
            }
            else
            {
                var newItem = new CartItems
                {
                    UserId = contract.UserId,
                    ProductId = contract.ProductId,
                    Quantity = contract.Quantity,
                    Price = contract.Price
                };
                repository.CartItems.Add(newItem);
                
            }
            repository.SaveChanges();
        }

        public void RemoveFromCart(int id)
        {
            var item = repository.CartItems.Find(id);
            if (item == null)
            {
                throw new Exception("Cart item not found");
            }
            if (item.Quantity > 1)
            {
                item.Quantity--;
                repository.Update(item);
            }
            else
            {
                repository.CartItems.Remove(item);
            }
            repository.SaveChanges();
        }

        public CartItems GetCartItem(int id)
        {
            var item = repository.CartItems.Find(id);
            if (item == null)
            {
                throw new Exception("Cart item not found");
            }
            return item;
        }

        public (long totalItems, int totalPages, decimal totalPrice, List<CartItemDto>) GetCartItems(CartItemContract contract)
        {
            var page = contract.Page <= 0 ? 1 : contract.Page;
            var pageSize = contract.PageSize <= 0 ? 10 : contract.PageSize;

            var query = repository.CartItems
            .Where(c => !c.IsDeleted && c.UserId == contract.UserId)
            .Include(c => c.Products);

            var totalItems = query.Count();
            var totalPages = (int)Math.Ceiling(totalItems / (double)pageSize);
            var totalPrice = query.Sum(c => c.Price * c.Quantity);

            var items = query
            .Skip((page - 1) * pageSize)
            .Take(pageSize)
            .Select(c => new CartItemDto
            {
                Id = c.Id,
                UserId = c.UserId,
                ProductId = c.Products != null ? c.Products.Id : 0,
                Quantity = c.Quantity,
                Price = c.Price,
                ItemDescription = c.Products != null ? c.Products.ItemDescription : null,
                ItemName = c.Products != null ? c.Products.ItemName : null,
                ItemUrl = c.Products != null ? c.Products.ItemUrl : null,
                ItemPrice = c.Products != null ? c.Products.ItemPrice : 0
            })
            .ToList();

            return (totalItems, totalPages, totalPrice, items);
        }


    }
}
