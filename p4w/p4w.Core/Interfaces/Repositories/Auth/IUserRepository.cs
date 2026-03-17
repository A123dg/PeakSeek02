using p4w.Core.Models;

namespace p4w.Core.Interfaces.Repositories.Auth;
public interface IUserRepository {
    Task<bool> ExistsByEmailAsync(string email);
    Task<User> GetUserByGoogleUserIdAsync(string googleUserId);
    Task  AddAsync(User user);
    Task UpdateAsync(User user);

    Task<User> GetUserByIdAsync(Guid id);
    Task<User> GetUserByEmailAsync(string email);
}