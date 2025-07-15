using CinemaAPI.Models;
using Microsoft.EntityFrameworkCore;

namespace CinemaAPI.DataManagement
{
    public class FormatDataOps
    {
        private readonly CinemaDbContext dbContext;
        
        public FormatDataOps(CinemaDbContext context)
        {
            dbContext = context;
        }

        public Format[] GetFormats()
        {
            return dbContext.formats.ToArray();
        }

        public void AddFormat(Format format)
        {
            try
            {
                dbContext.formats.Add(format);
                dbContext.SaveChanges();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public void UpdateFormat(Format format)
        {
            try
            {
                dbContext.formats.Update(format);
                dbContext.SaveChanges();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public void DeleteFormat(Format format)
        {
            try
            {
                if (format != null)
                {
                    dbContext.formats.Remove(format);
                    dbContext.SaveChanges();
                }
                else
                {
                    throw new ArgumentNullException(nameof(format), "Format cannot be null.");
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public Format? GetFormatById(int id)
        {
            return dbContext.formats.Where(x => x.Id == id).FirstOrDefault();
        }
    }
}
