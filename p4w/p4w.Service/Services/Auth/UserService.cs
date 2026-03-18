using Microsoft.Extensions.Configuration;
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
                Status = 1,
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
                Status = 1,
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

        public Task DeleteUserAsync(Guid userId)
        {
            throw new NotImplementedException();
        }
    }
}