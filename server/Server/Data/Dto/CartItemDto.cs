namespace Server.Data.Dto
{
    public class CartItemDto
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public int ProductId { get; set; }
        public int Quantity { get; set; }
        public decimal Price { get; set; }
        public string? ItemName { get; set; }
        public string? ItemDescription { get; set; }
        public decimal? ItemPrice { get; set; }
        public string? ItemUrl { get; set; }
    }
}
