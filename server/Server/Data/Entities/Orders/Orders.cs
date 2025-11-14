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
        public bool Status { get; set; }
    }
}
