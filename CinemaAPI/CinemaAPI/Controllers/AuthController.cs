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
    [Route("api/cinema")]
    public class AuthController : ControllerBase
    {
        private readonly JwtService _jwt;
        private readonly UserDataOps _userOps = new();

        public AuthController(JwtService jwt)
        {
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

            var token = _jwt.GenerateToken(user.Id.ToString(), user.Role.ToString());

            return Ok(new
            {
                token,
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

        [Authorize(Roles="Admin")]
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