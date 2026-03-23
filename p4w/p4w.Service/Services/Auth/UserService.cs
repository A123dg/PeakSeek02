using Microsoft.Extensions.Configuration;
using p4w.Core.Constants.Statuses;
using p4w.Core.Dtos.User;
using p4w.Core.Interfaces.Repositories.Auth;
using p4w.Core.Interfaces.Repositories.MediaRepo;
using p4w.Core.Models;

namespace p4w.Core.Interfaces.Services.Auth
{

    
    public class UserService : IUserService 
    {
        private readonly IConfiguration _configuration;
    private readonly IUserRepository _userRepository;

    private readonly IMediaRepository _mediaRepository;
    public UserService(IConfiguration configuration, IUserRepository userRepository, IMediaRepository mediaRepository)
    {
        _configuration = configuration;
        _userRepository = userRepository;
        _mediaRepository = mediaRepository;

    }   

        async Task<UserDto> IUserService.GetUserByIdAsync(Guid userId)
        {
            User user = await _userRepository.GetUserByIdAsync(userId);
            return new UserDto
            {
                Email = user.Email,
                UserName = user.UserName,
                DateOfBirth = user.DateOfBirth,
                mediaLinkUrl = user.MediaLinks
            .Where(m => m.EntityType == "avatar")   
            .OrderBy(m => m.SortOrder)
            .Select(m => m.Media.Url)
            .FirstOrDefault() ?? ""
            };
        }

        Task<UserDto> IUserService.GetUserByEmailAsync(string email)
        {
            User user = _userRepository.GetUserByEmailAsync(email).Result;
            return Task.FromResult(new UserDto
            {
                Email = user.Email,
                UserName = user.UserName,
                DateOfBirth = user.DateOfBirth,
                mediaLinkUrl = user.MediaLinks
            .Where(m => m.EntityType == "avatar")   
            .OrderBy(m => m.SortOrder)
            .Select(m => m.Media.Url)
            .FirstOrDefault() ?? ""
            });
        }

        public async Task<UserProfileDto> GetUserProfileAsync(Guid userId)
        {
            User user = await _userRepository.GetUserByIdAsync(userId);
            RecentLocationDto? recentLocation = await _userRepository.GetRecentLocationByUserIdAsync(userId);

            return new UserProfileDto
            {
                Email = user.Email,
                UserName = user.UserName,
                DateOfBirth = user.DateOfBirth,
                MediaLinkUrl = user.MediaLinks
            .Where(m => m.EntityType == "avatar")   
            .OrderBy(m => m.SortOrder)
            .Select(m => m.Media.Url)
            .FirstOrDefault() ?? "",
                RecentLocation = recentLocation
            };
        }

        public async Task<RecentLocationDto?> GetRecentLocationAsync(Guid userId)
        {
            return await _userRepository.GetRecentLocationByUserIdAsync(userId);
        }

        public async Task<List<AdminUserDto>> GetUsersAsync(string? search, Guid? roleId, int? status)
        {
            return await _userRepository.GetUsersAsync(search, roleId, status);
        }

        public async Task<AdminUserDto> CreateAdminUserAsync(AdminUpsertUserRequest request)
        {
            var exists = await _userRepository.ExistsByEmailAsync(request.Email);
            if (exists)
            {
                throw new Exception("Email already in use");
            }

            var user = new User
            {
                Id = Guid.NewGuid(),
                Email = request.Email,
                UserName = request.UserName,
                DateOfBirth = request.DateOfBirth,
                CreatedAt = DateTime.UtcNow,
                Status = request.Status,
                RoleId = request.RoleId
            };

            if (!string.IsNullOrWhiteSpace(request.MediaLinkUrl))
            {
                var media = new Media
                {
                    Id = Guid.NewGuid(),
                    Url = request.MediaLinkUrl,
                    MimeType = "image/jpeg",
                    Size = 0,
                    Status = UserStatuses.Active,
                    CreatedAt = DateTime.UtcNow
                };

                user.MediaLinks.Add(new MediaLink
                {
                    Id = Guid.NewGuid(),
                    UserId = user.Id,
                    EntityType = "avatar",
                    EntityId = user.Id,
                    MediaType = "image",
                    SortOrder = 0,
                    MediaId = media.Id,
                    Media = media
                });
            }

            await _userRepository.AddAsync(user);
            return (await _userRepository.GetUsersAsync(user.Email, null, null)).First(x => x.Id == user.Id);
        }

        public async Task<AdminUserDto> UpdateAdminUserAsync(Guid userId, AdminUpsertUserRequest request)
        {
            var user = await _userRepository.GetUserByIdAsync(userId);
            var exists = await _userRepository.ExistsByEmailAsync(request.Email, userId);
            if (exists)
            {
                throw new Exception("Email already in use");
            }

            user.Email = request.Email;
            user.UserName = request.UserName;
            user.DateOfBirth = request.DateOfBirth;
            user.RoleId = request.RoleId;
            user.Status = request.Status;

            if (!string.IsNullOrWhiteSpace(request.MediaLinkUrl))
            {
                var existingAvatarLink = user.MediaLinks.FirstOrDefault(m => m.EntityType == "avatar");
                if (existingAvatarLink != null)
                {
                    existingAvatarLink.Media.Url = request.MediaLinkUrl;
                    await _mediaRepository.UpdateAsync(existingAvatarLink.Media);
                }
            }

            await _userRepository.UpdateAsync(user);
            return (await _userRepository.GetUsersAsync(user.Email, null, null)).First(x => x.Id == user.Id);
        }

        public async Task<AdminUserDto> LockUserAsync(Guid userId)
        {
            var user = await _userRepository.GetUserByIdAsync(userId);
            user.Status = UserStatuses.Locked;
            await _userRepository.UpdateAsync(user);
            return (await _userRepository.GetUsersAsync(user.Email, null, null)).First(x => x.Id == user.Id);
        }

        public async Task CreateUserAsync(UserDto userCreateDto)
        {
            User user = await _userRepository.GetUserByEmailAsync(userCreateDto.Email);
            if(user != null) {
                throw new Exception("User with this email already exists");
            }
            User createUser = new User
            {
                Id = Guid.NewGuid(),
                Email = userCreateDto.Email,
                UserName = userCreateDto.UserName,
                DateOfBirth = userCreateDto.DateOfBirth,
                CreatedAt = DateTime.UtcNow,
                Status = UserStatuses.Active,
                RoleId = Guid.Parse("8ACEA62A-E03E-47B9-89E5-9E4320085D7D")
            };
             await _userRepository.AddAsync(createUser);
            // return Task.CompletedTask;

        }

        public async Task UpdateUserAsync(Guid userId, UserDto userUpdateDto)
        {
            User user = await _userRepository.GetUserByIdAsync(userId);
            if(user == null) {
                throw new Exception("User not found");
            }
            user.Email = userUpdateDto.Email;
            user.UserName = userUpdateDto.UserName;
            user.DateOfBirth = userUpdateDto.DateOfBirth;
             if (!string.IsNullOrEmpty(userUpdateDto.mediaLinkUrl))
    {
        var existingAvatarLink = user.MediaLinks
            .FirstOrDefault(m => m.EntityType == "avatar");

        if (existingAvatarLink != null)
        {
            // Đã có avatar → update URL trong Media
            existingAvatarLink.Media.Url = userUpdateDto.mediaLinkUrl;
            await _mediaRepository.UpdateAsync(existingAvatarLink.Media);
        }
        else
        {
            var newMedia = new Media
            {
                Id = Guid.NewGuid(),
                Url = userUpdateDto.mediaLinkUrl,
                MimeType = "image/jpeg",
                Size = 0,
                Status = UserStatuses.Active,
                CreatedAt = DateTime.UtcNow
            };

            var newMediaLink = new MediaLink
            {
                Id = Guid.NewGuid(),
                UserId = userId,
                EntityType = "avatar",
                EntityId = userId,
                MediaType = "image",
                SortOrder = 0,
                MediaId = newMedia.Id,
                Media = newMedia
            };

            user.MediaLinks.Add(newMediaLink);
        }
    }
    await _userRepository.UpdateAsync(user);

        }

        public async Task DeleteUserAsync(Guid userId)
        {
            User user = await _userRepository.GetUserByIdAsync(userId);
            user.Status = UserStatuses.Inactive;
            await _userRepository.UpdateAsync(user);
        }
    }
}
