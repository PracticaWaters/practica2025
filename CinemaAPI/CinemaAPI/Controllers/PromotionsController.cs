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

        private static PromotionsDto ToDto(Promotions promotion)
        {
            return new PromotionsDto
            {
                Id = promotion.Id,
                Title = promotion.Title,
                Description = promotion.Description,
                Image = promotion.Image,
                StartDate = promotion.StartDate,
                EndDate = promotion.EndDate,
                DiscountPercentage = promotion.DiscountPercentage,
                FilmIds = promotion.Films?.Select(f => f.Id).ToList() ?? new List<int>()
            };
        }

        private Promotions ToEntity(PromotionsDto dto)
        {
            var allFilmIds = dto.FilmIds.Distinct().ToList();
            var films = _filmDataOps.GetFilms()
                         .Where(f => allFilmIds.Contains(f.Id))
                         .ToList();

            var foundIds = films.Select(f => f.Id).ToList();
            var invalidIds = allFilmIds.Except(foundIds).ToList();

            if (invalidIds.Any())
            {
                throw new ArgumentException($"Filmele cu ID-urile [{string.Join(", ", invalidIds)}] nu există.");
            }

            return new Promotions
            {
                Id = dto.Id,
                Title = dto.Title,
                Description = dto.Description,
                Image = dto.Image,
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

        [HttpGet("{id}")]
        public ActionResult<PromotionsDto> GetPromotionById(int id)
        {
            try
            {
                var promotion = _promotionsDataOps.GetPromotions().FirstOrDefault(p => p.Id == id);
                if (promotion == null)
                    return NotFound($"Promoția cu ID {id} nu a fost găsită.");

                var dto = ToDto(promotion);
                return Ok(dto);
            }
            catch (Exception ex)
            {
                return BadRequest($"Eroare la obținerea promoției: {ex.Message}");
            }
        }


        [HttpPost]
        public ActionResult AddPromotion([FromBody] PromotionsDto dto)
        {
            try
            {
                var promotion = new Promotions
                {
                    Title = dto.Title,
                    Description = dto.Description,
                    Image = dto.Image,
                    StartDate = dto.StartDate,
                    EndDate = dto.EndDate,
                    DiscountPercentage = dto.DiscountPercentage,
                };

                _promotionsDataOps.AddPromotion(promotion, dto.FilmIds);
                return Ok("Promotion added successfully.");
            }
            catch (Exception ex)
            {
                return BadRequest($"Error adding promotion: {ex.Message}");
            }
        }


        [HttpPut("{id}")]
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
