namespace Server.Data.Dto
{
    public class JWTUserParam
    {
        public required int Id { get; set; }
        public required string Name { get; set; }
        public required string Email { get; set; }
        public required DateTime CreatedAt { get; set; }
        public string Role { get; set; } = "User";
    }
}
