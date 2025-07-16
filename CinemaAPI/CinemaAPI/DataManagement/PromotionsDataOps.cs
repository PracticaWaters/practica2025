using CinemaAPI.Models;
using Microsoft.EntityFrameworkCore;

namespace CinemaAPI.DataManagement
{
    public class PromotionsDataOps
    {
        private readonly CinemaDbContext dbContext;
        public PromotionsDataOps(CinemaDbContext context)
        {
            dbContext = context;
        }
        public Promotions[] GetPromotions()
        {
            return dbContext.promotions.Include(x=>x.Films).ToArray();
        }
        public void AddPromotion(Promotions promotion)
        {
            try
            {
                dbContext.promotions.Add(promotion);
                dbContext.SaveChanges();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public void UpdatePromotion(Promotions promotion)
        {
            try
            {
                dbContext.promotions.Update(promotion);
                dbContext.SaveChanges();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public void DeletePromotion(Promotions promotion)
        {
            try
            {
                if (promotion != null)
                {
                    dbContext.promotions.Remove(promotion);
                    dbContext.SaveChanges();
                }
                else
                {
                    throw new ArgumentNullException(nameof(promotion), "Promotion cannot be null.");
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}
