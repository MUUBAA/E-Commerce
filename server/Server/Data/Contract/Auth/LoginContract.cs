namespace Server.Data.Contract.Auth
{
    public class LoginContract
    {
        public required string Username { get; set; }
        public required string Password { get; set; }
    }
}
