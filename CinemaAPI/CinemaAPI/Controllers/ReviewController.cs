using CinemaAPI.DataManagement;
using CinemaAPI.DTOs;
using CinemaAPI.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace CinemaAPI.Controllers
{
    [ApiController]
    [Route("api/cinema/review")]
    public class ReviewController : Controller
    {
        private readonly ReviewDataOps _reviewDataOps;
        private readonly FilmDataOps _filmDataOps;
        private readonly UserDataOps _userDataOps;

        public ReviewController(CinemaDbContext dbContext)
        {
            _reviewDataOps = new ReviewDataOps(dbContext);
            _filmDataOps = new FilmDataOps(dbContext);
            _userDataOps = new UserDataOps(dbContext);
        }

        [HttpGet]
        public ActionResult<Review> GetReviews()
        {
            try
            {
                var reviews = _reviewDataOps.GetReviews();
                return Ok(reviews);
            }
            catch (Exception ex)
            {
                return BadRequest();
            }
        }

        [HttpPost]
        public ActionResult AddReview(ReviewDto reviewDto)
        {
            Review review = new Review();
            review.Rating = reviewDto.Rating;
            review.Date = reviewDto.Date;
            review.Comment = reviewDto.Comment;
            review.Film = _filmDataOps.GetFilmById(reviewDto.FilmId);
            review.User = _userDataOps.GetUserById(reviewDto.UserId);


            _reviewDataOps.AddReview(review);
            return Ok();
        }

        [HttpPut]
        public ActionResult UpdateReview(Review review)
        {
            try
            {
                _reviewDataOps.UpdateReview(review);
                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest();
            }
        }

        [HttpDelete]
        public ActionResult DeleteReview(Review review)
        {
            try
            {
                _reviewDataOps.DeleteReview(review);
                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest();
            }
        }

        [HttpGet("{id}")]
        public ActionResult<Review> GetReviewById(int id)
        {
            try
            {
                var review = _reviewDataOps.GetReviewById(id);
                return Ok(review);
            }
            catch (Exception ex)
            {
                return BadRequest();
            }
        }
    }
}
