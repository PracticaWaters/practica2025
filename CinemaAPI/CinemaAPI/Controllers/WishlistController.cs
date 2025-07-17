using Microsoft.AspNetCore.Mvc;
using CinemaAPI.Models;
using CinemaAPI.DataManagement;

namespace CinemaAPI.Controllers
{
    [ApiController]
    [Route("api/users/{userId}/wishlist")]
    public class WishlistController : ControllerBase
    {
        private readonly WishlistDataOps _wishlistOps;

        public WishlistController(CinemaDbContext dbContext)
        {
            _wishlistOps = new WishlistDataOps(dbContext);
        }

        // GET /api/users/{userId}/wishlist
        [HttpGet]
        public IActionResult GetWishlist(int userId)
        {
            var wishlist = _wishlistOps.GetByUser(userId);
            return Ok(wishlist.Select(w => w.Film));
        }

        // POST /api/users/{userId}/wishlist
        [HttpPost]
        public IActionResult AddToWishlist(int userId, [FromBody] IdRequest request)
        {
            int filmId = request.Id;

            var existing = _wishlistOps.GetByUserAndFilmId(userId, filmId);
            if (existing != null)
                return Conflict("Film is already in wishlist.");

            var dbContext = new CinemaDbContext();

            var user = dbContext.users.FirstOrDefault(u => u.Id == userId);
            var film = dbContext.films.FirstOrDefault(f => f.Id == filmId);

            if (user == null || film == null)
                return NotFound("User or Film not found.");

            var wishlist = new Wishlist
            {
                User = user,
                Film = film
            };

            _wishlistOps.Add(wishlist);

            return CreatedAtAction(nameof(GetWishlist), new { userId }, wishlist);
        }



        // DELETE /api/users/{userId}/wishlist/{filmId}
        [HttpDelete("{filmId}")]
        public IActionResult RemoveFromWishlist(int userId, int filmId)
        {
            var wishlist = _wishlistOps.GetByUserAndFilmId(userId, filmId);
            if (wishlist == null)
                return NotFound("Film is not in wishlist.");

            _wishlistOps.Delete(wishlist);
            return NoContent();
        }

        // GET /api/users/{userId}/wishlist/{filmId}
        [HttpGet("{filmId}")]
        public IActionResult IsFilmInWishlist(int userId, int filmId)
        {
            var wishlist = _wishlistOps.GetByUserAndFilmId(userId, filmId);
            return wishlist != null ? Ok(true) : NotFound(false);
        }

        public class IdRequest
        {
            public int Id { get; set; }
        }
    }
}