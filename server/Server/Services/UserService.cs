using Microsoft.AspNetCore.Identity;
using Server.Data.Contract.Users;
using Server.Data.Dto;
using Server.Data.Entities.Users;
using Server.Data.Repositories;
using Server.Services.MessageServices;
using Server.Utils;
using System.Security.Cryptography;
using static Server.Data.Exceptions.DataExceptions;

namespace Server.Services
{
    public interface IUserService
    {
        bool createUser(UserContract contract);
        bool updateUser(UserUpdate user);
        UserDto GetUserByEmail(string email);
        User GetUserById(int id);
        bool UpdateUserPasswordById(int userId, string newPassword);
        void SavePasswordResetToken(int userId, string token, DateTime expiry);
        User GetUserByPasswordResetToken (string token);
        void ClearPasswordResetToken(int userId);
    }
    public class UserService(IUserRepository userRepository, IUserContext userContext, IEmailService emailService, IEmailTemplate emailTemplate) : IUserService
    {
        private readonly IUserRepository _userRepository = userRepository;
        private readonly IUserContext _userContext = userContext;
        private readonly IEmailService _emailService = emailService;
        private readonly IEmailTemplate _emailTemplate = emailTemplate;


        public void SavePasswordResetToken(int userId, string token, DateTime expiry)
        {
            var user = _userRepository.GetUserById(userId);
            if (user == null) throw new Exception("User not found");
            user.PasswordResetToken = token;
            user.PasswordResetTokenExpiry = expiry;
            _userRepository.UpdateUser(user);
        }

        public User GetUserByPasswordResetToken(string token)
        {
            var user = _userRepository.GetUserByPasswordResetToken(token);
            if (user == null) throw new Exception("Invalid or expired token");
            if(user.PasswordResetTokenExpiry == null || user.PasswordResetTokenExpiry < DateTime.UtcNow)
            
                throw new Exception("Invalid or expired token");
            return user;
        }
        public void ClearPasswordResetToken(int userId)
        {
            var user = _userRepository.GetUserById(userId);
            if (user == null) throw new Exception("User not found");
            user.PasswordResetToken = null;
            user.PasswordResetTokenExpiry = null;
            _userRepository.UpdateUser(user);
        }

        public bool createUser(UserContract contract)
        {
            string? PasswordHash;
            string? UserName;
            string? UserEmail;

            if (string.IsNullOrEmpty(contract.Name) || string.IsNullOrEmpty(contract.Password) || string.IsNullOrEmpty(contract.Email))
            {
                if(string.IsNullOrEmpty(contract.Name)|| string.IsNullOrEmpty(contract.Password) || string.IsNullOrEmpty(contract.Email))
                {
                    PasswordHash = Guid.NewGuid().ToString("N").Substring(0, 12);
                }
                else
                {
                    throw new Exception("Username, Password and Email are required");
                }


            }
            else
            {
                UserName = contract.Name;
                PasswordHash = contract.Password;
                UserEmail = contract.Email;
            }

            var NewPasswordHash = new PasswordHasher<User>().HashPassword(null, PasswordHash);
            var user = new User
                {
                    Name = contract.Name,
                    Email = contract.Email,
                    PasswordHash = NewPasswordHash,
                    CreatedAt = DateTime.UtcNow,
                    CreatedBy = _userContext.UserId,
                    UpdatedAt = DateTime.UtcNow,
                    UpdatedBy = _userContext.UserId
            };
             user.Id =  _userRepository.AddUser(user);
            return SendWelcomeEmail(user);
        }
        private bool SendWelcomeEmail(User user)
        {
            if(string.IsNullOrEmpty(user.Email))
            {
                return true;
            }
            var (subject, mailBody) = _emailTemplate.SendWelcomeEmail(user);
             _emailService.SendEmail(user.Email ?? "", subject, mailBody);

            return true;
        }
        public bool updateUser(UserUpdate contract)
        {
           var user = new User
            {
                Id = contract.Id,
                Name = contract.Name,
                Email = contract.Email,
                UpdatedAt = DateTime.UtcNow,
                UpdatedBy = _userContext.UserId
            };
            _userRepository.UpdateUser(user);
            return true;
        }
        public UserDto GetUserByEmail(string email)
        {
            var user = _userRepository.GetUserByEmail(email) ?? throw new NotFoundException("User not Found");
            return user;
        }
        public User GetUserById(int id)
        {
            var user = _userRepository.GetUserById(id);
            if(user == null)
            {
                throw new NotFoundException("User not Found");
            }
            return user;
        }
        public bool UpdateUserPasswordById(int userId, string newPassword)
        {
            var user = _userRepository.GetUserById(userId);
            user.PasswordHash = newPassword;
            _userRepository.UpdateUser(user);
            return true;
        }
    }

}
