using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;
using CinemaAPI.Models;
using Microsoft.IdentityModel.Tokens;

namespace CinemaAPI.Services
{
    public class JwtService
    {
        private readonly string _key;
        public readonly int AccessTokenExpiryMinutes;
        public readonly int RefreshTokenExpiryMinutes;

        public JwtService(IConfiguration config)
        {
            AccessTokenExpiryMinutes = Int32.Parse(config["Jwt:AccessTokenExpiryMinutes"]);
            RefreshTokenExpiryMinutes = Int32.Parse(config["Jwt:RefreshTokenExpiryMinutes"]);
            _key = config["Jwt:SecurityKey"];
        }

        public string GenerateToken(string userId, string role)
        {
            var tokenHandler = new JwtSecurityTokenHandler();
            var keyBytes = Encoding.UTF8.GetBytes(_key);

            var claims = new List<Claim>
            {
                new(ClaimTypes.NameIdentifier, userId),
                new(ClaimTypes.Role, role)
            };

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Audience = "Frontend",
                Issuer = "Backend",
                Subject = new ClaimsIdentity(claims),
                Expires = DateTime.UtcNow.AddMinutes(AccessTokenExpiryMinutes),
                SigningCredentials = new SigningCredentials(
                    new SymmetricSecurityKey(keyBytes), SecurityAlgorithms.HmacSha256Signature)
            };


            var token = tokenHandler.CreateToken(tokenDescriptor);
            return tokenHandler.WriteToken(token);
        }

        public string GenerateRefreshToken(int byteLenght = 128)
        {
            var randomBytes = new byte[byteLenght];
            using var rng = RandomNumberGenerator.Create();
            rng.GetBytes(randomBytes);

            return Convert.ToBase64String(randomBytes);
        }
    }
}