﻿using System.Net.Mail;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;

namespace Server.Services.MessageServices
{
    public interface IEmailService
    {
        void SendEmail(string to, string subject, string body);
    }

    public class EmailService : IEmailService
    {
        private readonly string _smtpHost;
        private readonly int _smtpPort;
        private readonly string _smtpMailAddress;
        private readonly string _smtpUsername;
        private readonly string _smtpPassword;
        private readonly SmtpClient _client;
        private readonly ILogger<EmailService> _logger;

        private const string mailHeader = "...";   // your existing header
        private const string mailFooter = "...";   // your existing footer

        public EmailService(IConfiguration configuration, ILogger<EmailService> logger)
        {
            _logger = logger;

            _smtpHost        = configuration["SMTP:Host"];
            _smtpPort        = int.TryParse(configuration["SMTP:Port"], out var port) ? port : 0;
            _smtpMailAddress = configuration["SMTP:MailAddress"];
            _smtpUsername    = configuration["SMTP:UserName"];
            _smtpPassword    = configuration["SMTP:Password"];

            // Log what we got from config (NO real password)
            _logger.LogInformation("EmailService SMTP config: Host={Host}, Port={Port}, Mail={Mail}, User={User}, PasswordEmpty={PwdEmpty}",
                _smtpHost ?? "NULL",
                _smtpPort,
                _smtpMailAddress ?? "NULL",
                _smtpUsername ?? "NULL",
                string.IsNullOrEmpty(_smtpPassword));

            // Basic validation so you'll see clear errors in Render logs
            if (string.IsNullOrWhiteSpace(_smtpHost) ||
                _smtpPort <= 0 ||
                string.IsNullOrWhiteSpace(_smtpMailAddress) ||
                string.IsNullOrWhiteSpace(_smtpUsername) ||
                string.IsNullOrWhiteSpace(_smtpPassword))
            {
                _logger.LogError("SMTP configuration is invalid. Check environment variables / appsettings (SMTP:Host, SMTP:Port, SMTP:MailAddress, SMTP:UserName, SMTP:Password).");
            }

            _client = new SmtpClient
            {
                Port = _smtpPort,
                DeliveryMethod = SmtpDeliveryMethod.Network,
                UseDefaultCredentials = false,
                Credentials = new System.Net.NetworkCredential(_smtpUsername, _smtpPassword),
                Host = _smtpHost,
                EnableSsl = true,
            };

            _logger.LogInformation("EmailService SMTP client initialized.");
        }

        public void SendEmail(string toAddress, string subject, string body)
        {
            _logger.LogInformation("SendEmail called. To={To}, Subject={Subject}", toAddress, subject);

            try
            {
                var fromAddress = new MailAddress(_smtpMailAddress, _smtpUsername);
                using var mail = new MailMessage
                {
                    From = fromAddress,
                    IsBodyHtml = true,
                    Subject = subject,
                    BodyEncoding = System.Text.Encoding.UTF8
                };

                foreach (var address in toAddress.Split(new[] { "," }, StringSplitOptions.RemoveEmptyEntries))
                {
                    mail.To.Add(address.Trim());
                }

                var header = mailHeader.Replace("{Subject}", subject);
                string message = header + body + mailFooter;
                mail.Body = message;

                _logger.LogInformation("Sending email via SMTP Host={Host}, Port={Port}. ToCount={ToCount}",
                    _client.Host, _client.Port, mail.To.Count);

                _client.Send(mail);

                _logger.LogInformation("Email sent successfully to {To}", toAddress);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error while sending email to {To} with subject {Subject}", toAddress, subject);
                // Optionally rethrow if you want upper layers to know it failed
                // throw;
            }
        }
    }
}
