using System;
using CinemaAPI.Models;

namespace CinemaAPI.DataManagement
{
    public class RezervareDataOps
    {
        private CinemaDbContext dbContext;

        public RezervareDataOps()
        {
            dbContext = new CinemaDbContext();
        }

        public Rezervare[] GetRezervari()
        {
            return dbContext.rezervari.ToArray();
        }

        //Idk daca e bine
        public void AddRezervare(Rezervare rezervare)
        {
            try
            {
                dbContext.films.Attach(rezervare.Film);
                dbContext.users.Attach(rezervare.User);
                dbContext.rezervari.Add(rezervare);
                dbContext.SaveChanges();
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.ToString());
                throw ex;
            }
        }

        public void UpdateRezervare(Rezervare rezervare)
        {
            try
            {
                dbContext.rezervari.Update(rezervare);
                dbContext.SaveChanges();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public void DeleteRezervare(Rezervare rezervare)
        {
            try
            {
                if (rezervare != null)
                {
                    dbContext.rezervari.Remove(rezervare);
                    dbContext.SaveChanges();
                }
                else
                {
                    throw new ArgumentNullException(nameof(rezervare), "Rezervare cannot be null.");
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public Rezervare? GetRezervareById(int id)
        {
            return dbContext.rezervari.Where(x => x.Id == id).FirstOrDefault();
        }
    }
}
