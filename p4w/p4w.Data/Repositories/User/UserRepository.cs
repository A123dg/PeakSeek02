using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using p4w.Core.Exceptions;
using p4w.Core.Interfaces.Repositories.Auth;
using p4w.Core.Models;
using p4w.Data.Persistence;
public class UserRepository : IUserRepository {
    private readonly AppDbContext _context;
    public UserRepository(AppDbContext context) {
        _context = context;
    }
    public async Task<bool> ExistsByEmailAsync(string email) {
        return await _context.Users.AnyAsync(u => u.Email == email);
    }
    public async Task AddAsync(User user) {
        _context.Users.Add(user);
        await _context.SaveChangesAsync();
    }
    public async Task<User> GetUserByGoogleUserIdAsync(string googleUserId) {
        User? user = await _context.Users.FirstOrDefaultAsync(u => u.GoogleUserId == googleUserId);
        // if (user == null) {
        //     throw new AppException("User not found", ErrorCodes.NotFound, StatusCodes.Status404NotFound);
        // }
        return user;
    }
    public async Task UpdateAsync(User user) {
        _context.Users.Update(user);
        await _context.SaveChangesAsync();
    }
    public async Task<User> GetUserByEmailAsync(string email) {
        User? user = await _context.Users.FirstOrDefaultAsync(u => u.Email == email);
        // if (user == null) {
        //     throw new AppException("User not found", ErrorCodes.NotFound, StatusCodes.Status404NotFound);
        // }
        return user;
    }
    public async Task<User> GetUserByIdAsync(Guid id) {
        User? user = await _context.Users.FirstOrDefaultAsync(u => u.Id == id);
        if (user == null) {
            throw new AppException("User not found", ErrorCodes.NotFound, StatusCodes.Status404NotFound);
        }
        return user;
    }

  
}