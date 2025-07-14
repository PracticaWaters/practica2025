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
        public IActionResult Register([FromBody] User user)
        {
            if (_userOps.GetUserByEmail(user.Email) != null)
                return Conflict("User already exists.");

            user.CreatedAt = user.ModifiedAt = DateTime.UtcNow;
            user.IsDeleted = false;

            try
            {
                _userOps.AddUser(user);
                return Ok("User registered successfully.");
            }
            catch
            {
                return StatusCode(500, "Error registering user.");
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
    }
}