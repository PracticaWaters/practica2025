
using CinemaAPI.Models;
using Microsoft.EntityFrameworkCore;

namespace CinemaAPI.DataManagement
{
    public class ActorDataOps
    {
        private readonly CinemaDbContext dbContext;

        public ActorDataOps(CinemaDbContext context)
        {
            dbContext = context;
        }

        public Actor[] GetActors()
        {
            return dbContext.actors.Include(x => x.FilmActors).ToArray();
        }

        public Actor? GetActorById(int id)
        {
            return dbContext.actors.Include(x=>x.FilmActors).Where(x => x.Id == id).FirstOrDefault();
        }

        public void AddActor(Actor actor)
        {
            dbContext.actors.Add(actor);
            dbContext.SaveChanges();
        }


        public void UpdateActor(Actor actor)
        {
            dbContext.actors.Update(actor);
            dbContext.SaveChanges();
        }

        public void DeleteActor(int actorId)
        {
            var actor = dbContext.actors.FirstOrDefault(a => a.Id == actorId);
            if (actor == null)
                throw new ArgumentException($"Actor with id {actorId} not found.");

            dbContext.actors.Remove(actor);
            dbContext.SaveChanges();
        }
    }
}
