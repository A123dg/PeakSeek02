using p4w.Api.Dtos.Auth;
using p4w.Core.Paginations;
using RegisterRequest = p4w.Api.Dtos.Auth.RegisterRequest;
namespace p4w.Core.Interfaces.Services.Auth;

public interface IAuthService {
    Task<ApiResponse<LoginResponse>> LoginAsync(string userName, string password);
    Task<ApiResponse<LoginResponse>> LoginWithGoogleAsync(string idToken);
    Task<ApiResponse<bool>> RegisterAsync(RegisterRequest request);

    Task<ApiResponse<bool>> LogoutAsync(Guid userId);
}