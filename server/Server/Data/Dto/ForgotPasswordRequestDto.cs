namespace Server.Data.Dto
{
    public class ForgotPasswordRequestDto
    {
        public string? Email { get; set; }
    }

    public class ResetPasswordRequestDto
    {
        public string Token { get; set; }
        public string NewPassword { get; set; }
    }
}
