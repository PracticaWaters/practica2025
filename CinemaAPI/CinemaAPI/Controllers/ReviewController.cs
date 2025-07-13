using CinemaAPI.DataManagement;
using CinemaAPI.Models;
using Microsoft.AspNetCore.Mvc;

namespace CinemaAPI.Controllers
{
    [ApiController]
    [Route("api/cinema/review")]
    public class ReviewController : Controller
    {
        private readonly ReviewDataOps reviewDataOps;

        public ReviewController()
        {
            reviewDataOps = new ReviewDataOps();
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
        public ActionResult AddReview(Review review)
        {
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
