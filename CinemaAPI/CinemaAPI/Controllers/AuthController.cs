﻿using CinemaAPI.DataManagement;
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
        public readonly ReviewDataOps _reviewDataOps;
        public readonly ReservationDataOps _reservationDataOps;

        public AuthController(JwtService jwt, CinemaDbContext dbContext)
        {
            _userOps = new UserDataOps(dbContext);
            _reviewDataOps = new ReviewDataOps(dbContext);
            _reservationDataOps = new ReservationDataOps(dbContext);
            _jwt = jwt;


        }


        [HttpPost("register")]
        public IActionResult Register([FromBody] UserDto userDto)
        {
            if (_userOps.GetUserByEmail(userDto.Email) != null)
                return Conflict("User already exists.");

            try
            {
                var user = userDto.ToUser(_reservationDataOps, _reviewDataOps);
                _userOps.AddUser(user);
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
                return BadRequest("Invalid email or password.");

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

        [Authorize]
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

      

    }
}