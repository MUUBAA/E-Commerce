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

        // Legacy compatibility: map OrderStatus/PaymentStatus to Status until DB adds columns
        [NotMapped]
        public string OrderStatus
        {
            get => Status;
            set => Status = value;
        }

        // PaymentStatus not stored in DB yet; keep in-memory default
        [NotMapped]
        public string PaymentStatus { get; set; } = "Pending";
    }
}
