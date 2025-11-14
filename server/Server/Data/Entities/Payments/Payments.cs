using Server.Data.Base;
using System.ComponentModel.DataAnnotations.Schema;

namespace Server.Data.Entities.Payments
{
    [Table("Payments")]
    public class Payments: BaseEntities
    {
        [Column("order_id")]
        public int OrderId { get; set; }

        [Column("amount")]
        public decimal Amount { get; set; }

        [Column("payment_method")]
        public string PaymentMethod { get; set; } = string.Empty;

        [Column("status")]
        public bool Status { get; set; }
    }
}
