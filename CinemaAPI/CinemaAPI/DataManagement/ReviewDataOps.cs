using CinemaAPI.Models;

namespace CinemaAPI.DataManagement
{
    public class ReviewDataOps
    {
        private CinemaDbContext dbContext;

        public ReviewDataOps()
        {
            dbContext = new CinemaDbContext();
        }

        public Review[] GetReviews()
        {
            return dbContext.reviews.ToArray();
        }

        public void AddReview(Review review)
        {
            try
            {
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
            return dbContext.reviews.Where(x =>  x.Id == id).FirstOrDefault();
        }
    }
}
