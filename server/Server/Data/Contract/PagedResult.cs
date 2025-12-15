namespace Server.Data.Contract
{
    public class PagedResult<T>
    {
        public System.Collections.Generic.List<T> Items { get; set; } = new System.Collections.Generic.List<T>();
        public int Total { get; set; }
    }
}
