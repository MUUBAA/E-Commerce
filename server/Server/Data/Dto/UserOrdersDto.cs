namespace Server.Data.Dto.Orders
{
    public class OrderItemListDto
    {
        public int OrderItemId { get; set; }
        public int ProductId { get; set; }
        public string? ItemName { get; set; }
        public string? ItemDescription { get; set; }
        public string? ItemUrl { get; set; }
        public int Quantity { get; set; }
        public decimal LinePrice { get; set; }   // stored line price in OrderItems.Price
    }

    public class UserOrderDto
    {
        public int OrderId { get; set; }
        public decimal TotalPrice { get; set; }
        public string Status { get; set; } = string.Empty;
        public DateTime CreatedAt { get; set; }

        public List<OrderItemListDto> Items { get; set; } = new();
    }
}
