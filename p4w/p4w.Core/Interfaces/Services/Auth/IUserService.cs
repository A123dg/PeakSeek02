namespace p4w.Core.Interfaces.Services.Auth
{
    public interface IUserService
    {
        Task<UserDto> GetUserByIdAsync(Guid userId);
        Task<UserDto> GetUserByEmailAsync(string email);
        Task CreateUserAsync(UserDto userCreateDto);
        Task UpdateUserAsync(Guid userId, UserDto userUpdateDto);
        Task DeleteUserAsync(Guid userId);
    }
}