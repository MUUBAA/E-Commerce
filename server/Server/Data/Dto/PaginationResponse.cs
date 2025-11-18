namespace Server.Data.Dto
{
    public class PaginationResponse<T>
    {
        public long TotalItems { get; set; }
        public int ItemsPerPage { get; set; }
        public int TotalPages { get; set; }
        public int CurrentPage { get; set; }
        public List<T> Items { get; set; } = new();

        // Optional: Used for cart total price
        public decimal? TotalPrice { get; set; }

    }
}
