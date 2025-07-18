using CinemaAPI.DataManagement;
using CinemaAPI.DTO;
using CinemaAPI.Models;
using Microsoft.AspNetCore.Mvc;

namespace CinemaAPI.Controllers
{
    [ApiController]
    [Route("api/cinema/screeningRoom/")]
    public class ScreeningRoomController : Controller
    {
        private readonly ScreeningRoomDataOps screeningRoomDataOps;
        private readonly FormatDataOps formatDataOps;
        private readonly TimeSlotDataOps timeSlotDataOps;

        public ScreeningRoomController(CinemaDbContext dbContext)
        {
            screeningRoomDataOps = new ScreeningRoomDataOps(dbContext);
            formatDataOps = new FormatDataOps(dbContext);
            timeSlotDataOps = new TimeSlotDataOps(dbContext);
        }
        [HttpGet]
        public ActionResult<ScreeningRoom> GetScreeningRooms()
        {
            try
            {
                var ScreeningRooms = screeningRoomDataOps.GetScreeningRooms();
                return Ok(ScreeningRooms);
            }
            catch (Exception ex)
            {
                return BadRequest();
            }
        }
        [HttpPost]
        public ActionResult AddScreeningRoom(ScreeningRoomDTO screeningRoomDto)
        {
            try
            {
                var screeningRoom = MapDtoToScreeningRoom(screeningRoomDto);
                screeningRoomDataOps.AddScreeningRoom(screeningRoom);
                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }
        }
        [HttpPut]
        public ActionResult UpdateScreeningRooms(ScreeningRoomDTO screeningRoomDto)
        {
            try
            {
                var screeningRoom = MapDtoToScreeningRoom(screeningRoomDto);
                screeningRoomDataOps.UpdateScreeningRoom(screeningRoom);
                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }
        }
        [HttpGet("{id}")]
        public ActionResult<ScreeningRoom> GetScreeningRoom(int id)
        {
            try
            {
                var screeningRoom = screeningRoomDataOps.GetScreeningRoomById(id);
                return Ok(screeningRoom);
            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }
        }

        [HttpDelete("{id}")]
        public ActionResult DeleteScreeningRoom(int id)
        {
            try
            {
                var screeningRoom = screeningRoomDataOps.GetScreeningRoomById(id);
                if (screeningRoom == null)
                {
                    return NotFound();
                }
                screeningRoomDataOps.DeleteScreeningRoom(screeningRoom);
                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }
        }
        private ScreeningRoom MapDtoToScreeningRoom(ScreeningRoomDTO screeningRoomDTO)
        {
            ScreeningRoom screeningRoom = new ScreeningRoom();
            screeningRoom.Id = screeningRoomDTO.Id;
            screeningRoom.Name = screeningRoomDTO.Name;
            screeningRoom.NumOfRow = screeningRoomDTO.NumOfRow;
            screeningRoom.NumOfSeatsPerRow = screeningRoomDTO.NumOfSeatsPerRow;
            screeningRoom.Format = new List<Format>();

            foreach (var formatId in screeningRoomDTO.FormatsIds)
            {
                var format = formatDataOps.GetFormatById(formatId)
                    ?? throw new ArgumentException($"Format with id {formatId} not found");
                screeningRoom.Format.Add(format);
            }
            return screeningRoom;
        }
    }
}
