using CinemaAPI.DataManagement;
using CinemaAPI.DTO;
using CinemaAPI.Models;
using Microsoft.AspNetCore.Mvc;

namespace CinemaAPI.Controllers
{
    [ApiController]
    [Route("api/cinema/actor")]
    public class ActorController : ControllerBase
    {
        private readonly ActorDataOps _actorDataOps;

        public ActorController(CinemaDbContext dbContext)
        {
            _actorDataOps = new ActorDataOps(dbContext);
        }

        [HttpGet]
        public ActionResult<Actor> GetActors()
        {
            try
            {
                var actors = _actorDataOps.GetActors();
                return Ok(actors);
            }
            catch (Exception)
            {
                return BadRequest("Failed to retrieve actors.");
            }
        }

        [HttpGet("{id}")]
        public ActionResult<Actor> GetActorById(int id)
        {
            try
            {
                var actor = _actorDataOps.GetActorById(id);
                if (actor == null)
                    return NotFound($"Actor with ID {id} not found.");

                return Ok(actor);
            }
            catch (Exception)
            {
                return BadRequest("Failed to retrieve actor.");
            }
        }

        [HttpPost]
        public ActionResult AddActor([FromBody] ActorDTO actorDTO)
        {
            try
            {
                var actor = new Actor
                {
                    Name = actorDTO.Name,
                };
                _actorDataOps.AddActor(actor);
                return Ok("Actor added successfully.");
            }
            catch (Exception)
            {
                return BadRequest("Failed to add actor.");
            }
        }

        [HttpPut]
        public ActionResult UpdateActor(ActorDTO actorDTO)
        {
            try
            {
                var actor = new Actor
                {
                    Name = actorDTO.Name,
                };
                actor.Id = actorDTO.Id;
                _actorDataOps.UpdateActor(actor);
                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }
        }



        [HttpDelete("{id}")]
        public ActionResult DeleteActor(int id)
        {
            try
            {
                _actorDataOps.DeleteActor(id);
                return Ok("Actor deleted successfully.");
            }
            catch (ArgumentException e)
            {
                return NotFound(e.Message);
            }
            catch (Exception)
            {
                return BadRequest("Failed to delete actor.");
            }
        }
    }
}
