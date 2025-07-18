using CinemaAPI.Models;
using Microsoft.EntityFrameworkCore;

namespace CinemaAPI.DataManagement
{
    public class ReviewDataOps
    {
        private readonly CinemaDbContext dbContext;

        public ReviewDataOps(CinemaDbContext context)
        {
            dbContext = context;
        }

        public Review[] GetReviews()
        {
            return dbContext.reviews.Include(x => x.Film).Include(x => x.User).ToArray();
        }

        public void AddReview(Review review)
        {
            try
            {
                dbContext.Attach(review.Film);
                dbContext.Entry(review).Property("FilmId").CurrentValue = review.Film.Id;
                //dbContext.Attach(review.User);
                //dbContext.Entry(review).Property("UserId").CurrentValue = review.User.Id;
                dbContext.reviews.Add(review);
                dbContext.SaveChanges();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public void UpdateReview(Review review)
        {
            try
            {
                dbContext.reviews.Update(review);
                dbContext.SaveChanges();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public void DeleteReview(Review review)
        {
            try
            {
                if (review != null)
                {
                    dbContext.reviews.Remove(review);
                    dbContext.SaveChanges();
                }
                else
                {
                    throw new ArgumentNullException(nameof(review), "Review cannot be null.");
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public Review? GetReviewById(int id)
        {
            return dbContext.reviews.Include(x => x.Film).Include(x => x.User).Where(x =>  x.Id == id).FirstOrDefault();
        }
    }
}
