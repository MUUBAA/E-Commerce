namespace Server.Data.Dto
{
    public class CreateOrderDto
    
     {

        public int OrderId { get; set; }
        public decimal TotalPrice { get; set; }
        public string Status { get; set; } = "pending";
    }
}

