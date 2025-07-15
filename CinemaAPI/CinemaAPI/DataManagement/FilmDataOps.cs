using CinemaAPI.Models;

namespace CinemaAPI.DataManagement
{
    public class FilmDataOps
    {
        private CinemaDbContext dbContext;

        public FilmDataOps()
        {
            dbContext = new CinemaDbContext();
        }

        public Film[] GetFilms()
        {
            return dbContext.films.ToArray();
        }

        public void AddFilm(Film film)
        {
            try
            {
                foreach(Rezervare r in film.Rezervari)
                {
                    dbContext.rezervari.Attach(r);

                }
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
            return dbContext.films.Where(x => x.Id == id).FirstOrDefault();
        }


    }
}
