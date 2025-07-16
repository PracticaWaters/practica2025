using CinemaAPI.Models;
using Microsoft.EntityFrameworkCore;
using System;

namespace CinemaAPI.DataManagement;

public class WishlistDataOps
{
    private readonly CinemaDbContext dbContext;

    public WishlistDataOps(CinemaDbContext cinemaDbContext)
    {
        dbContext = cinemaDbContext;
    }
    
    public Wishlist[] GetWishlists()
    {
        return dbContext.wishlists.Include(x => x.User).Include(x => x.Film).ToArray();
    }
    
    public void Add(Wishlist wishlist)
    {
        try
        {
            dbContext.Attach(wishlist.User);
            dbContext.Attach(wishlist.Film);
            dbContext.Entry(wishlist).Property("UserId").CurrentValue = wishlist.User.Id;
            dbContext.Entry(wishlist).Property("FilmId").CurrentValue = wishlist.Film.Id;
            dbContext.wishlists.Add(wishlist);
            dbContext.SaveChanges();
        }
        catch (Exception ex)
        {
            throw ex;
        }
    }
    
    public void Update(Wishlist wishlist)
    {
        try
        {
            dbContext.wishlists.Update(wishlist);
            dbContext.SaveChanges();
        }
        catch (Exception ex)
        {
            throw ex;
        }
    }
    
    public void Delete(Wishlist wishlist)
    {
        try
        {
            if (wishlist != null)
            {
                dbContext.wishlists.Remove(wishlist);
                dbContext.SaveChanges();
            }
            else
            {
                throw new ArgumentNullException(nameof(wishlist), "Wishlist cannot be null.");
            }
        }
        catch (Exception ex)
        {
            throw ex;
        }
    }
    
    public Wishlist[] GetByUser(int userId)
    {
        return dbContext.wishlists
            .Include(x => x.User)
            .Include(x => x.Film)
            .Where(w => w.User.Id == userId)
            .ToArray();
    }
    
    public Wishlist? GetByUserAndFilmId(int userId, int filmId)
    {
        return dbContext.wishlists
            .Include(x => x.User)
            .Include(x => x.Film)
            .FirstOrDefault(w => w.User.Id == userId && w.Film.Id == filmId);
    }
    public Wishlist? GetWishlistById(int id)
    {
        return dbContext.wishlists.Where(x=>x.Id== id).FirstOrDefault();
    }
}