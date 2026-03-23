using p4w.Core.Dtos.User;

namespace p4w.Core.Interfaces.Services.Auth
{
    public interface IUserService
    {
        Task<UserDto> GetUserByIdAsync(Guid userId);
        Task<UserDto> GetUserByEmailAsync(string email);
        Task CreateUserAsync(UserDto userCreateDto);
        Task UpdateUserAsync(Guid userId, UserDto userUpdateDto);
        Task DeleteUserAsync(Guid userId);

        Task<UserProfileDto> GetUserProfileAsync(Guid userId);
        Task<RecentLocationDto?> GetRecentLocationAsync(Guid userId);
        Task<List<AdminUserDto>> GetUsersAsync(string? search, Guid? roleId, int? status);
        Task<AdminUserDto> CreateAdminUserAsync(AdminUpsertUserRequest request);
        Task<AdminUserDto> UpdateAdminUserAsync(Guid userId, AdminUpsertUserRequest request);
        Task<AdminUserDto> LockUserAsync(Guid userId);
    }
}
