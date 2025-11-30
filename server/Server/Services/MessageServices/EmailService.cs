﻿using SendGrid;
using SendGrid.Helpers.Mail;

namespace Server.Services.MessageServices
{
    public interface IEmailService
    {
        void SendEmail(string to, string subject, string body);
    }

    public class EmailService : IEmailService
    {
        private readonly string _sendGridApiKey;
        private readonly string _fromEmail;
        private readonly string _fromName;
        private const string mailHeader = "<div style='background-color:transparent;font-family: system-ui;'><div class='m_-7955790069770508387block-grid' style='min-width:320px;max-width:600px;word-wrap:break-word;word-break:break-word;Margin:0 auto;background-color:#ffffff'><div style='border-collapse:collapse;display:table;width:100%;background-color:#ffffff'><div class='m_-7955790069770508387col' style='min-width:320px;max-width:600px;display:table-cell;vertical-align:top;width:600px'><div class='m_-7955790069770508387col_cont' style='width:100%!important'><div style='border-top:0px solid #000000;border-left:0px solid #000000;border-bottom:0px solid #000000;border-right:0px solid #000000;padding:0;'><table class='body-wrap' style='box-sizing: border-box; font-size: 14px; width: 100%; background-color: transparent; margin: 0;' bgcolor='transparent'><tr><td class='container' width='600' style='display: block !important; max-width: 600px !important; clear: both !important;' valign='top'><div class='content' style='padding: 20px;'><table class='main' width='100%' cellpadding='0' cellspacing='0' style='border: 1px solid rgba(130, 134, 156, 0.15);' bgcolor='transparent'><tr><td class='alert alert-primary border-0 bg-primary' style='padding: 20px; border-radius: 0; background:#E3EDF1; font-size: 21px; font-weight: 700;' align='center' valign='top'>Nest</td></tr><tr><td class='alert alert-dark border-0' style='padding: 20px; border-radius: 0;' align='center' valign='top'><p style='font-size:21px;color:#368EA8'><b>{Subject}</b></p></td></tr><tr><td style='padding: 5px'></td></tr></table></div></td></tr></table></div></div></div></div></div></div>";
        private const string mailFooter = "<tr> <td class='content-block' style='font-size: 14px; padding: 10px;background-color:#449ad4;color:#ffffff' valign='top'><p style='text-align: center;'><b>Nest</td> </tr> </table> </td> </tr> </table> </div> </td> <td style='box-sizing: border-box; font-size: 14px; vertical-align: top; margin: 0;' valign='top'></td> </tr> </table> </div> </div> </div> </div> </div> </div> </div>";

        public EmailService(IConfiguration configuration)
        {
            
            _sendGridApiKey = configuration["SENDGRID_API_KEY"]
                              ?? throw new Exception("SendGrid:ApiKey is not configured");

            _fromEmail = configuration["SENDGRID_FROM_EMAIL"]
                         ?? throw new Exception("SENDGRID_FROM_EMAIL is not configured");
            _fromName = configuration["SENDGRID_FROM_NAME"] ?? _fromEmail;
        }

        public void SendEmail(string toAddress, string subject, string body)
        {
            try
            {
               
                var header = mailHeader.Replace("{Subject}", subject);
                string message = header + body + mailFooter;

                var client = new SendGridClient(_sendGridApiKey);
                var from = new EmailAddress(_fromEmail, _fromName);

                var msg = new SendGridMessage
                {
                    From = from,
                    Subject = subject,       
                    HtmlContent = message,    
                };

                foreach (var address in toAddress.Split(new[] { "," }, StringSplitOptions.RemoveEmptyEntries))
                {
                    msg.AddTo(new EmailAddress(address.Trim()));
                }

                var response = client.SendEmailAsync(msg).GetAwaiter().GetResult();

            }
            catch (Exception ex)
            {
                Console.WriteLine("Exception occured while sending email via SendGrid - {0}", ex);
            }
        }
    }
}
