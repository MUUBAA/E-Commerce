using System;
using System.Threading.Tasks;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using SendGrid;
using SendGrid.Helpers.Mail;

namespace Server.Services.MessageServices
{
    public interface IEmailService
    {
        void SendEmail(string to, string subject, string body);
    }

    public class EmailService : IEmailService
    {
        private readonly string _apiKey;
        private readonly string _fromEmail;
        private readonly string _fromName;
        private readonly ILogger<EmailService> _logger;
        private readonly SendGridClient _client;

        private const string mailHeader =
            "<div style='background-color:transparent;font-family: system-ui;'><div class='m_-7955790069770508387block-grid' style='min-width:320px;max-width:600px;word-wrap:break-word;word-break:break-word;Margin:0 auto;background-color:#ffffff'><div style='border-collapse:collapse;display:table;width:100%;background-color:#ffffff'><div class='m_-7955790069770508387col' style='min-width:320px;max-width:600px;display:table-cell;vertical-align:top;width:600px'><div class='m_-7955790069770508387col_cont' style='width:100%!important'><div style='border-top:0px solid #000000;border-left:0px solid #000000;border-bottom:0px solid #000000;border-right:0px solid #000000;padding:0;'><table class='body-wrap' style='box-sizing: border-box; font-size: 14px; width: 100%; background-color: transparent; margin: 0;' bgcolor='transparent'><tr><td class='container' width='600' style='display: block !important; max-width: 600px !important; clear: both !important;' valign='top'><div class='content' style='padding: 20px;'><table class='main' width='100%' cellpadding='0' cellspacing='0' style='border: 1px solid rgba(130, 134, 156, 0.15);' bgcolor='transparent'><tr><td class='alert alert-primary border-0 bg-primary' style='padding: 20px; border-radius: 0; background:#E3EDF1; font-size: 21px; font-weight: 700;' align='center' valign='top'>Nest</td></tr><tr><td class='alert alert-dark border-0' style='padding: 20px; border-radius: 0;' align='center' valign='top'><p style='font-size:21px;color:#368EA8'><b>{Subject}</b></p></td></tr><tr><td style='padding: 5px'></td></tr></table></div></td></tr></table></div></div></div></div></div></div>";

        private const string mailFooter =
            "<tr> <td class='content-block' style='font-size: 14px; padding: 10px;background-color:#449ad4;color:#ffffff' valign='top'><p style='text-align: center;'><b>Nest</td> </tr> </table> </td> </tr> </table> </div> </td> <td style='box-sizing: border-box; font-size: 14px; vertical-align: top; margin: 0;' valign='top'></td> </tr> </table> </div> </div> </div> </div> </div> </div> </div>";

        public EmailService(IConfiguration configuration, ILogger<EmailService> logger)
        {
            _logger = logger;

            // Read from environment variables (Render) – set:
            // SENDGRID_API_KEY, SENDGRID_FROM_EMAIL, SENDGRID_FROM_NAME
            _apiKey = configuration["SENDGRID_API_KEY"] 
                      ?? configuration["SendGrid:ApiKey"];
            _fromEmail = configuration["SENDGRID_FROM_EMAIL"] 
                         ?? configuration["SendGrid:FromEmail"];
            _fromName = configuration["SENDGRID_FROM_NAME"] 
                        ?? configuration["SendGrid:FromName"];

            if (string.IsNullOrWhiteSpace(_apiKey))
                throw new InvalidOperationException("SendGrid API key is not configured.");

            if (string.IsNullOrWhiteSpace(_fromEmail))
                throw new InvalidOperationException("SendGrid FromEmail is not configured.");

            _client = new SendGridClient(_apiKey);

            _logger.LogInformation(
                "SendGrid EmailService initialized. From={FromEmail}, Name={FromName}",
                _fromEmail, _fromName);
        }

        // Public sync wrapper to keep existing code working
        public void SendEmail(string toAddress, string subject, string body)
        {
            // Fire-and-wait pattern; in new code prefer making this async.
            SendEmailInternalAsync(toAddress, subject, body)
                .GetAwaiter()
                .GetResult();
        }

        private async Task SendEmailInternalAsync(string toAddress, string subject, string body)
        {
            try
            {
                var header = mailHeader.Replace("{Subject}", subject);
                var html = header + body + mailFooter;

                // If you ever pass comma-separated recipients, split them:
                var recipients = toAddress
                    .Split(',', StringSplitOptions.RemoveEmptyEntries | StringSplitOptions.TrimEntries);

                foreach (var recipient in recipients)
                {
                    var from = new EmailAddress(_fromEmail, _fromName);
                    var to = new EmailAddress(recipient);

                    var msg = MailHelper.CreateSingleEmail(
                        from,
                        to,
                        subject,
                        plainTextContent: null,   // you can add a text version if you want
                        htmlContent: html
                    );

                    var response = await _client.SendEmailAsync(msg);

                    if (!response.IsSuccessStatusCode)
                    {
                        var respBody = await response.Body.ReadAsStringAsync();
                        _logger.LogError(
                            "SendGrid failed for {To}. Status={Status}, Body={Body}",
                            recipient, response.StatusCode, respBody);
                    }
                    else
                    {
                        _logger.LogInformation("Email sent to {To}", recipient);
                    }
                }
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Exception occurred while sending email via SendGrid");
            }
        }
    }
}
