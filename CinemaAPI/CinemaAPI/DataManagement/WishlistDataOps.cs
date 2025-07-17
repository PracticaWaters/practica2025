using CinemaAPI.Models;
using Microsoft.EntityFrameworkCore;
using System;

namespace CinemaAPI.DataManagement;

public class WishlistDataOps
{
    private readonly CinemaDbContext _dbContext;

    public WishlistDataOps(CinemaDbContext cinemaDbContext)
    {
        _dbContext = cinemaDbContext;
    }
    
    public Wishlist[] GetWishlists()
    {
        return _dbContext.wishlists.Include(x => x.User).Include(x => x.Film).ToArray();
    }
    
    public void Add(Wishlist wishlist)
    {
        try
        {
            _dbContext.Attach(wishlist.User);
            _dbContext.Attach(wishlist.Film);
            _dbContext.Entry(wishlist).Property("UserId").CurrentValue = wishlist.User.Id;
            _dbContext.Entry(wishlist).Property("FilmId").CurrentValue = wishlist.Film.Id;
            _dbContext.wishlists.Add(wishlist);
            _dbContext.SaveChanges();
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
            _dbContext.wishlists.Update(wishlist);
            _dbContext.SaveChanges();
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
                _dbContext.wishlists.Remove(wishlist);
                _dbContext.SaveChanges();
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
        return _dbContext.wishlists
            .Include(x => x.User)
            .Include(x => x.Film)
            .Where(w => w.User.Id == userId)
            .ToArray();
    }
    
    public Wishlist? GetByUserAndFilmId(int userId, int filmId)
    {
        return _dbContext.wishlists
            .Include(x => x.User)
            .Include(x => x.Film)
            .FirstOrDefault(w => w.User.Id == userId && w.Film.Id == filmId);
    }
    public Wishlist? GetWishlistById(int id)
    {
        return _dbContext.wishlists.Where(x=>x.Id== id).FirstOrDefault();
    }
}