using CinemaAPI.DataManagement;
using CinemaAPI.DTO;
using CinemaAPI.DTOs;
using CinemaAPI.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Identity.Client;

namespace CinemaAPI.Controllers
{
    [ApiController]
    [Route("api/cinema/format")]
    public class FormatController : Controller
    {
        private readonly FormatDataOps formatDataOps;
        private readonly TimeSlotDataOps timeSlotDataOps;
        public FormatController(CinemaDbContext dbContext)
        {
            formatDataOps = new FormatDataOps(dbContext);
            timeSlotDataOps = new TimeSlotDataOps(dbContext);
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
        public ActionResult AddFormat([FromBody] FormatDTO formatDto)
        {
            try
            {
                var format = MapDtoToFormat(formatDto);
                formatDataOps.AddFormat(format);
                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }
        }

        [HttpPut]
        public ActionResult UpdateFormat([FromBody] FormatDTO formatDto)
        {
            try
            {
                var format = MapDtoToFormat(formatDto);
                format.Id=formatDto.Id;
                formatDataOps.UpdateFormat(format);
                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest(ex);
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

        private Format MapDtoToFormat(FormatDTO formatDto)
        {
            var format = new Format
            {
                Id = formatDto.Id,
                Name = formatDto.Name,
                TimeSlots = new List<TimeSlot>(),
            };
            foreach(var timeSlotId in formatDto.TimeSlotsIds)
            {
                var timeSlot = timeSlotDataOps.GetTimeSlotById(timeSlotId)
                    ??throw new ArgumentException($"TimeSlot with id {timeSlotId} not found");
                format.TimeSlots.Add(timeSlot);
            }
            return format;
        }
    }
}
