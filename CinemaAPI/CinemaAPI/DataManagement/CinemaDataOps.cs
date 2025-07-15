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
            return dbContext.cinema.ToArray();        
        }

        public void AddCinema(Cinema cinema)
        {
            try
            {
                dbContext.cinema.Add(cinema);
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
                dbContext.cinema.Update(cinema);
                dbContext.SaveChanges();
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
            }
        }


        public void DeleteCinema(Cinema cinema)
        {
            try
            {
                if (cinema != null)
                {
                    dbContext.cinema.Remove(cinema);
                }
                else
                {
                    throw new ArgumentNullException(nameof(cinema), "Cinema cannot be null.");
                }
            }
            catch(Exception ex)
            {
                throw ex;
            }
        }

        public Cinema? GetCinema(int id)
        {
            return dbContext.cinema.Where(x=> x.Id==id).FirstOrDefault();
        }

    }
}
