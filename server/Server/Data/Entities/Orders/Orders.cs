using Server.Data.Base;
using System.ComponentModel.DataAnnotations.Schema;

namespace Server.Data.Entities.Orders
{
    [Table("Orders")]
    public class Orders : BaseEntities
    {
        [Column("user_id")]
        public int UserId { get; set; }

        [Column("total_price")]
        public decimal TotalPrice { get; set; }

        [Column("status")]
        public string Status { get; set; }
        [Column("order_status")]
        public string OrderStatus { get; set; } = "Pending";
        [Column("payment_status")]
        public string PaymentStatus { get; set; } = "Pending";
    }
}
