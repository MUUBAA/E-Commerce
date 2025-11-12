using Server.Data.Contract.CartItems;
using Server.Data.Entities.CartItems;
using Server.Utils;

namespace Server.Data.Repositories
{
    public interface ICartRepository
    {
        void AddToCart(CartItemAdd contract);
        void RemoveFromCart(int id);
        CartItems GetCartItem(int id);
        (long, int, List<CartItems>) GetCartItems(CartItemContract contract);

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
                existingItem.Price = contract.Price;
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
                repository.SaveChanges();
            }
        }

        public void RemoveFromCart(int id)
        {
            var item = repository.CartItems.Find(id);

            if (item == null)
                throw new Exception("Cart item not found");

            if (item.Quantity > 1)
            {
                // Decrement quantity
                item.Quantity -= 1;
                repository.Update(item);
            }
            else
            {
                // Quantity is 1, remove the item completely
                repository.CartItems.Remove(item);
            }

            repository.SaveChanges();
        }
        public CartItems GetCartItem(int id)
        {
            return repository.CartItems.Find(id);
        }

        public (long, int, List<CartItems>) GetCartItems(CartItemContract contract)
        {
            var page = contract.Page <= 0 ? 1 : contract.Page;
            var pageSize = contract.PageSize <= 0 ? 10 : contract.PageSize;

            var query = repository.CartItems.Where(c => !c.IsDeleted && c.UserId == contract.UserId);

            var totalItems = query.Count();
            var totalPages = (int)Math.Ceiling(totalItems / (double)pageSize);
            var items = query
                 .Skip((page - 1) * pageSize)
                 .Take(pageSize)
                 .ToList();
            return (totalItems, totalPages, items);
        }


        }
}
