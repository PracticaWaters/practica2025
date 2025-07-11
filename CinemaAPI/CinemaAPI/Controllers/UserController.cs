using CinemaAPI.DataManagement;
using Microsoft.AspNetCore.Mvc;

namespace CinemaAPI.Controllers
{
    [ApiController]
    [Route("api/cinema/user")]
    public class UserController : Controller
    {
        private readonly UserDataOps userDataOps;
       
        public UserController()
        {
            userDataOps = new UserDataOps();
        }

    }
}
