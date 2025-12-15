namespace Server.Data.Dto
{
    public class UserDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Email { get; set; }
        public string PasswordHash { get; set; }
        public string CreatedBy { get; set; }
        public DateTime CreatedAt { get; set; }
        public string? Address { get; set; }
        public string Role { get; set; } = "User";
        public bool IsBlocked { get; set; }
    }
}
