namespace Server.Data.Dto
{
    public class ProductDto
    {
        public int Id { get; set; }
        public string? ItemName { get; set; }
        public string? ItemDescription { get; set; }
        public decimal ItemPrice { get; set; }
        public int CategoryId { get; set; }
        public string? CategoryName { get; set; }
        public int StockQuantity { get; set; }
        public string? ItemUrl { get; set; }  // This will be the Cloudinary public ID
        public string? ImageUrl { get; set; } // This will be the generated Cloudinary URL
    }
}
