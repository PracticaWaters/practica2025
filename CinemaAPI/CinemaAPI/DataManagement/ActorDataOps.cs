using CinemaAPI.Models;

namespace CinemaAPI.DataManagement
{
    public class ActorDataOps
    {
        private CinemaDbContext dbContext;

        public ActorDataOps()
        {
            dbContext = new CinemaDbContext();
        }

        public Actor[] GetActors()
        {
            return dbContext.actors.ToArray();
        }

        public void AddActor(Actor actor)
        {
            try
            {
                dbContext.actors.Add(actor);
                dbContext.SaveChanges();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public void UpdateActor(Actor actor)
        {
            try
            {
                dbContext.actors.Update(actor);
                dbContext.SaveChanges();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public void DeleteActor(Actor actor)
        {
            try
            {
                if (actor != null)
                {
                    dbContext.actors.Remove(actor);
                    dbContext.SaveChanges();
                }
                else
                {
                    throw new ArgumentNullException(nameof(actor), "Film cannot be null.");
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public Actor? GetActorById(int id)
        {
            return dbContext.actors.Where(x => x.Id == id).FirstOrDefault();
        }
    }
}
