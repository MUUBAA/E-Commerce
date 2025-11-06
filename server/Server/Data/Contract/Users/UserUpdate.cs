namespace Server.Data.Contract.Users
{
    public class UserUpdate
    {
        public required int Id { get; set; }
        public required string Name { get; set; }
        public string? Password { get; set; }
        public required string? Email { get; set; }
    }
}
