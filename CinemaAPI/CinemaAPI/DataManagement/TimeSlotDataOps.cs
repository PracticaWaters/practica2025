using CinemaAPI.Models;
using Microsoft.EntityFrameworkCore;

namespace CinemaAPI.DataManagement
{
    public class TimeSlotDataOps
    {
        private CinemaDbContext dbContext;
        public TimeSlotDataOps(CinemaDbContext context)
        {
            dbContext = context;
        }
        public TimeSlot[] GetTimeSlots()
        {
            return dbContext.timeSlots.Include(x => x.Format).Include(x => x.Film).Include(x => x.ScreeningRoom).ToArray();
        }

        public void AddTimeSlot(TimeSlot timeSlot)
        {
            try
            {
                dbContext.screeningRooms.Attach(timeSlot.ScreeningRoom);
                dbContext.formats.Attach(timeSlot.Format);
                
                dbContext.timeSlots.Add(timeSlot);
                dbContext.films.Attach(timeSlot.Film);
                dbContext.SaveChanges();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public void UpdateTimeSlot(TimeSlot timeSlot)
        {
            try
            {
                dbContext.timeSlots.Update(timeSlot);
                dbContext.SaveChanges();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public TimeSlot? GetTimeSlotById(int id)
        {
            return dbContext.timeSlots.Where(x => x.Id == id).Include(x=>x.Format).Include(x => x.Film).Include(x=>x.ScreeningRoom).FirstOrDefault();
        }

        public void DeleteTimeSlot(TimeSlot timeslot)
        {
            try
            {
                dbContext.timeSlots.Remove(timeslot);
                dbContext.SaveChanges();
            }
            catch (Exception ex)
            {
                Console.WriteLine("Exception in DeletePlayer: {0}", ex.Message);
            }
        }

    }
}
