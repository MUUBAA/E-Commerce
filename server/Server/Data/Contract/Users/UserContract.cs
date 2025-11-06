namespace Server.Data.Contract.Users
{
    public class UserContract
    {
        public required string Name { get; set; }
        public required string Password { get; set; }
        public required string Email { get; set; }
    }
}
