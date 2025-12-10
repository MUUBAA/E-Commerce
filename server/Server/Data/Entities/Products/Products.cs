using Server.Data.Base;
using System.ComponentModel.DataAnnotations.Schema;

namespace Server.Data.Entities.Products
{
    [Table("Products")]
    public class Product : BaseEntities
    {
        [Column("item_name")]
        public string? ItemName { get; set; }
        [Column("item_description")]
        public string? ItemDescription { get; set; }
        [Column("item_price")]
        public decimal ItemPrice { get; set; }
        [Column("category_id")]
        public int CategoryId { get; set; }
        [Column("category_name")]
        public string? CategoryName { get; set; }
        [Column("stock_quantity")]
        public int StockQuantity { get; set; }
        [Column("item_url")]
        public string? ItemUrl { get; set; }
        [Column("image_url")]
        public string? ImageUrl { get; set; }
        [Column("discount_percent")]
        public decimal DiscountPercent { get; set; }
        [Column("is_active")]
        public bool IsActive { get; set; } = true;
    }
}
