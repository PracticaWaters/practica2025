using CinemaAPI.Models;
using CinemaAPI.Utilities;

namespace CinemaAPI.DataManagement
{
    public class UserDataOps
    {
        private CinemaDbContext dbContext { get; set; }

        public UserDataOps(CinemaDbContext cinemaDbContext)
        {
            this.dbContext = cinemaDbContext;
        }

        // add
        public void AddUser(User user)
        {
            if (GetUserByEmail(user.Email) != null)
                throw new Exception($"User with email '{user.Email}' already exists.");

            try
            {
                user.Password = PasswordHasher.HashPassword(user.Password);
                user.CreatedAt = DateTime.Now;
                user.ModifiedAt = DateTime.Now;

                dbContext.Add(user);
                dbContext.SaveChanges();
            }
            catch (Exception ex)
            {
                throw new Exception("Failed to add a new user");
            }
        }

        // get
        public User[] GetUsers()
        {
            return dbContext.users.Where(u => u.IsDeleted == false).ToArray();
        }

        public User? GetUserById(int id)
        {
            return dbContext.users.Where(u => u.IsDeleted == false && u.Id == id).FirstOrDefault();
        }

        public User? GetUserByEmail(string email)
        {
            return dbContext.users
                .Where(u => u.IsDeleted == false && u.Email == email)
                .FirstOrDefault();
        }

        public User? GetUserByEmailAndPassword(string email, string password)
        {
            var user = dbContext.users
                .Where(u => u.IsDeleted == false && u.Email == email)
                .FirstOrDefault();

            if (user != null && PasswordHasher.VerifyPassword(password, user.Password))
            {
                return user;
            }

            return null;
        }

        // update
        public void UpdateUser(User user)
        {
            try
            {
                var existingUser = GetUserById(user.Id);
                if (existingUser == null)
                    throw new Exception("User not found");

                if (!string.IsNullOrEmpty(user.Password) && user.Password != existingUser.Password)
                {
                    user.Password = PasswordHasher.HashPassword(user.Password);
                }
                else if (string.IsNullOrEmpty(user.Password))
                {
                    user.Password = existingUser.Password;
                }

                user.ModifiedAt = DateTime.Now;
                dbContext.Update(user);
                dbContext.SaveChanges();
            }
            catch (Exception ex)
            {
                throw new Exception("Failed to update the user");
            }
        }

        // delete
        public void DeleteUser(User user)
        {
            try
            {
                user.IsDeleted = true;
                user.ModifiedAt = DateTime.Now;
                dbContext.Update(user);
                dbContext.SaveChanges();
            }
            catch (Exception ex)
            {
                throw new Exception("Failed to delete the user");
            }
        }

        public void SaveRefreshToken(int userId, string token, DateTime expiry)
        {
            dbContext.AuthenticationRefreshTokens.Add(new RefreshToken
            {
                UserId = userId,
                Token = token,
                ExpiryDate = expiry
            });
            dbContext.SaveChanges();
        }


        public RefreshToken? GetRefreshToken(string token)
        {
            return dbContext.AuthenticationRefreshTokens.FirstOrDefault(r => r.Token == token && !r.IsRevoked);
        }

        public void ReplaceRefreshToken(string oldToken, string newToken, DateTime newExpiry)
        {
           
            var existing = dbContext.AuthenticationRefreshTokens.FirstOrDefault(r => r.Token == oldToken);

            if (existing == null)
                return;

            existing.IsRevoked = true;
            dbContext.AuthenticationRefreshTokens.Add(new RefreshToken
            {
                UserId = existing.UserId,
                Token = newToken,
                ExpiryDate = newExpiry
            });
            dbContext.SaveChanges();
        }
        
        public void DeleteRefreshTokens(int userId)
        {
            var tokens = dbContext.AuthenticationRefreshTokens.Where(r => r.UserId == userId);
            dbContext.AuthenticationRefreshTokens.RemoveRange(tokens);
            dbContext.SaveChanges();
        }
    }
}