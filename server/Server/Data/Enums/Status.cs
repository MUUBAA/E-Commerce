using System.ComponentModel;

namespace Server.Data.Enums
{
    public class Status
    {
        [Description("pending")]
        public const string Pending = "pending";
        [Description("sent")]
        public const string Sent = "sent";
        [Description("delivered")]
        public const string Delivered = "delivered";
        [Description("failed")]
        public const string Failed = "failed";
    }
}
