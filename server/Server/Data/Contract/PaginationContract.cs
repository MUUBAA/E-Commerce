namespace Server.Data.Contract
{
    public class PaginationContract
    {
        public int Page { get; set; }
        public int PageSize { get; set; }
        public string? Search { get; set; }
    }
}
