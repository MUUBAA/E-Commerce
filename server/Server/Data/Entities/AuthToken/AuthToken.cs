using Server.Data.Base;

namespace Server.Data.Entities.AuthToken
{
    public class AuthToken : BaseEntities
    {
        public string? UserId { get; set; }
        public string? JwtUniqueId { get; set; }
        public DateTime TokenExpiry { get; set; }
    }
}
