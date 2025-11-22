namespace Server.Data.Contract.Auth
{
    public class RegisterContract 
    {
        public bool Sucess { get; set; }
        public string? Token { get; set; }
        public string? Message { get; set; }
    }
}
