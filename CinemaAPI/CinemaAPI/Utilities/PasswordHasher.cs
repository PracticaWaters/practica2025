using System.Security.Cryptography;
using System.Text;

namespace CinemaAPI.Utilities
{
    public static class PasswordHasher
    {
        public static string HashPassword(string password)
        {
            if (string.IsNullOrEmpty(password))
                throw new ArgumentException("Password cannot be null or empty");

            using (SHA256 sha256Hash = SHA256.Create())
            {
                byte[] bytes = sha256Hash.ComputeHash(Encoding.UTF8.GetBytes(password));

                StringBuilder builder = new StringBuilder();
                for (int i = 0; i < bytes.Length; i++)
                {
                    builder.Append(bytes[i].ToString("x2"));
                }
                return builder.ToString();
            }
        }

        public static bool VerifyPassword(string password, string hash)
        {
            if (string.IsNullOrEmpty(password) || string.IsNullOrEmpty(hash))
                return false;

            string hashOfInput = HashPassword(password);
            return hashOfInput.Equals(hash, StringComparison.OrdinalIgnoreCase);
        }
    }
}