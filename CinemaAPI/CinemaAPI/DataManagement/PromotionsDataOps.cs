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
            return dbContext.promotions.Include(x => x.Films).ToArray();
        }

        public void AddPromotion(Promotions promotion, List<int> filmIds)
        {
            try
            {
                var films = dbContext.films
                    .Where(f => filmIds.Contains(f.Id))
                    .ToList();

                if (films.Count != filmIds.Count)
                {
                    throw new Exception("Unul sau mai multe filme nu au fost găsite.");
                }

                promotion.Films = films;

                dbContext.promotions.Add(promotion);
                dbContext.SaveChanges();
            }
            catch (Exception ex)
            {
                throw new Exception("Error adding promotion", ex);
            }
        }

        public void UpdatePromotion(Promotions updatedPromotion)
        {
            try
            {
                var existingPromotion = dbContext.promotions
                    .Include(p => p.Films)
                    .FirstOrDefault(p => p.Id == updatedPromotion.Id);

                if (existingPromotion == null)
                {
                    throw new Exception("Promotion not found in database.");
                }

                existingPromotion.Title = updatedPromotion.Title;
                existingPromotion.Description = updatedPromotion.Description;
                existingPromotion.Image= updatedPromotion.Image;
                existingPromotion.StartDate = updatedPromotion.StartDate;
                existingPromotion.EndDate = updatedPromotion.EndDate;
                existingPromotion.DiscountPercentage = updatedPromotion.DiscountPercentage;

                existingPromotion.Films.Clear();
                foreach (var film in updatedPromotion.Films)
                {
                    var trackedFilm = dbContext.films.Find(film.Id);
                    if (trackedFilm != null)
                    {
                        existingPromotion.Films.Add(trackedFilm);
                    }
                }

                dbContext.SaveChanges();
            }
            catch (Exception ex)
            {
                throw new Exception("Error updating promotion", ex);
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
