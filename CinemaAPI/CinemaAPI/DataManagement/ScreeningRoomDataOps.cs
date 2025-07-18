using CinemaAPI.Models;
using System.Numerics;

namespace CinemaAPI.DataManagement
{
    public class ScreeningRoomDataOps
    {
        private readonly CinemaDbContext dbContext;

        public ScreeningRoomDataOps(CinemaDbContext context)
        {
            dbContext = context;
        }

        public ScreeningRoom[] GetScreeningRooms()
        {
            return dbContext.screeningRooms.ToArray();
        }

        public void AddScreeningRoom(ScreeningRoom room)
        {
            try
            {
                List<Seat> seats = new List<Seat>();
                for (int i = 1; i <= room.NumOfRow; ++i)
                {
                    for (int j = 1; j <= room.NumOfSeatsPerRow; ++j)
                    {
                        Seat seat = new Seat();
                        seat.Row = i;
                        seat.Number = j;
                        seat.IsReserved = false;
                        seats.Add(seat);
                    }
                }
                room.SeatList = seats;
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
