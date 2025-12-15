using Server.Data.Base;
using System.ComponentModel.DataAnnotations.Schema;

namespace Server.Data.Entities.Users
{
    [Table("Users")]
    public class User : BaseEntities
    {
        [Column("name")]
        public required string Name { get; set; }
        [Column("email")]
        public required string? Email { get; set; }
        [Column("password_hash")]
        public string? PasswordHash { get; set; }
        [Column("password_reset_token")]
        public string? PasswordResetToken { get; set; }
        [Column("password_reset_token_expiry")]
        public DateTime? PasswordResetTokenExpiry { get; set; }
        [Column("address")]
        public string? Address { get; set; }
        [Column("role")]
        public string Role { get; set; } = "User";
        [Column("is_blocked")]
        public bool IsBlocked { get; set; } = false;

    }
}
