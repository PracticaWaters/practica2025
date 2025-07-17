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
        private readonly FormatDataOps _formatDataOps;

        public FormatController(CinemaDbContext dbContext)
        {
            _formatDataOps = new FormatDataOps(dbContext);
        }

        [HttpGet]
        public ActionResult<Format> GetFormats()
        {
            try
            {
                var formats = _formatDataOps.GetFormats();
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
            _formatDataOps.AddFormat(format);
            return Ok();
        }

        [HttpPut]
        public ActionResult UpdateFormat(Format format)
        {
            try
            {
                _formatDataOps.UpdateFormat(format);
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
                _formatDataOps.DeleteFormat(format);
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
                var format = _formatDataOps.GetFormatById(id);
                return Ok(format);
            }
            catch (Exception ex)
            {
                return BadRequest();
            }
        }
    }
}
