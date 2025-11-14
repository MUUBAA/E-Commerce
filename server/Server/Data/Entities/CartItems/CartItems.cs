using Server.Data.Base;
using System.ComponentModel.DataAnnotations.Schema;
using Server.Data.Entities.Products;

namespace Server.Data.Entities.CartItems
{
    [Table("CartItems")]
    public class CartItems: BaseEntities
    {
        [Column("user_id")]
        public int UserId { get; set; }

        [Column("product_id")]
        public int ProductId { get; set; }

        [Column("quantity")]
        public int Quantity { get; set; }

        [Column("price")]
        public decimal Price { get; set; }
        public Product? Products { get; set; }

    }
}
