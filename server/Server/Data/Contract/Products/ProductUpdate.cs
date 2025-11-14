namespace Server.Data.Contract.Products
{
    public class ProductUpdate
    {
        public required int Id { get; set; }
        public string? ItemName { get; set; }
        public string? ItemDescription { get; set; }
        public decimal ItemPrice { get; set; }
        public int CategoryId { get; set; }
        public string CategoryName { get; set; }
        public int StockQuantity { get; set; }
        public string UpdatedBy { get; set; }
    }
}
