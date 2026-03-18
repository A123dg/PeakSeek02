using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using p4w.Core.Interfaces.Services;
using p4w.Core.Interfaces.Services.Auth;
using p4w.Core.Paginations;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;

namespace p4w.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize]
    public class UserController : ControllerBase
    {
        private readonly IUserService _userService;

        public UserController(IUserService userService)
        {
            _userService = userService;
        }

        [HttpGet("profile")]
        public async Task<ActionResult<ApiResponse<UserDto>>> GetProfile()
        {
            var userId = User.FindFirstValue(JwtRegisteredClaimNames.Sub)
                      ?? User.FindFirstValue(ClaimTypes.NameIdentifier);

            if (userId == null)
                return new ApiResponse<UserDto>
                {
                    Code = 401,
                    Success = false,
                    Message = "Unauthorized",
                    Data = null
                };

            var profile = await _userService.GetUserProfileAsync(Guid.Parse(userId));
            return Ok(new ApiResponse<UserDto>
            {
                Code = 200,
                Success = true,
                Message = "User profile retrieved successfully",
                Data = profile
            });
        }
    }
}