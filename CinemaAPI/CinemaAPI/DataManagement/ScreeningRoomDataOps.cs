using CinemaAPI.Models;
using System.Numerics;

namespace CinemaAPI.DataManagement
{
    public class ScreeningRoomDataOps
    {
        private CinemaDbContext dbContext;

        public ScreeningRoomDataOps()
        {
            dbContext = new CinemaDbContext();
        }

        public ScreeningRoom[] GetScreeningRooms()
        {
            return dbContext.screeningRooms.ToArray();
        }

        public void AddScreeningRoom(ScreeningRoom room)
        {
            try
            {
                dbContext.screeningRooms.Add(room);
                dbContext.SaveChanges();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public void UpdateScreeningRoom(ScreeningRoom room)
        {
            try
            {
                dbContext.screeningRooms.Update(room);
                dbContext.SaveChanges();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public ScreeningRoom? GetScreeningRoomById(int id)
        {
            return dbContext.screeningRooms.Where(x => x.Id == id).FirstOrDefault();
        }

        public void DeleteScreeningRoom(ScreeningRoom screeningRoom)
        {
            try
            {
                dbContext.screeningRooms.Remove(screeningRoom);
                dbContext.SaveChanges();
            }
            catch (Exception ex)
            {
                Console.WriteLine("Exception in DeletePlayer: {0}", ex.Message);
            }
        }

    }
}