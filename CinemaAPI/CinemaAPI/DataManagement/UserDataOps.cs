using CinemaAPI.Models;
using System.Linq.Expressions;

namespace CinemaAPI.DataManagement
{
    public class UserDataOps
    {
        private CinemaDbContext dbContext { get; set; }

        public UserDataOps()
        {
            dbContext = new CinemaDbContext();
        }

        // add
        public void AddUser(User user)
        {
            if (GetUserByEmail(user.Email) != null)
                throw new Exception($"User with email '{user.Email}' already exists.");
           
            try
            {
                dbContext.Add(user);
                dbContext.SaveChanges();

            }
            catch (Exception ex)
            {
                throw new Exception("Failed to add a new user");
            }
        }

        // get 

        public User[] GetUsers ()
        {
            return dbContext.users.Where(u => u.IsDeleted == false).ToArray();
        }

        public User? GetUserById (int id)
        {
            return dbContext.users.Where(u => u.IsDeleted==false && u.Id == id).FirstOrDefault();
        }


        public User? GetUserByEmail(string email)
        {
            return dbContext.users
                .Where(u => u.IsDeleted == false && u.Email == email)
                .FirstOrDefault();
        }
        public User? GetUserByEmailAndPassword (string email, string password)
        {
            return dbContext.users
                .Where(u => u.IsDeleted == false && u.Email == email && u.Password == password)
                .FirstOrDefault();
        }

        // update
        public void UpdateUser(User user)
        {
            try
            {
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
                dbContext.Update(user);
                dbContext.SaveChanges();

            }
            catch (Exception ex)
            {
                throw new Exception("Failed to delete the user");
            }
        }
    }
}
