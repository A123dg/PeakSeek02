using Google.Apis.Auth;
using Microsoft.Extensions.Configuration;
using p4w.Api.Dtos.Auth;
using p4w.Core.Interfaces.Repositories.Auth;
using p4w.Core.Interfaces.Services.Auth;
using p4w.Core.Models;
using p4w.Core.Paginations;
using p4w.Service.Helpers;

namespace p4w.Service.Services.Auth;
public class AuthService : IAuthService {
    private readonly IUserRepository _userRepository;
    private readonly IConfiguration _configuration;
    private readonly IJwtService _jwtService;
    public AuthService(IUserRepository userRepository, IConfiguration configuration, IJwtService jwtService) {
        _userRepository = userRepository;
        _configuration = configuration;
        _jwtService = jwtService;
    }
    public async Task<ApiResponse<LoginResponse>> LoginAsync(string email,string password) {
        User user = await _userRepository.GetUserByEmailAsync(email);
        if (user == null || !PasswordHelper.VerifyPassword(password, user.Password))
        {
            return new ApiResponse<LoginResponse>
            {
                Success = false,
                Message = "Invalid email or password",
                Data = null,
                MetaData = null
            };
        }
        string accessToken = _jwtService.GenerateToken(user);
        string refreshToken = _jwtService.GenerateRefreshToken(user);
        return new ApiResponse<LoginResponse> {
            Success = true,
            Data = new LoginResponse {
                accessToken = accessToken,
                refreshToken = refreshToken
            },
            Message = "Login successful",
            MetaData = null
        };
    }
    public async Task<ApiResponse<LoginResponse>> LoginWithGoogleAsync(string idToken){
        var payload = await GoogleJsonWebSignature.ValidateAsync(idToken);
        var email = payload.Email;
        var name = payload.Name;
        User user = await _userRepository.GetUserByGoogleUserIdAsync(payload.Subject);
        if(user == null) {
            user = new User {
                Id = Guid.NewGuid(),
                Email = email,
                UserName = name,
                GoogleUserId = payload.Subject,
                CreatedAt = DateTime.UtcNow,
                Status = 1,
                RoleId = Guid.Parse("1")
            };
            await _userRepository.AddAsync(user);
        }
        else {
            user.GoogleUserId = payload.Subject;
            await _userRepository.UpdateAsync(user);
        }
        var accessToken = _jwtService.GenerateToken(user);
        var refreshToken = _jwtService.GenerateRefreshToken(user);
       return new ApiResponse<LoginResponse> {
            Success = true,
            Data = new LoginResponse {
                accessToken = accessToken,
                refreshToken = refreshToken,
                
            }
        };
    }
    public async Task<ApiResponse<bool>> RegisterAsync(RegisterRequest request) {
        var user = await _userRepository.ExistsByEmailAsync(request.Email);
        if (user == true) {
            throw new Exception("Email already in use");
        }
        var newUser = new User {
            Id = Guid.NewGuid(),
            Email = request.Email,
            UserName = request.UserName,
            // Password = PasswordHelper.HashPassword(request.Password),
            CreatedAt = DateTime.UtcNow,
            Status = 1,
            RoleId = Guid.Parse("1")
            
        };
        await _userRepository.AddAsync(newUser);
        return new ApiResponse<bool> {
            Success = true,
            Data = true
        };
    }
}