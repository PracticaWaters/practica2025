using CinemaAPI.DataManagement;
using CinemaAPI.DTO;
using CinemaAPI.Models;
using Microsoft.AspNetCore.Mvc;

namespace CinemaAPI.Controllers
{
    [ApiController]
    [Route("api/cinema/timeSlot/")]
    public class TimeSlotController : Controller
    {
        private readonly TimeSlotDataOps timeSlotDataOps;
        private readonly ScreeningRoomDataOps screeningRoomDataOps;
        private readonly FormatDataOps formatDataOps;
        private readonly FilmDataOps filmDataOps;
        public TimeSlotController( CinemaDbContext dbContext)
        {
            timeSlotDataOps = new TimeSlotDataOps(dbContext);
            formatDataOps = new FormatDataOps(dbContext);
            screeningRoomDataOps = new ScreeningRoomDataOps(dbContext);
            filmDataOps = new FilmDataOps(dbContext);
        }

        [HttpGet]
        public ActionResult<TimeSlot> GetTimeSlots()
        {
            try
            {
                var TimeSlots = timeSlotDataOps.GetTimeSlots();
                return Ok(TimeSlots);
            }
            catch (Exception ex)
            {
                return BadRequest();
            }
        }
        [HttpPost]
        public ActionResult AddTimeSlot([FromBody] TimeSlotDTO timeSlotdto)
        {
            try   
            {
                var timeSlot = MapDtoToTimeSlot(timeSlotdto);
                timeSlotDataOps.AddTimeSlot(timeSlot);
                return Ok();
            }
            catch(Exception ex)
            {
                return BadRequest(ex);
            }
        }

        [HttpPut]
        public ActionResult UpdateTimeSlot([FromBody] TimeSlotDTO timeSlotDto)
        {
            try
            {
                var timeSlot = MapDtoToTimeSlot(timeSlotDto);
                timeSlotDataOps.UpdateTimeSlot(timeSlot);
                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }
        }

        [HttpDelete("{id}")]
        public ActionResult DeleteTimeSlot(int id)
        {
            try
            {
                var timeSlot = timeSlotDataOps.GetTimeSlotById(id);
                if (timeSlot== null)
                {
                    return NotFound();
                }
                timeSlotDataOps.DeleteTimeSlot(timeSlot);
                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }
        }

        [HttpGet("{id}")]
        public ActionResult<TimeSlot> GetTimeSlotById(int id)
        {
            try
            {
                var timeSlot = timeSlotDataOps.GetTimeSlotById(id);
                return Ok(timeSlot);
            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }
        }

        private TimeSlot MapDtoToTimeSlot(TimeSlotDTO timeSlotDto)
        {
            var timeSlot = new TimeSlot
            {
                Id = timeSlotDto.Id,
                StartTime = timeSlotDto.StartTime,
                EndTime = timeSlotDto.EndTime,
                ScreeningRoom = screeningRoomDataOps.GetScreeningRoomById(timeSlotDto.ScreeningRoomId),
                Format = formatDataOps.GetFormatById(timeSlotDto.FormatID),
                Film = filmDataOps.GetFilmById(timeSlotDto.FilmId),
            };
            return timeSlot;
        }
    }
}
