    using System;
using CinemaAPI.Models;

namespace CinemaAPI.DataManagement
{
    public class RezervareDataOps
    {
        private CinemaDbContext dbContext;

        public RezervareDataOps(CinemaDbContext context)
        {
            dbContext = context;
        }

        public Rezervation[] GetRezervari()
        {
            return dbContext.rezervari.ToArray();
        }

        //Idk daca e bine
        public void AddRezervare(Rezervation rezervation)
        {
            try
            {
                dbContext.films.Attach(rezervation.Film);
                dbContext.users.Attach(rezervation.User);
                dbContext.rezervari.Add(rezervation);
                dbContext.SaveChanges();
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.ToString());
                throw ex;
            }
        }

        public void UpdateRezervare(Rezervation rezervation)
        {
            try
            {
                dbContext.rezervari.Update(rezervation);
                dbContext.SaveChanges();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public void DeleteRezervare(Rezervation rezervation)
        {
            try
            {
                if (rezervation != null)
                {
                    dbContext.rezervari.Remove(rezervation);
                    dbContext.SaveChanges();
                }
                else
                {
                    throw new ArgumentNullException(nameof(rezervation), "Rezervation cannot be null.");
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public Rezervation? GetRezervareById(int id)
        {
            return dbContext.rezervari.Where(x => x.Id == id).FirstOrDefault();
        }
    }
}
