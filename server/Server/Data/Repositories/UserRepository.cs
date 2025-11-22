using Server.Data.Dto;
using Server.Data.Entities.Users;
using static Server.Data.Exceptions.DataExceptions;

namespace Server.Data.Repositories
{
    public interface IUserRepository
    {
        int AddUser(User user);
        UserDto? GetUserByEmail(string email);
        void UpdateUser(User user);
        User? GetUserById(int id);
        User? GetUserByPasswordResetToken(string token);
        void SavePasswordResetToken(int userId, string token, DateTime expiry);
        void ClearPasswordResetToken(int userId);
    }
    public class UserRepository : IUserRepository
    {
        private readonly Repository  repository;
        public UserRepository(Repository repository)
        {
            this.repository = repository;
        }

        public User? GetUserByPasswordResetToken(string token)
        {
            return repository.Users.FirstOrDefault(u => u.PasswordResetToken == token);
        }

        public void SavePasswordResetToken(int userId, string token, DateTime expiry)
        {
            var user = GetUserById(userId);
            if (user == null) throw new NotFoundException("User not found");
            {
                user.PasswordResetToken = token;
                user.PasswordResetTokenExpiry = expiry;
                UpdateUser(user);
            }
        }
        public void ClearPasswordResetToken(int userId)
        {
            var user = GetUserById(userId);
            if (user == null) throw new NotFoundException("User not found");
            {
                user.PasswordResetToken = null;
                user.PasswordResetTokenExpiry = null;
                UpdateUser(user);
            }
        }
        public int AddUser(User user)
        {
            User? existingUser = repository.Users.FirstOrDefault(u => u.Email == user.Email);
            if (existingUser != null)
            {
                throw new EntityDuplicateException("User with the same email already exists");
            }
            
            if (!string.IsNullOrEmpty(user.Email))
            {
                existingUser = repository.Users.FirstOrDefault(u => u.Email == user.Email);
            }
            else if (!string.IsNullOrEmpty(user.Name))
            {
                existingUser = repository.Users.FirstOrDefault(u => u.Name == user.Name);
            }
            else if (existingUser != null)
            {
                throw new EntityDuplicateException("User with the same email or username already exists");
            }
            else
            {
                existingUser.Name = user.Name;
                existingUser.Email = user.Email;
                existingUser.PasswordHash = user.PasswordHash;
                existingUser.UpdatedAt = DateTime.UtcNow;
                existingUser.UpdatedBy = user.UpdatedBy;
                repository.SaveChanges();
                return existingUser.Id;
            }
            repository.Add(user);
            repository.SaveChanges();
            return user.Id;
        }

        public UserDto? GetUserByEmail(string email)
        {
            var user = repository.Users.
            Where(u => u.Email == email )
                .Select(u => new UserDto
                {
                    Id = u.Id,
                    Name = u.Name,
                    Email = u.Email!,
                    PasswordHash = u.PasswordHash!,
                    CreatedAt = u.CreatedAt,
                    CreatedBy = u.CreatedBy!,
                })
                .FirstOrDefault();
            return user;
        }

        public User? GetUserById(int id)
        {
            return repository.Users.FirstOrDefault(u => u.Id == id);
        }

        public void UpdateUser(User user)
        {
            var existingUser = repository.Users.FirstOrDefault(u => u.Id == user.Id) ?? throw new NotFoundException("User not found");
            existingUser.Name = user.Name ?? existingUser.Name;
            existingUser.Email = user.Email ?? existingUser.Email;
            existingUser.Address = user.Address ?? existingUser.Address;
            existingUser.UpdatedAt = DateTime.UtcNow;
            existingUser.PasswordResetToken = user.PasswordResetToken;
            existingUser.PasswordResetTokenExpiry = user.PasswordResetTokenExpiry;
            repository.SaveChanges();
        }

       
    }
}
