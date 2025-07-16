using CinemaAPI.DataManagement;
using CinemaAPI.Models;
using Microsoft.AspNetCore.Mvc;

namespace CinemaAPI.Controllers
{
    [ApiController]
    [Route("api/cinema/user/")]
    public class UserController : Controller
    {
        private readonly UserDataOps _userDataOps;
       
        public UserController(CinemaDbContext cinemaDbContext)
        {
            _userDataOps = new UserDataOps(cinemaDbContext);
        }


        [HttpPost]
        public ActionResult AddUser(User user)
        {
            try
            {
                _userDataOps.AddUser(user);
                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
           
        }

        [HttpPut]
        public ActionResult UpdateUser(User user)
        {
            try
            {
                _userDataOps.UpdateUser(user);
                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }

        }

        [HttpDelete]
        public ActionResult DeleteUser(User user)
        {
            try
            {
                _userDataOps.DeleteUser(user);
                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }

        }

        [HttpGet]
        public ActionResult<User[]> GetUsers()
        {
            try
            {
                var user = _userDataOps.GetUsers();
                return Ok(user);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }


        [HttpGet("{id}")]
        public ActionResult<User?> GetUserById([FromRoute] int id)
        {
            try
            {
                var user = _userDataOps.GetUserById(id);
                if (user == null)
                    return NotFound($"User with ID {id} was not found.");
                return Ok(user);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost("email")]
        public ActionResult<User?> GetUserByEmail([FromQuery] string email)
        {
            try
            {
                var user = _userDataOps.GetUserByEmail(email);
                if (user == null)
                    return NotFound($"User with email {email} was not found.");
                return Ok(user);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }


        [HttpPost("personal-information")]
        public ActionResult<User?> GetUserByEmailAndPassword([FromQuery] string email, [FromQuery] string password)
        {
            try
            {
                var user = _userDataOps.GetUserByEmailAndPassword(email, password);
                if (user == null)
                    return NotFound($"User was not found.");
                return Ok(user);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }



    }
}
