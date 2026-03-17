using System.IdentityModel.Tokens.Jwt;
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
    [HttpPost("login")]
    public async Task<ApiResponse<LoginResponse>> LoginAsync([FromBody] LoginRequest request)
    {
        return await _authService.LoginAsync(request.Email, request.Password);
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

        var userId = principal.FindFirst(JwtRegisteredClaimNames.Sub)?.Value;

        if (string.IsNullOrEmpty(userId))
            throw new Exception("Invalid token");

        var user = await _userRepository.GetUserByIdAsync(Guid.Parse(userId));

        if (user == null)
            throw new Exception("User not found");

        var newAccessToken = _jwtService.GenerateToken(user);
        var newRefreshToken = _jwtService.GenerateRefreshToken(user);

        return new ApiResponse<LoginResponse>
        {
            Code = 200,
            Success = true,
            Data = new LoginResponse
            {
                accessToken = newAccessToken,
                refreshToken = newRefreshToken,
                expiresAt = DateTime.UtcNow.AddMinutes(15) // tùy config của bạn
            }
        };
    }
}