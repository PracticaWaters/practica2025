using CinemaAPI.Models;
using Microsoft.EntityFrameworkCore;

namespace CinemaAPI.DataManagement
{
    public class FilmDataOps
    {
        private readonly CinemaDbContext dbContext;

        public FilmDataOps(CinemaDbContext context)
        {
            dbContext = context;
        }

        public Film[] GetFilms()
        {
            return dbContext.films.Include(x => x.Reviews).Include(x => x.FilmActors).Include(x => x.Wishlists).ToArray();
        }

        public void AddFilm(Film film)
        {
            try
            {
                dbContext.films.Add(film);
                dbContext.SaveChanges();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public void UpdateFilm(Film film)
        {
            try
            {
                dbContext.films.Update(film);
                dbContext.SaveChanges();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public void DeleteFilm(Film film)
        {
            try
            {
                if (film != null)
                {
                    dbContext.films.Remove(film);
                    dbContext.SaveChanges();
                }
                else
                {
                    throw new ArgumentNullException(nameof(film), "Film cannot be null.");
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public Film? GetFilmById(int id)
        {
            return dbContext.films.Include(x => x.Reviews).Include(x => x.FilmActors).Include(x=>x.Wishlists).Where(x => x.Id == id).FirstOrDefault();
        }
    }
}
