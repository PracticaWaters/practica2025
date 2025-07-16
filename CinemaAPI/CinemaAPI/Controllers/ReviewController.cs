using CinemaAPI.DataManagement;
using CinemaAPI.DTO;
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
        private readonly ReviewDataOps reviewDataOps;
        private readonly FilmDataOps filmDataOps;

        public ReviewController(CinemaDbContext dbContext)
        {
            reviewDataOps = new ReviewDataOps(dbContext);
            filmDataOps = new FilmDataOps(dbContext);
        }

        [HttpGet]
        public ActionResult<Review> GetReviews()
        {
            try
            {
                var reviews = reviewDataOps.GetReviews();
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
            review.Film = filmDataOps.GetFilmById(reviewDto.FilmId);


            reviewDataOps.AddReview(review);
            return Ok();
        }

        [HttpPut]
        public ActionResult UpdateReview(Review review)
        {
            try
            {
                reviewDataOps.UpdateReview(review);
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
                reviewDataOps.DeleteReview(review);
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
                var review = reviewDataOps.GetReviewById(id);
                return Ok(review);
            }
            catch (Exception ex)
            {
                return BadRequest();
            }
        }
    }
}
