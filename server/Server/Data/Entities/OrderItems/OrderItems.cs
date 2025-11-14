using Server.Data.Base;
using System.ComponentModel.DataAnnotations.Schema;

namespace Server.Data.Entities.OrderItems
{
    [Table("OrderItems")]
    public class OrderItems: BaseEntities
    {
        [Column("order_id")]
        public int OrderId { get; set; }

        [Column("product_id")]
        public int ProductId { get; set; }

        [Column("quantity")]
        public int Quantity { get; set; }

        [Column("price")]
        public decimal Price { get; set; }
    }
}
