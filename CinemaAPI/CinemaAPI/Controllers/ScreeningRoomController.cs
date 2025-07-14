using CinemaAPI.DataManagement;
using CinemaAPI.Models;
using Microsoft.AspNetCore.Mvc;

namespace CinemaAPI.Controllers
{
    [ApiController]
    [Route("api/cinema/screeningRoom/")]
    public class ScreeningRoomController : Controller
    {
        private readonly ScreeningRoomDataOps screeningRoomDataOps;

        public ScreeningRoomController()
        {
            screeningRoomDataOps = new ScreeningRoomDataOps();
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
        public ActionResult AddScreeningRoom(ScreeningRoom screeningRoom)
        {
            screeningRoomDataOps.AddScreeningRoom(screeningRoom);
            return Ok();
        }
        [HttpPut]
        public ActionResult UpdateScreeningRooms(ScreeningRoom screeningRooms)
        {
            try
            {
                screeningRoomDataOps.UpdateScreeningRoom(screeningRooms);
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
    }
}
