using CinemaAPI.DataManagement;
using CinemaAPI.DTOs;
using CinemaAPI.Models;
using Microsoft.AspNetCore.Mvc;

namespace CinemaAPI.Controllers
{
    [ApiController]
    [Route("api/cinema/format")]
    public class FormatController : Controller
    {
        private readonly FormatDataOps formatDataOps;

        public FormatController(CinemaDbContext dbContext)
        {
            formatDataOps = new FormatDataOps(dbContext);
        }

        [HttpGet]
        public ActionResult<Format> GetFormats()
        {
            try
            {
                var formats = formatDataOps.GetFormats();
                return Ok(formats);
            }
            catch (Exception ex)
            {
                return BadRequest();
            }
        }

        [HttpPost]
        public ActionResult AddFormat(Format format)
        {
            formatDataOps.AddFormat(format);
            return Ok();
        }

        [HttpPut]
        public ActionResult UpdateFormat(Format format)
        {
            try
            {
                formatDataOps.UpdateFormat(format);
                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest();
            }
        }

        [HttpDelete]
        public ActionResult DeleteFormat(Format format)
        {
            try
            {
                formatDataOps.DeleteFormat(format);
                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest();
            }
        }

        [HttpGet("{id}")]
        public ActionResult<Format> GetFormatById(int id)
        {
            try
            {
                var format = formatDataOps.GetFormatById(id);
                return Ok(format);
            }
            catch (Exception ex)
            {
                return BadRequest();
            }
        }
    }
}
