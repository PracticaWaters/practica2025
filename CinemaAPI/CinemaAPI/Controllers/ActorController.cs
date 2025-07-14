using CinemaAPI.DataManagement;
using CinemaAPI.Models;
using Microsoft.AspNetCore.Mvc;

namespace CinemaAPI.Controllers
{
    [ApiController]
    [Route("api/cinema/actor")]
    public class ActorController : Controller
    {
        private readonly ActorDataOps actorDataOps;

        public ActorController()
        {
            actorDataOps = new ActorDataOps();
        }

        [HttpGet]
        public ActionResult<Actor> GetActors()
        {
            try
            {
                var actors = actorDataOps.GetActors();
                return Ok(actors);
            }
            catch (Exception ex)
            {
                return BadRequest();
            }
        }

        [HttpPost]
        public ActionResult AddActor(Actor actor)
        {
            actorDataOps.AddActor(actor);
            return Ok();
        }

        [HttpPut]
        public ActionResult UpdateActor(Actor actor)
        {
            try
            {
                actorDataOps.UpdateActor(actor);
                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest();
            }
        }

        [HttpDelete]
        public ActionResult DeleteActor(Actor actor)
        {
            try
            {
                actorDataOps.DeleteActor(actor);
                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest();
            }
        }

        [HttpGet("{id}")]
        public ActionResult<Actor> GetActorById(int id)
        {
            try
            {
                var actor = actorDataOps.GetActorById(id);
                return Ok(actor);
            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }
        }
    }
}
