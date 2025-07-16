using CinemaAPI.DataManagement;
using CinemaAPI.DTO;
using CinemaAPI.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace CinemaAPI.Controllers
{
    [ApiController]
    [Route("api/cinema/promotions")]
    public class PromotionsController : ControllerBase
    {
        private readonly PromotionsDataOps _promotionsDataOps;
        private readonly FilmDataOps _filmDataOps;

        public PromotionsController(CinemaDbContext dbContext)
        {
            _promotionsDataOps = new PromotionsDataOps(dbContext);
            _filmDataOps = new FilmDataOps(dbContext);
        }

        // Mapare din Model -> DTO
        private static PromotionsDto ToDto(Promotions promotion)
        {
            return new PromotionsDto
            {
                Id = promotion.Id,
                Name = promotion.Name,
                StartDate = promotion.StartDate,
                EndDate = promotion.EndDate,
                DiscountPercentage = promotion.DiscountPercentage,
                FilmIds = promotion.Films?.Select(f => f.Id).ToList() ?? new List<int>()
            };
        }

        // Mapare din DTO -> Model
        private Promotions ToEntity(PromotionsDto dto)
        {
            var films = _filmDataOps.GetFilms()
                         .Where(f => dto.FilmIds.Contains(f.Id))
                         .ToList();

            return new Promotions
            {
                Id = dto.Id,
                Name = dto.Name,
                StartDate = dto.StartDate,
                EndDate = dto.EndDate,
                DiscountPercentage = dto.DiscountPercentage,
                Films = films
            };
        }

        [HttpGet]
        public ActionResult<List<PromotionsDto>> GetPromotions()
        {
            try
            {
                var promotions = _promotionsDataOps.GetPromotions();
                var dtoList = promotions.Select(ToDto).ToList();
                return Ok(dtoList);
            }
            catch (Exception ex)
            {
                return BadRequest($"Error retrieving promotions: {ex.Message}");
            }
        }

        [HttpPost]
        //[Authorize(Roles = "Admin")]
        public ActionResult AddPromotion([FromBody] PromotionsDto dto)
        {
            try
            {
                var entity = ToEntity(dto);
                _promotionsDataOps.AddPromotion(entity);
                return Ok("Promotion added successfully.");
            }
            catch (Exception ex)
            {
                return BadRequest($"Error adding promotion: {ex.Message}");
            }
        }

        [HttpPut("{id}")]
        //[Authorize(Roles = "Admin")]
        public ActionResult UpdatePromotion(int id, [FromBody] PromotionsDto dto)
        {
            if (id != dto.Id)
                return BadRequest("ID mismatch.");

            try
            {
                var entity = ToEntity(dto);
                _promotionsDataOps.UpdatePromotion(entity);
                return Ok("Promotion updated successfully.");
            }
            catch (Exception ex)
            {
                return BadRequest($"Error updating promotion: {ex.Message}");
            }
        }

        [HttpDelete("{id}")]
        //[Authorize(Roles = "Admin")]
        public ActionResult DeletePromotion(int id)
        {
            try
            {
                var promotion = _promotionsDataOps.GetPromotions().FirstOrDefault(p => p.Id == id);
                if (promotion == null)
                    return NotFound("Promotion not found.");

                _promotionsDataOps.DeletePromotion(promotion);
                return Ok("Promotion deleted successfully.");
            }
            catch (Exception ex)
            {
                return BadRequest($"Error deleting promotion: {ex.Message}");
            }
        }
    }
}
