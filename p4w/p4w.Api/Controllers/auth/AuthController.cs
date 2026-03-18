using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using p4w.Api.Dtos.Auth;
using p4w.Core.Interfaces.Repositories.Auth;
using p4w.Core.Interfaces.Services.Auth;
using p4w.Core.Paginations;

namespace p4w.Api.Controllers.Auth;

[ApiController]
[Route("api/[controller]")]
public class AuthController : ControllerBase
{
    private readonly IAuthService _authService;
    private readonly IJwtService _jwtService;
    private readonly IUserRepository _userRepository;

    public AuthController(
        IAuthService authService,
        IJwtService jwtService,
        IUserRepository userRepository)
    {
        _authService = authService;
        _jwtService = jwtService;
        _userRepository = userRepository;
    }

    [HttpPost("admin-login")]
    public async Task<ApiResponse<LoginResponse>> LoginAsync([FromBody] LoginRequest request)
    {
        return await _authService.LoginAsync(request.Email, request.Password);
    }

    [HttpPost("login-google")]
    public async Task<ApiResponse<LoginResponse>> LoginWithGoogleAsync([FromBody] GoogleLoginRequest request)
    {
        return await _authService.LoginWithGoogleAsync(request.IdToken);
    }

    [HttpPost("register")]
    public async Task<ApiResponse<bool>> RegisterAsync([FromBody] RegisterRequest request)
    {
        return await _authService.RegisterAsync(request);
    }
    [Authorize]
    [HttpPost("logout")]
    public async Task<ApiResponse<bool>> LogoutAsync()
{
    var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
    if (string.IsNullOrEmpty(userId))
        throw new Exception("Invalid token");

    return await _authService.LogoutAsync(Guid.Parse(userId));
}

    [HttpPost("refresh-token")]
    public async Task<ApiResponse<LoginResponse>> RefreshTokenAsync([FromBody] RefreshTokenRequest request)
    {
        var principal = _jwtService.GetPrincipalFromExpiredToken(request.RefreshToken);
        if (principal == null)
            throw new Exception("Invalid token");

        var type = principal.Claims.FirstOrDefault(x => x.Type == "type")?.Value;
        if (type != "refresh")
            throw new Exception("Invalid refresh token");

        var userId = principal.FindFirst(ClaimTypes.NameIdentifier)?.Value;
        if (string.IsNullOrEmpty(userId))
            throw new Exception("Invalid token");

        var user = await _userRepository.GetUserByIdAsync(Guid.Parse(userId));
        if (user == null)
            throw new Exception("User not found");

        if (user.RefreshToken != request.RefreshToken)
            throw new Exception("Refresh token mismatch");

        if (user.RefreshTokenExpiryTime == null || user.RefreshTokenExpiryTime <= DateTime.UtcNow)
            throw new Exception("Refresh token has expired");

        var newAccessToken = _jwtService.GenerateToken(user);
        var newRefreshToken = _jwtService.GenerateRefreshToken(user);
        var refreshTokenExpiry = DateTime.UtcNow.AddDays(3);
        var accessTokenExpiry = DateTime.UtcNow.AddMinutes(5);

        user.RefreshToken = newRefreshToken;
        user.RefreshTokenExpiryTime = refreshTokenExpiry;
        await _userRepository.UpdateAsync(user);

        return new ApiResponse<LoginResponse>
        {
            Code = 200,
            Success = true,
            Data = new LoginResponse
            {
                accessToken = newAccessToken,
                refreshToken = newRefreshToken,
                expiresAt = accessTokenExpiry,
                RefreshTokenExpiryTime = refreshTokenExpiry
            }
        };
    }
}