using CinemaAPI.DataManagement;
using CinemaAPI.Models;
using CinemaAPI.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using Microsoft.AspNetCore.Identity.Data;

namespace CinemaAPI.Controllers
{
    [ApiController]
    [Route("api/cinema/auth")]
    public class AuthController : ControllerBase
    {
        private readonly JwtService _jwt;
        private readonly UserDataOps _userOps;

        public AuthController(JwtService jwt, CinemaDbContext dbContext)
        {
            _userOps = new UserDataOps(dbContext);
            _jwt = jwt;
        }


        [HttpPost("register")]
        public IActionResult Register([FromBody] UserDto userDto)
        {
            if (_userOps.GetUserByEmail(userDto.Email) != null)
                return Conflict("User already exists.");

            try
            {
                _userOps.AddUser(MapDtoToUser(userDto));
                return Ok("User registered successfully.");
            }
            catch(Exception ex)
            {
                return BadRequest("Error registering user.Error:" + ex);
            }
        }



        [HttpPost("login")]
        public IActionResult Login([FromBody] LoginRequest credentials)
        {
            var user = _userOps.GetUserByEmailAndPassword(credentials.Email, credentials.Password);
            if (user == null)
                return Unauthorized("Invalid email or password.");

            var accessToken = _jwt.GenerateToken(user.Id.ToString(), user.Role.ToString());
            var refreshToken = _jwt.GenerateRefreshToken();

            _userOps.SaveRefreshToken(user.Id, refreshToken, DateTime.UtcNow.AddMinutes(_jwt.RefreshTokenExpiryMinutes));

            return Ok(new
            {
                accessToken = accessToken,
                refreshToken = refreshToken,

                user = new
                {
                    user.Id,
                    user.Name,
                    user.Email,
                    Role = user.Role.ToString(),
                    user.AvatarUrl
                }
            });
        }

        [HttpPost("refresh")]
        public IActionResult Refresh([FromBody] RefreshRequest model)
        {
            var storedToken = _userOps.GetRefreshToken(model.RefreshToken);
            if (storedToken is null || storedToken.IsRevoked || storedToken.ExpiryDate < DateTime.UtcNow)
                return Unauthorized("Invalid or expired refresh token.");

            var user = _userOps.GetUserById(storedToken.UserId);
            if (user is null)
                return Unauthorized("User no longer exists.");

            var newAccessToken = _jwt.GenerateToken(user.Id.ToString(), user.Role.ToString());
            var newRefreshToken = _jwt.GenerateRefreshToken();

            _userOps.ReplaceRefreshToken(model.RefreshToken, newRefreshToken, DateTime.UtcNow.AddMinutes(_jwt.RefreshTokenExpiryMinutes));

            return Ok(new
            {
                accessToken = newAccessToken,
                refreshToken = newRefreshToken
            });
        }

        [Authorize(Roles = "Admin")]
        [HttpGet("self")]
        public IActionResult GetProfile()
        {
            var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            if (int.TryParse(userId, out int id))
            {
                var user = _userOps.GetUserById(id);
                if (user != null)
                {
                    return Ok(new
                    {
                        user.Id,
                        user.Name,
                        user.Email,
                        Role = user.Role.ToString(),
                        user.AvatarUrl
                    });
                }
            }

            return Unauthorized();
        }

        [Authorize]
        [HttpPost("logout")]
        public IActionResult Logout()
        {
            var userIdString = User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (!int.TryParse(userIdString, out var userId))
                return Unauthorized();

            _userOps.DeleteRefreshTokens(userId);
            return Ok("User logged out – refresh tokens revoked.");
        }

        public static User MapDtoToUser(UserDto userDto)
        {
            User user = new User
            {
                Id = userDto.Id,
                Name = userDto.Name,
                Email = userDto.Email,
                Phone = userDto.Phone,
                BirthDate = userDto.BirthDate,
                Role = userDto.Role,
                AvatarUrl = userDto.AvatarUrl,
                Gender = userDto.Gender,
                Password = userDto.Password,
                CreatedAt = userDto.CreatedAt,
                ModifiedAt = userDto.ModifiedAt,
                IsDeleted = userDto.IsDeleted,
                Rezervations = [],
                Reviews = [],
            };


            if (userDto.RezervationId != null)
            {
                foreach (int id in userDto.RezervationId)
                {
                    var rezervation = new Rezervation()
                        ?? throw new ArgumentException($"Rezervation with Id {id} not found.");
                    user.Rezervations.Add(rezervation);
                }
            }

            if (userDto.ReviewsId != null)
            {
                foreach (int id in userDto.ReviewsId)
                {
                    var review = new Review()
                        ?? throw new ArgumentException($"Review with Id {id} not found.");
                    user.Reviews.Add(review);
                }
            }

            return user;
        }

    }
}