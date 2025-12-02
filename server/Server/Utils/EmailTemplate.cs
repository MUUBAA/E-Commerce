using Server.Data.Dto;
using Server.Data.Entities.Users;

namespace Server.Utils
{
    public interface IEmailTemplate
    {
        (string subject, string body) SendWelcomeEmail(User user);
        (string subject, string body) SendForgotPasswordEmail(UserDto user, string resetLink);
    }
    public class EmailTemplate(IConfiguration configuration) : IEmailTemplate
    {
        private readonly string _appUrl = configuration.GetValue<string>("AppUrl") ?? string.Empty;

        public (string subject, string body) SendWelcomeEmail(User user)
        {
            string subject = "Welcome to Nest!";
            string body = $"<h1>Welcome, {user.Name}!</h1>" +
                          "<p>Thank you for signing up Nest. We're excited to have you on board!</p>" +
                          "<p>If you have any questions, feel free to reach out to our support team.</p>" +
                          "<p>Best regards,<br/>The Team</p>";
            return (subject, body);
        }
        public (string subject, string body) SendForgotPasswordEmail(UserDto user,string resetLink)
        {
            string subject = "Nest Password Reset Request";
            string body = $@"
    <div style='font-family: Arial, sans-serif; background: #f7f7f7; padding: 32px;'>
    <div style='max-width: 480px; margin: auto; background: #fff; border-radius: 8px; box-shadow: 0 2px 8px #0001; padding: 32px;'>
        <div style='text-align:center; margin-bottom: 24px;'>
            <img src='https://res.cloudinary.com/dulie41id/image/upload/v1764480398/nest_email_template_comd2i.webp' alt='Nest' style='height: 48px;'/>
        </div>
        <h2 style='color: #2d3e50;'>Reset Your Password</h2>
        <p>Dear {user.Name},</p>
        <p>We received a request to reset your password for your Nest account. Click the button below to set a new password:</p>
        <div style='text-align:center; margin: 32px 0;'>
            <a href='{resetLink}' style='background: #515DEF; color: #fff; text-decoration: none; padding: 14px 32px; border-radius: 6px; font-size: 16px; display: inline-block;'>Reset Password</a>
        </div>
        <p>If you did not request a password reset, you can safely ignore this email. This link will expire in 1 hour for your security.</p>
        <p style='margin-top: 32px; color: #888;'>Thank you,<br/>Nest Team</p>
    </div>
</div>";
            return (subject, body);
        }
    }
}
