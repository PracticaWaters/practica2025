using CinemaAPI.Models;

namespace CinemaAPI.DataManagement
{
    public class CinemaDataOps
    {
        private CinemaDbContext dbContext;
        public CinemaDataOps()
        {
            dbContext= new CinemaDbContext();
        }

        public Cinema[] GetCinemas()
        { 
            return dbContext.cinemas.ToArray();        
        }

        public void AddCinema(Cinema cinema)
        {
            try
            {
                dbContext.cinemas.Add(cinema);
                dbContext.SaveChanges();
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
            }
        }

        public void UpdateCinema(Cinema cinema)
        {
            try
            {
                dbContext.cinemas.Update(cinema);
                dbContext.SaveChanges();
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
            }
        }

        public Cinema? GetCinema(int id)
        {
            return dbContext.cinemas.Where(x=> x.Id==id).FirstOrDefault();
        }

    }
}
