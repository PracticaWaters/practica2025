using System;
using CinemaAPI.Models;

namespace CinemaAPI.DataManagement
{
    public class ReservationDataOps
    {
        private CinemaDbContext dbContext;

        public ReservationDataOps(CinemaDbContext dbContext)
        {
            dbContext = context;
        }

        public Reservation[] GetReservations()
        {
            return dbContext.rezervari.ToArray();
        }

        //Idk daca e bine
        public void AddReservation(Reservation reservation)
        {
            try
            {
                dbContext.films.Attach(reservation.Film);
                dbContext.users.Attach(reservation.User);
                dbContext.rezervari.Add(reservation);
                dbContext.SaveChanges();
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.ToString());
                throw ex;
            }
        }

        public void Update(Reservation reservation)
        {
            try
            {
                dbContext.rezervari.Update(reservation);
                dbContext.SaveChanges();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public void DeleteReservation(Reservation reservation)
        {
            try
            {
                if (reservation != null)
                {
                    dbContext.rezervari.Remove(reservation);
                    dbContext.SaveChanges();
                }
                else
                {
                    throw new ArgumentNullException(nameof(reservation), "Reservation cannot be null.");
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public Reservation? GetReservationById(int id)
        {
            return dbContext.rezervari.FirstOrDefault(x => x.Id == id);
        }
    }
}